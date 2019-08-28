var expect = require('chai').expect,

    converter = require('../../lib/converters');

describe('converter', function () {
    it('should bail out with an error for invalid collection conversion paths', function (done) {
        converter.convert({}, { inputVersion: '1.0.0', outputVersion: '1.0.0' }, function (err) {
            expect(err).to.be.an.instanceOf(Error);
            done();
        });
    });

    it('should bail out with an error for invalid request conversion paths', function (done) {
        converter.convertSingle({}, { inputVersion: '1.0.0', outputVersion: '1.0.0' }, function (err) {
            expect(err).to.be.an.instanceOf(Error);
            done();
        });
    });

    it('should bail out with an error for invalid response conversion paths', function (done) {
        converter.convertResponse({}, { inputVersion: '1.0.0', outputVersion: '1.0.0' }, function (err) {
            expect(err).to.be.an.instanceOf(Error);
            done();
        });
    });
});
