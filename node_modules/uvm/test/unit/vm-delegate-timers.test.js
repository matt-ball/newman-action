(typeof window === 'undefined' ? describe : describe.skip)('node vm timer delegation', function () {
    var vm = require('vm'),
        timers = require('timers'),
        delegateTimers = require('../../lib/uvm/vm-delegate-timers');

    it('should work', function () {
        var context = vm.createContext({});
        expect(function () {
            delegateTimers(context);
        }).to.not.throw();
    });

    describe('function', function () {
        var context;

        beforeEach(function () {
            context = vm.createContext({
                expect: expect,
                timers: {
                    setTimeout: timers.setTimeout,
                    setInterval: timers.setInterval,
                    setImmediate: timers.setImmediate,
                    clearTimeout: timers.clearTimeout,
                    clearInterval: timers.clearInterval,
                    clearImmediate: timers.clearImmediate
                }
            });

            delegateTimers(context);
        });

        afterEach(function () {
            context = null;
        });

        describe('setTimeout', function () {
            it('should be defined', function () {
                vm.runInContext(`
                    expect(setTimeout).to.be.a('function').that.not.equal(timers.setTimeout);
                `, context);
            });

            it('should be able to set a timeout of 100ms', function (done) {
                var startTime = Date.now();

                context.done = function () {
                    expect(Date.now() - startTime).to.be.above(95);
                    done();
                };
                vm.runInContext(`
                    setTimeout(done, 100);
                `, context);
            });
        });

        describe('clearTimeout', function () {
            it('should be defined', function () {
                vm.runInContext(`
                    expect(clearTimeout).to.be.a('function').that.not.equal(timers.clearTimeout);
                `, context);
            });

            it('should be able to clear a timeout', function (done) {
                var startTime = Date.now();

                context.done = function () {
                    expect(Date.now() - startTime).to.be.above(95);
                    done();
                };
                vm.runInContext(`
                    // set two timeouts and clear the earlier one and expect
                    // only one timeout to go through
                    setTimeout(done, 100); // this will go
                    var toClear = setTimeout(done, 50); // this will be cleared
                    clearTimeout(toClear);
                `, context);
            });
        });

        describe('setInterval and clear interval', function () {
            it('should define setter', function () {
                vm.runInContext(`
                    expect(setInterval).to.be.a('function').that.not.equal(timers.setInterval);
                `, context);
            });

            it('should define cleaner', function () {
                vm.runInContext(`
                    expect(clearInterval).to.be.a('function').that.not.equal(timers.clearInterval);
                `, context);
            });

            it('should be able to set and clear intervals', function (done) {
                var intervals = context.intervals = [];

                context.compute = function () {
                    expect(intervals).to.have.property('length', 2);
                    expect(intervals[1] - intervals[0]).to.be.within(20, 45);
                    done();
                };

                vm.runInContext(`
                    var toClear = setInterval(function () {
                        intervals.push(Date.now()); // add interval points

                        // post two execution, clear the interval and wait for a while to trigger compute
                        // if clearing did not work, the delay will cause more than two items to be added
                        if (intervals.length === 2) {
                            clearInterval(toClear);
                            setTimeout(compute, 50);
                        };
                    }, 25);
                `, context);
            });
        });

        describe('setImmediate', function () {
            it('should be defined', function () {
                vm.runInContext(`
                    expect(setImmediate).to.be.a('function').that.not.equal(timers.setImmediate);
                `, context);
            });

            it('should execute a function immediately', function (done) {
                context.done = function () { done(); };
                vm.runInContext(`
                    setImmediate(done);
                `, context);
            });
        });

        describe('clearImmediate', function () {
            it('should be defined', function () {
                vm.runInContext(`
                    expect(clearImmediate).to.be.a('function').that.not.equal(timers.clearImmediate);
                `, context);
            });

            it('should be able to revoke immediate queue', function (done) {
                context.done = function () { done(); };

                context.redone = function () {
                    var _done = done; // ensure done is called once
                    done = function () {}; // eslint-disable-line no-empty-function
                    _done(new Error('unable to clear immediately queued function'));
                };

                vm.runInContext(`
                    var toClear = setImmediate(redone);
                    setImmediate(done);
                    clearImmediate(toClear);
                `, context);
            });
        });
    });

    it('should not leave the original timer function exposed in global (security)', function (done) {
        var context = delegateTimers(vm.createContext({ expect: expect }));

        context.done = function (err, res) {
            expect(err).to.be.null;
            expect(res).to.be.an('object');
            expect(res.typeOf).to.include.keys({
                setTimeout_: 'undefined',
                setInterval_: 'undefined',
                setImmediate_: 'undefined',
                clearTimeout_: 'undefined',
                clearInterval_: 'undefined',
                clearImmediate_: 'undefined'
            });
            done();
        };

        vm.runInContext(`
            done(null, {
                typeOf: {
                    setTimeout_: typeof setTimeout_,
                    setInterval_: typeof setInterval_,
                    setImmediate_: typeof setImmediate_,
                    clearTimeout_: typeof clearTimeout_,
                    clearInterval_: typeof clearInterval_,
                    clearImmediate_: typeof clearImmediate_,
                }
            });
        `, context);
    });

    it('should not allow access to original context from setter (security)', function (done) {
        var context = delegateTimers(vm.createContext({ expect: expect }));

        context.done = function () {
            expect(Function).to.not.have.property('setFromVM');
            expect(Object).to.not.have.property('setFromVM');
            done();
        };

        vm.runInContext(`
            setImmediate(function () {
                // set something in function constructor (do not expect it to leak)
                arguments.callee.constructor.setFromVM = 'blah';
                done();
            });
        `, context);
    });

    it('should not allow access from setter returned objects (security)', function (done) {
        var context = delegateTimers(vm.createContext({ expect: expect }));

        context.done = function () {
            expect(Object).to.not.have.property('setFromVM');
            expect(Function).to.not.have.property('setFromVM');
            done();
        };

        vm.runInContext(`
            var irq;
            irq = setImmediate(function () {
                irq.constructor.setFromVM = true;
                done(irq);
            });
        `, context);
    });
});
