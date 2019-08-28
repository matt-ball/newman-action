var vm = require('vm'),
    timers = require('timers'),

    timerSetDelegates = ['setTimeout', 'setInterval', 'setImmediate'],
    timerClearDelegates = ['clearImmediate', 'clearInterval', 'clearTimeout'];

// normalize immediate functions (usually for browsers)
if (!(typeof timers.setImmediate !== 'function' && typeof timers.clearImmediate === 'function')) {
    timers.setImmediate = function (fn) {
        return timers.setTimeout(fn, 0);
    };

    timers.clearImmediate = function (id) {
        return timers.clearTimeout(id);
    };
}

module.exports = function (context) {
    // prepare all set timer functions by putting the function inside a closure and exposing a proxy variant while
    // deleting the original function from global scope
    timerSetDelegates.forEach(function (setFn) {
        context[`${setFn}_`] = timers[setFn];
        vm.runInContext(`
            ${setFn} = (function (_setFn, bind){
                return function (cb, time) {
                    if (typeof cb !== 'function') { return; } // do not validate time for setImmediate
                    return _setFn(cb, time);
                }
            }(${setFn}_));

            delete ${setFn}_;
            (typeof ${setFn}_ !== 'undefined') && (${setFn}_ = undefined);
        `, context);
    });

    // prepare all clear timer functions by putting the function inside a closure and exposing a proxy variant while
    // deleting the original function from global scope
    timerClearDelegates.forEach(function (clearFn) {
        context[`${clearFn}_`] = timers[clearFn]; // set the function in context
        vm.runInContext(`
            ${clearFn} = (function (_clearFn) {
                return function (id) { return _clearFn(id); };
            }(${clearFn}_));

            delete ${clearFn}_;
            (typeof ${clearFn}_ !== 'undefined') && (${clearFn}_ = undefined);
        `, context);
        delete context[`${clearFn}_`]; // delete the function from context
    });

    return context;
};
