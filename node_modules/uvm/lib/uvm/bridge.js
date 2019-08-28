var vm = require('vm'),
    Flatted = require('flatted'),

    bridgeClientCode = require('./bridge-client'),
    delegateTimers = require('./vm-delegate-timers'),

    STRING = 'string',
    ERROR = 'error',
    RNG_STRENGTH = 100000000,
    UVM_DATA_ = '__uvm_data_',
    UVM_DISPATCH_ = '__uvm_dispatch_',

    /**
     * Generate a random number.
     *
     * @return {Number}
     */
    randomNumber = function () {
        return ~~(Math.random() * RNG_STRENGTH);
    },

    /**
     * Convert array or arguments object to JSON
     * @param  {Array|Argument} arr
     * @return {String}
     *
     * @note This has been held as reference to avoid being misused if modified in global context;
     */
    jsonArray = (function (arrayProtoSlice, jsonStringify) {
        return function (arr) {
            return jsonStringify(arrayProtoSlice.call(arr));
        };
    }(Array.prototype.slice, Flatted.stringify)),

    /**
     * @param  {String} str
     * @return {Array}
     */
    unJsonArray = (function (jsonParse) {
        return function (str) {
            return jsonParse(str);
        };
    }(Flatted.parse));

/**
 * This function equips an event emitter with communication capability with a VM.
 *
 * @param  {EventEmitter} emitter
 * @param  {Object} options
 * @param  {String} options.bootCode
 * @param  {vm~Context=} [options._sandbox]
 * @param  {Function} callback
 */
module.exports = function (emitter, options, callback) {
    var code = bridgeClientCode(options.bootCode),
        context = options._sandbox || vm.createContext(Object.create(null)),
        bridgeDispatch;

    // inject console on debug mode
    options.debug && (context.console = console);

    // we need to inject the timers inside vm since VM does not have timers
    if (!options._sandbox) {
        delegateTimers(context);
    }

    try {
        // inject the emitter via context. it will be referenced by the bridge and then deleted to prevent
        // additional access
        context.__uvm_emit = function (args) {
            if (typeof args !== STRING) { return; }

            try { args = unJsonArray(args); }
            catch (err) { emitter.emit(ERROR, err); }

            emitter.emit.apply(emitter, args); // eslint-disable-line prefer-spread
        };

        vm.runInContext(code, context, {
            timeout: options.bootTimeout
        });

        // we keep a reference to the dispatcher so that we can preemptively re inject it in case it is deleted
        // by user scripts
        bridgeDispatch = context.__uvm_dispatch;
    }
    catch (err) {
        return callback(err);
    }
    finally { // set all raw interface methods to null (except the dispatcher since we need it later)
        vm.runInContext('__uvm_emit = null; __uvm_dispatch = null;', context);
        delete context.__uvm_emit;
        delete context.__uvm_dispatch;
    }

    // since context is created and emitter is bound, we would now attach the send function
    emitter._dispatch = function () {
        var id = UVM_DATA_ + randomNumber(),
            dispatchId = UVM_DISPATCH_ + id;

        // trigger event if any dispatch happens post disconnection
        if (!context) {
            return this.emit(ERROR, new Error(`uvm: unable to dispatch "${arguments[0]}" post disconnection.`));
        }

        try {
            // save the data in context. by this method, we avoid needless string and character encoding or escaping
            // issues. this is slightly prone to race condition issues, but using random numbers we intend to solve it
            context[id] = jsonArray(arguments);
            context[dispatchId] = bridgeDispatch;

            // restore the dispatcher for immediate use!
            vm.runInContext(`
                (function (dispatch, data) {
                    ${id} = null; (delete ${id});
                    ${dispatchId} = null; (delete ${dispatchId});
                    dispatch(String(data));
                }(${dispatchId}, ${id}));
            `, context, {
                timeout: options.dispatchTimeout
            });
        }
        // swallow errors since other platforms will not trigger error if execution fails
        catch (e) { this.emit(ERROR, e); }
        finally { // precautionary delete
            if (context) {
                delete context[id];
                delete context[dispatchId];
            }
        }
    };

    emitter._disconnect = function () {
        if (!context) { return; }

        // clear only if the context was created inside this function
        !options._sandbox && Object.keys(context).forEach(function (prop) {
            delete context[prop];
        });
        context = null;
    };

    callback(null, emitter);
};
