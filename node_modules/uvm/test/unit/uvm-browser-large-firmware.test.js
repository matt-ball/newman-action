(typeof window !== 'undefined' ? describe : describe.skip)('custom iframe in browser', function () {
    var _ = require('lodash'),
        uvm = require('../../lib'),

        /**
         * Creates a large string with a given character length.
         *
         * @param {Number} size
         *
         * @returns {String}
         */
        getLargeString = function (size) {
            return _.pad('', size, 'a');
        },
        getFirmware = function (code) {
            return `
            <!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
            <meta charset="UTF-8">
            <script type="text/javascript">
            ${code}
            </script>
            <script type="text/javascript">
            (function (win) {
                var init = function (e) {
                    win.removeEventListener('message', init);
                    // eslint-disable-next-line no-eval
                    (e && e.data && (typeof e.data.__init_uvm === 'string')) && eval(e.data.__init_uvm);
                };
                win.addEventListener('message', init);
            }(window));
            </script>
            </head></html>`;
        },
        iframe;

    beforeEach(function (done) {
        var fakeBundleSize = 5 * 1024 * 1024, // 10mb (5 million characters with 2 bytes each)
            largeJSStatement = `var x = '${getLargeString(fakeBundleSize)}';`;

        iframe = document.createElement('iframe');
        iframe.setAttribute('src', 'data:text/html;base64, ' +
            btoa(unescape(encodeURIComponent(getFirmware(largeJSStatement)))));
        iframe.setAttribute('srcdoc', unescape(encodeURIComponent(getFirmware(largeJSStatement))));
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
