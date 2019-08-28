var expect = require('chai').expect,

    transformer = require('../..');

describe('module', function () {
    describe('converter', function () {
        describe('convert', function () {
            it('should bail out with an error for falsy outputVersion values', function (done) {
                transformer.convert({}, { outputVersion: false }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for invalid semver outputVersion values', function (done) {
                transformer.convert({}, { outputVersion: 'random' }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for falsy inputVersion values', function (done) {
                transformer.convert({}, { outputVersion: '1.0.0', inputVersion: false }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for invalid semver inputVersion values', function (done) {
                transformer.convert({}, { outputVersion: '1.0.0', inputVersion: 'random' }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });
        });

        describe('convertSingle', function () {
            it('should bail out with an error for falsy outputVersion values', function (done) {
                transformer.convertSingle({}, { outputVersion: false }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for invalid semver outputVersion values', function (done) {
                transformer.convertSingle({}, { outputVersion: 'random' }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for falsy inputVersion values', function (done) {
                transformer.convertSingle({}, { outputVersion: '1.0.0', inputVersion: false }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for invalid semver inputVersion values', function (done) {
                transformer.convertSingle({}, { outputVersion: '1.0.0', inputVersion: 'random' }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });
        });

        describe('convertResponse', function () {
            it('should bail out with an error for falsy outputVersion values', function (done) {
                transformer.convertResponse({}, { outputVersion: false }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for invalid semver outputVersion values', function (done) {
                transformer.convertResponse({}, { outputVersion: 'random' }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for falsy inputVersion values', function (done) {
                transformer.convertResponse({}, { outputVersion: '1.0.0', inputVersion: false }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for invalid semver inputVersion values', function (done) {
                transformer.convertResponse({}, { outputVersion: '1.0.0', inputVersion: 'random' }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });
        });
    });

    describe('normalizer', function () {
        describe('normalize', function () {
            it('should bail out with an error for falsy normalizeVersion values', function (done) {
                transformer.normalize({}, { normalizeVersion: false }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for invalid semver normalizeVersion values', function (done) {
                transformer.normalize({}, { normalizeVersion: 'random' }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for non-handled normalizeVersion values', function (done) {
                transformer.normalize({}, { normalizeVersion: '9999.9999.9999' }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });
        });

        describe('normalizeSingle', function () {
            it('should bail out with an error for falsy normalizeVersion values', function (done) {
                transformer.normalizeSingle({}, { normalizeVersion: false }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for invalid semver normalizeVersion values', function (done) {
                transformer.normalizeSingle({}, { normalizeVersion: 'random' }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for non-handled normalizeVersion values', function (done) {
                transformer.normalizeSingle({}, { normalizeVersion: '9999.9999.9999' }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });
        });

        describe('normalizeResponse', function () {
            it('should bail out with an error for falsy normalizeVersion values', function (done) {
                transformer.normalizeResponse({}, { normalizeVersion: false }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for invalid semver normalizeVersion values', function (done) {
                transformer.normalizeResponse({}, { normalizeVersion: 'random' }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });

            it('should bail out with an error for non-handled normalizeVersion values', function (done) {
                transformer.normalizeResponse({}, { normalizeVersion: '9999.9999.9999' }, function (err) {
                    expect(err).to.be.an.instanceOf(Error);
                    done();
                });
            });
        });
    });

    describe('isV1', function () {
        it('should return true/false for valid/invalid v1 collections', function () {
            expect(transformer.isv1).to.not.throw();
            expect(transformer.isv1()).to.eql(false);
            expect(transformer.isv1({ name: 'Foo!', order: [], requests: [] })).to.eql(true);
        });
    });

    describe('isV2', function () {
        it('should return true/false for valid/invalid v2 collections', function () {
            expect(transformer.isv2).to.not.throw();
            expect(transformer.isv2()).to.eql(false);
            expect(transformer.isv2({
                info: {
                    schema: 'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
                }
            })).to.eql(true);
        });
    });
});
