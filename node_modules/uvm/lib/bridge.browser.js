/* istanbul ignore file */
/*
 * @note options.dispatchTimeout is not implemented in browser sandbox because
 * there is no way to interrupt an infinite loop.
 * Maybe terminate and restart the worker or execute in nested worker.
 */
const Flatted = require('flatted'),
    { randomNumber } = require('./utils'),

    ERROR = 'error',
    MESSAGE = 'message',
    UVM_ID_ = '__id_uvm_',

    // code for bridge
    bridgeClientCode = require('./bridge-client'),

    /**
     * Returns the firmware code to be executed inside Web Worker.
     *
     * @private
     * @param {String} code -
     * @param {String} id -
     * @return {String}
     */
    sandboxFirmware = (code, id) => {
        // @note self.postMessage and self.addEventListener methods are cached
        // in variable or closure because bootCode might mutate the global scope
        return `
            __uvm_emit = function (postMessage, args) {
                postMessage({__id_uvm: "${id}",__emit_uvm: args});
            }.bind(null, self.postMessage);
            __uvm_addEventListener = self.addEventListener;
            try {${code}} catch (e) { setTimeout(function () { throw e; }, 0); }
            (function (emit, id) {
                __uvm_addEventListener("message", function (e) {
                    (e && e.data && (typeof e.data.__emit_uvm === 'string') && (e.data.__id_uvm === id)) &&
                        emit(e.data.__emit_uvm);
                });
            }(__uvm_dispatch, "${id}"));
            __uvm_emit('${Flatted.stringify(['load.' + id])}');
            __uvm_dispatch = null; __uvm_emit = null; __uvm_addEventListener = null;
            delete __uvm_dispatch; delete __uvm_emit; delete __uvm_addEventListener;
        `;
    };

module.exports = function (bridge, options, callback) {
    if (!(Blob && Worker && window && window.URL && window.URL.createObjectURL)) {
        return callback(new Error('uvm: unable to setup communication bridge, missing required APIs'));
    }

    let worker,
        bootTimer,
        firmwareCode,
        firmwareObjectURL;

    const id = UVM_ID_ + randomNumber(),

        // function to forward messages emitted
        forwardEmits = (e) => {
            if (!(e && e.data && (typeof e.data.__emit_uvm === 'string') && (e.data.__id_uvm === id))) { return; }

            let args;

            try { args = Flatted.parse(e.data.__emit_uvm); }
            catch (err) { return bridge.emit(ERROR, err); }
            bridge.emit(...args);
        },

        // function to forward errors emitted
        forwardErrors = (e) => {
            bridge.emit(ERROR, e);
        },

        // function to terminate worker
        terminateWorker = function () {
            if (!worker) { return; }

            // remove event listeners for this sandbox
            worker.removeEventListener(MESSAGE, forwardEmits);
            worker.removeEventListener(ERROR, forwardErrors);

            // do not terminate sandbox worker if not spawned for the bridge
            if (!options._sandbox) {
                worker.terminate();

                // revoke after termination. otherwise, blob reference is retained until GC
                // refer: "chrome://blob-internals"
                window.URL.revokeObjectURL(firmwareObjectURL);
            }

            worker = null;
        };

    // on load attach the dispatcher
    bridge.once('load.' + id, () => {
        // stop boot timer first
        clearTimeout(bootTimer);

        bridge._dispatch = function () {
            if (!worker) {
                return bridge.emit(ERROR,
                    new Error('uvm: unable to dispatch "' + arguments[0] + '" post disconnection.'));
            }

            worker.postMessage({
                __emit_uvm: Flatted.stringify(Array.prototype.slice.call(arguments)),
                __id_uvm: id
            });
        };

        callback(null, bridge);
    });

    // get firmware code string with boot code
    firmwareCode = sandboxFirmware(bridgeClientCode(options.bootCode), id);

    // start boot timer, stops once we get the load signal, terminate otherwise
    bootTimer = setTimeout(() => {
        terminateWorker();
        callback(new Error(`uvm: boot timed out after ${options.bootTimeout}ms.`));
    }, options.bootTimeout);

    // if sandbox worker is provided, we simply need to init with firmware code
    // @todo validate sandbox type or APIs
    if (options._sandbox) {
        worker = options._sandbox;
        worker.postMessage({ __init_uvm: firmwareCode });
    }
    // else, spawn a new worker
    else {
        // convert the firmware code into a blob URL
        firmwareObjectURL = window.URL.createObjectURL(new Blob([firmwareCode], { type: 'text/javascript' }));

        // catch CSP:worker-src violations
        try { worker = new Worker(firmwareObjectURL); }
        catch (error) {
            // clear blob reference
            window.URL.revokeObjectURL(firmwareObjectURL);

            return callback(new Error(`uvm: unable to spawn worker.\n${error.message || error}`));
        }
    }

    // add event listener for receiving events from worker (is removed on disconnect)
    // don't set `onmessage` and `onerror` as it might override external sandbox
    worker.addEventListener(MESSAGE, forwardEmits);
    worker.addEventListener(ERROR, forwardErrors);

    // equip bridge to disconnect (i.e. terminate the worker)
    bridge._disconnect = terminateWorker;

    // help GC collect large variables
    firmwareCode = null;
};
