/**
 * @fileoverview This test suite runs tests on the V1 to V2 converter.
 */

var expect = require('chai').expect,
    requireAll = require('require-all'),
    path = require('path'),
    tv4 = require('tv4'),
    _ = require('lodash').noConflict(),
    agent = require('superagent');

/* global describe, it, before */
describe('v1.0.0 ==> v2.1.0', function () {
    var converter = require('../../../lib/converters/v1.0.0/converter-v1-to-v21'),
        reverseConverter = require('../../../lib/converters/v2.1.0/converter-v21-to-v1'),
        schemaUrl = require('../../../lib/constants').SCHEMA_V2_1_0_URL,
        examplesDir = path.join(__dirname, '../../../examples/v1.0.0');

    describe('sample conversions', function () {
        var schema,
            samples = requireAll(examplesDir);

        before(function (done) {
            agent
                .get(schemaUrl)
                .set('Cache-Control', 'no-cache; no-store; must-revalidate')
                .end(function (error, response) {
                    schema = _.isString(response.body) ? JSON.parse(response.body) : response.body;
                    done(error);
                });
        });

        _.forEach(samples, function (sample, sampleName) {
            !_.includes(['echo', 'helpers', 'nestedEntities'], sampleName) &&
            it('must create a valid V2.1.0 collection from ' + sampleName + '.json', function (done) {
                converter.convert(sample, {}, function (err, converted) {
                    var validator = tv4.freshApi(),
                        result;

                    validator.addSchema(schema);

                    // Some of the converter functions assign "undefined" value to some properties,
                    // It is necessary to get rid of them (otherwise schema validation sees an "undefined" and fails).
                    // Converting to and parsing from JSON does this.
                    converted = JSON.parse(JSON.stringify(converted));

                    result = validator.validate(converted, schema);
                    if (!result && process.env.CI) { // eslint-disable-line no-process-env
                        console.error(JSON.stringify(validator.error, null, 4)); // Helps debug on CI
                    }
                    if (validator.missing.length) {
                        console.error(validator.missing);
                        result = false;
                    }
                    expect(err).to.equal(null);
                    expect(result).to.equal(true);
                    done();
                });
            });
        });

        _.forEach(samples, function (sample, sampleName) {
            !_.includes(['echo', 'helpers', 'nestedEntities'], sampleName) &&
            it(`must create a valid V2.1.0 collection from ${sampleName}.json with synchronous API`, function (done) {
                var validator = tv4.freshApi(),
                    result,
                    converted;

                validator.addSchema(schema);
                converted = converter.convert(sample);

                // Some of the converter functions assign "undefined" value to some properties,
                // It is necessary to get rid of them (otherwise schema validation sees an "undefined" and fails).
                // Converting to and parsing from JSON does this.
                converted = JSON.parse(JSON.stringify(converted));

                result = validator.validate(converted, schema);
                if (!result && process.env.CI) { // eslint-disable-line no-process-env
                    console.error(JSON.stringify(validator.error, null, 4)); // Helps debug on CI
                }
                if (validator.missing.length) {
                    console.error(validator.missing);
                    result = false;
                }
                expect(result).to.equal(true);
                done();
            });
        });
    });

    describe('Exceptional cases', function () {
        it('should handle the edge case of "data" vs "rawModeData"', function () {
            var v1 = require('../../../examples/v1.0.0/simplest.json'),
                v21 = converter.convert(v1);

            expect(v21.item[0].request.body.raw).to.eql('something');
        });

        it('should strip out all request and folder ids by default', function () {
            var v1 = require('../../../examples/v1.0.0/simplest.json'),
                v21 = JSON.parse(JSON.stringify(converter.convert(v1)));

            expect(v21.item[0]).to.not.have.property('id');
            expect(v21.item[0]).not.to.have.property('_postman_id');
        });

        it('should retain all request and folder ids if asked to', function () {
            var v1 = require('../../../examples/v1.0.0/simplest.json'),
                v21 = JSON.parse(JSON.stringify(converter.convert(v1, {
                    retainIds: true
                })));

            expect(v21.item[0]).to.have.property('_postman_id');
        });

        it('should mark commented out headers as disabled', function () {
            var v1 = require('../../../examples/v1.0.0/disabledheaders.json'),
                v21 = JSON.parse(JSON.stringify(converter.convert(v1, {
                    retainIds: true
                })));

            expect(v21.item[0].request.header[1].disabled).to.equal(true);
        });

        it('should not set default request body for requests with no data', function () {
            var v1 = require('../../../examples/v1.0.0/emptydata.json'),
                v21 = JSON.parse(JSON.stringify(converter.convert(v1, {
                    retainIds: true
                })));

            expect(_.isEmpty(v21.item[0].request.body)).to.equal(true);
        });

        it('should not set request body for requests with dataMode set to null but rawModeData set', function () {
            var v1 = require('../../../examples/v1.0.0/emptydatamode.json'),
                v2 = JSON.parse(JSON.stringify(converter.convert(v1, {
                    retainIds: true,
                    retainEmptyValues: true
                })));

            expect(v2.item[0].request.body).to.be.null;
        });

        it('should not set request body for requests with dataMode set to null but rawModeData set,' +
            ' retainEmptyValues set to false', function () {
            var v1 = require('../../../examples/v1.0.0/emptydatamode.json'),
                v2 = JSON.parse(JSON.stringify(converter.convert(v1, {
                    retainIds: true
                })));

            expect(v2.item[0].request.body).to.be.undefined;
        });
    });

    describe('Binary File reference', function () {
        it('should be converted to v2 correctly', function () {
            var v1 = require('../../../examples/v1.0.0/binary-upload.json'),
                v2 = JSON.parse(JSON.stringify(converter.convert(v1, {
                    retainIds: true
                })));

            expect(_.get(v2, 'item[0].request.body.file.src')).to.equal('sample.txt');
        });
    });

    describe('Malformed V1 collections', function () {
        var malformedJson = require(path.join(examplesDir, 'malformed.json'));

        it('should remove duplicate / non existent folder/request ids', function (done) {
            var converted = JSON.parse(JSON.stringify(converter.convert(malformedJson))),
                reverted = JSON.parse(JSON.stringify(reverseConverter.convert(converted)));

            expect(reverted.order).to.have.length(1);
            expect(reverted.folders_order).to.have.length(2);

            expect(reverted.folders[1].order).to.have.length(2); // F5
            expect(reverted.folders[1].folders_order).to.have.length(4); // F5

            expect(reverted.folders[3].order).to.have.length(0); // F4
            expect(reverted.folders[4].order).to.have.length(0); // F5.F1
            done();
        });
    });
});
