/**
 * @fileoverview This test suite runs tests on the V1 to V2 converter.
 */

var _ = require('lodash'),
    expect = require('chai').expect,
    util = require('../../lib/util');

/* global describe, it */
describe('util', function () {
    describe('handleVars', function () {
        it('should correctly fall back to defaults where applicable', function () {
            expect(util.handleVars({}, {
                retainIds: true,
                fallback: { values: [{ value: {}, disabled: 1 }] }
            })[0]).to.deep.include({
                type: 'any',
                disabled: true
            });
        });
    });

    describe('sanitizeAuthArray', function () {
        it('should correctly fall back to custom types when applicable', function () {
            expect(util.sanitizeAuthArray({
                auth: {
                    type: 'custom',
                    custom: [{ key: 'foo', value: {} }]
                }
            })).to.eql({
                type: 'custom',
                custom: [{ key: 'foo', value: {}, type: 'any' }]
            });
        });
    });

    describe('notLegacy', function () {
        it('should bail out for falsy entities', function () {
            expect(util.notLegacy).not.to.throw();
            expect(util.notLegacy()).to.eql(undefined);
        });

        it('should should return true for unknown cases', function () {
            expect(util.notLegacy).not.to.throw();
            expect(util.notLegacy({}, 'random')).to.eql(true);
        });
    });

    describe('auth mappers', function () {
        describe('legacy', function () {
            _.forEach(util.authMappersFromLegacy, function (func, auth) {
                it(`should handle falsy input correctly for ${auth}`, function () {
                    expect(func).to.not.throw();
                    expect(func()).to.equal(undefined);
                    expect(func({})).to.be.ok;
                });
            });
        });

        describe('contemporary', function () {
            _.forEach(util.authMappersFromCurrent, function (func, auth) {
                it(`should handle falsy input correctly for ${auth}`, function () {
                    expect(func).to.not.throw();
                    expect(func()).to.equal(undefined);
                    expect(func({})).to.be.ok;
                });
            });
        });
    });

    describe('addProtocolProfileBehavior', function () {
        it('should add protocolProfileBehavior property to the destination object', function () {
            var source = {
                    foo: 'bar',
                    protocolProfileBehavior: {
                        disableBodyPruning: true
                    }
                },
                destination = {};

            expect(util.addProtocolProfileBehavior(source, destination)).to.be.true;
            expect(destination).to.eql({
                protocolProfileBehavior: {
                    disableBodyPruning: true
                }
            });
        });

        it('should not add protocolProfileBehavior property for invalid values', function () {
            var source = {
                    protocolProfileBehavior: 'random'
                },
                destination = {};

            expect(util.addProtocolProfileBehavior(source, destination)).to.be.false;
            expect(destination).to.eql({});
        });

        it('should handle missing destination object correctly', function () {
            expect(util.addProtocolProfileBehavior({
                protocolProfileBehavior: {
                    disableBodyPruning: true
                }
            })).to.be.true;

            expect(util.addProtocolProfileBehavior({
                protocolProfileBehavior: 'random'
            })).to.be.false;

            expect(util.addProtocolProfileBehavior({
                protocolProfileBehavior: null
            })).to.be.false;

            expect(util.addProtocolProfileBehavior({
                foo: 'bar'
            })).to.be.false;

            expect(util.addProtocolProfileBehavior('random')).to.be.false;

            expect(util.addProtocolProfileBehavior()).to.be.false;
        });
    });
});
