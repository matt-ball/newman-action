const uvm = require('../..');

describe('secure context', function () {
    it('should not be polluted with the global prototype', function (done) {
        var context = uvm.spawn({
            bootCode: `
                bridge.on('execute', function (data) {
                    bridge.dispatch('execute', {
                        result: (function () {
                            return this.constructor.constructor('return Object.keys(this)')();
                        })()
                    });
                });
            `
        });

        context.on('error', done);
        context.on('execute', function (out) {
            expect(out.result).to.be.an('array').that.does.not.include('process');
            done();
        });

        context.dispatch('execute');
    });
});
