/*
 * @note
 * options.bootTimeout is not implemented in browser sandbox. Reason is that as long as we use iFrame, there is no way
 * to interrupt an infinite loop.
 */
var _ = require('lodash'),
    uuid = require('uuid'),
    Flatted = require('flatted'),
    MESSAGE = 'message',
    LOAD = 'load',
    ERROR = 'error',
    TARGET_ALL = '*',
    SANDBOX_ELEMENT_TAG = 'iframe',

    // code for bridge
    bridgeClientCode = require('./bridge-client'),

    /**
     * Default DOM attributes of sandbox
     * @type {Object}
     */
    sandboxAttributes = {
        'class': 'postman-uvm-context',
        'style': 'display:none;',
        'sandbox': 'allow-scripts'
    },

    /**
     * Returns the HTML to be executed inside iFrame.
     *
     * @param {String} code
     * @param {String} id
     * @param {Boolean} firmwareOnly
     * @return {String}
     */
    sandboxCode = function (code, id, firmwareOnly) {
        var firmware = `
            __uvm_emit = function (args) {window.parent.postMessage({__id_uvm: "${id}",__emit_uvm: args}, "*");};

            try {${code}} catch (e) { setTimeout(function () { throw e; }, 0); }

            (function (emit, id) {
                window.addEventListener("message", function (e) {
                    (e && e.data && (typeof e.data.__emit_uvm === 'string') && (e.data.__id_uvm === id)) &&
                        emit(e.data.__emit_uvm);
                });
            }(__uvm_dispatch, "${id}"));
            __uvm_emit('${Flatted.stringify(['load.' + id])}');
            __uvm_dispatch = null; __uvm_emit = null;
        `;

        return firmwareOnly ? firmware : `<!DOCTYPE html><html><head>
            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"><meta charset="UTF-8">
            <script type="text/javascript">${firmware}</script></head></html>`;
    };

module.exports = function (bridge, options, callback) {
    var id = uuid(),
        code = bridgeClientCode(options.bootCode),

        // make sure we escape the code only once
        serializedFirmware = unescape(encodeURIComponent(sandboxCode(code, id))),

        iframe = options._sandbox || document.createElement(SANDBOX_ELEMENT_TAG),

        // function to forward messages emitted
        forwardEmits = function (e) {
            if (!(e && e.data && _.isString(e.data.__emit_uvm) && (e.data.__id_uvm === id))) { return; }

            var args;
            try { args = Flatted.parse(e.data.__emit_uvm); }
            catch (err) { return bridge.emit(ERROR, err); }
            bridge.emit.apply(bridge, args); // eslint-disable-line prefer-spread
        },

        processCallback = function () {
            !options._sandbox && iframe.removeEventListener(LOAD, processCallback);

            bridge._dispatch = function () {
                if (!iframe) {
                    return bridge.emit(ERROR,
                        new Error('uvm: unable to dispatch "' + arguments[0] + '" post disconnection.'));
                }

                iframe.contentWindow.postMessage({
                    __emit_uvm: Flatted.stringify(Array.prototype.slice.call(arguments)),
                    __id_uvm: id
                }, TARGET_ALL);
            };

            callback(null, bridge);
        };

    // add event listener for receiving events from iframe (is removed on disconnect)
    window.addEventListener(MESSAGE, forwardEmits);

    // equip bridge to disconnect (i.e. delete the iframe)
    bridge._disconnect = function () {
        if (!iframe) { return; }

        // remove the message handler for this sandbox
        window.removeEventListener(MESSAGE, forwardEmits);

        // do not delete sandbox element if not created for the bridge
        !options._sandbox && iframe.parentNode && iframe.parentNode.removeChild(iframe);
        iframe = null;
    };

    // if sandbox element is provided, we simply need to init with firmware code and wait for load event to be fired
    if (options._sandbox) {
        bridge.once('load.' + id, processCallback); // on load attach the dispatcher

        iframe.contentWindow.postMessage({
            __init_uvm: sandboxCode(code, id, true) // the last `true` param indicates firmwareOnly
        }, TARGET_ALL);

        return;
    }

    // this point onwards, it is our own iframe, so we do all the appending and other stuff to DOM
    iframe.addEventListener(LOAD, processCallback); // removed right when executed

    // prepare an iframe as context
    _.forEach(sandboxAttributes, function (val, prop) {
        iframe.setAttribute(prop, val);
    });

    // add HTML and bootstrap code to the iframe
    iframe.setAttribute('src', 'data:text/html;base64, ' + btoa(serializedFirmware));

    // data uri has size limits depending on the browsers
    // in browsers that don't support srcdoc attribute the src attribute is accepted
    // https://www.w3.org/TR/html5/semantics-embedded-content.html#an-iframe-srcdoc-document
    iframe.setAttribute('srcdoc', serializedFirmware);

    // now append the iframe to start processing stuff
    document.body.appendChild(iframe);

    // help GC collect large variables
    code = null;
    serializedFirmware = null;
};
