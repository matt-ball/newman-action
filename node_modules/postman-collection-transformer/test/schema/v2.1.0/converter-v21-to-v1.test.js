/**
 * @fileoverview This test suite runs tests on the V2 to V1 converter.
 */

var expect = require('chai').expect,
    requireAll = require('require-all'),
    path = require('path'),
    tv4 = require('tv4'),
    _ = require('lodash').noConflict(),
    agent = require('superagent');

/* global describe, it, before */
describe('v2.1.0 ==> v1.0.0', function () {
    var converter = require('../../../lib/converters/v2.1.0/converter-v21-to-v1'),
        schemaUrl = require('../../../lib/constants').SCHEMA_V1_URL,
        examplesDir = path.join(__dirname, '../../../examples/v2.1.0');

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
            it('must create a valid V1 collection from ' + sampleName + '.json', function (done) {
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
                    expect(result).to.equal(true);
                    expect(err).to.equal(null);
                    done();
                });
            });
        });

        _.forEach(samples, function (sample, sampleName) {
            it('must create a valid V1 collection from ' + sampleName + '.json with synchronous API', function (done) {
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
        describe('Binary File reference', function () {
            it('should be converted to v1 correctly', function () {
                var v21 = require('../../../examples/v2.1.0/binary-upload.json'),
                    v1 = JSON.parse(JSON.stringify(converter.convert(v21)));

                expect(_.get(v1, 'requests[0].dataMode')).to.equal('binary');
                expect(_.get(v1, 'requests[0].rawModeData')).to.equal('sample.txt');
                expect(_.isEmpty(_.get(v1, 'requests[0].data'))).to.equal(true);
            });
        });
    });
});
