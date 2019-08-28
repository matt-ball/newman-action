var vm = require('vm'),
    Flatted = require('flatted');

describe('bridge-client', function () {
    var bridgeClient = require('../../lib/uvm/bridge-client');

    it('should be a function', function () {
        expect(bridgeClient).to.not.throw();
    });

    it('should return a client code as result', function () {
        expect(bridgeClient()).to.be.a('string');
    });

    it('should return a client with bootstrap in it', function () {
        var bootCode = 'console.log("hi mocha");';
        expect(bridgeClient(bootCode)).to.be.a('string').and.contain(bootCode);
    });

    it('should be a valid JS code (syntax-wise)', function () {
        expect(function () {
            bridgeClient();
        }, 'Should be a valid JS code').to.not.throw();
    });

    describe('emitter', function () {
        it('should expose global', function () {
            var context = vm.createContext({
                expect: expect,
                __uvm_emit: function () {
                    throw new Error('Nothing should be emitted');
                }
            });
            vm.runInContext(bridgeClient(), context);

            vm.runInContext(`
                expect(bridge).to.be.an('object');
            `, context);
        });

        it('should forward emits to __uvm_emit function', function (done) {
            var context = vm.createContext({
                __uvm_emit: function (message) {
                    expect(arguments, 'Should have 1 argument').to.have.lengthOf(1);
                    expect(message).to.be.a('string').that.eql(Flatted.stringify(['event-name', 'event-arg']));
                    done();
                }
            });
            vm.runInContext(bridgeClient(), context);

            vm.runInContext(`
                bridge.dispatch('event-name', 'event-arg');
            `, context);
        });

        it('should forward dispatch to __uvm_dispatch function', function (done) {
            var context = vm.createContext({
                __uvm_emit: function (message) {
                    expect(arguments, 'Should have 1 argument').to.have.lengthOf(1);
                    expect(message).to.be.a('string').that.eql(Flatted.stringify(['loopback-return', 'event-arg']));
                    done();
                }
            });

            vm.runInContext(bridgeClient(), context);
            vm.runInContext(`
                bridge.on('loopback', function (data) {
                    bridge.dispatch('loopback-return', data);
                });
            `, context);

            expect(context.__uvm_dispatch).to.be.a('function');
            expect(function () {
                context.__uvm_dispatch(Flatted.stringify(['loopback', 'event-arg']));
            }).to.not.throw();
        });

        it('should register event listeners', function () {
            var context = vm.createContext({
                __uvm_emit: function () {
                    throw new Error('Nothing should be emitted');
                },
                expect: expect
            });
            vm.runInContext(bridgeClient(), context);

            vm.runInContext(`
                expect(bridge.on).to.be.a('function');
                expect(function () {
                    bridge.on.bind(bridge)('loopback', function () {});
                }).to.not.throw();
            `, context);
        });

        it('should trigger registered event listeners', function (done) {
            var context = vm.createContext({
                expect: expect,
                __uvm_emit: function () {
                    throw new Error('Nothing should be emitted');
                },
                done: function () {
                    expect(arguments, 'Should have 0 arguments').to.have.lengthOf(0);
                    done();
                }
            });
            vm.runInContext(bridgeClient(), context);

            vm.runInContext(`
                bridge.on('loopback', done);
                bridge.emit('loopback');
            `, context);
        });

        it('should trigger multiple registered event listeners in order', function (done) {
            var context = vm.createContext({
                expect: expect,
                __uvm_emit: function () {
                    throw new Error('Nothing should be emitted');
                },
                done: function () {
                    expect(arguments, 'Should have 0 arguments').to.have.lengthOf(0);
                    done();
                }
            });
            vm.runInContext(bridgeClient(), context);

            vm.runInContext(`
                var one = false,
                    two = false;
                bridge.on('loopback', function () {
                    expect(one).to.be.false;
                    expect(two).to.be.false;

                    one = true;
                });

                bridge.on('loopback', function () {
                    expect(one).to.be.true;
                    expect(two).to.be.false;

                    two = true;
                });

                bridge.on('loopback', function () {
                    expect(one).to.be.true;
                    expect(two).to.be.true;

                    done();
                });

                bridge.emit('loopback');
            `, context);
        });

        it('should be able to remove a particular registered event', function (done) {
            var context = vm.createContext({
                expect: expect,
                __uvm_emit: function () {
                    throw new Error('Nothing should be emitted');
                },
                done: function () {
                    expect(arguments, 'Should have 0 arguments').to.have.lengthOf(0);
                    done();
                }
            });

            vm.runInContext(bridgeClient(), context);

            vm.runInContext(`
                var one = false,
                    two = false,

                    updateTwo;

                bridge.on('loopback', function () {
                    expect(one).to.be.false;
                    expect(two).to.be.false;

                    one = true;
                });

                updateTwo = function () {
                    expect(one).to.be.true;
                    expect(two).to.be.false;
                    two = true;
                };
                bridge.on('loopback', updateTwo);

                bridge.on('loopback', function () {
                    expect(one).to.be.true;
                    expect(two).to.be.false;

                    done();
                });

                bridge.off('loopback', updateTwo); // remove one event
                bridge.emit('loopback');
            `, context);
        });

        it('should be able to remove all events of a name', function (done) {
            var context = vm.createContext({
                expect: expect,
                assertion: {
                    one: 0,
                    two: 0
                },
                __uvm_emit: function () {
                    throw new Error('Nothing should be emitted');
                },
                done: function (err) {
                    expect(err).to.be.undefined;

                    expect(context).to.have.property('assertion');
                    expect(context.assertion).to.eql({
                        one: 1,
                        two: 0
                    });
                    done();
                }
            });

            vm.runInContext(bridgeClient(), context);

            // run a code that listens to same event
            // and makes changes to a global object`
            vm.runInContext(`
                /* global assertion, done */

                bridge.on('loopback', function () {
                    expect(assertion).to.eql({
                        one: 0,
                        two: 0
                    });

                    assertion.one += 1;
                });

                bridge.emit('loopback');

                bridge.on('loopback', function () {
                    expect(assertion).to.eql({
                        one: 0,
                        two: 0
                    });

                    assertion.one += 1;
                    assertion.two += 1;
                    done('error');
                });

                bridge.off('loopback'); // remove all events
                bridge.emit('loopback');
                done();
            `, context);
        });

        it('should not leave behind any additional globals except `bridge` related', function (done) {
            var context = vm.createContext({
                __uvm_emit: function () {
                    throw new Error('Nothing should be emitted');
                }
            });
            vm.runInContext(bridgeClient(), context);

            expect(Object.keys(context).sort()).to.eql([
                '__uvm_emit', '__uvm_dispatch', 'bridge'
            ].sort());

            done();
        });

        it('should work after the transport functions are removed from context externally', function (done) {
            var context = vm.createContext({
                expect: expect,
                __uvm_emit: function (args) {
                    expect(args).to.equal(Flatted.stringify(['test', 'context closures are working']));
                    done();
                }
            });

            vm.runInContext(bridgeClient(), context);
            vm.runInContext(`
                bridge.on('loopback', function (data) {
                    bridge.dispatch('loopback-return', data);
                });
            `, context);

            expect(Object.keys(context).sort()).to.eql([
                'expect', '__uvm_emit', '__uvm_dispatch', 'bridge'
            ].sort());

            // deleting stuff / setting to null
            vm.runInContext(`
                __uvm_emit = null;
                __uvm_dispatch = null;
            `, context);

            // check they are deleted
            vm.runInContext(`
                expect(typeof __uvm_dispatch).to.be.a('string');
                expect(__uvm_dispatch).to.be.null;
                expect(typeof __uvm_emit).to.be.a('string');
                expect(__uvm_emit).to.be.null;
            `, context);

            // dispatch an event now that the root variables are deleted
            vm.runInContext(`
                bridge.dispatch('test', 'context closures are working');
            `, context);
        });
    });

});
