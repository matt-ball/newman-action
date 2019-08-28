(typeof window !== 'undefined' ? describe : describe.skip)('custom iframe in browser', function () {
    var uvm = require('../../lib'),
        firmware = require('../../firmware/sandbox-base'),
        iframe;

    beforeEach(function (done) {
        iframe = document.createElement('iframe');
        iframe.setAttribute('src', 'data:text/html;base64, ' +
            btoa(unescape(encodeURIComponent(firmware))));
        iframe.addEventListener('load', function () {
            done();
        });
        document.body.appendChild(iframe);
    });

    it('should load and dispatch messages', function (done) {
        uvm.spawn({
            _sandbox: iframe,
            bootCode: `
                bridge.on('loopback', function (data) {
                    bridge.dispatch('loopback', data);
                });
            `
        }, function (err, context) {
            if (err) { return done(err); }

            context.on('loopback', function (data) {
                expect(data).to.equal('this should return');
                done();
            });
            context.dispatch('loopback', 'this should return');
        });

    });

    afterEach(function () {
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    });
});
