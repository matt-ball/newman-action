var async = require('async'),
    isNode = (typeof window === 'undefined');

describe('uvm', function () {
    var uvm = require('../../lib');

    it('should connect a new context', function (done) {
        uvm.spawn({}, done);
    });

    describe('context', function () {
        it('should have event emitter interface and .dispatch method', function () {
            var context = uvm.spawn();

            expect(context).to.be.ok;
            expect(context).to.have.property('dispatch').that.is.a('function');
            expect(context).to.have.property('emit').that.is.a('function');
            expect(context).to.have.property('on').that.is.a('function');
            expect(context).to.have.property('disconnect').that.is.a('function');
        });

        it('should allow dispatching events to context', function () {
            var context = uvm.spawn();

            context.dispatch();
            context.dispatch('event-name');
            context.dispatch('event-name', 'event-arg');
        });

        it('should allow receiving events in context', function (done) {
            var sourceData = 'test',
                context = uvm.spawn({
                    bootCode: `
                        bridge.on('loopback', function (data) {
                            bridge.dispatch('loopback', data);
                        });
                    `
                });

            context.on('loopback', function (data) {
                expect(data).to.equal('test');
                done();
            });

            context.dispatch('loopback', sourceData);
        });

        (isNode ? it : it.skip)('should pass load error on broken boot code', function (done) {
            uvm.spawn({
                bootCode: `
                    throw new Error('error in bootCode');
                `
            }, function (err) {
                expect(err).to.be.an('error').that.has.property('message', 'error in bootCode');
                done();
            });
        });

        it('should not overflow dispatches when multiple vm is run', function (done) {
            // create two vms
            async.times(2, function (n, next) {
                uvm.spawn({
                    bootCode: `
                        bridge.on('loopback', function (data) {
                            bridge.dispatch('loopback', ${n}, data);
                        });
                    `
                }, next);
            }, function (err, contexts) {
                if (err) { return done(err); }

                contexts[0].on('loopback', function (source, data) {
                    expect(source).to.equal(0);
                    expect(data).to.equal('zero');

                    setTimeout(done, 100); // wait for other events before going done
                });

                contexts[1].on('loopback', function () {
                    expect.fail('second context receiving message overflowed from first');
                });

                contexts[0].dispatch('loopback', 'zero');

            });
        });

        it('should restore dispatcher if it is deleted', function (done) {
            uvm.spawn({
                bootCode: `
                    bridge.on('deleteDispatcher', function () {
                        __uvm_dispatch = null;
                    });

                    bridge.on('loopback', function (data) {
                        bridge.dispatch('loopback', data);
                    });
                `
            }, function (err, context) {
                expect(err).to.not.be.an('object');

                context.on('error', done);
                context.on('loopback', function (data) {
                    expect(data).to.equal('this returns');
                    done();
                });

                context.dispatch('deleteDispatcher');
                context.dispatch('loopback', 'this returns');
            });
        });

        it('should trigger error if dispatched post disconnection', function (done) {
            uvm.spawn({
                bootCode: `
                    bridge.on('loopback', function (data) {
                        bridge.dispatch('loopback', data);
                    });
                `
            }, function (err, context) {
                expect(err).to.not.be.an('object');

                context.on('error', function (err) {
                    expect(err).to.be.an('error').that.has.property('message',
                        'uvm: unable to dispatch "loopback" post disconnection.');
                    done();
                });

                context.on('loopback', function () {
                    throw new Error('loopback callback was unexpected post disconnection');
                });

                context.disconnect();
                context.dispatch('loopback', 'this never returns');
            });
        });
    });
});
