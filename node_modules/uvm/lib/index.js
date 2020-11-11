const EventEmitter = require('events'),

    bridge = require('./bridge'),
    { isFunction, isObject } = require('./utils'),

    /**
     * The time to wait for UVM boot to finish. In milliseconds.
     *
     * @private
     * @type {Number}
     */
    DEFAULT_BOOT_TIMEOUT = 30 * 1000,

    /**
     * The time to wait for UVM dispatch process to finish. In milliseconds.
     *
     * @private
     * @type {Number}
     */
    DEFAULT_DISPATCH_TIMEOUT = 30 * 1000,

    E = '',
    ERROR_EVENT = 'error',
    DISPATCH_QUEUE_EVENT = 'dispatchQueued';

/**
 * Configuration options for  UniversalVM connection.
 *
 * @typedef UniversalVM.connectOptions
 *
 * @property {Boolean} [bootCode] Code to be executed inside a VM on boot
 * @property {Boolean} [_sandbox] Custom sandbox instance
 * @property {Boolean} [debug] Inject global console object in Node.js VM
 * @property {Boolean} [bootTimeout=30 * 1000] The time (in milliseconds) to wait for UVM boot to finish
 * @property {Boolean} [dispatchTimeout=30 * 1000] The time (in milliseconds) to wait for UVM dispatch process to finish
 */

/**
 * Universal Virtual Machine for Node and Browser.
 */
class UniversalVM extends EventEmitter {
    constructor () {
        super();

        /**
         * Boolean representing the bridge connectivity state.
         *
         * @private
         * @type {Boolean}
         */
        this._bridgeConnected = false;

        /**
         * Stores the pending dispatch events until the context is ready for use.
         * Useful when not using the asynchronous construction.
         *
         * @private
         * @type {Array}
         */
        this._dispatchQueue = [];
    }

    /**
     * Creates a new instance of UniversalVM.
     * This is merely an alias of the construction creation without needing to
     * write the `new` keyword and creating explicit connection.
     *
     * @param {UniversalVM.connectOptions} [options] Options to configure the UVM
     * @param {Function(error, context)} callback Callback function
     * @returns {Object} UVM event emitter instance
     *
     * @example
     * const uvm = require('uvm');
     *
     * uvm.spawn({
     *     bootCode: `
     *         bridge.on('loopback', function (data) {
     *             bridge.dispatch('loopback', 'pong');
     *         });
     *     `
     * }, (err, context) => {
     *     context.on('loopback', function (data) {
     *         console.log(data); // pong
     *     });
     *
     *     context.dispatch('loopback', 'ping');
     * });
     */
    static spawn (options, callback) {
        const uvm = new UniversalVM(options, callback);

        // connect with the bridge
        uvm.connect(options, callback);

        // return event emitter for chaining
        return uvm;
    }

    /**
     * Establish connection with the communication bridge.
     *
     * @param {UniversalVM.connectOptions} [options] Options to configure the UVM
     * @param {Function(error, context)} callback Callback function
     */
    connect (options, callback) {
        // set defaults for parameters
        !isObject(options) && (options = {});

        /**
         * Wrap the callback for unified result and reduce chance of bug.
         * We also abandon all dispatch replay.
         *
         * @private
         * @param  {Error=} [err] -
         */
        const done = (err) => {
            if (err) {
                // on error during bridging, we simply abandon all dispatch replay
                this._dispatchQueue.length = 0;

                try { this.emit(ERROR_EVENT, err); }
                // nothing to do if listeners fail, we need to move on and execute callback!
                catch (e) { } // eslint-disable-line no-empty
            }

            isFunction(callback) && callback.call(this, err, this);
        };

        // bail out if bridge is connected
        if (this._bridgeConnected) {
            return done();
        }

        // start connection with the communication bridge
        this._bridgeConnected = true;

        // we bridge this event emitter with the context (bridge usually creates the context as well)
        bridge(this, Object.assign({ // eslint-disable-line prefer-object-spread
            bootCode: E,
            bootTimeout: DEFAULT_BOOT_TIMEOUT,
            dispatchTimeout: DEFAULT_DISPATCH_TIMEOUT
        }, options), (err) => {
            if (err) {
                return done(err);
            }

            let args;

            try {
                // we dispatch all pending messages provided nothing had errors
                while ((args = this._dispatchQueue.shift())) {
                    this.dispatch(...args);
                }
            }
            // since there us no further work after dispatching events, we re-use the err parameter.
            // at this point err variable is falsy since truthy case is already handled before
            catch (e) { /* istanbul ignore next */ err = e; }

            done(err);
        });
    }

    /**
     * Emit an event on the other end of bridge.
     * The parameters are same as `emit` function of the event emitter.
     */
    dispatch () {
        try { this._dispatch(...arguments); }
        catch (e) { /* istanbul ignore next */ this.emit(ERROR_EVENT, e); }
    }

    /**
     * Disconnect the bridge and release memory.
     */
    disconnect () {
        // reset the bridge connection state
        this._bridgeConnected = false;

        try { this._disconnect(...arguments); }
        catch (e) { this.emit(ERROR_EVENT, e); }
    }

    /**
     * Stub dispatch handler to queue dispatched messages until bridge is ready.
     *
     * @private
     * @param {String} name -
     */
    _dispatch (name) {
        this._dispatchQueue.push(arguments);
        this.emit(DISPATCH_QUEUE_EVENT, name);
    }

    /**
     * The bridge should be ready to disconnect when this is called. If not,
     * then this prototype stub would throw an error
     *
     * @private
     * @throws {Error} If bridge is not ready and this function is called
     */
    _disconnect () { // eslint-disable-line class-methods-use-this
        throw new Error('uvm: cannot disconnect, communication bridge is broken');
    }
}

module.exports = UniversalVM;
