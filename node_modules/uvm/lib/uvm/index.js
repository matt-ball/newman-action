var _ = require('lodash'),
    inherits = require('inherits'),
    EventEmitter = require('events'),
    bridge = require('./bridge'),

    /**
     * The time to wait for UVM boot to finish. In milliseconds
     * @type {Number}
     */
    DEFAULT_BOOT_TIMEOUT = 30 * 1000,

    /**
     * The time to wait for UVM dispatch process to finish. In milliseconds
     * @type {Number}
     */
    DEFAULT_DISPATCH_TIMEOUT = 30 * 1000,

    E = '',
    ERROR_EVENT = 'error',
    DISPATCHQUEUE_EVENT = 'dispatchQueued',
    DISCONNECT_ERROR_MESSAGE = 'uvm: cannot disconnect, communication bridge is broken',

    UniversalVM;

/**
 * @constructor
 * @extends {EventEmitter}
 * @param {Object} options
 * @param {String} options.bootCode
 * @param {Function} callback
 */
UniversalVM = function UniversalVM (options, callback) {
    // set defaults for parameters
    !_.isObject(options) && (options = {});

    // call the super constructor
    EventEmitter.call(this);

    /**
     * Wrap the callback for unified result and reduce chance of bug.
     * We also abandon all dispatch replay.
     *
     * @param  {Error=} [err]
     */
    var done = function (err) {
        if (err) {
            this._pending.length = 0;

            try { this.emit(ERROR_EVENT, err); }
            // nothing to do if listeners fail, we need to move on and execute callback!
            catch (e) { } // eslint-disable-line no-empty
        }

        _.isFunction(callback) && callback.call(this, err, this);
    }.bind(this);

    /**
     * Stores the pending dispatch events until the context is ready for use. Useful when not using the asynchronous
     * construction.
     *
     * @private
     * @memberOf UniversalVM.prototype
     * @type {Array}
     */
    this._pending = [];

    // we bridge this event emitter with the context (bridge usually creates the context as well)
    bridge(this, _.defaults(options, {
        bootCode: E,
        bootTimeout: DEFAULT_BOOT_TIMEOUT,
        dispatchTimeout: DEFAULT_DISPATCH_TIMEOUT
    }), function (err) {
        // on error during bridging, we simply abandon all dispatch replay and bail out through callback
        if (err) {
            this._pending && (this._pending.length = 0);
            return done(err);
        }

        var args;

        try {
            // we dispatch all pending messages provided nothing had errors
            while ((args = this._pending.shift())) {
                this.dispatch.apply(this, args); // eslint-disable-line prefer-spread
            }
        }
        // since there us no further work after dispatching events, we re-use the err parameter.
        // at this point err variable is falsey since truthy case is already handled before
        catch (e) { err = e; }

        done(err);
    }.bind(this));
};

// make UVM inherit from event emitter
inherits(UniversalVM, EventEmitter);

// equip the event emitter with an interface to communicate with the other end of the bridge
_.assign(UniversalVM.prototype, /** @lends UVM.prototype */ {
    /**
     * Emit an event on the other end of bridge. The parameters are same as `emit` function of the event emitter.
     */
    dispatch: function () {
        try { this._dispatch.apply(this, arguments); } // eslint-disable-line prefer-spread
        catch (e) { this.emit(ERROR_EVENT, e); }
    },

    /**
     * Disconnect the bridge and release memory.
     */
    disconnect: function () {
        try { this._disconnect.apply(this, arguments); } // eslint-disable-line prefer-spread
        catch (e) { this.emit(ERROR_EVENT, e); }
    },

    /**
     * Stub dispatch handler to queue dispatched messages until bridge is ready.
     *
     * @param {String} name
     */
    _dispatch: function (name) {
        (Array.isArray(this._pending) ? this._pending : (this._pending = [])).push(arguments);
        this.emit(DISPATCHQUEUE_EVENT, name);
    },

    /**
     * The bridge should be ready to disconnect when this is called. If not, then this prototype stub would throw an
     * error
     *
     * @throws {Error} If bridge is not ready and this function is called.
     */
    _disconnect: function () {
        throw new Error(DISCONNECT_ERROR_MESSAGE);
    }
});

// add some handy static functions
_.assign(UniversalVM, {
    /**
     * Creates a new instance of UVM. This is merely an alias of the {@link UVM} construction creation without needing
     * to write the `new` keyword.
     *
     * @param {Object} options
     * @param {Function} callback
     * @returns {Object} UVM
     *
     * @see UVM
     */
    spawn: function (options, callback) {
        return new UniversalVM(options, callback);
    }
});

module.exports = UniversalVM;
