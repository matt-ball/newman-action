((typeof window === 'undefined') ? describe : describe.skip)('uvm timeout option', function () {
    var uvm = require('../../lib');

    // options.bootTimeout is not implemented in browser sandbox. Reason is that as long as we use iFrame, there is no
    // way to interrupt an infinite loop.
    it('must exit if bootCode has infinite loop', function (done) {
        uvm.spawn({
            bootTimeout: 100,
            bootCode: 'while(1) {}'
        }, function (err, context) {
            expect(err).to.be.an('error').that.has.property('message', 'Script execution timed out.');
            context && context.on('error', done);
            done();
        });
    });

    // options.dispatchTimeout is not implemented in browser sandbox. Reason is that as long as we use iFrame, there is
    // no way to interrupt an infinite loop.
    it('must exit if dispatch is has infinite loop', function (done) {
        uvm.spawn({
            dispatchTimeout: 100,
            bootCode: `
                bridge.on('loopback', function (data) {
                    while (1) {}
                    bridge.dispatch('loopback', data);
                });
            `
        }, function (err, context) {
            expect(err).to.be.null;

            context.on('error', function (err) {
                expect(err).to.be.an('error').that.has.property('message', 'Script execution timed out.');
                done();
            });

            context.dispatch('loopback', 'this will not return');
        });
    });
});
