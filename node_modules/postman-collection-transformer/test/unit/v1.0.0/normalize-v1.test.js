var _ = require('lodash'),
    expect = require('chai').expect,
    transformer = require('../../../index');

describe('v1.0.0 normalization', function () {
    var options = { normalizeVersion: '1.0.0', retainIds: true };

    describe('api', function () {
        it('should have a .normalizeSingle() function', function () {
            expect(transformer.normalizeSingle).to.be.a('function').with.length(3);
        });

        it('should have a .normalizeResponse() function', function () {
            expect(transformer.normalizeResponse).to.be.a('function').with.length(3);
        });

        it('should have a .normalize() function', function () {
            expect(transformer.normalize).to.be.a('function').with.length(3);
        });
    });

    describe('transformer', function () {
        it('should work correctly for .normalizeSingle calls', function (done) {
            var fixture = require('../fixtures/normalizer/v1/single-request');

            transformer.normalizeSingle(fixture.raw, options, function (err, normalized) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                normalized = JSON.parse(JSON.stringify(normalized));

                expect(normalized).to.eql(fixture.normalized);
                done();
            });
        });

        it('should handle fallback values correctly for .normalizeSingle calls', function (done) {
            transformer.normalizeSingle({
                id: '012500fa-4ee5-49fe-bd3d-a473366f1dcd',
                collectionId: 'C1',
                currentHelper: false,
                variables: [{ id: 'v1', key: 'foo', value: 'bar' }],
                events: [{ listen: 'random', script: { exec: [] } }]
            }, options, function (err, normalized) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                normalized = JSON.parse(JSON.stringify(normalized));

                expect(normalized).to.eql({
                    id: '012500fa-4ee5-49fe-bd3d-a473366f1dcd',
                    collectionId: 'C1',
                    auth: null,
                    currentHelper: null,
                    helperAttributes: null,
                    tests: null,
                    preRequestScript: null,
                    variables: [{ id: 'v1', key: 'foo', value: 'bar' }],
                    pathVariableData: [{ id: 'v1', key: 'foo', value: 'bar' }],
                    events: [{ listen: 'random', script: { exec: [], type: 'text/javascript' } }]
                });
                done();
            });
        });

        it('should work correctly for .normalizeSingle calls without a callback', function () {
            var fixture = require('../fixtures/normalizer/v1/single-request');

            expect(JSON.parse(JSON.stringify(transformer.normalizeSingle(fixture.raw, options))))
                .to.eql(fixture.normalized);
        });

        it('should work correctly for .normalizeResponse calls', function (done) {
            var fixture = require('../fixtures/normalizer/v1/single-response');

            transformer.normalizeResponse(fixture.raw, options, function (err, normalized) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                normalized = JSON.parse(JSON.stringify(normalized));

                expect(normalized).to.eql(fixture.normalized);
                done();
            });
        });

        it('should work correctly for .normalizeResponse calls without a callback', function () {
            var fixture = require('../fixtures/normalizer/v1/single-response');

            expect(JSON.parse(JSON.stringify(transformer.normalizeResponse(fixture.raw, options))))
                .to.eql(fixture.normalized);
        });

        it('should work correctly for .normalize calls', function (done) {
            var fixture = require('../fixtures/normalizer/v1/sample-collection');

            transformer.normalize(fixture.raw, options, function (err, normalized) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                normalized = JSON.parse(JSON.stringify(normalized));

                expect(normalized).to.eql(fixture.normalized);
                done();
            });
        });

        it('should work correctly for nested folders', function (done) {
            transformer.normalize({
                id: 'C1',
                folders: [{
                    id: 'F1',
                    events: [{
                        script: { exec: 'console.log("Legacy test script");' }
                    }],
                    variables: [{ id: '78650897-72b7-4a59-8f23-3d4970e2afdc', key: 'foo', value: 'bar' }],
                    folders_order: ['F1.F2']
                }, {
                    id: 'F1.F2'
                }],
                folders_order: ['F1']
            }, options, function (err, normalized) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                normalized = JSON.parse(JSON.stringify(normalized));

                expect(normalized).to.eql({
                    id: 'C1',
                    folders: [{
                        id: 'F1',
                        events: [{
                            listen: 'test',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Legacy test script");']
                            }
                        }],
                        variables: [{
                            id: '78650897-72b7-4a59-8f23-3d4970e2afdc', key: 'foo', value: 'bar'
                        }],
                        folders_order: ['F1.F2']
                    }, {
                        id: 'F1.F2'
                    }],
                    folders_order: ['F1']
                });
                done();
            });
        });

        it('should work correctly for .normalize calls without a callback', function () {
            var fixture = require('../fixtures/normalizer/v1/sample-collection');

            expect(JSON.parse(JSON.stringify(transformer.normalize(fixture.raw, options)))).to.eql(fixture.normalized);
        });
    });

    describe('special cases', function () {
        describe('auth', function () {
            it('should handle no-auth correctly with legacy properties', function (done) {
                // eslint-disable-next-line max-len
                transformer.normalizeSingle({ id: 'b56246e9-5012-49f1-8f9d-f3338ac29cbd', currentHelper: 'normal' }, options, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(result).to.eql({
                        id: 'b56246e9-5012-49f1-8f9d-f3338ac29cbd',
                        currentHelper: null,
                        helperAttributes: null,
                        auth: null
                    });
                    done();
                });
            });

            it('should handle currentHelper: null correctly', function (done) {
                transformer.normalizeSingle({
                    id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                    currentHelper: null
                }, options, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(result).to.eql({
                        id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                        auth: null,
                        currentHelper: null,
                        helperAttributes: null
                    });
                    done();
                });
            });

            it('should handle currentHelper: normal correctly', function (done) {
                transformer.normalizeSingle({
                    id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                    currentHelper: 'normal'
                }, options, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(result).to.eql({
                        id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                        auth: null,
                        currentHelper: null,
                        helperAttributes: null
                    });
                    done();
                });
            });

            it('should handle auth: null correctly', function (done) {
                transformer.normalizeSingle({
                    id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                    auth: null
                }, options, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(result).to.eql({
                        id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                        auth: null,
                        currentHelper: null,
                        helperAttributes: null
                    });
                    done();
                });
            });

            describe('empty currentHelper and helperAttributes', function () {
                describe('currentHelper: null', function () {
                    describe('noDefaults: false', function () {
                        it('should handle both: auth and currentHelper set to null correctly', function (done) {
                            transformer.normalizeSingle({
                                id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                                auth: null,
                                currentHelper: null
                            }, options, function (err, result) {
                                expect(err).to.not.be.ok;

                                expect(result).to.eql({
                                    id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                                    auth: null,
                                    currentHelper: null,
                                    helperAttributes: null
                                });
                                done();
                            });
                        });

                        it('should handle auth (noauth) and currentHelper(null) correctly', function (done) {
                            transformer.normalizeSingle({
                                id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                                auth: { type: 'noauth' },
                                currentHelper: null
                            }, options, function (err, result) {
                                expect(err).to.not.be.ok;

                                expect(result).to.eql({
                                    id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                                    auth: null,
                                    currentHelper: null,
                                    helperAttributes: null
                                });
                                done();
                            });
                        });
                    });

                    describe('noDefaults: true', function () {
                        var options = { normalizeVersion: '1.0.0', noDefaults: true };

                        it('should handle both: auth and currentHelper set to null correctly', function (done) {
                            transformer.normalizeSingle({
                                auth: null,
                                currentHelper: null
                            }, options, function (err, result) {
                                expect(err).to.not.be.ok;

                                expect(result).to.eql({
                                    auth: null,
                                    currentHelper: null,
                                    helperAttributes: null
                                });
                                done();
                            });
                        });

                        it('should handle auth (noauth) and currentHelper(null) correctly', function (done) {
                            transformer.normalizeSingle({
                                auth: { type: 'noauth' },
                                currentHelper: null
                            }, options, function (err, result) {
                                expect(err).to.not.be.ok;

                                expect(result).to.eql({
                                    auth: null,
                                    currentHelper: null,
                                    helperAttributes: null
                                });
                                done();
                            });
                        });
                    });
                });

                describe('currentHelper: normal', function () {
                    describe('noDefaults: false', function () {
                        it('should handle auth (null) and currentHelper(normal) correctly', function (done) {
                            transformer.normalizeSingle({
                                id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                                auth: null,
                                currentHelper: null
                            }, options, function (err, result) {
                                expect(err).to.not.be.ok;

                                expect(result).to.eql({
                                    id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                                    auth: null,
                                    currentHelper: null,
                                    helperAttributes: null
                                });
                                done();
                            });
                        });

                        it('should handle auth (noauth) and currentHelper(normal) correctly', function (done) {
                            transformer.normalizeSingle({
                                id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                                auth: { type: 'noauth' },
                                currentHelper: null
                            }, options, function (err, result) {
                                expect(err).to.not.be.ok;

                                expect(result).to.eql({
                                    id: '27c8c9ac-dd90-4234-b83a-b199d3a0e945',
                                    auth: null,
                                    currentHelper: null,
                                    helperAttributes: null
                                });
                                done();
                            });
                        });
                    });

                    describe('noDefaults: true', function () {
                        var options = { normalizeVersion: '1.0.0', noDefaults: true };

                        it('should handle auth (null) and currentHelper(normal) correctly', function (done) {
                            transformer.normalizeSingle({
                                auth: null,
                                currentHelper: null
                            }, options, function (err, result) {
                                expect(err).to.not.be.ok;

                                expect(result).to.eql({
                                    auth: null,
                                    currentHelper: null,
                                    helperAttributes: null
                                });
                                done();
                            });
                        });

                        it('should handle auth (noauth) and currentHelper(normal) correctly', function (done) {
                            transformer.normalizeSingle({
                                auth: { type: 'noauth' },
                                currentHelper: null
                            }, options, function (err, result) {
                                expect(err).to.not.be.ok;

                                expect(result).to.eql({
                                    auth: null,
                                    currentHelper: null,
                                    helperAttributes: null
                                });
                                done();
                            });
                        });
                    });
                });
            });

            it('should handle legacy no-auth correctly with noDefaults set to true', function (done) {
                transformer.normalizeSingle({ currentHelper: 'normal' }, {
                    noDefaults: true,
                    normalizeVersion: '1.0.0'
                }, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(result).to.eql({
                        auth: null,
                        currentHelper: null,
                        helperAttributes: null
                    });
                    done();
                });
            });

            it('should recreate legacy properties for noauth correctly', function (done) {
                // eslint-disable-next-line max-len
                transformer.normalizeSingle({ id: 'b56246e9-5012-49f1-8f9d-f3338ac29cbd', auth: { type: 'noauth' } }, options, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(result).to.eql({
                        id: 'b56246e9-5012-49f1-8f9d-f3338ac29cbd',
                        currentHelper: null,
                        helperAttributes: null,
                        auth: { type: 'noauth' }
                    });
                    done();
                });
            });

            it('should recreate legacy properties for noauth correctly with noDefaults set to true', function (done) {
                transformer.normalizeSingle({ auth: { type: 'noauth' } }, {
                    noDefaults: true,
                    normalizeVersion: '1.0.0'
                }, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(result).to.eql({
                        currentHelper: null,
                        helperAttributes: null,
                        auth: { type: 'noauth' }
                    });
                    done();
                });
            });

            it('should override auth with legacy properties if both are present', function (done) {
                var source = {
                    id: 'bd79f978-d862-49f1-9cea-7c71a762cc12',
                    currentHelper: 'basicAuth',
                    helperAttributes: {
                        id: 'basic',
                        username: 'username',
                        password: 'password'
                    },
                    auth: {
                        type: 'bearer',
                        bearer: [{ key: 'token', value: 'randomSecretString', type: 'string' }]
                    }
                };

                transformer.normalizeSingle(source, options, function (err, normalized) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    normalized = JSON.parse(JSON.stringify(normalized));

                    expect(normalized).to.eql({
                        id: 'bd79f978-d862-49f1-9cea-7c71a762cc12',
                        currentHelper: 'basicAuth',
                        helperAttributes: {
                            id: 'basic',
                            username: 'username',
                            password: 'password'
                        },
                        auth: {
                            type: 'basic',
                            basic: [
                                { key: 'username', value: 'username', type: 'string' },
                                { key: 'password', value: 'password', type: 'string' },
                                { key: 'saveHelperData', type: 'any' },
                                { key: 'showPassword', value: false, type: 'boolean' }
                            ]
                        }
                    });
                    done();
                });
            });

            it('should fall back to auth if legacy properties are absent', function (done) {
                var source = {
                    id: '722795b9-c9bc-4a01-a024-dd9358548dc1',
                    auth: {
                        type: 'basic',
                        basic: [
                            { key: 'username', value: 'username', type: 'string' },
                            { key: 'password', value: 'password', type: 'string' }
                        ]
                    }
                };

                transformer.normalizeSingle(source, options, function (err, normalized) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    normalized = JSON.parse(JSON.stringify(normalized));

                    expect(normalized).to.eql({
                        id: '722795b9-c9bc-4a01-a024-dd9358548dc1',
                        currentHelper: 'basicAuth',
                        helperAttributes: {
                            id: 'basic',
                            username: 'username',
                            password: 'password'
                        },
                        auth: {
                            type: 'basic',
                            basic: [
                                { key: 'username', value: 'username', type: 'string' },
                                { key: 'password', value: 'password', type: 'string' }
                            ]
                        }
                    });
                    done();
                });
            });

            describe('malformed requests', function () {
                it('should handle valid currentHelper with invalid helperAttributes correctly', function (done) {
                    var source = {
                        id: '722795b9-c9bc-4a01-a024-dd9358548dc1',
                        currentHelper: 'basicAuth',
                        // this should ideally never happen, but we don't live in an ideal world
                        helperAttributes: undefined
                    };

                    transformer.normalizeSingle(source, options, function (err, normalized) {
                        expect(err).to.not.be.ok;

                        // remove `undefined` properties for testing
                        normalized = JSON.parse(JSON.stringify(normalized));

                        expect(normalized).to.eql({
                            id: '722795b9-c9bc-4a01-a024-dd9358548dc1',
                            currentHelper: null,
                            helperAttributes: null,
                            auth: null
                        });
                        done();
                    });
                });
            });

            describe('requests with null', function () {
                it('should handle no-auth correctly with legacy properties', function (done) {
                    transformer.normalizeSingle({
                        id: 'b56246e9-5012-49f1-8f9d-f3338ac29cbd',
                        currentHelper: null
                    }, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        expect(result).to.eql({
                            id: 'b56246e9-5012-49f1-8f9d-f3338ac29cbd',
                            currentHelper: null,
                            helperAttributes: null,
                            auth: null
                        });
                        done();
                    });
                });

                it('should handle legacy no-auth correctly with noDefaults set to true', function (done) {
                    transformer.normalizeSingle({ currentHelper: null }, {
                        noDefaults: true,
                        normalizeVersion: '1.0.0'
                    }, function (err, result) {
                        expect(err).to.not.be.ok;

                        expect(result).to.eql({
                            auth: null,
                            currentHelper: null,
                            helperAttributes: null
                        });
                        done();
                    });
                });

                it('should recreate legacy properties for noauth correctly', function (done) {
                    // eslint-disable-next-line max-len
                    transformer.normalizeSingle({ id: 'b56246e9-5012-49f1-8f9d-f3338ac29cbd', auth: null }, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        expect(result).to.eql({
                            id: 'b56246e9-5012-49f1-8f9d-f3338ac29cbd',
                            currentHelper: null,
                            helperAttributes: null,
                            auth: null
                        });
                        done();
                    });
                });

                it('should recreate legacy noauth properties correctly with noDefaults set to true', function (done) {
                    transformer.normalizeSingle({ auth: null }, {
                        noDefaults: true,
                        normalizeVersion: '1.0.0'
                    }, function (err, result) {
                        expect(err).to.not.be.ok;

                        expect(result).to.eql({
                            currentHelper: null,
                            helperAttributes: null,
                            auth: null
                        });
                        done();
                    });
                });
            });

            describe('collections', function () {
                it('should handle auth set to null correctly', function (done) {
                    transformer.normalize({
                        id: 'b7e8cb01-bc32-4389-a130-3e4bc6fc844c',
                        auth: null,
                        folders: [{
                            id: '570325c5-c4cc-4caf-a527-7ac71f25c5ac',
                            auth: null
                        }]
                    }, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        expect(result).to.eql({
                            id: 'b7e8cb01-bc32-4389-a130-3e4bc6fc844c',
                            folders: [{
                                id: '570325c5-c4cc-4caf-a527-7ac71f25c5ac',
                                auth: null
                            }]
                        });
                        done();
                    });
                });

                it('should handle auth set to noauth correctly', function (done) {
                    transformer.normalize({
                        id: 'f29edacb-89b6-4e36-9954-db399f1cdc9e',
                        auth: { type: 'noauth' },
                        folders: [{
                            id: '5ee15d58-2945-48bb-89d0-9219210d6daa',
                            auth: { type: 'noauth' }
                        }]
                    }, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        expect(result).to.eql({
                            id: 'f29edacb-89b6-4e36-9954-db399f1cdc9e',
                            folders: [{
                                id: '5ee15d58-2945-48bb-89d0-9219210d6daa',
                                auth: { type: 'noauth' }
                            }]
                        });
                        done();
                    });
                });
            });

            describe('with missing properties', function () {
                var options = {
                    noDefaults: true,
                    normalizeVersion: '1.0.0'
                };

                it('should fall back to legacy properties if auth is missing', function (done) {
                    var source = {
                        currentHelper: 'basicAuth',
                        helperAttributes: {
                            id: 'basic',
                            username: 'postman',
                            password: 'secret'
                        }
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            currentHelper: 'basicAuth',
                            helperAttributes: {
                                id: 'basic',
                                username: 'postman',
                                password: 'secret'
                            },
                            auth: {
                                type: 'basic',
                                basic: [
                                    { key: 'username', value: 'postman', type: 'string' },
                                    { key: 'password', value: 'secret', type: 'string' },
                                    { key: 'saveHelperData', type: 'any' },
                                    { key: 'showPassword', value: false, type: 'boolean' }
                                ]
                            }
                        });
                        done();
                    });
                });

                it('should discard auth creation if both: legacy and new attributes are missing', function (done) {
                    var source = {};

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({});
                        done();
                    });
                });

                it('should discard auth if both: legacy is normal and new attributes are missing', function (done) {
                    var source = { currentHelper: 'normal' };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            auth: null,
                            currentHelper: null,
                            helperAttributes: null
                        });
                        done();
                    });
                });

                it('should handle valid auth and missing currentHelper correctly', function (done) {
                    var source = {
                        auth: {
                            type: 'bearer',
                            bearer: [{ key: 'token', value: 'secret', type: 'string' }]
                        }
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            auth: {
                                type: 'bearer',
                                bearer: [{ key: 'token', value: 'secret', type: 'string' }]
                            },
                            currentHelper: 'bearerAuth',
                            helperAttributes: {
                                id: 'bearer',
                                token: 'secret'
                            }
                        });
                        done();
                    });
                });
            });

            describe('prioritizeV2: true', function () {
                var options = {
                    normalizeVersion: '1.0.0',
                    prioritizeV2: true,
                    retainIds: true
                };

                it('should correctly prioritize v2 auth whilst normalizing', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        currentHelper: 'basicAuth',
                        helperAttributes: {
                            id: 'basic',
                            username: 'postman',
                            password: 'secret'
                        },
                        auth: {
                            type: 'bearer',
                            bearer: [{ key: 'token', value: 'secret', type: 'string' }]
                        }
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        expect(result).to.eql({
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            currentHelper: 'bearerAuth',
                            helperAttributes: {
                                id: 'bearer',
                                token: 'secret'
                            },
                            auth: {
                                type: 'bearer',
                                bearer: [{ key: 'token', value: 'secret', type: 'string' }]
                            }
                        });
                        done();
                    });
                });

                it('should fall back to legacy properties if auth is falsy', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        currentHelper: 'basicAuth',
                        helperAttributes: {
                            id: 'basic',
                            username: 'postman',
                            password: 'secret'
                        },
                        auth: null
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            currentHelper: 'basicAuth',
                            helperAttributes: {
                                id: 'basic',
                                username: 'postman',
                                password: 'secret'
                            },
                            auth: {
                                type: 'basic',
                                basic: [
                                    { key: 'username', value: 'postman', type: 'string' },
                                    { key: 'password', value: 'secret', type: 'string' },
                                    { key: 'saveHelperData', type: 'any' },
                                    { key: 'showPassword', value: false, type: 'boolean' }
                                ]
                            }
                        });
                        done();
                    });
                });

                it('should nullify if both: legacy and new attributes are falsy', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        currentHelper: null,
                        helperAttributes: null,
                        auth: null
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(result).to.eql({
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            currentHelper: null,
                            helperAttributes: null,
                            auth: null
                        });
                        done();
                    });
                });

                it('should nullify auth if both: legacy is normal and the new attribute is falsy', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        currentHelper: 'normal',
                        helperAttributes: null,
                        auth: null
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(result).to.eql({
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            currentHelper: null,
                            helperAttributes: null,
                            auth: null
                        });
                        done();
                    });
                });

                it('should handle valid auth and missing currentHelper correctly', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        auth: {
                            type: 'bearer',
                            bearer: [{ key: 'token', value: 'secret', type: 'string' }]
                        }
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            auth: {
                                type: 'bearer',
                                bearer: [{ key: 'token', value: 'secret', type: 'string' }]
                            },
                            currentHelper: 'bearerAuth',
                            helperAttributes: {
                                id: 'bearer',
                                token: 'secret'
                            }
                        });
                        done();
                    });
                });
            });
        });

        describe('scripts', function () {
            it('should override events with legacy properties if they exist', function (done) {
                var source = {
                    id: '95df70cd-8631-4459-bc42-3830f30ecae0',
                    preRequestScript: 'console.log("Request level pre-request script");',
                    tests: 'console.log("Request level test script");',
                    events: [{
                        listen: 'prerequest',
                        script: {
                            type: 'text/javascript',
                            exec: ['console.log("Alternative request level pre-request script");']
                        }
                    }, {
                        listen: 'test',
                        script: {
                            type: 'text/javascript',
                            exec: ['console.log("Alternative request level test script");']
                        }
                    }]
                };

                transformer.normalizeSingle(source, options, function (err, normalized) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    normalized = JSON.parse(JSON.stringify(normalized));

                    expect(normalized).to.eql({
                        id: '95df70cd-8631-4459-bc42-3830f30ecae0',
                        preRequestScript: 'console.log("Request level pre-request script");',
                        tests: 'console.log("Request level test script");',
                        events: [{
                            listen: 'prerequest',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Request level pre-request script");']
                            }
                        }, {
                            listen: 'test',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Request level test script");']
                            }
                        }]
                    });
                    done();
                });
            });

            it('should use events if legacy properties are absent', function (done) {
                var source = {
                    id: '53540ee4-8499-44af-9b74-20d415a6fd43',
                    events: [{
                        listen: 'prerequest',
                        script: {
                            type: 'text/javascript',
                            exec: ['console.log("Alternative request level pre-request script");']
                        }
                    }, {
                        listen: 'test',
                        script: {
                            type: 'text/javascript',
                            exec: ['console.log("Alternative request level test script");']
                        }
                    }]
                };

                transformer.normalizeSingle(source, options, function (err, normalized) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    normalized = JSON.parse(JSON.stringify(normalized));

                    expect(normalized).to.eql({
                        id: '53540ee4-8499-44af-9b74-20d415a6fd43',
                        preRequestScript: 'console.log("Alternative request level pre-request script");',
                        tests: 'console.log("Alternative request level test script");',
                        events: [{
                            listen: 'prerequest',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Alternative request level pre-request script");']
                            }
                        }, {
                            listen: 'test',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Alternative request level test script");']
                            }
                        }]
                    });
                    done();
                });
            });

            describe('with missing properties', function () {
                it('should handle missing preRequestScript and tests correctly', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        events: [{
                            listen: 'prerequest',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Pre-request script");']
                            }
                        }, {
                            listen: 'test',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Test script");']
                            }
                        }]
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            preRequestScript: 'console.log("Pre-request script");',
                            tests: 'console.log("Test script");',
                            events: [{
                                listen: 'prerequest',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Pre-request script");']
                                }
                            }, {
                                listen: 'test',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Test script");']
                                }
                            }]
                        });
                        done();
                    });
                });

                it('should handle missing events correctly', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        preRequestScript: 'console.log("Pre-request script");',
                        tests: 'console.log("Test script");'
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            events: [{
                                listen: 'prerequest',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Pre-request script");']
                                }
                            }, {
                                listen: 'test',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Test script");']
                                }
                            }],
                            preRequestScript: 'console.log("Pre-request script");',
                            tests: 'console.log("Test script");'
                        });
                        done();
                    });
                });

                it('should discard property creation if both are absent', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c'
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c'
                        });
                        done();
                    });
                });
            });

            describe('prioritizeV2: true', function () {
                var options = {
                    normalizeVersion: '1.0.0',
                    prioritizeV2: true,
                    retainIds: true
                };

                it('should correctly prioritize `events` over preRequestScript/tests', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        preRequestScript: 'console.log("Legacy prerequest script");',
                        tests: 'console.log("Legacy test script");',
                        events: [{
                            listen: 'prerequest',
                            script: { exec: ['console.log("Actual prerequest script");'] }
                        }, {
                            listen: 'test',
                            script: { exec: ['console.log("Actual test script");'] }
                        }]
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(result).to.eql({
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            preRequestScript: 'console.log("Actual prerequest script");',
                            tests: 'console.log("Actual test script");',
                            events: [{
                                listen: 'prerequest',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Actual prerequest script");']
                                }
                            }, {
                                listen: 'test',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Actual test script");']
                                }
                            }]
                        });
                        done();
                    });
                });

                it('should correctly fall back to preRequestScript/tests if `events` is empty', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        preRequestScript: 'console.log("Legacy prerequest script");',
                        tests: 'console.log("Legacy test script");',
                        events: []
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(result).to.eql({
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            preRequestScript: 'console.log("Legacy prerequest script");',
                            tests: 'console.log("Legacy test script");',
                            events: [{
                                listen: 'prerequest',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Legacy prerequest script");']
                                }
                            }, {
                                listen: 'test',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Legacy test script");']
                                }
                            }]
                        });
                        done();
                    });
                });

                it('should nullify the event if both legacy and current attributes are empty', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        preRequestScript: null,
                        tests: null,
                        events: []
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(result).to.eql({
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            preRequestScript: null,
                            tests: null
                        });
                        done();
                    });
                });

                describe('with missing properties', function () {
                    it('should handle missing preRequestScript and tests correctly', function (done) {
                        var source = {
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            events: [{
                                listen: 'prerequest',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Pre-request script");']
                                }
                            }, {
                                listen: 'test',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Test script");']
                                }
                            }]
                        };

                        transformer.normalizeSingle(source, options, function (err, result) {
                            expect(err).to.not.be.ok;
                            expect(JSON.parse(JSON.stringify(result))).to.eql({
                                id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                                preRequestScript: 'console.log("Pre-request script");',
                                tests: 'console.log("Test script");',
                                events: [{
                                    listen: 'prerequest',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Pre-request script");']
                                    }
                                }, {
                                    listen: 'test',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Test script");']
                                    }
                                }]
                            });
                            done();
                        });
                    });

                    it('should handle missing events correctly', function (done) {
                        var source = {
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            preRequestScript: 'console.log("Pre-request script");',
                            tests: 'console.log("Test script");'
                        };

                        transformer.normalizeSingle(source, options, function (err, result) {
                            expect(err).to.not.be.ok;
                            expect(JSON.parse(JSON.stringify(result))).to.eql({
                                id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                                events: [{
                                    listen: 'prerequest',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Pre-request script");']
                                    }
                                }, {
                                    listen: 'test',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Test script");']
                                    }
                                }],
                                preRequestScript: 'console.log("Pre-request script");',
                                tests: 'console.log("Test script");'
                            });
                            done();
                        });
                    });

                    it('should discard property creation if both are absent', function (done) {
                        var source = {
                            id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c'
                        };

                        transformer.normalizeSingle(source, options, function (err, result) {
                            expect(err).to.not.be.ok;
                            expect(JSON.parse(JSON.stringify(result))).to.eql({
                                id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c'
                            });
                            done();
                        });
                    });
                });
            });
        });

        describe('request file body', function () {
            it('should correctly handle non-string and non-array file entities', function (done) {
                transformer.normalize({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'body-src-check',
                    order: [
                        '4f65e265-dd38-0a67-71a5-d9dd50fa37a1'
                    ],
                    folders: [],
                    folders_order: [],
                    requests: [
                        {
                            id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                            headers: '',
                            url: 'https://postman-echo.com/post',
                            method: 'POST',
                            data: [
                                { key: 'alpha', value: 1, type: 'file' },
                                { key: 'beta', value: {}, type: 'file' },
                                { key: 'gamma', value: true, type: 'file' }
                            ],
                            dataMode: 'params',
                            collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                        }
                    ]
                }, options, function (err, result) {
                    expect(err).not.to.be.ok;

                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'body-src-check',
                        order: [
                            '4f65e265-dd38-0a67-71a5-d9dd50fa37a1'
                        ],
                        folders_order: [],
                        requests: [
                            {
                                id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                                headers: '',
                                url: 'https://postman-echo.com/post',
                                method: 'POST',
                                data: [
                                    { key: 'alpha', value: null, type: 'file' },
                                    { key: 'beta', value: null, type: 'file' },
                                    { key: 'gamma', value: null, type: 'file' }
                                ],
                                dataMode: 'params',
                                collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                            }
                        ]
                    });
                    done();
                });
            });

            it('should correctly handle non-string and non-array file entities in requests', function (done) {
                transformer.normalizeSingle({
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    method: 'POST',
                    data: [
                        { key: 'alpha', value: 1, type: 'file' },
                        { key: 'beta', value: {}, type: 'file' },
                        { key: 'gamma', value: true, type: 'file' }
                    ],
                    dataMode: 'params',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }, options, function (err, result) {
                    expect(err).not.to.be.ok;

                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/post',
                        method: 'POST',
                        data: [
                            { key: 'alpha', value: null, type: 'file' },
                            { key: 'beta', value: null, type: 'file' },
                            { key: 'gamma', value: null, type: 'file' }
                        ],
                        dataMode: 'params',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    });
                    done();
                });
            });

            it('should set missing file values to null when missing by default (noDefaults = false)', function (done) {
                transformer.normalizeSingle({
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    method: 'POST',
                    data: [
                        {
                            key: 'file',
                            type: 'file'
                        }
                    ],
                    dataMode: 'params',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }, options, function (err, result) {
                    expect(err).not.to.be.ok;

                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/post',
                        method: 'POST',
                        data: [
                            {
                                key: 'file',
                                value: null,
                                type: 'file'
                            }
                        ],
                        dataMode: 'params',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    });
                    done();
                });
            });

            it('should not set missing file values to null when missing and noDefaults is true', function (done) {
                transformer.normalizeSingle({
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    method: 'POST',
                    data: [
                        {
                            key: 'file',
                            type: 'file'
                        }
                    ],
                    dataMode: 'params',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }, _.defaults({ noDefaults: true }, options), function (err, result) {
                    expect(err).not.to.be.ok;

                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/post',
                        method: 'POST',
                        data: [
                            {
                                key: 'file',
                                type: 'file'
                            }
                        ],
                        dataMode: 'params',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    });
                    done();
                });
            });

            it('should retain string valued file entities in request bodies', function (done) {
                transformer.normalizeSingle({
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    method: 'POST',
                    data: [
                        {
                            key: 'file',
                            value: 't.csv',
                            type: 'file'
                        }
                    ],
                    dataMode: 'params',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }, _.defaults({ noDefaults: false }, options), function (err, result) {
                    expect(err).not.to.be.ok;

                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/post',
                        method: 'POST',
                        data: [
                            {
                                key: 'file',
                                value: 't.csv',
                                type: 'file'
                            }
                        ],
                        dataMode: 'params',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    });
                    done();
                });
            });
        });
    });

    describe('disabled request bodies', function () {
        it('should handle disabled request body correctly', function (done) {
            transformer.normalize({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'disabled-body',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    data: 'foo=bar',
                    method: 'POST',
                    dataMode: 'raw',
                    dataDisabled: true,
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'disabled-body',
                    order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                    folders_order: [],
                    requests: [{
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/post',
                        data: 'foo=bar',
                        method: 'POST',
                        dataMode: 'raw',
                        dataDisabled: true,
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }]
                });
                done();
            });
        });

        it('should not include disabled property unless its true', function (done) {
            transformer.normalize({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'disabled-body',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    data: 'foo=bar',
                    method: 'POST',
                    dataMode: 'raw',
                    dataDisabled: false,
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'disabled-body',
                    order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                    folders_order: [],
                    requests: [{
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/post',
                        data: 'foo=bar',
                        method: 'POST',
                        dataMode: 'raw',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }]
                });
                done();
            });
        });
    });

    describe('null request body', function () {
        it('should handle request without body correctly', function (done) {
            transformer.normalize({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'disabled-body',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'disabled-body',
                    order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                    folders_order: [],
                    requests: [{
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/post',
                        method: 'POST',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }]
                });
                done();
            });
        });

        it('should set dataMode even if data or rawModeData is not set', function (done) {
            transformer.normalize({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-data',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    dataMode: 'params',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'null-data',
                    order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                    folders_order: [],
                    requests: [{
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/post',
                        dataMode: 'params',
                        method: 'POST',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }]
                });
                done();
            });
        });

        it('should work correctly with normalizeSingle', function (done) {
            transformer.normalizeSingle({
                id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                headers: '',
                url: 'https://postman-echo.com/get',
                data: 'foo=bar',
                method: 'GET',
                collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/get',
                    data: 'foo=bar',
                    method: 'GET',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                });

                done();
            });
        });
    });

    describe('null events', function () {
        it('should retain null events', function (done) {
            transformer.normalize({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-events',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                events: null,
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    events: null,
                    url: 'https://postman-echo.com/post',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'null-events',
                    order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                    events: null,
                    requests: [{
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        events: null,
                        url: 'https://postman-echo.com/post',
                        method: 'POST',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }]
                });
                done();
            });
        });

        it('should drop undefined events', function (done) {
            transformer.normalize({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-events',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                events: undefined,
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    events: undefined,
                    preRequestScript: undefined,
                    test: undefined,
                    url: 'https://postman-echo.com/post',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'null-events',
                    order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                    requests: [{
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        url: 'https://postman-echo.com/post',
                        method: 'POST',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }]
                });
                done();
            });
        });

        it('should retain null preRequestScript and test', function (done) {
            transformer.normalize({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-preRequestScript-test',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                requests: [{
                    preRequestScript: null,
                    test: null,
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    url: 'https://postman-echo.com/post',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'null-preRequestScript-test',
                    order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                    requests: [{
                        preRequestScript: null,
                        test: null,
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        url: 'https://postman-echo.com/post',
                        method: 'POST',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }]
                });
                done();
            });
        });

        it('should retain null events with normalizeSingle', function (done) {
            transformer.normalizeSingle({
                id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                events: null,
                preRequestScript: null,
                test: null,
                url: 'https://postman-echo.com/get',
                method: 'GET',
                collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    events: null,
                    preRequestScript: null,
                    test: null,
                    url: 'https://postman-echo.com/get',
                    method: 'GET',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                });

                done();
            });
        });
    });

    describe('protocolProfileBehavior', function () {
        describe('normalize', function () {
            it('should handle protocolProfileBehavior property at request level', function (done) {
                transformer.normalize({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'get-with-body',
                    order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                    folders: [],
                    folders_order: [],
                    requests: [{
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/get',
                        data: 'foo=bar',
                        method: 'GET',
                        dataMode: 'raw',
                        protocolProfileBehavior: {
                            disableBodyPruning: true
                        },
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }]
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'get-with-body',
                        order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                        folders_order: [],
                        requests: [{
                            id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                            headers: '',
                            url: 'https://postman-echo.com/get',
                            data: 'foo=bar',
                            method: 'GET',
                            dataMode: 'raw',
                            protocolProfileBehavior: {
                                disableBodyPruning: true
                            },
                            collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                        }]
                    });
                    done();
                });
            });

            it('should handle protocolProfileBehavior property at folder level', function (done) {
                transformer.normalize({
                    id: '03cf74df-32de-af8b-7db8-855b51b05e50',
                    name: 'Collection',
                    order: [],
                    folders: [
                        {
                            owner: '33232',
                            lastUpdatedBy: '33232',
                            lastRevision: 75211067,
                            id: '997e9a45-51e0-98b1-1894-319a72efca57',
                            name: 'Folder',
                            protocolProfileBehavior: {
                                disableBodyPruning: true
                            },
                            order: ['5ec6f591-4460-e4cf-fdc1-0de07c10b2b1']
                        }
                    ],
                    requests: [
                        {
                            folder: '997e9a45-51e0-98b1-1894-319a72efca57',
                            id: '5ec6f591-4460-e4cf-fdc1-0de07c10b2b1',
                            name: 'Request',
                            method: 'GET',
                            url: 'https://echo.getpostman.com/get'
                        }
                    ]
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        id: '03cf74df-32de-af8b-7db8-855b51b05e50',
                        name: 'Collection',
                        order: [],
                        folders: [
                            {
                                owner: '33232',
                                lastUpdatedBy: '33232',
                                lastRevision: 75211067,
                                id: '997e9a45-51e0-98b1-1894-319a72efca57',
                                name: 'Folder',
                                protocolProfileBehavior: {
                                    disableBodyPruning: true
                                },
                                order: ['5ec6f591-4460-e4cf-fdc1-0de07c10b2b1']
                            }
                        ],
                        requests: [
                            {
                                folder: '997e9a45-51e0-98b1-1894-319a72efca57',
                                id: '5ec6f591-4460-e4cf-fdc1-0de07c10b2b1',
                                name: 'Request',
                                method: 'GET',
                                url: 'https://echo.getpostman.com/get'
                            }
                        ]
                    });
                    done();
                });
            });

            it('should handle protocolProfileBehavior property at collection level', function (done) {
                transformer.normalize({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'get-with-body',
                    order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                    folders: [],
                    folders_order: [],
                    requests: [{
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/get',
                        data: 'foo=bar',
                        method: 'GET',
                        dataMode: 'raw',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }],
                    protocolProfileBehavior: {
                        disableBodyPruning: true
                    }
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'get-with-body',
                        order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                        folders_order: [],
                        requests: [{
                            id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                            headers: '',
                            url: 'https://postman-echo.com/get',
                            data: 'foo=bar',
                            method: 'GET',
                            dataMode: 'raw',
                            collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                        }],
                        protocolProfileBehavior: {
                            disableBodyPruning: true
                        }
                    });
                    done();
                });
            });

            it('should not include protocolProfileBehavior property unless its an object', function (done) {
                transformer.normalize({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'get-with-body',
                    order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                    folders: [],
                    folders_order: [],
                    requests: [{
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/get',
                        data: 'foo=bar',
                        method: 'GET',
                        dataMode: 'raw',
                        protocolProfileBehavior: 'random',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }]
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'get-with-body',
                        order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                        folders_order: [],
                        requests: [{
                            id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                            headers: '',
                            url: 'https://postman-echo.com/get',
                            data: 'foo=bar',
                            method: 'GET',
                            dataMode: 'raw',
                            collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                        }]
                    });
                    done();
                });
            });
        });

        describe('normalizeSingle', function () {
            it('should work correctly for single request', function (done) {
                transformer.normalizeSingle({
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/get',
                    data: 'foo=bar',
                    method: 'GET',
                    dataMode: 'raw',
                    protocolProfileBehavior: {
                        disableBodyPruning: true
                    },
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/get',
                        data: 'foo=bar',
                        method: 'GET',
                        dataMode: 'raw',
                        protocolProfileBehavior: {
                            disableBodyPruning: true
                        },
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    });

                    done();
                });
            });

            it('should not include protocolProfileBehavior property unless its an object', function (done) {
                transformer.normalizeSingle({
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/get',
                    data: 'foo=bar',
                    method: 'GET',
                    dataMode: 'raw',
                    protocolProfileBehavior: 'random',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/get',
                        data: 'foo=bar',
                        method: 'GET',
                        dataMode: 'raw',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    });

                    done();
                });
            });
        });
    });

    describe('mutate', function () {
        var options = {
            mutate: true,
            retainIds: true,
            normalizeVersion: '1.0.0'
        };

        it('should work correctly for single requests', function (done) {
            var source = {
                id: '53540ee4-8499-44af-9b74-20d415a6fd43',
                description: '',
                name: 'Echo GET',
                headers: 'A:B\nC:D\n// E: F',
                currentHelper: 'basicAuth',
                helperAttributes: { id: 'basic', username: 'username', password: 'password' },
                dataMode: 'params',
                data: [{ key: 'foo', value: 'bar', type: 'text', enabled: true }],
                responses: [{
                    request: {
                        id: '53540ee4-8499-44af-9b74-20d415a6fd43',
                        name: 'Echo GET',
                        pathVariables: {},
                        data: [{ key: 'foo', value: 'bar', type: 'text', enabled: true }],
                        url: 'https://postman-echo.com/get',
                        preRequestScript: 'console.log("Request level pre-request script");',
                        tests: 'console.log("Request level test script");',
                        headers: 'A:B\nC:D\n// E: F',
                        dataMode: 'params',
                        method: 'POST',
                        isFromCollection: true,
                        write: true,
                        version: 2
                    },
                    id: 'aa6e8983-172d-692b-f8da-a69af6a27371',
                    name: '200',
                    status: '',
                    responseCode: { code: 200, name: 'OK' },
                    time: '303',
                    headers: [
                        { name: 'Content-Length', key: 'Content-Length', value: '153' },
                        { name: 'Content-Type', key: 'Content-Type', value: 'application/json; charset=utf-8' }
                    ]
                }],
                url: 'https://postman-echo.com/get',
                preRequestScript: 'console.log("Request level pre-request script");',
                tests: 'console.log("Request level test script");'
            };

            transformer.normalizeSingle(source, options, function (err) {
                expect(err).to.not.be.ok;

                expect(JSON.parse(JSON.stringify(source))).to.eql({
                    id: '53540ee4-8499-44af-9b74-20d415a6fd43',
                    name: 'Echo GET',
                    headers: 'A:B\nC:D\n// E: F',
                    headerData: [
                        { key: 'A', value: 'B' },
                        { key: 'C', value: 'D' },
                        { key: 'E', value: 'F', enabled: false }
                    ],
                    currentHelper: 'basicAuth',
                    helperAttributes: { id: 'basic', username: 'username', password: 'password' },
                    auth: {
                        type: 'basic',
                        basic: [
                            { key: 'username', value: 'username', type: 'string' },
                            { key: 'password', value: 'password', type: 'string' },
                            { key: 'saveHelperData', type: 'any' },
                            { key: 'showPassword', value: false, type: 'boolean' }
                        ]
                    },
                    dataMode: 'params',
                    data: [{ key: 'foo', value: 'bar', type: 'text', enabled: true }],
                    responses: [{
                        request: {
                            id: '53540ee4-8499-44af-9b74-20d415a6fd43',
                            name: 'Echo GET',
                            pathVariables: {},
                            data: [{ key: 'foo', value: 'bar', type: 'text', enabled: true }],
                            url: 'https://postman-echo.com/get',
                            preRequestScript: 'console.log("Request level pre-request script");',
                            tests: 'console.log("Request level test script");',
                            headers: 'A:B\nC:D\n// E: F',
                            events: [
                                {
                                    listen: 'prerequest',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Request level pre-request script");']
                                    }
                                },
                                {
                                    listen: 'test',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Request level test script");']
                                    }
                                }
                            ],
                            headerData: [
                                { key: 'A', value: 'B' },
                                { key: 'C', value: 'D' },
                                { key: 'E', value: 'F', enabled: false }
                            ],
                            dataMode: 'params',
                            method: 'POST',
                            isFromCollection: true,
                            write: true,
                            version: 2
                        },
                        id: 'aa6e8983-172d-692b-f8da-a69af6a27371',
                        language: 'Text',
                        previewType: 'html',
                        name: '200',
                        status: '',
                        responseCode: { code: 200, name: 'OK' },
                        time: '303',
                        headers: [
                            { name: 'Content-Length', key: 'Content-Length', value: '153' },
                            { name: 'Content-Type', key: 'Content-Type', value: 'application/json; charset=utf-8' }
                        ]
                    }],
                    url: 'https://postman-echo.com/get',
                    events: [
                        {
                            listen: 'prerequest',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Request level pre-request script");']
                            }
                        },
                        {
                            listen: 'test',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Request level test script");']
                            }
                        }
                    ],
                    preRequestScript: 'console.log("Request level pre-request script");',
                    tests: 'console.log("Request level test script");'
                });
                done();
            });
        });

        it('should work correctly for single responses', function (done) {
            var source = {
                status: '',
                responseCode: {
                    code: 200,
                    name: 'OK',
                    // eslint-disable-next-line max-len
                    detail: 'Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request the response will contain an entity describing or containing the result of the action.'
                },
                time: 412,
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'text/html; charset=ISO-8859-1',
                        name: 'Content-Type',
                        description: 'The mime type of this content'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                        name: 'X-XSS-Protection',
                        description: 'Cross-site scripting (XSS) filter'
                    }
                ],
                cookies: [],
                mime: '',
                // eslint-disable-next-line max-len
                text: '<!doctype html><html itemscope=\'\' itemtype=\'http://schema.org/WebPage\' lang=\'en-IN\'><head><meta content=\'text/html; charset=UTF-8\' http-equiv=\'Content-Type\'><meta content=\'/images/branding/googleg/1x/googleg_standard_color_128dp.png\' itemprop=\'image\'><title>Google</title><script>(function(){window.google={kEI:\'ctgeWeqbLYTivASs04-gCw\',kEXPI:\'201761,1352961,1353394,3700339,3700347,3700410,3700425,4029815,4031109,4032678,4036527,4039268,4043492,4045841,4048347,4065787,4071842,4072364,4072774,4076096,4076999,4078430,4081039,4081164,4084179,4084977,4085472,4090550,4090553,4091420,4092231,4093169,4093314,4094251,4094542,4095910,4096324,4097153,4097922,4097929,4097951,4098096,4098733,4098740,4098752,4101429,4101430,4101437,4101750,4102238,4103475,4103845,4104204,4105085,4105178,4105317,4105321,4106164,4106606,4106949,4107417,4107555,4107628,4108505,4108537,4108539,4109221,4109316,4109439,4109489,4109498,4109524,4109539,4109629,4110259,4110361,4110380,4110425,4110656,4110899,4111127,4111421,4111607,4111612,4111792,4112009,4112041,4112316,4112318,4112827,8503585,8508229,8508607,8508931,8509037,8509091,8509373,8510343,8513026,10200083,10200096,10201957,19002115,19002174,19002281,19002294,19002296,19002297,41027340\',authuser:0,kscs:\'c9c918f0_24\'};google.kHL=\'en-IN\';})();(function(){google.lc=[];google.li=0;google.getEI=function(a){for(var b;a&&(!a.getAttribute||!(b=a.getAttribute(\'eid\')));)a=a.parentNode;return b||google.kEI};google.getLEI=function(a){for(var b=null;a&&(!a.getAttribute||!(b=a.getAttribute(\'leid\')));)a=a.parentNode;return b};google.https=function(){return\'https:\'==window.location.protocol};google.ml=function(){return null};google.wl=function(a,b){try{google.ml(Error(a),!1,b)}catch(c){}};google.time=function(){return(new Date).getTime()};google.log=function(a,b,c,d,g){a=google.logUrl(a,b,c,d,g);if(\'\'!=a){b=new Image;var e=google.lc,f=google.li;e[f]=b;b.onerror=b.onload=b.onabort=function(){delete e[f]};window.google&&window.google.vel&&window.google.vel.lu&&window.google.vel.lu(a);b.src=a;google.li=f+1}};google.logUrl=function(a,b,c,d,g){var e=\'\',f=google.ls||\'\';c||-1!=b.search(\'&ei=\')||(e=\'&ei=\'+google.getEI(d),-1==b.search(\'&lei=\')&&(d=google.getLEI(d))&&(e+=\'&lei=\'+d));a=c||\'/\'+(g||\'gen_204\')+\'?atyp=i&ct=\'+a+\'&cad=\'+b+e+f+\'&zx=\'+google.time();/^http:/i.test(a)&&google.https()&&(google.ml(Error(\'a\'),!1,{src:a,glmm:1}),a=\'\');return a};google.y={};google.x=function(a,b){google.y[a.id]=[a,b];return!1};google.lq=[];google.load=function(a,b,c){google.lq.push([[a],b,c])};google.loadAll=function(a,b){google.lq.push([a,b])};}).call(this);google.f={};var a=window.location,b=a.href.indexOf(\'#\');if(0<=b){var c=a.href.substring(b+1);/(^|&)q=/.test(c)&&-1==c.indexOf(\'#\')&&a.replace(\'/search?\'+c.replace(/(^|&)fp=[^&]*/g,\'\')+\'&cad=h\')};</script><style>#gbar,#guser{font-size:13px;padding-top:1px !important;}#gbar{height:22px}#guser{padding-bottom:7px !important;text-align:right}.gbh,.gbd{border-top:1px solid #c9d7f1;font-size:1px}.gbh{height:0;position:absolute;top:24px;width:100%}@media all{.gb1{height:22px;margin-right:.5em;vertical-align:top}#gbar{float:left}}a.gb1,a.gb4{text-decoration:underline !important}a.gb1,a.gb4{color:#00c !important}.gbi .gb4{color:#dd8e27 !important}.gbf .gb4{color:#900 !important}\n</style><style>body,td,a,p,.h{font-family:arial,sans-serif}body{margin:0;overflow-y:scroll}#gog{padding:3px 8px 0}td{line-height:.8em}.gac_m td{line-height:17px}form{margin-bottom:20px}.h{color:#36c}.q{color:#00c}.ts td{padding:0}.ts{border-collapse:collapse}em{font-weight:bold;font-style:normal}.lst{height:25px;width:496px}.gsfi,.lst{font:18px arial,sans-serif}.gsfs{font:17px arial,sans-serif}.ds{display:inline-box;display:inline-block;margin:3px 0 4px;margin-left:4px}input{font-family:inherit}a.gb1,a.gb2,a.gb3,a.gb4{color:#11c !important}body{background:#fff;color:black}a{color:#11c;text-decoration:none}a:hover,a:active{text-decoration:underline}.fl a{color:#36c}a:visited{color:#551a8b}a.gb1,a.gb4{text-decoration:underline}a.gb3:hover{text-decoration:none}#ghead a.gb2:hover{color:#fff !important}.sblc{padding-top:5px}.sblc a{display:block;margin:2px 0;margin-left:13px;font-size:11px}.lsbb{background:#eee;border:solid 1px;border-color:#ccc #999 #999 #ccc;height:30px}.lsbb{display:block}.ftl,#fll a{display:inline-block;margin:0 12px}.lsb{background:url(/images/nav_logo229.png) 0 -261px repeat-x;border:none;color:#000;cursor:pointer;height:30px;margin:0;outline:0;font:15px arial,sans-serif;vertical-align:top}.lsb:active{background:#ccc}.lst:focus{outline:none}</style><script>(function(){window.google.erd={sp:\'hp\',jsr:1,bv:11,cs:false};var f=0,g,h=google.erd,k=h.jsr,l;google.jsmp=!0;google.ml=function(a,b,c,e){google.dl&&google.dl(a,c,b);if(google._epc(a,b,c,e))return null;a=google._gld(a,\'/gen_204?atyp=i\',c||{},!1);e||google.log(0,\'\',a);return a};google._epc=function(a,b,c,e){var d=google.erd.jsr;if(0>d){window.console&&console.error(a,c);if(-2==d)throw a;return!0}if(!a||!a.message||\'Error loading script\'==a.message||!(m()&&1>f||e))return!0;f++;b&&(g=a&&a.message);return!1};google._gld=function(a,b,c,e){b=b+\'&ei=\'+encodeURIComponent(google.kEI)+\'&jexpid=\'+encodeURIComponent(google.kEXPI)+\'&srcpg=\'+encodeURIComponent(h.sp)+\'&jsr=\'+google.erd.jsr+\'&bver=\'+encodeURIComponent(h.bv);for(var d in c)b+=\'&\',b+=encodeURIComponent(d),b+=\'=\',b+=encodeURIComponent(c[d]);b=b+\'&emsg=\'+encodeURIComponent(a.name+\': \'+a.message);b=b+\'&jsst=\'+encodeURIComponent(a.stack||\'N/A\');!e&&2E3<=b.length&&(b=b.substr(0,2E3));return b};function m(){if(!h.cs)return!0;var a=google.erd.jsr;void 0==l&&(l=0>a||1==a||1==Math.ceil(Math.random()*a));return l}google.ojsr=function(a){google.erd.jsr=a;l=void 0};google.rjsr=function(){google.erd.jsr=k;l=void 0};window.onerror=function(a,b,c,e,d){g!==a&&google.ml(d instanceof Error?d:Error(a),!1);g=null;m()&&1>f||(window.onerror=null)};})();</script><link href=\'/images/branding/product/ico/googleg_lodp.ico\' rel=\'shortcut icon\'></head><body bgcolor=\'#fff\'><script>(function(){var src=\'/images/nav_logo229.png\';var iesg=false;document.body.onload = function(){window.n && window.n();if (document.images){new Image().src=src;}\nif (!iesg){document.f&&document.f.q.focus();document.gbqf&&document.gbqf.q.focus();}\n}\n})();</script><div id=\'mngb\'> <div id=gbar><nobr><b class=gb1>Search</b> <a class=gb1 href=\'https://www.google.co.in/imghp?hl=en&tab=wi\'>Images</a> <a class=gb1 href=\'https://maps.google.co.in/maps?hl=en&tab=wl\'>Maps</a> <a class=gb1 href=\'https://play.google.com/?hl=en&tab=w8\'>Play</a> <a class=gb1 href=\'https://www.youtube.com/?gl=IN&tab=w1\'>YouTube</a> <a class=gb1 href=\'https://news.google.co.in/nwshp?hl=en&tab=wn\'>News</a> <a class=gb1 href=\'https://mail.google.com/mail/?tab=wm\'>Gmail</a> <a class=gb1 href=\'https://drive.google.com/?tab=wo\'>Drive</a> <a class=gb1 style=\'text-decoration:none\' href=\'https://www.google.co.in/intl/en/options/\'><u>More</u> &raquo;</a></nobr></div><div id=guser width=100%><nobr><span id=gbn class=gbi></span><span id=gbf class=gbf></span><span id=gbe></span><a href=\'http://www.google.co.in/history/optout?hl=en\' class=gb4>Web History</a> | <a  href=\'/preferences?hl=en\' class=gb4>Settings</a> | <a target=_top id=gb_70 href=\'https://accounts.google.com/ServiceLogin?hl=en&passive=true&continue=https://www.google.co.in/%3Fgfe_rd%3Dcr%26ei%3DctgeWYSEILTv8weDpYToDw\' class=gb4>Sign in</a></nobr></div><div class=gbh style=left:0></div><div class=gbh style=right:0></div> </div><center><br clear=\'all\' id=\'lgpd\'><div id=\'lga\'><div style=\'padding:28px 0 3px\'><div style=\'height:110px;width:276px;background:url(/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png) no-repeat\' title=\'Google\' align=\'left\' id=\'hplogo\' onload=\'window.lol&&lol()\'><div style=\'color:#777;font-size:16px;font-weight:bold;position:relative;top:70px;left:218px\' nowrap=\'\'>India</div></div></div><br></div><form action=\'/search\' name=\'f\'><table cellpadding=\'0\' cellspacing=\'0\'><tr valign=\'top\'><td width=\'25%\'>&nbsp;</td><td align=\'center\' nowrap=\'\'><input name=\'ie\' value=\'ISO-8859-1\' type=\'hidden\'><input value=\'en-IN\' name=\'hl\' type=\'hidden\'><input name=\'source\' type=\'hidden\' value=\'hp\'><input name=\'biw\' type=\'hidden\'><input name=\'bih\' type=\'hidden\'><div class=\'ds\' style=\'height:32px;margin:4px 0\'><input style=\'color:#000;margin:0;padding:5px 8px 0 6px;vertical-align:top\' autocomplete=\'off\' class=\'lst\' value=\'\' title=\'Google Search\' maxlength=\'2048\' name=\'q\' size=\'57\'></div><br style=\'line-height:0\'><span class=\'ds\'><span class=\'lsbb\'><input class=\'lsb\' value=\'Google Search\' name=\'btnG\' type=\'submit\'></span></span><span class=\'ds\'><span class=\'lsbb\'><input class=\'lsb\' value=\'I\'m Feeling Lucky\' name=\'btnI\' onclick=\'if(this.form.q.value)this.checked=1; else top.location=\'/doodles/\'\' type=\'submit\'></span></span></td><td class=\'fl sblc\' align=\'left\' nowrap=\'\' width=\'25%\'><a href=\'/advanced_search?hl=en-IN&amp;authuser=0\'>Advanced search</a><a href=\'/language_tools?hl=en-IN&amp;authuser=0\'>Language tools</a></td></tr></table><input id=\'gbv\' name=\'gbv\' type=\'hidden\' value=\'1\'></form><div id=\'gac_scont\'></div><div style=\'font-size:83%;min-height:3.5em\'><br><div id=\'als\'><style>#als{font-size:small;margin-bottom:24px}#_eEe{display:inline-block;line-height:28px;}#_eEe a{padding:0 3px;}._lEe{display:inline-block;margin:0 2px;white-space:nowrap}._PEe{display:inline-block;margin:0 2px}</style><div id=\'_eEe\'>Google.co.in offered in: <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dhi%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAU&amp;usg=AFQjCNEzHKdbfZ_VSo1opJlces7A1atK7A\'>&#2361;&#2367;&#2344;&#2381;&#2342;&#2368;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dbn%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAY&amp;usg=AFQjCNHhIpeaJx72UucgbAfReq0kKwF5OA\'>&#2476;&#2494;&#2434;&#2482;&#2494;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dte%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAc&amp;usg=AFQjCNHSrS2O2ofUSQdJTYEbXhh10Z8MLw\'>&#3108;&#3142;&#3122;&#3137;&#3095;&#3137;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dmr%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAg&amp;usg=AFQjCNFdcHaQpNcEUD2flKcypO7rdxJwUw\'>&#2350;&#2352;&#2366;&#2336;&#2368;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dta%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAk&amp;usg=AFQjCNGPdZunfVWRCphl3V9Tnewhx8Rhsw\'>&#2980;&#2990;&#3007;&#2996;&#3021;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dgu%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAo&amp;usg=AFQjCNEXDBxLu826juq0JDNlpMKdGGLY7w\'>&#2711;&#2753;&#2716;&#2736;&#2750;&#2724;&#2752;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dkn%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAs&amp;usg=AFQjCNHt4gbjZX4RQWTZKB3vDpEVHvbDag\'>&#3221;&#3240;&#3277;&#3240;&#3233;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dml%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAw&amp;usg=AFQjCNHCxBbG6vS6UI-awXTsM3IZaVf6jQ\'>&#3374;&#3378;&#3375;&#3390;&#3379;&#3330;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dpa%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCA0&amp;usg=AFQjCNEIeXb2FY73rPeXzNmUB4441453UQ\'>&#2602;&#2672;&#2588;&#2622;&#2604;&#2624;</a> </div></div></div><span id=\'footer\'><div style=\'font-size:10pt\'><div style=\'margin:19px auto;text-align:center\' id=\'fll\'><a href=\'/intl/en/ads/\'>Advertising Programs</a><a href=\'http://www.google.co.in/services/\'>Business Solutions</a><a href=\'https://plus.google.com/104205742743787718296\' rel=\'publisher\'>+Google</a><a href=\'/intl/en/about.html\'>About Google</a><a href=\'https://www.google.co.in/setprefdomain?prefdom=US&amp;sig=__TreHjR8x1Is3H1TXAuZgUWYzPPY%3D\' id=\'fehl\'>Google.com</a></div></div><p style=\'color:#767676;font-size:8pt\'>&copy; 2017 - <a href=\'/intl/en/policies/privacy/\'>Privacy</a> - <a href=\'/intl/en/policies/terms/\'>Terms</a></p></span></center><script>(function(){window.google.cdo={height:0,width:0};(function(){var a=window.innerWidth,b=window.innerHeight;if(!a||!b)var c=window.document,d=\'CSS1Compat\'==c.compatMode?c.documentElement:c.body,a=d.clientWidth,b=d.clientHeight;a&&b&&(a!=google.cdo.width||b!=google.cdo.height)&&google.log(\'\',\'\',\'/client_204?&atyp=i&biw=\'+a+\'&bih=\'+b+\'&ei=\'+google.kEI);}).call(this);})();</script><div id=\'xjsd\'></div><div id=\'xjsi\'><script>(function(){function c(b){window.setTimeout(function(){var a=document.createElement(\'script\');a.src=b;document.getElementById(\'xjsd\').appendChild(a)},0)}google.dljp=function(b,a){google.xjsu=b;c(a)};google.dlj=c;}).call(this);(function(){window.google.xjsrm=[];})();if(google.y)google.y.first=[];if(!google.xjs){window._=window._||{};window._DumpException=window._._DumpException=function(e){throw e};if(google.timers&&google.timers.load.t){google.timers.load.t.xjsls=new Date().getTime();}google.dljp(\'/xjs/_/js/k\\x3dxjs.hp.en_US.jpg35lljDw8.O/m\\x3dsb_he,d/am\\x3dAAY/rt\\x3dj/d\\x3d1/t\\x3dzcms/rs\\x3dACT90oHWQP6BUfNV29m3nDJl2BYgb4wwZA\',\'/xjs/_/js/k\\x3dxjs.hp.en_US.jpg35lljDw8.O/m\\x3dsb_he,d/am\\x3dAAY/rt\\x3dj/d\\x3d1/t\\x3dzcms/rs\\x3dACT90oHWQP6BUfNV29m3nDJl2BYgb4wwZA\');google.xjs=1;}google.pmc={\'sb_he\':{\'agen\':false,\'cgen\':false,\'client\':\'heirloom-hp\',\'dh\':true,\'dhqt\':true,\'ds\':\'\',\'fl\':true,\'host\':\'google.co.in\',\'isbh\':28,\'jam\':0,\'jsonp\':true,\'msgs\':{\'cibl\':\'Clear Search\',\'dym\':\'Did you mean:\',\'lcky\':\'I\\u0026#39;m Feeling Lucky\',\'lml\':\'Learn more\',\'oskt\':\'Input tools\',\'psrc\':\'This search was removed from your \\u003Ca href=\\\'/history\\\'\\u003EWeb History\\u003C/a\\u003E\',\'psrl\':\'Remove\',\'sbit\':\'Search by image\',\'srch\':\'Google Search\'},\'nds\':true,\'ovr\':{},\'pq\':\'\',\'refpd\':true,\'rfs\':[],\'sbpl\':24,\'sbpr\':24,\'scd\':10,\'sce\':5,\'stok\':\'EB7eP-qzYuUnYszeMLmFkgvvB_c\'},\'d\':{},\'aWiv7g\':{},\'YFCs/g\':{}};google.y.first.push(function(){if(google.med){google.med(\'init\');google.initHistory();google.med(\'history\');}});if(google.j&&google.j.en&&google.j.xi){window.setTimeout(google.j.xi,0);}\n</script></div></body></html>',
                language: 'html',
                previewType: 'text',
                code: 200,
                responseSize: {
                    body: 14560,
                    header: 669
                },
                mimeType: 'text',
                fileName: 'response.html',
                // eslint-disable-next-line max-len
                dataURI: 'data:text/html;base64, PCFkb2N0eXBlIGh0bWw+PGh0bWwgaXRlbXNjb3BlPSIiIGl0ZW10eXBlPSJodHRwOi8vc2NoZW1hLm9yZy9XZWJQYWdlIiBsYW5nPSJlbi1JTiI+PGhlYWQ+PG1ldGEgY29udGVudD0idGV4dC9odG1sOyBjaGFyc2V0PVVURi04IiBodHRwLWVxdWl2PSJDb250ZW50LVR5cGUiPjxtZXRhIGNvbnRlbnQ9Ii9pbWFnZXMvYnJhbmRpbmcvZ29vZ2xlZy8xeC9nb29nbGVnX3N0YW5kYXJkX2NvbG9yXzEyOGRwLnBuZyIgaXRlbXByb3A9ImltYWdlIj48dGl0bGU+R29vZ2xlPC90aXRsZT48c2NyaXB0PihmdW5jdGlvbigpe3dpbmRvdy5nb29nbGU9e2tFSTonY3RnZVdlcWJMWVRpdkFTczA0LWdDdycsa0VYUEk6JzIwMTc2MSwxMzUyOTYxLDEzNTMzOTQsMzcwMDMzOSwzNzAwMzQ3LDM3MDA0MTAsMzcwMDQyNSw0MDI5ODE1LDQwMzExMDksNDAzMjY3OCw0MDM2NTI3LDQwMzkyNjgsNDA0MzQ5Miw0MDQ1ODQxLDQwNDgzNDcsNDA2NTc4Nyw0MDcxODQyLDQwNzIzNjQsNDA3Mjc3NCw0MDc2MDk2LDQwNzY5OTksNDA3ODQzMCw0MDgxMDM5LDQwODExNjQsNDA4NDE3OSw0MDg0OTc3LDQwODU0NzIsNDA5MDU1MCw0MDkwNTUzLDQwOTE0MjAsNDA5MjIzMSw0MDkzMTY5LDQwOTMzMTQsNDA5NDI1MSw0MDk0NTQyLDQwOTU5MTAsNDA5NjMyNCw0MDk3MTUzLDQwOTc5MjIsNDA5NzkyOSw0MDk3OTUxLDQwOTgwOTYsNDA5ODczMyw0MDk4NzQwLDQwOTg3NTIsNDEwMTQyOSw0MTAxNDMwLDQxMDE0MzcsNDEwMTc1MCw0MTAyMjM4LDQxMDM0NzUsNDEwMzg0NSw0MTA0MjA0LDQxMDUwODUsNDEwNTE3OCw0MTA1MzE3LDQxMDUzMjEsNDEwNjE2NCw0MTA2NjA2LDQxMDY5NDksNDEwNzQxNyw0MTA3NTU1LDQxMDc2MjgsNDEwODUwNSw0MTA4NTM3LDQxMDg1MzksNDEwOTIyMSw0MTA5MzE2LDQxMDk0MzksNDEwOTQ4OSw0MTA5NDk4LDQxMDk1MjQsNDEwOTUzOSw0MTA5NjI5LDQxMTAyNTksNDExMDM2MSw0MTEwMzgwLDQxMTA0MjUsNDExMDY1Niw0MTEwODk5LDQxMTExMjcsNDExMTQyMSw0MTExNjA3LDQxMTE2MTIsNDExMTc5Miw0MTEyMDA5LDQxMTIwNDEsNDExMjMxNiw0MTEyMzE4LDQxMTI4MjcsODUwMzU4NSw4NTA4MjI5LDg1MDg2MDcsODUwODkzMSw4NTA5MDM3LDg1MDkwOTEsODUwOTM3Myw4NTEwMzQzLDg1MTMwMjYsMTAyMDAwODMsMTAyMDAwOTYsMTAyMDE5NTcsMTkwMDIxMTUsMTkwMDIxNzQsMTkwMDIyODEsMTkwMDIyOTQsMTkwMDIyOTYsMTkwMDIyOTcsNDEwMjczNDAnLGF1dGh1c2VyOjAsa3NjczonYzljOTE4ZjBfMjQnfTtnb29nbGUua0hMPSdlbi1JTic7fSkoKTsoZnVuY3Rpb24oKXtnb29nbGUubGM9W107Z29vZ2xlLmxpPTA7Z29vZ2xlLmdldEVJPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYjthJiYoIWEuZ2V0QXR0cmlidXRlfHwhKGI9YS5nZXRBdHRyaWJ1dGUoImVpZCIpKSk7KWE9YS5wYXJlbnROb2RlO3JldHVybiBifHxnb29nbGUua0VJfTtnb29nbGUuZ2V0TEVJPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1udWxsO2EmJighYS5nZXRBdHRyaWJ1dGV8fCEoYj1hLmdldEF0dHJpYnV0ZSgibGVpZCIpKSk7KWE9YS5wYXJlbnROb2RlO3JldHVybiBifTtnb29nbGUuaHR0cHM9ZnVuY3Rpb24oKXtyZXR1cm4iaHR0cHM6Ij09d2luZG93LmxvY2F0aW9uLnByb3RvY29sfTtnb29nbGUubWw9ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbH07Z29vZ2xlLndsPWZ1bmN0aW9uKGEsYil7dHJ5e2dvb2dsZS5tbChFcnJvcihhKSwhMSxiKX1jYXRjaChjKXt9fTtnb29nbGUudGltZT1mdW5jdGlvbigpe3JldHVybihuZXcgRGF0ZSkuZ2V0VGltZSgpfTtnb29nbGUubG9nPWZ1bmN0aW9uKGEsYixjLGQsZyl7YT1nb29nbGUubG9nVXJsKGEsYixjLGQsZyk7aWYoIiIhPWEpe2I9bmV3IEltYWdlO3ZhciBlPWdvb2dsZS5sYyxmPWdvb2dsZS5saTtlW2ZdPWI7Yi5vbmVycm9yPWIub25sb2FkPWIub25hYm9ydD1mdW5jdGlvbigpe2RlbGV0ZSBlW2ZdfTt3aW5kb3cuZ29vZ2xlJiZ3aW5kb3cuZ29vZ2xlLnZlbCYmd2luZG93Lmdvb2dsZS52ZWwubHUmJndpbmRvdy5nb29nbGUudmVsLmx1KGEpO2Iuc3JjPWE7Z29vZ2xlLmxpPWYrMX19O2dvb2dsZS5sb2dVcmw9ZnVuY3Rpb24oYSxiLGMsZCxnKXt2YXIgZT0iIixmPWdvb2dsZS5sc3x8IiI7Y3x8LTEhPWIuc2VhcmNoKCImZWk9Iil8fChlPSImZWk9Iitnb29nbGUuZ2V0RUkoZCksLTE9PWIuc2VhcmNoKCImbGVpPSIpJiYoZD1nb29nbGUuZ2V0TEVJKGQpKSYmKGUrPSImbGVpPSIrZCkpO2E9Y3x8Ii8iKyhnfHwiZ2VuXzIwNCIpKyI/YXR5cD1pJmN0PSIrYSsiJmNhZD0iK2IrZStmKyImeng9Iitnb29nbGUudGltZSgpOy9eaHR0cDovaS50ZXN0KGEpJiZnb29nbGUuaHR0cHMoKSYmKGdvb2dsZS5tbChFcnJvcigiYSIpLCExLHtzcmM6YSxnbG1tOjF9KSxhPSIiKTtyZXR1cm4gYX07Z29vZ2xlLnk9e307Z29vZ2xlLng9ZnVuY3Rpb24oYSxiKXtnb29nbGUueVthLmlkXT1bYSxiXTtyZXR1cm4hMX07Z29vZ2xlLmxxPVtdO2dvb2dsZS5sb2FkPWZ1bmN0aW9uKGEsYixjKXtnb29nbGUubHEucHVzaChbW2FdLGIsY10pfTtnb29nbGUubG9hZEFsbD1mdW5jdGlvbihhLGIpe2dvb2dsZS5scS5wdXNoKFthLGJdKX07fSkuY2FsbCh0aGlzKTtnb29nbGUuZj17fTt2YXIgYT13aW5kb3cubG9jYXRpb24sYj1hLmhyZWYuaW5kZXhPZigiIyIpO2lmKDA8PWIpe3ZhciBjPWEuaHJlZi5zdWJzdHJpbmcoYisxKTsvKF58JilxPS8udGVzdChjKSYmLTE9PWMuaW5kZXhPZigiIyIpJiZhLnJlcGxhY2UoIi9zZWFyY2g/IitjLnJlcGxhY2UoLyhefCYpZnA9W14mXSovZywiIikrIiZjYWQ9aCIpfTs8L3NjcmlwdD48c3R5bGU+I2diYXIsI2d1c2Vye2ZvbnQtc2l6ZToxM3B4O3BhZGRpbmctdG9wOjFweCAhaW1wb3J0YW50O30jZ2JhcntoZWlnaHQ6MjJweH0jZ3VzZXJ7cGFkZGluZy1ib3R0b206N3B4ICFpbXBvcnRhbnQ7dGV4dC1hbGlnbjpyaWdodH0uZ2JoLC5nYmR7Ym9yZGVyLXRvcDoxcHggc29saWQgI2M5ZDdmMTtmb250LXNpemU6MXB4fS5nYmh7aGVpZ2h0OjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOjI0cHg7d2lkdGg6MTAwJX1AbWVkaWEgYWxsey5nYjF7aGVpZ2h0OjIycHg7bWFyZ2luLXJpZ2h0Oi41ZW07dmVydGljYWwtYWxpZ246dG9wfSNnYmFye2Zsb2F0OmxlZnR9fWEuZ2IxLGEuZ2I0e3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmUgIWltcG9ydGFudH1hLmdiMSxhLmdiNHtjb2xvcjojMDBjICFpbXBvcnRhbnR9LmdiaSAuZ2I0e2NvbG9yOiNkZDhlMjcgIWltcG9ydGFudH0uZ2JmIC5nYjR7Y29sb3I6IzkwMCAhaW1wb3J0YW50fQo8L3N0eWxlPjxzdHlsZT5ib2R5LHRkLGEscCwuaHtmb250LWZhbWlseTphcmlhbCxzYW5zLXNlcmlmfWJvZHl7bWFyZ2luOjA7b3ZlcmZsb3cteTpzY3JvbGx9I2dvZ3twYWRkaW5nOjNweCA4cHggMH10ZHtsaW5lLWhlaWdodDouOGVtfS5nYWNfbSB0ZHtsaW5lLWhlaWdodDoxN3B4fWZvcm17bWFyZ2luLWJvdHRvbToyMHB4fS5oe2NvbG9yOiMzNmN9LnF7Y29sb3I6IzAwY30udHMgdGR7cGFkZGluZzowfS50c3tib3JkZXItY29sbGFwc2U6Y29sbGFwc2V9ZW17Zm9udC13ZWlnaHQ6Ym9sZDtmb250LXN0eWxlOm5vcm1hbH0ubHN0e2hlaWdodDoyNXB4O3dpZHRoOjQ5NnB4fS5nc2ZpLC5sc3R7Zm9udDoxOHB4IGFyaWFsLHNhbnMtc2VyaWZ9LmdzZnN7Zm9udDoxN3B4IGFyaWFsLHNhbnMtc2VyaWZ9LmRze2Rpc3BsYXk6aW5saW5lLWJveDtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46M3B4IDAgNHB4O21hcmdpbi1sZWZ0OjRweH1pbnB1dHtmb250LWZhbWlseTppbmhlcml0fWEuZ2IxLGEuZ2IyLGEuZ2IzLGEuZ2I0e2NvbG9yOiMxMWMgIWltcG9ydGFudH1ib2R5e2JhY2tncm91bmQ6I2ZmZjtjb2xvcjpibGFja31he2NvbG9yOiMxMWM7dGV4dC1kZWNvcmF0aW9uOm5vbmV9YTpob3ZlcixhOmFjdGl2ZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS5mbCBhe2NvbG9yOiMzNmN9YTp2aXNpdGVke2NvbG9yOiM1NTFhOGJ9YS5nYjEsYS5nYjR7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX1hLmdiMzpob3Zlcnt0ZXh0LWRlY29yYXRpb246bm9uZX0jZ2hlYWQgYS5nYjI6aG92ZXJ7Y29sb3I6I2ZmZiAhaW1wb3J0YW50fS5zYmxje3BhZGRpbmctdG9wOjVweH0uc2JsYyBhe2Rpc3BsYXk6YmxvY2s7bWFyZ2luOjJweCAwO21hcmdpbi1sZWZ0OjEzcHg7Zm9udC1zaXplOjExcHh9LmxzYmJ7YmFja2dyb3VuZDojZWVlO2JvcmRlcjpzb2xpZCAxcHg7Ym9yZGVyLWNvbG9yOiNjY2MgIzk5OSAjOTk5ICNjY2M7aGVpZ2h0OjMwcHh9LmxzYmJ7ZGlzcGxheTpibG9ja30uZnRsLCNmbGwgYXtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46MCAxMnB4fS5sc2J7YmFja2dyb3VuZDp1cmwoL2ltYWdlcy9uYXZfbG9nbzIyOS5wbmcpIDAgLTI2MXB4IHJlcGVhdC14O2JvcmRlcjpub25lO2NvbG9yOiMwMDA7Y3Vyc29yOnBvaW50ZXI7aGVpZ2h0OjMwcHg7bWFyZ2luOjA7b3V0bGluZTowO2ZvbnQ6MTVweCBhcmlhbCxzYW5zLXNlcmlmO3ZlcnRpY2FsLWFsaWduOnRvcH0ubHNiOmFjdGl2ZXtiYWNrZ3JvdW5kOiNjY2N9LmxzdDpmb2N1c3tvdXRsaW5lOm5vbmV9PC9zdHlsZT48c2NyaXB0PihmdW5jdGlvbigpe3dpbmRvdy5nb29nbGUuZXJkPXtzcDonaHAnLGpzcjoxLGJ2OjExLGNzOmZhbHNlfTt2YXIgZj0wLGcsaD1nb29nbGUuZXJkLGs9aC5qc3IsbDtnb29nbGUuanNtcD0hMDtnb29nbGUubWw9ZnVuY3Rpb24oYSxiLGMsZSl7Z29vZ2xlLmRsJiZnb29nbGUuZGwoYSxjLGIpO2lmKGdvb2dsZS5fZXBjKGEsYixjLGUpKXJldHVybiBudWxsO2E9Z29vZ2xlLl9nbGQoYSwiL2dlbl8yMDQ/YXR5cD1pIixjfHx7fSwhMSk7ZXx8Z29vZ2xlLmxvZygwLCIiLGEpO3JldHVybiBhfTtnb29nbGUuX2VwYz1mdW5jdGlvbihhLGIsYyxlKXt2YXIgZD1nb29nbGUuZXJkLmpzcjtpZigwPmQpe3dpbmRvdy5jb25zb2xlJiZjb25zb2xlLmVycm9yKGEsYyk7aWYoLTI9PWQpdGhyb3cgYTtyZXR1cm4hMH1pZighYXx8IWEubWVzc2FnZXx8IkVycm9yIGxvYWRpbmcgc2NyaXB0Ij09YS5tZXNzYWdlfHwhKG0oKSYmMT5mfHxlKSlyZXR1cm4hMDtmKys7YiYmKGc9YSYmYS5tZXNzYWdlKTtyZXR1cm4hMX07Z29vZ2xlLl9nbGQ9ZnVuY3Rpb24oYSxiLGMsZSl7Yj1iKyImZWk9IitlbmNvZGVVUklDb21wb25lbnQoZ29vZ2xlLmtFSSkrIiZqZXhwaWQ9IitlbmNvZGVVUklDb21wb25lbnQoZ29vZ2xlLmtFWFBJKSsiJnNyY3BnPSIrZW5jb2RlVVJJQ29tcG9uZW50KGguc3ApKyImanNyPSIrZ29vZ2xlLmVyZC5qc3IrIiZidmVyPSIrZW5jb2RlVVJJQ29tcG9uZW50KGguYnYpO2Zvcih2YXIgZCBpbiBjKWIrPSImIixiKz1lbmNvZGVVUklDb21wb25lbnQoZCksYis9Ij0iLGIrPWVuY29kZVVSSUNvbXBvbmVudChjW2RdKTtiPWIrIiZlbXNnPSIrZW5jb2RlVVJJQ29tcG9uZW50KGEubmFtZSsiOiAiK2EubWVzc2FnZSk7Yj1iKyImanNzdD0iK2VuY29kZVVSSUNvbXBvbmVudChhLnN0YWNrfHwiTi9BIik7IWUmJjJFMzw9Yi5sZW5ndGgmJihiPWIuc3Vic3RyKDAsMkUzKSk7cmV0dXJuIGJ9O2Z1bmN0aW9uIG0oKXtpZighaC5jcylyZXR1cm4hMDt2YXIgYT1nb29nbGUuZXJkLmpzcjt2b2lkIDA9PWwmJihsPTA+YXx8MT09YXx8MT09TWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqYSkpO3JldHVybiBsfWdvb2dsZS5vanNyPWZ1bmN0aW9uKGEpe2dvb2dsZS5lcmQuanNyPWE7bD12b2lkIDB9O2dvb2dsZS5yanNyPWZ1bmN0aW9uKCl7Z29vZ2xlLmVyZC5qc3I9aztsPXZvaWQgMH07d2luZG93Lm9uZXJyb3I9ZnVuY3Rpb24oYSxiLGMsZSxkKXtnIT09YSYmZ29vZ2xlLm1sKGQgaW5zdGFuY2VvZiBFcnJvcj9kOkVycm9yKGEpLCExKTtnPW51bGw7bSgpJiYxPmZ8fCh3aW5kb3cub25lcnJvcj1udWxsKX07fSkoKTs8L3NjcmlwdD48bGluayBocmVmPSIvaW1hZ2VzL2JyYW5kaW5nL3Byb2R1Y3QvaWNvL2dvb2dsZWdfbG9kcC5pY28iIHJlbD0ic2hvcnRjdXQgaWNvbiI+PC9oZWFkPjxib2R5IGJnY29sb3I9IiNmZmYiPjxzY3JpcHQ+KGZ1bmN0aW9uKCl7dmFyIHNyYz0nL2ltYWdlcy9uYXZfbG9nbzIyOS5wbmcnO3ZhciBpZXNnPWZhbHNlO2RvY3VtZW50LmJvZHkub25sb2FkID0gZnVuY3Rpb24oKXt3aW5kb3cubiAmJiB3aW5kb3cubigpO2lmIChkb2N1bWVudC5pbWFnZXMpe25ldyBJbWFnZSgpLnNyYz1zcmM7fQppZiAoIWllc2cpe2RvY3VtZW50LmYmJmRvY3VtZW50LmYucS5mb2N1cygpO2RvY3VtZW50LmdicWYmJmRvY3VtZW50LmdicWYucS5mb2N1cygpO30KfQp9KSgpOzwvc2NyaXB0PjxkaXYgaWQ9Im1uZ2IiPiA8ZGl2IGlkPWdiYXI+PG5vYnI+PGIgY2xhc3M9Z2IxPlNlYXJjaDwvYj4gPGEgY2xhc3M9Z2IxIGhyZWY9Imh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi9pbWdocD9obD1lbiZ0YWI9d2kiPkltYWdlczwvYT4gPGEgY2xhc3M9Z2IxIGhyZWY9Imh0dHBzOi8vbWFwcy5nb29nbGUuY28uaW4vbWFwcz9obD1lbiZ0YWI9d2wiPk1hcHM8L2E+IDxhIGNsYXNzPWdiMSBocmVmPSJodHRwczovL3BsYXkuZ29vZ2xlLmNvbS8/aGw9ZW4mdGFiPXc4Ij5QbGF5PC9hPiA8YSBjbGFzcz1nYjEgaHJlZj0iaHR0cHM6Ly93d3cueW91dHViZS5jb20vP2dsPUlOJnRhYj13MSI+WW91VHViZTwvYT4gPGEgY2xhc3M9Z2IxIGhyZWY9Imh0dHBzOi8vbmV3cy5nb29nbGUuY28uaW4vbndzaHA/aGw9ZW4mdGFiPXduIj5OZXdzPC9hPiA8YSBjbGFzcz1nYjEgaHJlZj0iaHR0cHM6Ly9tYWlsLmdvb2dsZS5jb20vbWFpbC8/dGFiPXdtIj5HbWFpbDwvYT4gPGEgY2xhc3M9Z2IxIGhyZWY9Imh0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS8/dGFiPXdvIj5Ecml2ZTwvYT4gPGEgY2xhc3M9Z2IxIHN0eWxlPSJ0ZXh0LWRlY29yYXRpb246bm9uZSIgaHJlZj0iaHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmluL2ludGwvZW4vb3B0aW9ucy8iPjx1Pk1vcmU8L3U+ICZyYXF1bzs8L2E+PC9ub2JyPjwvZGl2PjxkaXYgaWQ9Z3VzZXIgd2lkdGg9MTAwJT48bm9icj48c3BhbiBpZD1nYm4gY2xhc3M9Z2JpPjwvc3Bhbj48c3BhbiBpZD1nYmYgY2xhc3M9Z2JmPjwvc3Bhbj48c3BhbiBpZD1nYmU+PC9zcGFuPjxhIGhyZWY9Imh0dHA6Ly93d3cuZ29vZ2xlLmNvLmluL2hpc3Rvcnkvb3B0b3V0P2hsPWVuIiBjbGFzcz1nYjQ+V2ViIEhpc3Rvcnk8L2E+IHwgPGEgIGhyZWY9Ii9wcmVmZXJlbmNlcz9obD1lbiIgY2xhc3M9Z2I0PlNldHRpbmdzPC9hPiB8IDxhIHRhcmdldD1fdG9wIGlkPWdiXzcwIGhyZWY9Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9TZXJ2aWNlTG9naW4/aGw9ZW4mcGFzc2l2ZT10cnVlJmNvbnRpbnVlPWh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi8lM0ZnZmVfcmQlM0RjciUyNmVpJTNEY3RnZVdZU0VJTFR2OHdlRHBZVG9EdyIgY2xhc3M9Z2I0PlNpZ24gaW48L2E+PC9ub2JyPjwvZGl2PjxkaXYgY2xhc3M9Z2JoIHN0eWxlPWxlZnQ6MD48L2Rpdj48ZGl2IGNsYXNzPWdiaCBzdHlsZT1yaWdodDowPjwvZGl2PiA8L2Rpdj48Y2VudGVyPjxiciBjbGVhcj0iYWxsIiBpZD0ibGdwZCI+PGRpdiBpZD0ibGdhIj48ZGl2IHN0eWxlPSJwYWRkaW5nOjI4cHggMCAzcHgiPjxkaXYgc3R5bGU9ImhlaWdodDoxMTBweDt3aWR0aDoyNzZweDtiYWNrZ3JvdW5kOnVybCgvaW1hZ2VzL2JyYW5kaW5nL2dvb2dsZWxvZ28vMXgvZ29vZ2xlbG9nb193aGl0ZV9iYWNrZ3JvdW5kX2NvbG9yXzI3Mng5MmRwLnBuZykgbm8tcmVwZWF0IiB0aXRsZT0iR29vZ2xlIiBhbGlnbj0ibGVmdCIgaWQ9ImhwbG9nbyIgb25sb2FkPSJ3aW5kb3cubG9sJiZsb2woKSI+PGRpdiBzdHlsZT0iY29sb3I6Izc3Nztmb250LXNpemU6MTZweDtmb250LXdlaWdodDpib2xkO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo3MHB4O2xlZnQ6MjE4cHgiIG5vd3JhcD0iIj5JbmRpYTwvZGl2PjwvZGl2PjwvZGl2Pjxicj48L2Rpdj48Zm9ybSBhY3Rpb249Ii9zZWFyY2giIG5hbWU9ImYiPjx0YWJsZSBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiPjx0ciB2YWxpZ249InRvcCI+PHRkIHdpZHRoPSIyNSUiPiZuYnNwOzwvdGQ+PHRkIGFsaWduPSJjZW50ZXIiIG5vd3JhcD0iIj48aW5wdXQgbmFtZT0iaWUiIHZhbHVlPSJJU08tODg1OS0xIiB0eXBlPSJoaWRkZW4iPjxpbnB1dCB2YWx1ZT0iZW4tSU4iIG5hbWU9ImhsIiB0eXBlPSJoaWRkZW4iPjxpbnB1dCBuYW1lPSJzb3VyY2UiIHR5cGU9ImhpZGRlbiIgdmFsdWU9ImhwIj48aW5wdXQgbmFtZT0iYml3IiB0eXBlPSJoaWRkZW4iPjxpbnB1dCBuYW1lPSJiaWgiIHR5cGU9ImhpZGRlbiI+PGRpdiBjbGFzcz0iZHMiIHN0eWxlPSJoZWlnaHQ6MzJweDttYXJnaW46NHB4IDAiPjxpbnB1dCBzdHlsZT0iY29sb3I6IzAwMDttYXJnaW46MDtwYWRkaW5nOjVweCA4cHggMCA2cHg7dmVydGljYWwtYWxpZ246dG9wIiBhdXRvY29tcGxldGU9Im9mZiIgY2xhc3M9ImxzdCIgdmFsdWU9IiIgdGl0bGU9Ikdvb2dsZSBTZWFyY2giIG1heGxlbmd0aD0iMjA0OCIgbmFtZT0icSIgc2l6ZT0iNTciPjwvZGl2PjxiciBzdHlsZT0ibGluZS1oZWlnaHQ6MCI+PHNwYW4gY2xhc3M9ImRzIj48c3BhbiBjbGFzcz0ibHNiYiI+PGlucHV0IGNsYXNzPSJsc2IiIHZhbHVlPSJHb29nbGUgU2VhcmNoIiBuYW1lPSJidG5HIiB0eXBlPSJzdWJtaXQiPjwvc3Bhbj48L3NwYW4+PHNwYW4gY2xhc3M9ImRzIj48c3BhbiBjbGFzcz0ibHNiYiI+PGlucHV0IGNsYXNzPSJsc2IiIHZhbHVlPSJJJ20gRmVlbGluZyBMdWNreSIgbmFtZT0iYnRuSSIgb25jbGljaz0iaWYodGhpcy5mb3JtLnEudmFsdWUpdGhpcy5jaGVja2VkPTE7IGVsc2UgdG9wLmxvY2F0aW9uPScvZG9vZGxlcy8nIiB0eXBlPSJzdWJtaXQiPjwvc3Bhbj48L3NwYW4+PC90ZD48dGQgY2xhc3M9ImZsIHNibGMiIGFsaWduPSJsZWZ0IiBub3dyYXA9IiIgd2lkdGg9IjI1JSI+PGEgaHJlZj0iL2FkdmFuY2VkX3NlYXJjaD9obD1lbi1JTiZhbXA7YXV0aHVzZXI9MCI+QWR2YW5jZWQgc2VhcmNoPC9hPjxhIGhyZWY9Ii9sYW5ndWFnZV90b29scz9obD1lbi1JTiZhbXA7YXV0aHVzZXI9MCI+TGFuZ3VhZ2UgdG9vbHM8L2E+PC90ZD48L3RyPjwvdGFibGU+PGlucHV0IGlkPSJnYnYiIG5hbWU9ImdidiIgdHlwZT0iaGlkZGVuIiB2YWx1ZT0iMSI+PC9mb3JtPjxkaXYgaWQ9ImdhY19zY29udCI+PC9kaXY+PGRpdiBzdHlsZT0iZm9udC1zaXplOjgzJTttaW4taGVpZ2h0OjMuNWVtIj48YnI+PGRpdiBpZD0iYWxzIj48c3R5bGU+I2Fsc3tmb250LXNpemU6c21hbGw7bWFyZ2luLWJvdHRvbToyNHB4fSNfZUVle2Rpc3BsYXk6aW5saW5lLWJsb2NrO2xpbmUtaGVpZ2h0OjI4cHg7fSNfZUVlIGF7cGFkZGluZzowIDNweDt9Ll9sRWV7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luOjAgMnB4O3doaXRlLXNwYWNlOm5vd3JhcH0uX1BFZXtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46MCAycHh9PC9zdHlsZT48ZGl2IGlkPSJfZUVlIj5Hb29nbGUuY28uaW4gb2ZmZXJlZCBpbjogPGEgaHJlZj0iL3VybD9xPWh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi9zZXRwcmVmcyUzRnNpZyUzRDBfaXR1TW9OSDJ1Qlhicy0zZEZsZkVob3dLX2FJJTI1M0QlMjZobCUzRGhpJTI2c291cmNlJTNEaG9tZXBhZ2UmYW1wO3NhPVUmYW1wO3ZlZD0wYWhVS0V3anFuUFBSN3Z2VEFoVUVNWThLSGF6cEE3UVEyWmdCQ0FVJmFtcDt1c2c9QUZRakNORXpIS2RiZlpfVlNvMW9wSmxjZXM3QTFhdEs3QSI+JiMyMzYxOyYjMjM2NzsmIzIzNDQ7JiMyMzgxOyYjMjM0MjsmIzIzNjg7PC9hPiAgPGEgaHJlZj0iL3VybD9xPWh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi9zZXRwcmVmcyUzRnNpZyUzRDBfaXR1TW9OSDJ1Qlhicy0zZEZsZkVob3dLX2FJJTI1M0QlMjZobCUzRGJuJTI2c291cmNlJTNEaG9tZXBhZ2UmYW1wO3NhPVUmYW1wO3ZlZD0wYWhVS0V3anFuUFBSN3Z2VEFoVUVNWThLSGF6cEE3UVEyWmdCQ0FZJmFtcDt1c2c9QUZRakNOSGhJcGVhSng3MlV1Y2diQWZSZXEwa0t3RjVPQSI+JiMyNDc2OyYjMjQ5NDsmIzI0MzQ7JiMyNDgyOyYjMjQ5NDs8L2E+ICA8YSBocmVmPSIvdXJsP3E9aHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmluL3NldHByZWZzJTNGc2lnJTNEMF9pdHVNb05IMnVCWGJzLTNkRmxmRWhvd0tfYUklMjUzRCUyNmhsJTNEdGUlMjZzb3VyY2UlM0Rob21lcGFnZSZhbXA7c2E9VSZhbXA7dmVkPTBhaFVLRXdqcW5QUFI3dnZUQWhVRU1ZOEtIYXpwQTdRUTJaZ0JDQWMmYW1wO3VzZz1BRlFqQ05IU3JTMk8yb2ZVU1FkSlRZRWJYaGgxMFo4TUx3Ij4mIzMxMDg7JiMzMTQyOyYjMzEyMjsmIzMxMzc7JiMzMDk1OyYjMzEzNzs8L2E+ICA8YSBocmVmPSIvdXJsP3E9aHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmluL3NldHByZWZzJTNGc2lnJTNEMF9pdHVNb05IMnVCWGJzLTNkRmxmRWhvd0tfYUklMjUzRCUyNmhsJTNEbXIlMjZzb3VyY2UlM0Rob21lcGFnZSZhbXA7c2E9VSZhbXA7dmVkPTBhaFVLRXdqcW5QUFI3dnZUQWhVRU1ZOEtIYXpwQTdRUTJaZ0JDQWcmYW1wO3VzZz1BRlFqQ05GZGNIYVFwTmNFVUQyZmxLY3lwTzdyZHhKd1V3Ij4mIzIzNTA7JiMyMzUyOyYjMjM2NjsmIzIzMzY7JiMyMzY4OzwvYT4gIDxhIGhyZWY9Ii91cmw/cT1odHRwczovL3d3dy5nb29nbGUuY28uaW4vc2V0cHJlZnMlM0ZzaWclM0QwX2l0dU1vTkgydUJYYnMtM2RGbGZFaG93S19hSSUyNTNEJTI2aGwlM0R0YSUyNnNvdXJjZSUzRGhvbWVwYWdlJmFtcDtzYT1VJmFtcDt2ZWQ9MGFoVUtFd2pxblBQUjd2dlRBaFVFTVk4S0hhenBBN1FRMlpnQkNBayZhbXA7dXNnPUFGUWpDTkdQZFp1bmZWV1JDcGhsM1Y5VG5ld2h4OFJoc3ciPiYjMjk4MDsmIzI5OTA7JiMzMDA3OyYjMjk5NjsmIzMwMjE7PC9hPiAgPGEgaHJlZj0iL3VybD9xPWh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi9zZXRwcmVmcyUzRnNpZyUzRDBfaXR1TW9OSDJ1Qlhicy0zZEZsZkVob3dLX2FJJTI1M0QlMjZobCUzRGd1JTI2c291cmNlJTNEaG9tZXBhZ2UmYW1wO3NhPVUmYW1wO3ZlZD0wYWhVS0V3anFuUFBSN3Z2VEFoVUVNWThLSGF6cEE3UVEyWmdCQ0FvJmFtcDt1c2c9QUZRakNORVhEQnhMdTgyNmp1cTBKRE5scE1LZEdHTFk3dyI+JiMyNzExOyYjMjc1MzsmIzI3MTY7JiMyNzM2OyYjMjc1MDsmIzI3MjQ7JiMyNzUyOzwvYT4gIDxhIGhyZWY9Ii91cmw/cT1odHRwczovL3d3dy5nb29nbGUuY28uaW4vc2V0cHJlZnMlM0ZzaWclM0QwX2l0dU1vTkgydUJYYnMtM2RGbGZFaG93S19hSSUyNTNEJTI2aGwlM0RrbiUyNnNvdXJjZSUzRGhvbWVwYWdlJmFtcDtzYT1VJmFtcDt2ZWQ9MGFoVUtFd2pxblBQUjd2dlRBaFVFTVk4S0hhenBBN1FRMlpnQkNBcyZhbXA7dXNnPUFGUWpDTkh0NGdialpYNFJRV1RaS0IzdkRwRVZIdmJEYWciPiYjMzIyMTsmIzMyNDA7JiMzMjc3OyYjMzI0MDsmIzMyMzM7PC9hPiAgPGEgaHJlZj0iL3VybD9xPWh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi9zZXRwcmVmcyUzRnNpZyUzRDBfaXR1TW9OSDJ1Qlhicy0zZEZsZkVob3dLX2FJJTI1M0QlMjZobCUzRG1sJTI2c291cmNlJTNEaG9tZXBhZ2UmYW1wO3NhPVUmYW1wO3ZlZD0wYWhVS0V3anFuUFBSN3Z2VEFoVUVNWThLSGF6cEE3UVEyWmdCQ0F3JmFtcDt1c2c9QUZRakNOSEN4QmJHNnZTNlVJLWF3WFRzTTNJWmFWZjZqUSI+JiMzMzc0OyYjMzM3ODsmIzMzNzU7JiMzMzkwOyYjMzM3OTsmIzMzMzA7PC9hPiAgPGEgaHJlZj0iL3VybD9xPWh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi9zZXRwcmVmcyUzRnNpZyUzRDBfaXR1TW9OSDJ1Qlhicy0zZEZsZkVob3dLX2FJJTI1M0QlMjZobCUzRHBhJTI2c291cmNlJTNEaG9tZXBhZ2UmYW1wO3NhPVUmYW1wO3ZlZD0wYWhVS0V3anFuUFBSN3Z2VEFoVUVNWThLSGF6cEE3UVEyWmdCQ0EwJmFtcDt1c2c9QUZRakNORUllWGIyRlk3M3JQZVh6Tm1VQjQ0NDE0NTNVUSI+JiMyNjAyOyYjMjY3MjsmIzI1ODg7JiMyNjIyOyYjMjYwNDsmIzI2MjQ7PC9hPiA8L2Rpdj48L2Rpdj48L2Rpdj48c3BhbiBpZD0iZm9vdGVyIj48ZGl2IHN0eWxlPSJmb250LXNpemU6MTBwdCI+PGRpdiBzdHlsZT0ibWFyZ2luOjE5cHggYXV0bzt0ZXh0LWFsaWduOmNlbnRlciIgaWQ9ImZsbCI+PGEgaHJlZj0iL2ludGwvZW4vYWRzLyI+QWR2ZXJ0aXNpbmegUHJvZ3JhbXM8L2E+PGEgaHJlZj0iaHR0cDovL3d3dy5nb29nbGUuY28uaW4vc2VydmljZXMvIj5CdXNpbmVzcyBTb2x1dGlvbnM8L2E+PGEgaHJlZj0iaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vMTA0MjA1NzQyNzQzNzg3NzE4Mjk2IiByZWw9InB1Ymxpc2hlciI+K0dvb2dsZTwvYT48YSBocmVmPSIvaW50bC9lbi9hYm91dC5odG1sIj5BYm91dCBHb29nbGU8L2E+PGEgaHJlZj0iaHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmluL3NldHByZWZkb21haW4/cHJlZmRvbT1VUyZhbXA7c2lnPV9fVHJlSGpSOHgxSXMzSDFUWEF1WmdVV1l6UFBZJTNEIiBpZD0iZmVobCI+R29vZ2xlLmNvbTwvYT48L2Rpdj48L2Rpdj48cCBzdHlsZT0iY29sb3I6Izc2NzY3Njtmb250LXNpemU6OHB0Ij4mY29weTsgMjAxNyAtIDxhIGhyZWY9Ii9pbnRsL2VuL3BvbGljaWVzL3ByaXZhY3kvIj5Qcml2YWN5PC9hPiAtIDxhIGhyZWY9Ii9pbnRsL2VuL3BvbGljaWVzL3Rlcm1zLyI+VGVybXM8L2E+PC9wPjwvc3Bhbj48L2NlbnRlcj48c2NyaXB0PihmdW5jdGlvbigpe3dpbmRvdy5nb29nbGUuY2RvPXtoZWlnaHQ6MCx3aWR0aDowfTsoZnVuY3Rpb24oKXt2YXIgYT13aW5kb3cuaW5uZXJXaWR0aCxiPXdpbmRvdy5pbm5lckhlaWdodDtpZighYXx8IWIpdmFyIGM9d2luZG93LmRvY3VtZW50LGQ9IkNTUzFDb21wYXQiPT1jLmNvbXBhdE1vZGU/Yy5kb2N1bWVudEVsZW1lbnQ6Yy5ib2R5LGE9ZC5jbGllbnRXaWR0aCxiPWQuY2xpZW50SGVpZ2h0O2EmJmImJihhIT1nb29nbGUuY2RvLndpZHRofHxiIT1nb29nbGUuY2RvLmhlaWdodCkmJmdvb2dsZS5sb2coIiIsIiIsIi9jbGllbnRfMjA0PyZhdHlwPWkmYml3PSIrYSsiJmJpaD0iK2IrIiZlaT0iK2dvb2dsZS5rRUkpO30pLmNhbGwodGhpcyk7fSkoKTs8L3NjcmlwdD48ZGl2IGlkPSJ4anNkIj48L2Rpdj48ZGl2IGlkPSJ4anNpIj48c2NyaXB0PihmdW5jdGlvbigpe2Z1bmN0aW9uIGMoYil7d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzY3JpcHQiKTthLnNyYz1iO2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJ4anNkIikuYXBwZW5kQ2hpbGQoYSl9LDApfWdvb2dsZS5kbGpwPWZ1bmN0aW9uKGIsYSl7Z29vZ2xlLnhqc3U9YjtjKGEpfTtnb29nbGUuZGxqPWM7fSkuY2FsbCh0aGlzKTsoZnVuY3Rpb24oKXt3aW5kb3cuZ29vZ2xlLnhqc3JtPVtdO30pKCk7aWYoZ29vZ2xlLnkpZ29vZ2xlLnkuZmlyc3Q9W107aWYoIWdvb2dsZS54anMpe3dpbmRvdy5fPXdpbmRvdy5ffHx7fTt3aW5kb3cuX0R1bXBFeGNlcHRpb249d2luZG93Ll8uX0R1bXBFeGNlcHRpb249ZnVuY3Rpb24oZSl7dGhyb3cgZX07aWYoZ29vZ2xlLnRpbWVycyYmZ29vZ2xlLnRpbWVycy5sb2FkLnQpe2dvb2dsZS50aW1lcnMubG9hZC50Lnhqc2xzPW5ldyBEYXRlKCkuZ2V0VGltZSgpO31nb29nbGUuZGxqcCgnL3hqcy9fL2pzL2tceDNkeGpzLmhwLmVuX1VTLmpwZzM1bGxqRHc4Lk8vbVx4M2RzYl9oZSxkL2FtXHgzZEFBWS9ydFx4M2RqL2RceDNkMS90XHgzZHpjbXMvcnNceDNkQUNUOTBvSFdRUDZCVWZOVjI5bTNuREpsMkJZZ2I0d3daQScsJy94anMvXy9qcy9rXHgzZHhqcy5ocC5lbl9VUy5qcGczNWxsakR3OC5PL21ceDNkc2JfaGUsZC9hbVx4M2RBQVkvcnRceDNkai9kXHgzZDEvdFx4M2R6Y21zL3JzXHgzZEFDVDkwb0hXUVA2QlVmTlYyOW0zbkRKbDJCWWdiNHd3WkEnKTtnb29nbGUueGpzPTE7fWdvb2dsZS5wbWM9eyJzYl9oZSI6eyJhZ2VuIjpmYWxzZSwiY2dlbiI6ZmFsc2UsImNsaWVudCI6ImhlaXJsb29tLWhwIiwiZGgiOnRydWUsImRocXQiOnRydWUsImRzIjoiIiwiZmwiOnRydWUsImhvc3QiOiJnb29nbGUuY28uaW4iLCJpc2JoIjoyOCwiamFtIjowLCJqc29ucCI6dHJ1ZSwibXNncyI6eyJjaWJsIjoiQ2xlYXIgU2VhcmNoIiwiZHltIjoiRGlkIHlvdSBtZWFuOiIsImxja3kiOiJJXHUwMDI2IzM5O20gRmVlbGluZyBMdWNreSIsImxtbCI6IkxlYXJuIG1vcmUiLCJvc2t0IjoiSW5wdXQgdG9vbHMiLCJwc3JjIjoiVGhpcyBzZWFyY2ggd2FzIHJlbW92ZWQgZnJvbSB5b3VyIFx1MDAzQ2EgaHJlZj1cIi9oaXN0b3J5XCJcdTAwM0VXZWIgSGlzdG9yeVx1MDAzQy9hXHUwMDNFIiwicHNybCI6IlJlbW92ZSIsInNiaXQiOiJTZWFyY2ggYnkgaW1hZ2UiLCJzcmNoIjoiR29vZ2xlIFNlYXJjaCJ9LCJuZHMiOnRydWUsIm92ciI6e30sInBxIjoiIiwicmVmcGQiOnRydWUsInJmcyI6W10sInNicGwiOjI0LCJzYnByIjoyNCwic2NkIjoxMCwic2NlIjo1LCJzdG9rIjoiRUI3ZVAtcXpZdVVuWXN6ZU1MbUZrZ3Z2Ql9jIn0sImQiOnt9LCJhV2l2N2ciOnt9LCJZRkNzL2ciOnt9fTtnb29nbGUueS5maXJzdC5wdXNoKGZ1bmN0aW9uKCl7aWYoZ29vZ2xlLm1lZCl7Z29vZ2xlLm1lZCgnaW5pdCcpO2dvb2dsZS5pbml0SGlzdG9yeSgpO2dvb2dsZS5tZWQoJ2hpc3RvcnknKTt9fSk7aWYoZ29vZ2xlLmomJmdvb2dsZS5qLmVuJiZnb29nbGUuai54aSl7d2luZG93LnNldFRpbWVvdXQoZ29vZ2xlLmoueGksMCk7fQo8L3NjcmlwdD48L2Rpdj48L2JvZHk+PC9odG1sPg==',
                state: {
                    size: 'normal'
                },
                id: '21c40bcc-c1d5-1f91-06df-d7f4e66d1647',
                name: 'Sample Response',
                request: {
                    id: '032e9018-188a-492d-9fbd-7e4956f48034',
                    url: 'https://google.com',
                    headers: [],
                    currentHelper: 'normal',
                    helperAttributes: {},
                    data: 'akjshgdajhsgd',
                    method: 'GET',
                    dataMode: 'raw'
                }
            };

            transformer.normalizeResponse(source, options, function (err) {
                expect(err).to.not.be.ok;

                expect(JSON.parse(JSON.stringify(source))).to.eql({
                    status: '',
                    responseCode: {
                        code: 200,
                        name: 'OK',
                        // eslint-disable-next-line max-len
                        detail: 'Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request the response will contain an entity describing or containing the result of the action.'
                    },
                    time: 412,
                    headers: [
                        {
                            key: 'Content-Type',
                            value: 'text/html; charset=ISO-8859-1',
                            name: 'Content-Type',
                            description: 'The mime type of this content'
                        },
                        {
                            key: 'X-XSS-Protection',
                            value: '1; mode=block',
                            name: 'X-XSS-Protection',
                            description: 'Cross-site scripting (XSS) filter'
                        }
                    ],
                    mime: '',
                    // eslint-disable-next-line max-len
                    text: '<!doctype html><html itemscope=\'\' itemtype=\'http://schema.org/WebPage\' lang=\'en-IN\'><head><meta content=\'text/html; charset=UTF-8\' http-equiv=\'Content-Type\'><meta content=\'/images/branding/googleg/1x/googleg_standard_color_128dp.png\' itemprop=\'image\'><title>Google</title><script>(function(){window.google={kEI:\'ctgeWeqbLYTivASs04-gCw\',kEXPI:\'201761,1352961,1353394,3700339,3700347,3700410,3700425,4029815,4031109,4032678,4036527,4039268,4043492,4045841,4048347,4065787,4071842,4072364,4072774,4076096,4076999,4078430,4081039,4081164,4084179,4084977,4085472,4090550,4090553,4091420,4092231,4093169,4093314,4094251,4094542,4095910,4096324,4097153,4097922,4097929,4097951,4098096,4098733,4098740,4098752,4101429,4101430,4101437,4101750,4102238,4103475,4103845,4104204,4105085,4105178,4105317,4105321,4106164,4106606,4106949,4107417,4107555,4107628,4108505,4108537,4108539,4109221,4109316,4109439,4109489,4109498,4109524,4109539,4109629,4110259,4110361,4110380,4110425,4110656,4110899,4111127,4111421,4111607,4111612,4111792,4112009,4112041,4112316,4112318,4112827,8503585,8508229,8508607,8508931,8509037,8509091,8509373,8510343,8513026,10200083,10200096,10201957,19002115,19002174,19002281,19002294,19002296,19002297,41027340\',authuser:0,kscs:\'c9c918f0_24\'};google.kHL=\'en-IN\';})();(function(){google.lc=[];google.li=0;google.getEI=function(a){for(var b;a&&(!a.getAttribute||!(b=a.getAttribute(\'eid\')));)a=a.parentNode;return b||google.kEI};google.getLEI=function(a){for(var b=null;a&&(!a.getAttribute||!(b=a.getAttribute(\'leid\')));)a=a.parentNode;return b};google.https=function(){return\'https:\'==window.location.protocol};google.ml=function(){return null};google.wl=function(a,b){try{google.ml(Error(a),!1,b)}catch(c){}};google.time=function(){return(new Date).getTime()};google.log=function(a,b,c,d,g){a=google.logUrl(a,b,c,d,g);if(\'\'!=a){b=new Image;var e=google.lc,f=google.li;e[f]=b;b.onerror=b.onload=b.onabort=function(){delete e[f]};window.google&&window.google.vel&&window.google.vel.lu&&window.google.vel.lu(a);b.src=a;google.li=f+1}};google.logUrl=function(a,b,c,d,g){var e=\'\',f=google.ls||\'\';c||-1!=b.search(\'&ei=\')||(e=\'&ei=\'+google.getEI(d),-1==b.search(\'&lei=\')&&(d=google.getLEI(d))&&(e+=\'&lei=\'+d));a=c||\'/\'+(g||\'gen_204\')+\'?atyp=i&ct=\'+a+\'&cad=\'+b+e+f+\'&zx=\'+google.time();/^http:/i.test(a)&&google.https()&&(google.ml(Error(\'a\'),!1,{src:a,glmm:1}),a=\'\');return a};google.y={};google.x=function(a,b){google.y[a.id]=[a,b];return!1};google.lq=[];google.load=function(a,b,c){google.lq.push([[a],b,c])};google.loadAll=function(a,b){google.lq.push([a,b])};}).call(this);google.f={};var a=window.location,b=a.href.indexOf(\'#\');if(0<=b){var c=a.href.substring(b+1);/(^|&)q=/.test(c)&&-1==c.indexOf(\'#\')&&a.replace(\'/search?\'+c.replace(/(^|&)fp=[^&]*/g,\'\')+\'&cad=h\')};</script><style>#gbar,#guser{font-size:13px;padding-top:1px !important;}#gbar{height:22px}#guser{padding-bottom:7px !important;text-align:right}.gbh,.gbd{border-top:1px solid #c9d7f1;font-size:1px}.gbh{height:0;position:absolute;top:24px;width:100%}@media all{.gb1{height:22px;margin-right:.5em;vertical-align:top}#gbar{float:left}}a.gb1,a.gb4{text-decoration:underline !important}a.gb1,a.gb4{color:#00c !important}.gbi .gb4{color:#dd8e27 !important}.gbf .gb4{color:#900 !important}\n</style><style>body,td,a,p,.h{font-family:arial,sans-serif}body{margin:0;overflow-y:scroll}#gog{padding:3px 8px 0}td{line-height:.8em}.gac_m td{line-height:17px}form{margin-bottom:20px}.h{color:#36c}.q{color:#00c}.ts td{padding:0}.ts{border-collapse:collapse}em{font-weight:bold;font-style:normal}.lst{height:25px;width:496px}.gsfi,.lst{font:18px arial,sans-serif}.gsfs{font:17px arial,sans-serif}.ds{display:inline-box;display:inline-block;margin:3px 0 4px;margin-left:4px}input{font-family:inherit}a.gb1,a.gb2,a.gb3,a.gb4{color:#11c !important}body{background:#fff;color:black}a{color:#11c;text-decoration:none}a:hover,a:active{text-decoration:underline}.fl a{color:#36c}a:visited{color:#551a8b}a.gb1,a.gb4{text-decoration:underline}a.gb3:hover{text-decoration:none}#ghead a.gb2:hover{color:#fff !important}.sblc{padding-top:5px}.sblc a{display:block;margin:2px 0;margin-left:13px;font-size:11px}.lsbb{background:#eee;border:solid 1px;border-color:#ccc #999 #999 #ccc;height:30px}.lsbb{display:block}.ftl,#fll a{display:inline-block;margin:0 12px}.lsb{background:url(/images/nav_logo229.png) 0 -261px repeat-x;border:none;color:#000;cursor:pointer;height:30px;margin:0;outline:0;font:15px arial,sans-serif;vertical-align:top}.lsb:active{background:#ccc}.lst:focus{outline:none}</style><script>(function(){window.google.erd={sp:\'hp\',jsr:1,bv:11,cs:false};var f=0,g,h=google.erd,k=h.jsr,l;google.jsmp=!0;google.ml=function(a,b,c,e){google.dl&&google.dl(a,c,b);if(google._epc(a,b,c,e))return null;a=google._gld(a,\'/gen_204?atyp=i\',c||{},!1);e||google.log(0,\'\',a);return a};google._epc=function(a,b,c,e){var d=google.erd.jsr;if(0>d){window.console&&console.error(a,c);if(-2==d)throw a;return!0}if(!a||!a.message||\'Error loading script\'==a.message||!(m()&&1>f||e))return!0;f++;b&&(g=a&&a.message);return!1};google._gld=function(a,b,c,e){b=b+\'&ei=\'+encodeURIComponent(google.kEI)+\'&jexpid=\'+encodeURIComponent(google.kEXPI)+\'&srcpg=\'+encodeURIComponent(h.sp)+\'&jsr=\'+google.erd.jsr+\'&bver=\'+encodeURIComponent(h.bv);for(var d in c)b+=\'&\',b+=encodeURIComponent(d),b+=\'=\',b+=encodeURIComponent(c[d]);b=b+\'&emsg=\'+encodeURIComponent(a.name+\': \'+a.message);b=b+\'&jsst=\'+encodeURIComponent(a.stack||\'N/A\');!e&&2E3<=b.length&&(b=b.substr(0,2E3));return b};function m(){if(!h.cs)return!0;var a=google.erd.jsr;void 0==l&&(l=0>a||1==a||1==Math.ceil(Math.random()*a));return l}google.ojsr=function(a){google.erd.jsr=a;l=void 0};google.rjsr=function(){google.erd.jsr=k;l=void 0};window.onerror=function(a,b,c,e,d){g!==a&&google.ml(d instanceof Error?d:Error(a),!1);g=null;m()&&1>f||(window.onerror=null)};})();</script><link href=\'/images/branding/product/ico/googleg_lodp.ico\' rel=\'shortcut icon\'></head><body bgcolor=\'#fff\'><script>(function(){var src=\'/images/nav_logo229.png\';var iesg=false;document.body.onload = function(){window.n && window.n();if (document.images){new Image().src=src;}\nif (!iesg){document.f&&document.f.q.focus();document.gbqf&&document.gbqf.q.focus();}\n}\n})();</script><div id=\'mngb\'> <div id=gbar><nobr><b class=gb1>Search</b> <a class=gb1 href=\'https://www.google.co.in/imghp?hl=en&tab=wi\'>Images</a> <a class=gb1 href=\'https://maps.google.co.in/maps?hl=en&tab=wl\'>Maps</a> <a class=gb1 href=\'https://play.google.com/?hl=en&tab=w8\'>Play</a> <a class=gb1 href=\'https://www.youtube.com/?gl=IN&tab=w1\'>YouTube</a> <a class=gb1 href=\'https://news.google.co.in/nwshp?hl=en&tab=wn\'>News</a> <a class=gb1 href=\'https://mail.google.com/mail/?tab=wm\'>Gmail</a> <a class=gb1 href=\'https://drive.google.com/?tab=wo\'>Drive</a> <a class=gb1 style=\'text-decoration:none\' href=\'https://www.google.co.in/intl/en/options/\'><u>More</u> &raquo;</a></nobr></div><div id=guser width=100%><nobr><span id=gbn class=gbi></span><span id=gbf class=gbf></span><span id=gbe></span><a href=\'http://www.google.co.in/history/optout?hl=en\' class=gb4>Web History</a> | <a  href=\'/preferences?hl=en\' class=gb4>Settings</a> | <a target=_top id=gb_70 href=\'https://accounts.google.com/ServiceLogin?hl=en&passive=true&continue=https://www.google.co.in/%3Fgfe_rd%3Dcr%26ei%3DctgeWYSEILTv8weDpYToDw\' class=gb4>Sign in</a></nobr></div><div class=gbh style=left:0></div><div class=gbh style=right:0></div> </div><center><br clear=\'all\' id=\'lgpd\'><div id=\'lga\'><div style=\'padding:28px 0 3px\'><div style=\'height:110px;width:276px;background:url(/images/branding/googlelogo/1x/googlelogo_white_background_color_272x92dp.png) no-repeat\' title=\'Google\' align=\'left\' id=\'hplogo\' onload=\'window.lol&&lol()\'><div style=\'color:#777;font-size:16px;font-weight:bold;position:relative;top:70px;left:218px\' nowrap=\'\'>India</div></div></div><br></div><form action=\'/search\' name=\'f\'><table cellpadding=\'0\' cellspacing=\'0\'><tr valign=\'top\'><td width=\'25%\'>&nbsp;</td><td align=\'center\' nowrap=\'\'><input name=\'ie\' value=\'ISO-8859-1\' type=\'hidden\'><input value=\'en-IN\' name=\'hl\' type=\'hidden\'><input name=\'source\' type=\'hidden\' value=\'hp\'><input name=\'biw\' type=\'hidden\'><input name=\'bih\' type=\'hidden\'><div class=\'ds\' style=\'height:32px;margin:4px 0\'><input style=\'color:#000;margin:0;padding:5px 8px 0 6px;vertical-align:top\' autocomplete=\'off\' class=\'lst\' value=\'\' title=\'Google Search\' maxlength=\'2048\' name=\'q\' size=\'57\'></div><br style=\'line-height:0\'><span class=\'ds\'><span class=\'lsbb\'><input class=\'lsb\' value=\'Google Search\' name=\'btnG\' type=\'submit\'></span></span><span class=\'ds\'><span class=\'lsbb\'><input class=\'lsb\' value=\'I\'m Feeling Lucky\' name=\'btnI\' onclick=\'if(this.form.q.value)this.checked=1; else top.location=\'/doodles/\'\' type=\'submit\'></span></span></td><td class=\'fl sblc\' align=\'left\' nowrap=\'\' width=\'25%\'><a href=\'/advanced_search?hl=en-IN&amp;authuser=0\'>Advanced search</a><a href=\'/language_tools?hl=en-IN&amp;authuser=0\'>Language tools</a></td></tr></table><input id=\'gbv\' name=\'gbv\' type=\'hidden\' value=\'1\'></form><div id=\'gac_scont\'></div><div style=\'font-size:83%;min-height:3.5em\'><br><div id=\'als\'><style>#als{font-size:small;margin-bottom:24px}#_eEe{display:inline-block;line-height:28px;}#_eEe a{padding:0 3px;}._lEe{display:inline-block;margin:0 2px;white-space:nowrap}._PEe{display:inline-block;margin:0 2px}</style><div id=\'_eEe\'>Google.co.in offered in: <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dhi%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAU&amp;usg=AFQjCNEzHKdbfZ_VSo1opJlces7A1atK7A\'>&#2361;&#2367;&#2344;&#2381;&#2342;&#2368;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dbn%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAY&amp;usg=AFQjCNHhIpeaJx72UucgbAfReq0kKwF5OA\'>&#2476;&#2494;&#2434;&#2482;&#2494;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dte%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAc&amp;usg=AFQjCNHSrS2O2ofUSQdJTYEbXhh10Z8MLw\'>&#3108;&#3142;&#3122;&#3137;&#3095;&#3137;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dmr%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAg&amp;usg=AFQjCNFdcHaQpNcEUD2flKcypO7rdxJwUw\'>&#2350;&#2352;&#2366;&#2336;&#2368;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dta%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAk&amp;usg=AFQjCNGPdZunfVWRCphl3V9Tnewhx8Rhsw\'>&#2980;&#2990;&#3007;&#2996;&#3021;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dgu%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAo&amp;usg=AFQjCNEXDBxLu826juq0JDNlpMKdGGLY7w\'>&#2711;&#2753;&#2716;&#2736;&#2750;&#2724;&#2752;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dkn%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAs&amp;usg=AFQjCNHt4gbjZX4RQWTZKB3vDpEVHvbDag\'>&#3221;&#3240;&#3277;&#3240;&#3233;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dml%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCAw&amp;usg=AFQjCNHCxBbG6vS6UI-awXTsM3IZaVf6jQ\'>&#3374;&#3378;&#3375;&#3390;&#3379;&#3330;</a>  <a href=\'/url?q=https://www.google.co.in/setprefs%3Fsig%3D0_ituMoNH2uBXbs-3dFlfEhowK_aI%253D%26hl%3Dpa%26source%3Dhomepage&amp;sa=U&amp;ved=0ahUKEwjqnPPR7vvTAhUEMY8KHazpA7QQ2ZgBCA0&amp;usg=AFQjCNEIeXb2FY73rPeXzNmUB4441453UQ\'>&#2602;&#2672;&#2588;&#2622;&#2604;&#2624;</a> </div></div></div><span id=\'footer\'><div style=\'font-size:10pt\'><div style=\'margin:19px auto;text-align:center\' id=\'fll\'><a href=\'/intl/en/ads/\'>Advertising Programs</a><a href=\'http://www.google.co.in/services/\'>Business Solutions</a><a href=\'https://plus.google.com/104205742743787718296\' rel=\'publisher\'>+Google</a><a href=\'/intl/en/about.html\'>About Google</a><a href=\'https://www.google.co.in/setprefdomain?prefdom=US&amp;sig=__TreHjR8x1Is3H1TXAuZgUWYzPPY%3D\' id=\'fehl\'>Google.com</a></div></div><p style=\'color:#767676;font-size:8pt\'>&copy; 2017 - <a href=\'/intl/en/policies/privacy/\'>Privacy</a> - <a href=\'/intl/en/policies/terms/\'>Terms</a></p></span></center><script>(function(){window.google.cdo={height:0,width:0};(function(){var a=window.innerWidth,b=window.innerHeight;if(!a||!b)var c=window.document,d=\'CSS1Compat\'==c.compatMode?c.documentElement:c.body,a=d.clientWidth,b=d.clientHeight;a&&b&&(a!=google.cdo.width||b!=google.cdo.height)&&google.log(\'\',\'\',\'/client_204?&atyp=i&biw=\'+a+\'&bih=\'+b+\'&ei=\'+google.kEI);}).call(this);})();</script><div id=\'xjsd\'></div><div id=\'xjsi\'><script>(function(){function c(b){window.setTimeout(function(){var a=document.createElement(\'script\');a.src=b;document.getElementById(\'xjsd\').appendChild(a)},0)}google.dljp=function(b,a){google.xjsu=b;c(a)};google.dlj=c;}).call(this);(function(){window.google.xjsrm=[];})();if(google.y)google.y.first=[];if(!google.xjs){window._=window._||{};window._DumpException=window._._DumpException=function(e){throw e};if(google.timers&&google.timers.load.t){google.timers.load.t.xjsls=new Date().getTime();}google.dljp(\'/xjs/_/js/k\\x3dxjs.hp.en_US.jpg35lljDw8.O/m\\x3dsb_he,d/am\\x3dAAY/rt\\x3dj/d\\x3d1/t\\x3dzcms/rs\\x3dACT90oHWQP6BUfNV29m3nDJl2BYgb4wwZA\',\'/xjs/_/js/k\\x3dxjs.hp.en_US.jpg35lljDw8.O/m\\x3dsb_he,d/am\\x3dAAY/rt\\x3dj/d\\x3d1/t\\x3dzcms/rs\\x3dACT90oHWQP6BUfNV29m3nDJl2BYgb4wwZA\');google.xjs=1;}google.pmc={\'sb_he\':{\'agen\':false,\'cgen\':false,\'client\':\'heirloom-hp\',\'dh\':true,\'dhqt\':true,\'ds\':\'\',\'fl\':true,\'host\':\'google.co.in\',\'isbh\':28,\'jam\':0,\'jsonp\':true,\'msgs\':{\'cibl\':\'Clear Search\',\'dym\':\'Did you mean:\',\'lcky\':\'I\\u0026#39;m Feeling Lucky\',\'lml\':\'Learn more\',\'oskt\':\'Input tools\',\'psrc\':\'This search was removed from your \\u003Ca href=\\\'/history\\\'\\u003EWeb History\\u003C/a\\u003E\',\'psrl\':\'Remove\',\'sbit\':\'Search by image\',\'srch\':\'Google Search\'},\'nds\':true,\'ovr\':{},\'pq\':\'\',\'refpd\':true,\'rfs\':[],\'sbpl\':24,\'sbpr\':24,\'scd\':10,\'sce\':5,\'stok\':\'EB7eP-qzYuUnYszeMLmFkgvvB_c\'},\'d\':{},\'aWiv7g\':{},\'YFCs/g\':{}};google.y.first.push(function(){if(google.med){google.med(\'init\');google.initHistory();google.med(\'history\');}});if(google.j&&google.j.en&&google.j.xi){window.setTimeout(google.j.xi,0);}\n</script></div></body></html>',
                    language: 'html',
                    previewType: 'text',
                    code: 200,
                    responseSize: {
                        body: 14560,
                        header: 669
                    },
                    mimeType: 'text',
                    fileName: 'response.html',
                    // eslint-disable-next-line max-len
                    dataURI: 'data:text/html;base64, PCFkb2N0eXBlIGh0bWw+PGh0bWwgaXRlbXNjb3BlPSIiIGl0ZW10eXBlPSJodHRwOi8vc2NoZW1hLm9yZy9XZWJQYWdlIiBsYW5nPSJlbi1JTiI+PGhlYWQ+PG1ldGEgY29udGVudD0idGV4dC9odG1sOyBjaGFyc2V0PVVURi04IiBodHRwLWVxdWl2PSJDb250ZW50LVR5cGUiPjxtZXRhIGNvbnRlbnQ9Ii9pbWFnZXMvYnJhbmRpbmcvZ29vZ2xlZy8xeC9nb29nbGVnX3N0YW5kYXJkX2NvbG9yXzEyOGRwLnBuZyIgaXRlbXByb3A9ImltYWdlIj48dGl0bGU+R29vZ2xlPC90aXRsZT48c2NyaXB0PihmdW5jdGlvbigpe3dpbmRvdy5nb29nbGU9e2tFSTonY3RnZVdlcWJMWVRpdkFTczA0LWdDdycsa0VYUEk6JzIwMTc2MSwxMzUyOTYxLDEzNTMzOTQsMzcwMDMzOSwzNzAwMzQ3LDM3MDA0MTAsMzcwMDQyNSw0MDI5ODE1LDQwMzExMDksNDAzMjY3OCw0MDM2NTI3LDQwMzkyNjgsNDA0MzQ5Miw0MDQ1ODQxLDQwNDgzNDcsNDA2NTc4Nyw0MDcxODQyLDQwNzIzNjQsNDA3Mjc3NCw0MDc2MDk2LDQwNzY5OTksNDA3ODQzMCw0MDgxMDM5LDQwODExNjQsNDA4NDE3OSw0MDg0OTc3LDQwODU0NzIsNDA5MDU1MCw0MDkwNTUzLDQwOTE0MjAsNDA5MjIzMSw0MDkzMTY5LDQwOTMzMTQsNDA5NDI1MSw0MDk0NTQyLDQwOTU5MTAsNDA5NjMyNCw0MDk3MTUzLDQwOTc5MjIsNDA5NzkyOSw0MDk3OTUxLDQwOTgwOTYsNDA5ODczMyw0MDk4NzQwLDQwOTg3NTIsNDEwMTQyOSw0MTAxNDMwLDQxMDE0MzcsNDEwMTc1MCw0MTAyMjM4LDQxMDM0NzUsNDEwMzg0NSw0MTA0MjA0LDQxMDUwODUsNDEwNTE3OCw0MTA1MzE3LDQxMDUzMjEsNDEwNjE2NCw0MTA2NjA2LDQxMDY5NDksNDEwNzQxNyw0MTA3NTU1LDQxMDc2MjgsNDEwODUwNSw0MTA4NTM3LDQxMDg1MzksNDEwOTIyMSw0MTA5MzE2LDQxMDk0MzksNDEwOTQ4OSw0MTA5NDk4LDQxMDk1MjQsNDEwOTUzOSw0MTA5NjI5LDQxMTAyNTksNDExMDM2MSw0MTEwMzgwLDQxMTA0MjUsNDExMDY1Niw0MTEwODk5LDQxMTExMjcsNDExMTQyMSw0MTExNjA3LDQxMTE2MTIsNDExMTc5Miw0MTEyMDA5LDQxMTIwNDEsNDExMjMxNiw0MTEyMzE4LDQxMTI4MjcsODUwMzU4NSw4NTA4MjI5LDg1MDg2MDcsODUwODkzMSw4NTA5MDM3LDg1MDkwOTEsODUwOTM3Myw4NTEwMzQzLDg1MTMwMjYsMTAyMDAwODMsMTAyMDAwOTYsMTAyMDE5NTcsMTkwMDIxMTUsMTkwMDIxNzQsMTkwMDIyODEsMTkwMDIyOTQsMTkwMDIyOTYsMTkwMDIyOTcsNDEwMjczNDAnLGF1dGh1c2VyOjAsa3NjczonYzljOTE4ZjBfMjQnfTtnb29nbGUua0hMPSdlbi1JTic7fSkoKTsoZnVuY3Rpb24oKXtnb29nbGUubGM9W107Z29vZ2xlLmxpPTA7Z29vZ2xlLmdldEVJPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYjthJiYoIWEuZ2V0QXR0cmlidXRlfHwhKGI9YS5nZXRBdHRyaWJ1dGUoImVpZCIpKSk7KWE9YS5wYXJlbnROb2RlO3JldHVybiBifHxnb29nbGUua0VJfTtnb29nbGUuZ2V0TEVJPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1udWxsO2EmJighYS5nZXRBdHRyaWJ1dGV8fCEoYj1hLmdldEF0dHJpYnV0ZSgibGVpZCIpKSk7KWE9YS5wYXJlbnROb2RlO3JldHVybiBifTtnb29nbGUuaHR0cHM9ZnVuY3Rpb24oKXtyZXR1cm4iaHR0cHM6Ij09d2luZG93LmxvY2F0aW9uLnByb3RvY29sfTtnb29nbGUubWw9ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbH07Z29vZ2xlLndsPWZ1bmN0aW9uKGEsYil7dHJ5e2dvb2dsZS5tbChFcnJvcihhKSwhMSxiKX1jYXRjaChjKXt9fTtnb29nbGUudGltZT1mdW5jdGlvbigpe3JldHVybihuZXcgRGF0ZSkuZ2V0VGltZSgpfTtnb29nbGUubG9nPWZ1bmN0aW9uKGEsYixjLGQsZyl7YT1nb29nbGUubG9nVXJsKGEsYixjLGQsZyk7aWYoIiIhPWEpe2I9bmV3IEltYWdlO3ZhciBlPWdvb2dsZS5sYyxmPWdvb2dsZS5saTtlW2ZdPWI7Yi5vbmVycm9yPWIub25sb2FkPWIub25hYm9ydD1mdW5jdGlvbigpe2RlbGV0ZSBlW2ZdfTt3aW5kb3cuZ29vZ2xlJiZ3aW5kb3cuZ29vZ2xlLnZlbCYmd2luZG93Lmdvb2dsZS52ZWwubHUmJndpbmRvdy5nb29nbGUudmVsLmx1KGEpO2Iuc3JjPWE7Z29vZ2xlLmxpPWYrMX19O2dvb2dsZS5sb2dVcmw9ZnVuY3Rpb24oYSxiLGMsZCxnKXt2YXIgZT0iIixmPWdvb2dsZS5sc3x8IiI7Y3x8LTEhPWIuc2VhcmNoKCImZWk9Iil8fChlPSImZWk9Iitnb29nbGUuZ2V0RUkoZCksLTE9PWIuc2VhcmNoKCImbGVpPSIpJiYoZD1nb29nbGUuZ2V0TEVJKGQpKSYmKGUrPSImbGVpPSIrZCkpO2E9Y3x8Ii8iKyhnfHwiZ2VuXzIwNCIpKyI/YXR5cD1pJmN0PSIrYSsiJmNhZD0iK2IrZStmKyImeng9Iitnb29nbGUudGltZSgpOy9eaHR0cDovaS50ZXN0KGEpJiZnb29nbGUuaHR0cHMoKSYmKGdvb2dsZS5tbChFcnJvcigiYSIpLCExLHtzcmM6YSxnbG1tOjF9KSxhPSIiKTtyZXR1cm4gYX07Z29vZ2xlLnk9e307Z29vZ2xlLng9ZnVuY3Rpb24oYSxiKXtnb29nbGUueVthLmlkXT1bYSxiXTtyZXR1cm4hMX07Z29vZ2xlLmxxPVtdO2dvb2dsZS5sb2FkPWZ1bmN0aW9uKGEsYixjKXtnb29nbGUubHEucHVzaChbW2FdLGIsY10pfTtnb29nbGUubG9hZEFsbD1mdW5jdGlvbihhLGIpe2dvb2dsZS5scS5wdXNoKFthLGJdKX07fSkuY2FsbCh0aGlzKTtnb29nbGUuZj17fTt2YXIgYT13aW5kb3cubG9jYXRpb24sYj1hLmhyZWYuaW5kZXhPZigiIyIpO2lmKDA8PWIpe3ZhciBjPWEuaHJlZi5zdWJzdHJpbmcoYisxKTsvKF58JilxPS8udGVzdChjKSYmLTE9PWMuaW5kZXhPZigiIyIpJiZhLnJlcGxhY2UoIi9zZWFyY2g/IitjLnJlcGxhY2UoLyhefCYpZnA9W14mXSovZywiIikrIiZjYWQ9aCIpfTs8L3NjcmlwdD48c3R5bGU+I2diYXIsI2d1c2Vye2ZvbnQtc2l6ZToxM3B4O3BhZGRpbmctdG9wOjFweCAhaW1wb3J0YW50O30jZ2JhcntoZWlnaHQ6MjJweH0jZ3VzZXJ7cGFkZGluZy1ib3R0b206N3B4ICFpbXBvcnRhbnQ7dGV4dC1hbGlnbjpyaWdodH0uZ2JoLC5nYmR7Ym9yZGVyLXRvcDoxcHggc29saWQgI2M5ZDdmMTtmb250LXNpemU6MXB4fS5nYmh7aGVpZ2h0OjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOjI0cHg7d2lkdGg6MTAwJX1AbWVkaWEgYWxsey5nYjF7aGVpZ2h0OjIycHg7bWFyZ2luLXJpZ2h0Oi41ZW07dmVydGljYWwtYWxpZ246dG9wfSNnYmFye2Zsb2F0OmxlZnR9fWEuZ2IxLGEuZ2I0e3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmUgIWltcG9ydGFudH1hLmdiMSxhLmdiNHtjb2xvcjojMDBjICFpbXBvcnRhbnR9LmdiaSAuZ2I0e2NvbG9yOiNkZDhlMjcgIWltcG9ydGFudH0uZ2JmIC5nYjR7Y29sb3I6IzkwMCAhaW1wb3J0YW50fQo8L3N0eWxlPjxzdHlsZT5ib2R5LHRkLGEscCwuaHtmb250LWZhbWlseTphcmlhbCxzYW5zLXNlcmlmfWJvZHl7bWFyZ2luOjA7b3ZlcmZsb3cteTpzY3JvbGx9I2dvZ3twYWRkaW5nOjNweCA4cHggMH10ZHtsaW5lLWhlaWdodDouOGVtfS5nYWNfbSB0ZHtsaW5lLWhlaWdodDoxN3B4fWZvcm17bWFyZ2luLWJvdHRvbToyMHB4fS5oe2NvbG9yOiMzNmN9LnF7Y29sb3I6IzAwY30udHMgdGR7cGFkZGluZzowfS50c3tib3JkZXItY29sbGFwc2U6Y29sbGFwc2V9ZW17Zm9udC13ZWlnaHQ6Ym9sZDtmb250LXN0eWxlOm5vcm1hbH0ubHN0e2hlaWdodDoyNXB4O3dpZHRoOjQ5NnB4fS5nc2ZpLC5sc3R7Zm9udDoxOHB4IGFyaWFsLHNhbnMtc2VyaWZ9LmdzZnN7Zm9udDoxN3B4IGFyaWFsLHNhbnMtc2VyaWZ9LmRze2Rpc3BsYXk6aW5saW5lLWJveDtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46M3B4IDAgNHB4O21hcmdpbi1sZWZ0OjRweH1pbnB1dHtmb250LWZhbWlseTppbmhlcml0fWEuZ2IxLGEuZ2IyLGEuZ2IzLGEuZ2I0e2NvbG9yOiMxMWMgIWltcG9ydGFudH1ib2R5e2JhY2tncm91bmQ6I2ZmZjtjb2xvcjpibGFja31he2NvbG9yOiMxMWM7dGV4dC1kZWNvcmF0aW9uOm5vbmV9YTpob3ZlcixhOmFjdGl2ZXt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lfS5mbCBhe2NvbG9yOiMzNmN9YTp2aXNpdGVke2NvbG9yOiM1NTFhOGJ9YS5nYjEsYS5nYjR7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX1hLmdiMzpob3Zlcnt0ZXh0LWRlY29yYXRpb246bm9uZX0jZ2hlYWQgYS5nYjI6aG92ZXJ7Y29sb3I6I2ZmZiAhaW1wb3J0YW50fS5zYmxje3BhZGRpbmctdG9wOjVweH0uc2JsYyBhe2Rpc3BsYXk6YmxvY2s7bWFyZ2luOjJweCAwO21hcmdpbi1sZWZ0OjEzcHg7Zm9udC1zaXplOjExcHh9LmxzYmJ7YmFja2dyb3VuZDojZWVlO2JvcmRlcjpzb2xpZCAxcHg7Ym9yZGVyLWNvbG9yOiNjY2MgIzk5OSAjOTk5ICNjY2M7aGVpZ2h0OjMwcHh9LmxzYmJ7ZGlzcGxheTpibG9ja30uZnRsLCNmbGwgYXtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46MCAxMnB4fS5sc2J7YmFja2dyb3VuZDp1cmwoL2ltYWdlcy9uYXZfbG9nbzIyOS5wbmcpIDAgLTI2MXB4IHJlcGVhdC14O2JvcmRlcjpub25lO2NvbG9yOiMwMDA7Y3Vyc29yOnBvaW50ZXI7aGVpZ2h0OjMwcHg7bWFyZ2luOjA7b3V0bGluZTowO2ZvbnQ6MTVweCBhcmlhbCxzYW5zLXNlcmlmO3ZlcnRpY2FsLWFsaWduOnRvcH0ubHNiOmFjdGl2ZXtiYWNrZ3JvdW5kOiNjY2N9LmxzdDpmb2N1c3tvdXRsaW5lOm5vbmV9PC9zdHlsZT48c2NyaXB0PihmdW5jdGlvbigpe3dpbmRvdy5nb29nbGUuZXJkPXtzcDonaHAnLGpzcjoxLGJ2OjExLGNzOmZhbHNlfTt2YXIgZj0wLGcsaD1nb29nbGUuZXJkLGs9aC5qc3IsbDtnb29nbGUuanNtcD0hMDtnb29nbGUubWw9ZnVuY3Rpb24oYSxiLGMsZSl7Z29vZ2xlLmRsJiZnb29nbGUuZGwoYSxjLGIpO2lmKGdvb2dsZS5fZXBjKGEsYixjLGUpKXJldHVybiBudWxsO2E9Z29vZ2xlLl9nbGQoYSwiL2dlbl8yMDQ/YXR5cD1pIixjfHx7fSwhMSk7ZXx8Z29vZ2xlLmxvZygwLCIiLGEpO3JldHVybiBhfTtnb29nbGUuX2VwYz1mdW5jdGlvbihhLGIsYyxlKXt2YXIgZD1nb29nbGUuZXJkLmpzcjtpZigwPmQpe3dpbmRvdy5jb25zb2xlJiZjb25zb2xlLmVycm9yKGEsYyk7aWYoLTI9PWQpdGhyb3cgYTtyZXR1cm4hMH1pZighYXx8IWEubWVzc2FnZXx8IkVycm9yIGxvYWRpbmcgc2NyaXB0Ij09YS5tZXNzYWdlfHwhKG0oKSYmMT5mfHxlKSlyZXR1cm4hMDtmKys7YiYmKGc9YSYmYS5tZXNzYWdlKTtyZXR1cm4hMX07Z29vZ2xlLl9nbGQ9ZnVuY3Rpb24oYSxiLGMsZSl7Yj1iKyImZWk9IitlbmNvZGVVUklDb21wb25lbnQoZ29vZ2xlLmtFSSkrIiZqZXhwaWQ9IitlbmNvZGVVUklDb21wb25lbnQoZ29vZ2xlLmtFWFBJKSsiJnNyY3BnPSIrZW5jb2RlVVJJQ29tcG9uZW50KGguc3ApKyImanNyPSIrZ29vZ2xlLmVyZC5qc3IrIiZidmVyPSIrZW5jb2RlVVJJQ29tcG9uZW50KGguYnYpO2Zvcih2YXIgZCBpbiBjKWIrPSImIixiKz1lbmNvZGVVUklDb21wb25lbnQoZCksYis9Ij0iLGIrPWVuY29kZVVSSUNvbXBvbmVudChjW2RdKTtiPWIrIiZlbXNnPSIrZW5jb2RlVVJJQ29tcG9uZW50KGEubmFtZSsiOiAiK2EubWVzc2FnZSk7Yj1iKyImanNzdD0iK2VuY29kZVVSSUNvbXBvbmVudChhLnN0YWNrfHwiTi9BIik7IWUmJjJFMzw9Yi5sZW5ndGgmJihiPWIuc3Vic3RyKDAsMkUzKSk7cmV0dXJuIGJ9O2Z1bmN0aW9uIG0oKXtpZighaC5jcylyZXR1cm4hMDt2YXIgYT1nb29nbGUuZXJkLmpzcjt2b2lkIDA9PWwmJihsPTA+YXx8MT09YXx8MT09TWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqYSkpO3JldHVybiBsfWdvb2dsZS5vanNyPWZ1bmN0aW9uKGEpe2dvb2dsZS5lcmQuanNyPWE7bD12b2lkIDB9O2dvb2dsZS5yanNyPWZ1bmN0aW9uKCl7Z29vZ2xlLmVyZC5qc3I9aztsPXZvaWQgMH07d2luZG93Lm9uZXJyb3I9ZnVuY3Rpb24oYSxiLGMsZSxkKXtnIT09YSYmZ29vZ2xlLm1sKGQgaW5zdGFuY2VvZiBFcnJvcj9kOkVycm9yKGEpLCExKTtnPW51bGw7bSgpJiYxPmZ8fCh3aW5kb3cub25lcnJvcj1udWxsKX07fSkoKTs8L3NjcmlwdD48bGluayBocmVmPSIvaW1hZ2VzL2JyYW5kaW5nL3Byb2R1Y3QvaWNvL2dvb2dsZWdfbG9kcC5pY28iIHJlbD0ic2hvcnRjdXQgaWNvbiI+PC9oZWFkPjxib2R5IGJnY29sb3I9IiNmZmYiPjxzY3JpcHQ+KGZ1bmN0aW9uKCl7dmFyIHNyYz0nL2ltYWdlcy9uYXZfbG9nbzIyOS5wbmcnO3ZhciBpZXNnPWZhbHNlO2RvY3VtZW50LmJvZHkub25sb2FkID0gZnVuY3Rpb24oKXt3aW5kb3cubiAmJiB3aW5kb3cubigpO2lmIChkb2N1bWVudC5pbWFnZXMpe25ldyBJbWFnZSgpLnNyYz1zcmM7fQppZiAoIWllc2cpe2RvY3VtZW50LmYmJmRvY3VtZW50LmYucS5mb2N1cygpO2RvY3VtZW50LmdicWYmJmRvY3VtZW50LmdicWYucS5mb2N1cygpO30KfQp9KSgpOzwvc2NyaXB0PjxkaXYgaWQ9Im1uZ2IiPiA8ZGl2IGlkPWdiYXI+PG5vYnI+PGIgY2xhc3M9Z2IxPlNlYXJjaDwvYj4gPGEgY2xhc3M9Z2IxIGhyZWY9Imh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi9pbWdocD9obD1lbiZ0YWI9d2kiPkltYWdlczwvYT4gPGEgY2xhc3M9Z2IxIGhyZWY9Imh0dHBzOi8vbWFwcy5nb29nbGUuY28uaW4vbWFwcz9obD1lbiZ0YWI9d2wiPk1hcHM8L2E+IDxhIGNsYXNzPWdiMSBocmVmPSJodHRwczovL3BsYXkuZ29vZ2xlLmNvbS8/aGw9ZW4mdGFiPXc4Ij5QbGF5PC9hPiA8YSBjbGFzcz1nYjEgaHJlZj0iaHR0cHM6Ly93d3cueW91dHViZS5jb20vP2dsPUlOJnRhYj13MSI+WW91VHViZTwvYT4gPGEgY2xhc3M9Z2IxIGhyZWY9Imh0dHBzOi8vbmV3cy5nb29nbGUuY28uaW4vbndzaHA/aGw9ZW4mdGFiPXduIj5OZXdzPC9hPiA8YSBjbGFzcz1nYjEgaHJlZj0iaHR0cHM6Ly9tYWlsLmdvb2dsZS5jb20vbWFpbC8/dGFiPXdtIj5HbWFpbDwvYT4gPGEgY2xhc3M9Z2IxIGhyZWY9Imh0dHBzOi8vZHJpdmUuZ29vZ2xlLmNvbS8/dGFiPXdvIj5Ecml2ZTwvYT4gPGEgY2xhc3M9Z2IxIHN0eWxlPSJ0ZXh0LWRlY29yYXRpb246bm9uZSIgaHJlZj0iaHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmluL2ludGwvZW4vb3B0aW9ucy8iPjx1Pk1vcmU8L3U+ICZyYXF1bzs8L2E+PC9ub2JyPjwvZGl2PjxkaXYgaWQ9Z3VzZXIgd2lkdGg9MTAwJT48bm9icj48c3BhbiBpZD1nYm4gY2xhc3M9Z2JpPjwvc3Bhbj48c3BhbiBpZD1nYmYgY2xhc3M9Z2JmPjwvc3Bhbj48c3BhbiBpZD1nYmU+PC9zcGFuPjxhIGhyZWY9Imh0dHA6Ly93d3cuZ29vZ2xlLmNvLmluL2hpc3Rvcnkvb3B0b3V0P2hsPWVuIiBjbGFzcz1nYjQ+V2ViIEhpc3Rvcnk8L2E+IHwgPGEgIGhyZWY9Ii9wcmVmZXJlbmNlcz9obD1lbiIgY2xhc3M9Z2I0PlNldHRpbmdzPC9hPiB8IDxhIHRhcmdldD1fdG9wIGlkPWdiXzcwIGhyZWY9Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9TZXJ2aWNlTG9naW4/aGw9ZW4mcGFzc2l2ZT10cnVlJmNvbnRpbnVlPWh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi8lM0ZnZmVfcmQlM0RjciUyNmVpJTNEY3RnZVdZU0VJTFR2OHdlRHBZVG9EdyIgY2xhc3M9Z2I0PlNpZ24gaW48L2E+PC9ub2JyPjwvZGl2PjxkaXYgY2xhc3M9Z2JoIHN0eWxlPWxlZnQ6MD48L2Rpdj48ZGl2IGNsYXNzPWdiaCBzdHlsZT1yaWdodDowPjwvZGl2PiA8L2Rpdj48Y2VudGVyPjxiciBjbGVhcj0iYWxsIiBpZD0ibGdwZCI+PGRpdiBpZD0ibGdhIj48ZGl2IHN0eWxlPSJwYWRkaW5nOjI4cHggMCAzcHgiPjxkaXYgc3R5bGU9ImhlaWdodDoxMTBweDt3aWR0aDoyNzZweDtiYWNrZ3JvdW5kOnVybCgvaW1hZ2VzL2JyYW5kaW5nL2dvb2dsZWxvZ28vMXgvZ29vZ2xlbG9nb193aGl0ZV9iYWNrZ3JvdW5kX2NvbG9yXzI3Mng5MmRwLnBuZykgbm8tcmVwZWF0IiB0aXRsZT0iR29vZ2xlIiBhbGlnbj0ibGVmdCIgaWQ9ImhwbG9nbyIgb25sb2FkPSJ3aW5kb3cubG9sJiZsb2woKSI+PGRpdiBzdHlsZT0iY29sb3I6Izc3Nztmb250LXNpemU6MTZweDtmb250LXdlaWdodDpib2xkO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo3MHB4O2xlZnQ6MjE4cHgiIG5vd3JhcD0iIj5JbmRpYTwvZGl2PjwvZGl2PjwvZGl2Pjxicj48L2Rpdj48Zm9ybSBhY3Rpb249Ii9zZWFyY2giIG5hbWU9ImYiPjx0YWJsZSBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiPjx0ciB2YWxpZ249InRvcCI+PHRkIHdpZHRoPSIyNSUiPiZuYnNwOzwvdGQ+PHRkIGFsaWduPSJjZW50ZXIiIG5vd3JhcD0iIj48aW5wdXQgbmFtZT0iaWUiIHZhbHVlPSJJU08tODg1OS0xIiB0eXBlPSJoaWRkZW4iPjxpbnB1dCB2YWx1ZT0iZW4tSU4iIG5hbWU9ImhsIiB0eXBlPSJoaWRkZW4iPjxpbnB1dCBuYW1lPSJzb3VyY2UiIHR5cGU9ImhpZGRlbiIgdmFsdWU9ImhwIj48aW5wdXQgbmFtZT0iYml3IiB0eXBlPSJoaWRkZW4iPjxpbnB1dCBuYW1lPSJiaWgiIHR5cGU9ImhpZGRlbiI+PGRpdiBjbGFzcz0iZHMiIHN0eWxlPSJoZWlnaHQ6MzJweDttYXJnaW46NHB4IDAiPjxpbnB1dCBzdHlsZT0iY29sb3I6IzAwMDttYXJnaW46MDtwYWRkaW5nOjVweCA4cHggMCA2cHg7dmVydGljYWwtYWxpZ246dG9wIiBhdXRvY29tcGxldGU9Im9mZiIgY2xhc3M9ImxzdCIgdmFsdWU9IiIgdGl0bGU9Ikdvb2dsZSBTZWFyY2giIG1heGxlbmd0aD0iMjA0OCIgbmFtZT0icSIgc2l6ZT0iNTciPjwvZGl2PjxiciBzdHlsZT0ibGluZS1oZWlnaHQ6MCI+PHNwYW4gY2xhc3M9ImRzIj48c3BhbiBjbGFzcz0ibHNiYiI+PGlucHV0IGNsYXNzPSJsc2IiIHZhbHVlPSJHb29nbGUgU2VhcmNoIiBuYW1lPSJidG5HIiB0eXBlPSJzdWJtaXQiPjwvc3Bhbj48L3NwYW4+PHNwYW4gY2xhc3M9ImRzIj48c3BhbiBjbGFzcz0ibHNiYiI+PGlucHV0IGNsYXNzPSJsc2IiIHZhbHVlPSJJJ20gRmVlbGluZyBMdWNreSIgbmFtZT0iYnRuSSIgb25jbGljaz0iaWYodGhpcy5mb3JtLnEudmFsdWUpdGhpcy5jaGVja2VkPTE7IGVsc2UgdG9wLmxvY2F0aW9uPScvZG9vZGxlcy8nIiB0eXBlPSJzdWJtaXQiPjwvc3Bhbj48L3NwYW4+PC90ZD48dGQgY2xhc3M9ImZsIHNibGMiIGFsaWduPSJsZWZ0IiBub3dyYXA9IiIgd2lkdGg9IjI1JSI+PGEgaHJlZj0iL2FkdmFuY2VkX3NlYXJjaD9obD1lbi1JTiZhbXA7YXV0aHVzZXI9MCI+QWR2YW5jZWQgc2VhcmNoPC9hPjxhIGhyZWY9Ii9sYW5ndWFnZV90b29scz9obD1lbi1JTiZhbXA7YXV0aHVzZXI9MCI+TGFuZ3VhZ2UgdG9vbHM8L2E+PC90ZD48L3RyPjwvdGFibGU+PGlucHV0IGlkPSJnYnYiIG5hbWU9ImdidiIgdHlwZT0iaGlkZGVuIiB2YWx1ZT0iMSI+PC9mb3JtPjxkaXYgaWQ9ImdhY19zY29udCI+PC9kaXY+PGRpdiBzdHlsZT0iZm9udC1zaXplOjgzJTttaW4taGVpZ2h0OjMuNWVtIj48YnI+PGRpdiBpZD0iYWxzIj48c3R5bGU+I2Fsc3tmb250LXNpemU6c21hbGw7bWFyZ2luLWJvdHRvbToyNHB4fSNfZUVle2Rpc3BsYXk6aW5saW5lLWJsb2NrO2xpbmUtaGVpZ2h0OjI4cHg7fSNfZUVlIGF7cGFkZGluZzowIDNweDt9Ll9sRWV7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luOjAgMnB4O3doaXRlLXNwYWNlOm5vd3JhcH0uX1BFZXtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46MCAycHh9PC9zdHlsZT48ZGl2IGlkPSJfZUVlIj5Hb29nbGUuY28uaW4gb2ZmZXJlZCBpbjogPGEgaHJlZj0iL3VybD9xPWh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi9zZXRwcmVmcyUzRnNpZyUzRDBfaXR1TW9OSDJ1Qlhicy0zZEZsZkVob3dLX2FJJTI1M0QlMjZobCUzRGhpJTI2c291cmNlJTNEaG9tZXBhZ2UmYW1wO3NhPVUmYW1wO3ZlZD0wYWhVS0V3anFuUFBSN3Z2VEFoVUVNWThLSGF6cEE3UVEyWmdCQ0FVJmFtcDt1c2c9QUZRakNORXpIS2RiZlpfVlNvMW9wSmxjZXM3QTFhdEs3QSI+JiMyMzYxOyYjMjM2NzsmIzIzNDQ7JiMyMzgxOyYjMjM0MjsmIzIzNjg7PC9hPiAgPGEgaHJlZj0iL3VybD9xPWh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi9zZXRwcmVmcyUzRnNpZyUzRDBfaXR1TW9OSDJ1Qlhicy0zZEZsZkVob3dLX2FJJTI1M0QlMjZobCUzRGJuJTI2c291cmNlJTNEaG9tZXBhZ2UmYW1wO3NhPVUmYW1wO3ZlZD0wYWhVS0V3anFuUFBSN3Z2VEFoVUVNWThLSGF6cEE3UVEyWmdCQ0FZJmFtcDt1c2c9QUZRakNOSGhJcGVhSng3MlV1Y2diQWZSZXEwa0t3RjVPQSI+JiMyNDc2OyYjMjQ5NDsmIzI0MzQ7JiMyNDgyOyYjMjQ5NDs8L2E+ICA8YSBocmVmPSIvdXJsP3E9aHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmluL3NldHByZWZzJTNGc2lnJTNEMF9pdHVNb05IMnVCWGJzLTNkRmxmRWhvd0tfYUklMjUzRCUyNmhsJTNEdGUlMjZzb3VyY2UlM0Rob21lcGFnZSZhbXA7c2E9VSZhbXA7dmVkPTBhaFVLRXdqcW5QUFI3dnZUQWhVRU1ZOEtIYXpwQTdRUTJaZ0JDQWMmYW1wO3VzZz1BRlFqQ05IU3JTMk8yb2ZVU1FkSlRZRWJYaGgxMFo4TUx3Ij4mIzMxMDg7JiMzMTQyOyYjMzEyMjsmIzMxMzc7JiMzMDk1OyYjMzEzNzs8L2E+ICA8YSBocmVmPSIvdXJsP3E9aHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmluL3NldHByZWZzJTNGc2lnJTNEMF9pdHVNb05IMnVCWGJzLTNkRmxmRWhvd0tfYUklMjUzRCUyNmhsJTNEbXIlMjZzb3VyY2UlM0Rob21lcGFnZSZhbXA7c2E9VSZhbXA7dmVkPTBhaFVLRXdqcW5QUFI3dnZUQWhVRU1ZOEtIYXpwQTdRUTJaZ0JDQWcmYW1wO3VzZz1BRlFqQ05GZGNIYVFwTmNFVUQyZmxLY3lwTzdyZHhKd1V3Ij4mIzIzNTA7JiMyMzUyOyYjMjM2NjsmIzIzMzY7JiMyMzY4OzwvYT4gIDxhIGhyZWY9Ii91cmw/cT1odHRwczovL3d3dy5nb29nbGUuY28uaW4vc2V0cHJlZnMlM0ZzaWclM0QwX2l0dU1vTkgydUJYYnMtM2RGbGZFaG93S19hSSUyNTNEJTI2aGwlM0R0YSUyNnNvdXJjZSUzRGhvbWVwYWdlJmFtcDtzYT1VJmFtcDt2ZWQ9MGFoVUtFd2pxblBQUjd2dlRBaFVFTVk4S0hhenBBN1FRMlpnQkNBayZhbXA7dXNnPUFGUWpDTkdQZFp1bmZWV1JDcGhsM1Y5VG5ld2h4OFJoc3ciPiYjMjk4MDsmIzI5OTA7JiMzMDA3OyYjMjk5NjsmIzMwMjE7PC9hPiAgPGEgaHJlZj0iL3VybD9xPWh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi9zZXRwcmVmcyUzRnNpZyUzRDBfaXR1TW9OSDJ1Qlhicy0zZEZsZkVob3dLX2FJJTI1M0QlMjZobCUzRGd1JTI2c291cmNlJTNEaG9tZXBhZ2UmYW1wO3NhPVUmYW1wO3ZlZD0wYWhVS0V3anFuUFBSN3Z2VEFoVUVNWThLSGF6cEE3UVEyWmdCQ0FvJmFtcDt1c2c9QUZRakNORVhEQnhMdTgyNmp1cTBKRE5scE1LZEdHTFk3dyI+JiMyNzExOyYjMjc1MzsmIzI3MTY7JiMyNzM2OyYjMjc1MDsmIzI3MjQ7JiMyNzUyOzwvYT4gIDxhIGhyZWY9Ii91cmw/cT1odHRwczovL3d3dy5nb29nbGUuY28uaW4vc2V0cHJlZnMlM0ZzaWclM0QwX2l0dU1vTkgydUJYYnMtM2RGbGZFaG93S19hSSUyNTNEJTI2aGwlM0RrbiUyNnNvdXJjZSUzRGhvbWVwYWdlJmFtcDtzYT1VJmFtcDt2ZWQ9MGFoVUtFd2pxblBQUjd2dlRBaFVFTVk4S0hhenBBN1FRMlpnQkNBcyZhbXA7dXNnPUFGUWpDTkh0NGdialpYNFJRV1RaS0IzdkRwRVZIdmJEYWciPiYjMzIyMTsmIzMyNDA7JiMzMjc3OyYjMzI0MDsmIzMyMzM7PC9hPiAgPGEgaHJlZj0iL3VybD9xPWh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi9zZXRwcmVmcyUzRnNpZyUzRDBfaXR1TW9OSDJ1Qlhicy0zZEZsZkVob3dLX2FJJTI1M0QlMjZobCUzRG1sJTI2c291cmNlJTNEaG9tZXBhZ2UmYW1wO3NhPVUmYW1wO3ZlZD0wYWhVS0V3anFuUFBSN3Z2VEFoVUVNWThLSGF6cEE3UVEyWmdCQ0F3JmFtcDt1c2c9QUZRakNOSEN4QmJHNnZTNlVJLWF3WFRzTTNJWmFWZjZqUSI+JiMzMzc0OyYjMzM3ODsmIzMzNzU7JiMzMzkwOyYjMzM3OTsmIzMzMzA7PC9hPiAgPGEgaHJlZj0iL3VybD9xPWh0dHBzOi8vd3d3Lmdvb2dsZS5jby5pbi9zZXRwcmVmcyUzRnNpZyUzRDBfaXR1TW9OSDJ1Qlhicy0zZEZsZkVob3dLX2FJJTI1M0QlMjZobCUzRHBhJTI2c291cmNlJTNEaG9tZXBhZ2UmYW1wO3NhPVUmYW1wO3ZlZD0wYWhVS0V3anFuUFBSN3Z2VEFoVUVNWThLSGF6cEE3UVEyWmdCQ0EwJmFtcDt1c2c9QUZRakNORUllWGIyRlk3M3JQZVh6Tm1VQjQ0NDE0NTNVUSI+JiMyNjAyOyYjMjY3MjsmIzI1ODg7JiMyNjIyOyYjMjYwNDsmIzI2MjQ7PC9hPiA8L2Rpdj48L2Rpdj48L2Rpdj48c3BhbiBpZD0iZm9vdGVyIj48ZGl2IHN0eWxlPSJmb250LXNpemU6MTBwdCI+PGRpdiBzdHlsZT0ibWFyZ2luOjE5cHggYXV0bzt0ZXh0LWFsaWduOmNlbnRlciIgaWQ9ImZsbCI+PGEgaHJlZj0iL2ludGwvZW4vYWRzLyI+QWR2ZXJ0aXNpbmegUHJvZ3JhbXM8L2E+PGEgaHJlZj0iaHR0cDovL3d3dy5nb29nbGUuY28uaW4vc2VydmljZXMvIj5CdXNpbmVzcyBTb2x1dGlvbnM8L2E+PGEgaHJlZj0iaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vMTA0MjA1NzQyNzQzNzg3NzE4Mjk2IiByZWw9InB1Ymxpc2hlciI+K0dvb2dsZTwvYT48YSBocmVmPSIvaW50bC9lbi9hYm91dC5odG1sIj5BYm91dCBHb29nbGU8L2E+PGEgaHJlZj0iaHR0cHM6Ly93d3cuZ29vZ2xlLmNvLmluL3NldHByZWZkb21haW4/cHJlZmRvbT1VUyZhbXA7c2lnPV9fVHJlSGpSOHgxSXMzSDFUWEF1WmdVV1l6UFBZJTNEIiBpZD0iZmVobCI+R29vZ2xlLmNvbTwvYT48L2Rpdj48L2Rpdj48cCBzdHlsZT0iY29sb3I6Izc2NzY3Njtmb250LXNpemU6OHB0Ij4mY29weTsgMjAxNyAtIDxhIGhyZWY9Ii9pbnRsL2VuL3BvbGljaWVzL3ByaXZhY3kvIj5Qcml2YWN5PC9hPiAtIDxhIGhyZWY9Ii9pbnRsL2VuL3BvbGljaWVzL3Rlcm1zLyI+VGVybXM8L2E+PC9wPjwvc3Bhbj48L2NlbnRlcj48c2NyaXB0PihmdW5jdGlvbigpe3dpbmRvdy5nb29nbGUuY2RvPXtoZWlnaHQ6MCx3aWR0aDowfTsoZnVuY3Rpb24oKXt2YXIgYT13aW5kb3cuaW5uZXJXaWR0aCxiPXdpbmRvdy5pbm5lckhlaWdodDtpZighYXx8IWIpdmFyIGM9d2luZG93LmRvY3VtZW50LGQ9IkNTUzFDb21wYXQiPT1jLmNvbXBhdE1vZGU/Yy5kb2N1bWVudEVsZW1lbnQ6Yy5ib2R5LGE9ZC5jbGllbnRXaWR0aCxiPWQuY2xpZW50SGVpZ2h0O2EmJmImJihhIT1nb29nbGUuY2RvLndpZHRofHxiIT1nb29nbGUuY2RvLmhlaWdodCkmJmdvb2dsZS5sb2coIiIsIiIsIi9jbGllbnRfMjA0PyZhdHlwPWkmYml3PSIrYSsiJmJpaD0iK2IrIiZlaT0iK2dvb2dsZS5rRUkpO30pLmNhbGwodGhpcyk7fSkoKTs8L3NjcmlwdD48ZGl2IGlkPSJ4anNkIj48L2Rpdj48ZGl2IGlkPSJ4anNpIj48c2NyaXB0PihmdW5jdGlvbigpe2Z1bmN0aW9uIGMoYil7d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzY3JpcHQiKTthLnNyYz1iO2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJ4anNkIikuYXBwZW5kQ2hpbGQoYSl9LDApfWdvb2dsZS5kbGpwPWZ1bmN0aW9uKGIsYSl7Z29vZ2xlLnhqc3U9YjtjKGEpfTtnb29nbGUuZGxqPWM7fSkuY2FsbCh0aGlzKTsoZnVuY3Rpb24oKXt3aW5kb3cuZ29vZ2xlLnhqc3JtPVtdO30pKCk7aWYoZ29vZ2xlLnkpZ29vZ2xlLnkuZmlyc3Q9W107aWYoIWdvb2dsZS54anMpe3dpbmRvdy5fPXdpbmRvdy5ffHx7fTt3aW5kb3cuX0R1bXBFeGNlcHRpb249d2luZG93Ll8uX0R1bXBFeGNlcHRpb249ZnVuY3Rpb24oZSl7dGhyb3cgZX07aWYoZ29vZ2xlLnRpbWVycyYmZ29vZ2xlLnRpbWVycy5sb2FkLnQpe2dvb2dsZS50aW1lcnMubG9hZC50Lnhqc2xzPW5ldyBEYXRlKCkuZ2V0VGltZSgpO31nb29nbGUuZGxqcCgnL3hqcy9fL2pzL2tceDNkeGpzLmhwLmVuX1VTLmpwZzM1bGxqRHc4Lk8vbVx4M2RzYl9oZSxkL2FtXHgzZEFBWS9ydFx4M2RqL2RceDNkMS90XHgzZHpjbXMvcnNceDNkQUNUOTBvSFdRUDZCVWZOVjI5bTNuREpsMkJZZ2I0d3daQScsJy94anMvXy9qcy9rXHgzZHhqcy5ocC5lbl9VUy5qcGczNWxsakR3OC5PL21ceDNkc2JfaGUsZC9hbVx4M2RBQVkvcnRceDNkai9kXHgzZDEvdFx4M2R6Y21zL3JzXHgzZEFDVDkwb0hXUVA2QlVmTlYyOW0zbkRKbDJCWWdiNHd3WkEnKTtnb29nbGUueGpzPTE7fWdvb2dsZS5wbWM9eyJzYl9oZSI6eyJhZ2VuIjpmYWxzZSwiY2dlbiI6ZmFsc2UsImNsaWVudCI6ImhlaXJsb29tLWhwIiwiZGgiOnRydWUsImRocXQiOnRydWUsImRzIjoiIiwiZmwiOnRydWUsImhvc3QiOiJnb29nbGUuY28uaW4iLCJpc2JoIjoyOCwiamFtIjowLCJqc29ucCI6dHJ1ZSwibXNncyI6eyJjaWJsIjoiQ2xlYXIgU2VhcmNoIiwiZHltIjoiRGlkIHlvdSBtZWFuOiIsImxja3kiOiJJXHUwMDI2IzM5O20gRmVlbGluZyBMdWNreSIsImxtbCI6IkxlYXJuIG1vcmUiLCJvc2t0IjoiSW5wdXQgdG9vbHMiLCJwc3JjIjoiVGhpcyBzZWFyY2ggd2FzIHJlbW92ZWQgZnJvbSB5b3VyIFx1MDAzQ2EgaHJlZj1cIi9oaXN0b3J5XCJcdTAwM0VXZWIgSGlzdG9yeVx1MDAzQy9hXHUwMDNFIiwicHNybCI6IlJlbW92ZSIsInNiaXQiOiJTZWFyY2ggYnkgaW1hZ2UiLCJzcmNoIjoiR29vZ2xlIFNlYXJjaCJ9LCJuZHMiOnRydWUsIm92ciI6e30sInBxIjoiIiwicmVmcGQiOnRydWUsInJmcyI6W10sInNicGwiOjI0LCJzYnByIjoyNCwic2NkIjoxMCwic2NlIjo1LCJzdG9rIjoiRUI3ZVAtcXpZdVVuWXN6ZU1MbUZrZ3Z2Ql9jIn0sImQiOnt9LCJhV2l2N2ciOnt9LCJZRkNzL2ciOnt9fTtnb29nbGUueS5maXJzdC5wdXNoKGZ1bmN0aW9uKCl7aWYoZ29vZ2xlLm1lZCl7Z29vZ2xlLm1lZCgnaW5pdCcpO2dvb2dsZS5pbml0SGlzdG9yeSgpO2dvb2dsZS5tZWQoJ2hpc3RvcnknKTt9fSk7aWYoZ29vZ2xlLmomJmdvb2dsZS5qLmVuJiZnb29nbGUuai54aSl7d2luZG93LnNldFRpbWVvdXQoZ29vZ2xlLmoueGksMCk7fQo8L3NjcmlwdD48L2Rpdj48L2JvZHk+PC9odG1sPg==',
                    state: {
                        size: 'normal'
                    },
                    id: '21c40bcc-c1d5-1f91-06df-d7f4e66d1647',
                    name: 'Sample Response',
                    request: {
                        id: '032e9018-188a-492d-9fbd-7e4956f48034',
                        url: 'https://google.com',
                        headers: [],
                        headerData: [],
                        auth: null,
                        currentHelper: null,
                        helperAttributes: null,
                        data: 'akjshgdajhsgd',
                        method: 'GET',
                        dataMode: 'raw'
                    }
                });
                done();
            });
        });

        it('should work correctly for entire collections', function (done) {
            var source = {
                id: '03cf74df-32de-af8b-7db8-855b51b05e50',
                name: 'Postman Echo (shamasified)',
                // eslint-disable-next-line max-len
                description: 'Postman Echo is service you can use to test your REST clients and make sample API calls. It provides endpoints for `GET`, `POST`, `PUT`, various auth mechanisms and other utility endpoints.',
                order: [],
                folders: [
                    {
                        owner: '33232',
                        lastUpdatedBy: '33232',
                        lastRevision: 75211067,
                        id: '997e9a45-51e0-98b1-1894-319a72efca57',
                        name: 'Headers',
                        // eslint-disable-next-line max-len
                        description: 'The following set of endpoints allow one to see the headers being sent as part of a request and to get a custom set of headers as part of response.\n\nHTTP header fields provide required information about the request or response, or about the object sent in the message body. Both request headers and response headers can be controlled using these endpoints.',
                        order: [
                            '557b9d4d-bc9a-5172-5edf-d43a27055c89',
                            '5ec6f591-4460-e4cf-fdc1-0de07c10b2b1'
                        ]
                    }
                ],
                requests: [
                    {
                        folder: '997e9a45-51e0-98b1-1894-319a72efca57',
                        id: '557b9d4d-bc9a-5172-5edf-d43a27055c89',
                        name: 'Request Headers',
                        dataMode: 'params',
                        rawModeData: null,
                        descriptionFormat: null,
                        // eslint-disable-next-line max-len
                        description: 'A `GET` request to this endpoint returns the list of all request headers as part of the response JSON.\nIn Postman, sending your own set of headers through the [Headers tab](https://www.getpostman.com/docs/requests#headers) will reveal the headers as part of the response.',
                        method: 'GET',
                        pathVariables: [],
                        url: 'https://echo.getpostman.com/headers',
                        preRequestScript: '',
                        // eslint-disable-next-line max-len
                        tests: 'tests[\'Body contains headers\'] = responseBody.has(\'headers\');\n\nvar data = JSON.parse(responseBody).headers;\n\ntests[\'Header contains host\'] = \'host\' in data;\ntests[\'Header contains test parameter sent as part of request header\'] = \'my-sample-header\' in data;',
                        currentHelper: 'normal',
                        helperAttributes: {},
                        collectionId: '03cf74df-32de-af8b-7db8-855b51b05e50'
                    },
                    {
                        folder: '997e9a45-51e0-98b1-1894-319a72efca57',
                        id: '5ec6f591-4460-e4cf-fdc1-0de07c10b2b1',
                        name: 'Response Headers',
                        dataMode: 'params',
                        data: [
                            {
                                key: 'foo',
                                value: 'bar',
                                type: 'text'
                            }
                        ],
                        rawModeData: null,
                        descriptionFormat: null,
                        // eslint-disable-next-line max-len
                        description: 'This endpoint causes the server to send custom set of response headers. Providing header values as part of the URL parameters of a `GET` request to this endpoint returns the same as part of response header.\n\nTo send your own set of headers, simply add or replace the the URL parameters with your own set.',
                        headers: '',
                        method: 'GET',
                        pathVariables: {},
                        url: 'https://echo.getpostman.com/response-headers?Content-Type=text/html&Server=apibin',
                        preRequestScript: '',
                        // eslint-disable-next-line max-len
                        tests: 'tests[\'Body contains Content-Type\'] = responseBody.has(\'Content-Type\');\ntests[\'Body contains Server\'] = responseBody.has(\'Server\');',
                        currentHelper: 'normal',
                        helperAttributes: {},
                        collectionId: '03cf74df-32de-af8b-7db8-855b51b05e50'
                    }
                ]
            };

            transformer.normalize(source, options, function (err) {
                expect(err).to.not.be.ok;
                expect(JSON.parse(JSON.stringify(source))).to.eql({
                    id: '03cf74df-32de-af8b-7db8-855b51b05e50',
                    name: 'Postman Echo (shamasified)',
                    // eslint-disable-next-line max-len
                    description: 'Postman Echo is service you can use to test your REST clients and make sample API calls. It provides endpoints for `GET`, `POST`, `PUT`, various auth mechanisms and other utility endpoints.',
                    order: [],
                    folders: [
                        {
                            owner: '33232',
                            lastUpdatedBy: '33232',
                            lastRevision: 75211067,
                            id: '997e9a45-51e0-98b1-1894-319a72efca57',
                            name: 'Headers',
                            // eslint-disable-next-line max-len
                            description: 'The following set of endpoints allow one to see the headers being sent as part of a request and to get a custom set of headers as part of response.\n\nHTTP header fields provide required information about the request or response, or about the object sent in the message body. Both request headers and response headers can be controlled using these endpoints.',
                            order: ['557b9d4d-bc9a-5172-5edf-d43a27055c89', '5ec6f591-4460-e4cf-fdc1-0de07c10b2b1']
                        }
                    ],
                    requests: [
                        {
                            folder: '997e9a45-51e0-98b1-1894-319a72efca57',
                            id: '557b9d4d-bc9a-5172-5edf-d43a27055c89',
                            name: 'Request Headers',
                            dataMode: 'params',
                            auth: null,
                            currentHelper: null,
                            helperAttributes: null,
                            rawModeData: null,
                            descriptionFormat: null,
                            // eslint-disable-next-line max-len
                            description: 'A `GET` request to this endpoint returns the list of all request headers as part of the response JSON.\nIn Postman, sending your own set of headers through the [Headers tab](https://www.getpostman.com/docs/requests#headers) will reveal the headers as part of the response.',
                            method: 'GET',
                            pathVariables: [],
                            url: 'https://echo.getpostman.com/headers',
                            // eslint-disable-next-line max-len
                            tests: 'tests[\'Body contains headers\'] = responseBody.has(\'headers\');\n\nvar data = JSON.parse(responseBody).headers;\n\ntests[\'Header contains host\'] = \'host\' in data;\ntests[\'Header contains test parameter sent as part of request header\'] = \'my-sample-header\' in data;',
                            events: [{
                                listen: 'test',
                                script: {
                                    type: 'text/javascript',
                                    exec: [
                                        'tests[\'Body contains headers\'] = responseBody.has(\'headers\');',
                                        '',
                                        'var data = JSON.parse(responseBody).headers;',
                                        '',
                                        'tests[\'Header contains host\'] = \'host\' in data;',
                                        // eslint-disable-next-line max-len
                                        'tests[\'Header contains test parameter sent as part of request header\'] = \'my-sample-header\' in data;'
                                    ]
                                }
                            }],
                            collectionId: '03cf74df-32de-af8b-7db8-855b51b05e50'
                        },
                        {
                            folder: '997e9a45-51e0-98b1-1894-319a72efca57',
                            id: '5ec6f591-4460-e4cf-fdc1-0de07c10b2b1',
                            name: 'Response Headers',
                            dataMode: 'params',
                            data: [
                                {
                                    key: 'foo',
                                    value: 'bar',
                                    type: 'text'
                                }
                            ],
                            auth: null,
                            currentHelper: null,
                            helperAttributes: null,
                            rawModeData: null,
                            descriptionFormat: null,
                            // eslint-disable-next-line max-len
                            description: 'This endpoint causes the server to send custom set of response headers. Providing header values as part of the URL parameters of a `GET` request to this endpoint returns the same as part of response header.\n\nTo send your own set of headers, simply add or replace the the URL parameters with your own set.',
                            headers: '',
                            method: 'GET',
                            pathVariables: {},
                            url: 'https://echo.getpostman.com/response-headers?Content-Type=text/html&Server=apibin',
                            queryParams: [{
                                key: 'Content-Type',
                                value: 'text/html'
                            }, {
                                key: 'Server',
                                value: 'apibin'
                            }],
                            // eslint-disable-next-line max-len
                            tests: 'tests[\'Body contains Content-Type\'] = responseBody.has(\'Content-Type\');\ntests[\'Body contains Server\'] = responseBody.has(\'Server\');',
                            events: [{
                                listen: 'test',
                                script: {
                                    type: 'text/javascript',
                                    exec: [
                                        'tests[\'Body contains Content-Type\'] = responseBody.has(\'Content-Type\');',
                                        'tests[\'Body contains Server\'] = responseBody.has(\'Server\');'
                                    ]
                                }
                            }],
                            collectionId: '03cf74df-32de-af8b-7db8-855b51b05e50'
                        }
                    ]
                });

                done();
            });
        });
    });

    describe('retainEmptyValues', function () {
        var options = {
            retainIds: true,
            retainEmptyValues: true,
            normalizeVersion: '1.0.0'
        };

        it('should nullify empty descriptions when set to true (only if they exist)', function () {
            transformer.normalize({
                id: '9ac7325c-cc3f-4c20-b0f8-a435766cb74c',
                description: '', // this represents the case where descriptions are removed
                folders: [{ id: 'f3285fa0-e361-43ba-ba15-618c7a911e84', description: null }],
                requests: [{
                    id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                    description: false,
                    dataMode: 'params',
                    dataDisabled: false,
                    data: [{ key: 'body_foo', value: 'body_bar', description: 0 }],
                    auth: { type: 'bearer', bearer: [{ key: 'token', value: 'random' }] },
                    pathVariableData: [{ id: 'pv1', key: 'pv_foo', value: 'pv_bar', description: '' }],
                    headerData: [{ key: 'header_foo', value: 'header_bar', description: undefined }],
                    queryParams: [{ key: 'query_foo', value: 'query_bar', description: NaN }]
                }]
            }, options, function (err, result) {
                expect(err).to.not.be.ok;
                expect(result).to.eql({
                    id: '9ac7325c-cc3f-4c20-b0f8-a435766cb74c',
                    description: null,
                    folders: [{ id: 'f3285fa0-e361-43ba-ba15-618c7a911e84', description: null }],
                    requests: [{
                        id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                        description: null,
                        dataMode: 'params',
                        dataDisabled: false,
                        data: [{ key: 'body_foo', value: 'body_bar', description: null }],
                        auth: { type: 'bearer', bearer: [{ key: 'token', value: 'random', type: 'string' }] },
                        currentHelper: 'bearerAuth',
                        helperAttributes: { id: 'bearer', token: 'random' },
                        headerData: [{ key: 'header_foo', value: 'header_bar', description: null }],
                        queryParams: [{ key: 'query_foo', value: 'query_bar', description: null }],
                        pathVariableData: [{
                            id: 'pv1', key: 'pv_foo', value: 'pv_bar', description: null
                        }]
                    }]
                });
            });
        });

        it('should nullify empty descriptions in requests when set to true (only if they exist)', function () {
            transformer.normalizeSingle({
                id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                description: false,
                dataMode: 'params',
                dataDisabled: false,
                data: [{ key: 'body_foo', value: 'body_bar', description: 0 }],
                auth: { type: 'bearer', bearer: [{ key: 'token', value: 'random' }] },
                pathVariableData: [{ id: 'pv1', key: 'pv_foo', value: 'pv_bar', description: '' }],
                headerData: [{ key: 'header_foo', value: 'header_bar', description: undefined }],
                queryParams: [{ key: 'query_foo', value: 'query_bar', description: NaN }]
            }, options, function (err, result) {
                expect(err).to.not.be.ok;
                expect(result).to.eql({
                    id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                    description: null,
                    dataMode: 'params',
                    dataDisabled: false,
                    data: [{ key: 'body_foo', value: 'body_bar', description: null }],
                    auth: { type: 'bearer', bearer: [{ key: 'token', value: 'random', type: 'string' }] },
                    currentHelper: 'bearerAuth',
                    helperAttributes: { id: 'bearer', token: 'random' },
                    headerData: [{ key: 'header_foo', value: 'header_bar', description: null }],
                    queryParams: [{ key: 'query_foo', value: 'query_bar', description: null }],
                    pathVariableData: [{ id: 'pv1', key: 'pv_foo', value: 'pv_bar', description: null }]
                });
            });
        });

        it('should work correctly for urlencoded bodies as well', function () {
            transformer.normalizeSingle({
                id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                description: false,
                dataDisabled: false,
                dataMode: 'urlencoded',
                data: [{ key: 'body_foo', value: 'body_bar', description: 0 }],
                auth: { type: 'bearer', bearer: [{ key: 'token', value: 'random' }] },
                pathVariableData: [{ id: 'pv1', key: 'pv_foo', value: 'pv_bar', description: '' }],
                headerData: [{ key: 'header_foo', value: 'header_bar', description: undefined }],
                queryParams: [{ key: 'query_foo', value: 'query_bar', description: NaN }]
            }, options, function (err, result) {
                expect(err).to.not.be.ok;
                expect(result).to.eql({
                    id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                    description: null,
                    dataDisabled: false,
                    dataMode: 'urlencoded',
                    data: [{ key: 'body_foo', value: 'body_bar', description: null }],
                    auth: { type: 'bearer', bearer: [{ key: 'token', value: 'random', type: 'string' }] },
                    currentHelper: 'bearerAuth',
                    helperAttributes: { id: 'bearer', token: 'random' },
                    headerData: [{ key: 'header_foo', value: 'header_bar', description: null }],
                    queryParams: [{ key: 'query_foo', value: 'query_bar', description: null }],
                    pathVariableData: [{ id: 'pv1', key: 'pv_foo', value: 'pv_bar', description: null }]
                });
            });
        });
    });

    describe('noDefaults', function () {
        var options = {
            retainIds: true,
            noDefaults: true,
            normalizeVersion: '1.0.0'
        };

        describe('requests', function () {
            describe('non-mutated', function () {
                it('should be handled correctly for legacy attributes', function () {
                    var source = {
                        auth: {
                            type: 'noauth'
                        },
                        currentHelper: 'basicAuth',
                        helperAttributes: {
                            id: 'basic',
                            username: 'postman',
                            password: 'secret'
                        },
                        preRequestScript: 'console.log("Y");',
                        tests: 'console.log("Y");',
                        events: [
                            { listen: 'prerequest', script: { type: 'test/javascript', exec: ['console.log("No");'] } },
                            { listen: 'test', script: { type: 'test/javascript', exec: ['console.log("No");'] } }
                        ]
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        result = JSON.parse(JSON.stringify(result));
                        expect(result).to.eql({
                            auth: {
                                type: 'basic',
                                basic: [
                                    { key: 'username', value: 'postman', type: 'string' },
                                    { key: 'password', value: 'secret', type: 'string' },
                                    { key: 'saveHelperData', type: 'any' },
                                    { key: 'showPassword', value: false, type: 'boolean' }
                                ]
                            },
                            events: [
                                // eslint-disable-next-line max-len
                                { listen: 'prerequest', script: { type: 'text/javascript', exec: ['console.log("Y");'] } },
                                { listen: 'test', script: { type: 'text/javascript', exec: ['console.log("Y");'] } }
                            ],
                            preRequestScript: 'console.log("Y");',
                            tests: 'console.log("Y");',
                            currentHelper: 'basicAuth',
                            helperAttributes: {
                                id: 'basic',
                                username: 'postman',
                                password: 'secret'
                            }
                        });
                    });
                });

                it('should not remove currentHelper if helperAttributes are missing', function () {
                    var source = { currentHelper: 'basicAuth' };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        result = JSON.parse(JSON.stringify(result));
                        expect(result).to.eql(source);
                    });
                });

                it('should not delete helperAttributes if currentHelper is missing', function () {
                    var source = {
                        helperAttributes: {
                            id: 'basic',
                            username: 'postman',
                            password: 'secret'
                        }
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        result = JSON.parse(JSON.stringify(result));
                        expect(result).to.eql({
                            helperAttributes: {
                                id: 'basic',
                                username: 'postman',
                                password: 'secret'
                            },
                            currentHelper: 'basicAuth',
                            auth: {
                                type: 'basic',
                                basic: [
                                    { key: 'username', value: 'postman', type: 'string' },
                                    { key: 'password', value: 'secret', type: 'string' },
                                    { key: 'saveHelperData', type: 'any' },
                                    { key: 'showPassword', value: false, type: 'boolean' }
                                ]
                            }
                        });
                    });
                });

                it('should recreate only prerequests from legacy if sent', function () {
                    var source = {
                        preRequestScript: 'console.log("Pre-request script");'
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        result = JSON.parse(JSON.stringify(result));
                        expect(result).to.eql({
                            preRequestScript: 'console.log("Pre-request script");',
                            events: [
                                {
                                    listen: 'prerequest',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Pre-request script");']
                                    }
                                }
                            ]
                        });
                    });
                });

                it('should recreate only prerequests in legacy if sent from events', function () {
                    var source = {
                        events: [
                            {
                                listen: 'prerequest',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Pre-request script");']
                                }
                            }
                        ]
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        result = JSON.parse(JSON.stringify(result));
                        expect(result).to.eql({
                            tests: null,
                            preRequestScript: 'console.log("Pre-request script");',
                            events: [
                                {
                                    listen: 'prerequest',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Pre-request script");']
                                    }
                                }
                            ]
                        });
                    });
                });

                it('should recreate only tests from legacy if sent', function () {
                    var source = {
                        tests: 'console.log("Test script");'
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        result = JSON.parse(JSON.stringify(result));
                        expect(result).to.eql({
                            tests: 'console.log("Test script");',
                            events: [
                                {
                                    listen: 'test',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Test script");']
                                    }
                                }
                            ]
                        });
                    });
                });

                it('should recreate only tests in legacy if sent from events', function () {
                    var source = {
                        events: [
                            {
                                listen: 'test',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Test script");']
                                }
                            }
                        ]
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        result = JSON.parse(JSON.stringify(result));
                        expect(result).to.eql({
                            preRequestScript: null,
                            tests: 'console.log("Test script");',
                            events: [
                                {
                                    listen: 'test',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Test script");']
                                    }
                                }
                            ]
                        });
                    });
                });
            });

            describe('mutated', function () {
                var opts = _.defaults({ mutate: true }, options);

                it('should be handled correctly for legacy attributes', function () {
                    var source = {
                        auth: {
                            type: 'noauth'
                        },
                        currentHelper: 'basicAuth',
                        helperAttributes: {
                            id: 'basic',
                            username: 'postman',
                            password: 'secret',
                            saveToRequest: false
                        },
                        preRequestScript: 'console.log("Y");',
                        tests: 'console.log("Y");',
                        events: [
                            { listen: 'prerequest', script: { type: 'test/javascript', exec: ['console.log("No");'] } },
                            { listen: 'test', script: { type: 'test/javascript', exec: ['console.log("No");'] } }
                        ]
                    };

                    transformer.normalizeSingle(source, opts, function (err) {
                        expect(err).to.not.be.ok;

                        expect(source).to.eql({
                            auth: {
                                type: 'basic',
                                basic: [
                                    { key: 'username', value: 'postman', type: 'string' },
                                    { key: 'password', value: 'secret', type: 'string' },
                                    { key: 'saveHelperData', value: false, type: 'boolean' },
                                    { key: 'showPassword', value: false, type: 'boolean' }
                                ]
                            },
                            events: [
                                // eslint-disable-next-line max-len
                                { listen: 'prerequest', script: { type: 'text/javascript', exec: ['console.log("Y");'] } },
                                { listen: 'test', script: { type: 'text/javascript', exec: ['console.log("Y");'] } }
                            ],
                            preRequestScript: 'console.log("Y");',
                            tests: 'console.log("Y");',
                            currentHelper: 'basicAuth',
                            helperAttributes: {
                                id: 'basic',
                                username: 'postman',
                                password: 'secret',
                                saveToRequest: false
                            }
                        });
                    });
                });

                it('should not remove currentHelper if helperAttributes are missing', function () {
                    var source = { currentHelper: 'basicAuth' };

                    transformer.normalizeSingle(source, opts, function (err) {
                        expect(err).to.not.be.ok;

                        expect(source).to.eql({
                            currentHelper: 'basicAuth'
                        });
                    });
                });

                it('should not delete helperAttributes if currentHelper is missing', function () {
                    var source = {
                        helperAttributes: {
                            id: 'basic',
                            username: 'postman',
                            password: 'secret',
                            saveToRequest: false
                        }
                    };

                    transformer.normalizeSingle(source, opts, function (err) {
                        expect(err).to.not.be.ok;

                        expect(source).to.eql({
                            currentHelper: 'basicAuth',
                            helperAttributes: {
                                id: 'basic',
                                username: 'postman',
                                password: 'secret',
                                saveToRequest: false
                            },
                            auth: {
                                type: 'basic',
                                basic: [
                                    { key: 'username', value: 'postman', type: 'string' },
                                    { key: 'password', value: 'secret', type: 'string' },
                                    { key: 'saveHelperData', value: false, type: 'boolean' },
                                    { key: 'showPassword', value: false, type: 'boolean' }
                                ]
                            }
                        });
                    });
                });

                it('should recreate only prerequests from legacy if sent', function () {
                    var source = {
                        preRequestScript: 'console.log("Pre-request script");'
                    };

                    transformer.normalizeSingle(source, opts, function (err) {
                        expect(err).to.not.be.ok;

                        expect(source).to.eql({
                            preRequestScript: 'console.log("Pre-request script");',
                            events: [
                                {
                                    listen: 'prerequest',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Pre-request script");']
                                    }
                                }
                            ]
                        });
                    });
                });

                it('should recreate only prerequests in legacy if sent from events', function () {
                    var source = {
                        events: [
                            {
                                listen: 'prerequest',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Pre-request script");']
                                }
                            }
                        ]
                    };

                    transformer.normalizeSingle(source, opts, function (err) {
                        expect(err).to.not.be.ok;

                        expect(source).to.eql({
                            tests: null,
                            preRequestScript: 'console.log("Pre-request script");',
                            events: [
                                {
                                    listen: 'prerequest',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Pre-request script");']
                                    }
                                }
                            ]
                        });
                    });
                });

                it('should recreate only tests from legacy if sent', function () {
                    var source = {
                        tests: 'console.log("Test script");'
                    };

                    transformer.normalizeSingle(source, opts, function (err) {
                        expect(err).to.not.be.ok;

                        expect(source).to.eql({
                            tests: 'console.log("Test script");',
                            events: [
                                {
                                    listen: 'test',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Test script");']
                                    }
                                }
                            ]
                        });
                    });
                });

                it('should recreate only tests in legacy if sent from events', function () {
                    var source = {
                        events: [
                            {
                                listen: 'test',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Test script");']
                                }
                            }
                        ]
                    };

                    transformer.normalizeSingle(source, opts, function (err) {
                        expect(err).to.not.be.ok;

                        expect(source).to.eql({
                            preRequestScript: null,
                            tests: 'console.log("Test script");',
                            events: [
                                {
                                    listen: 'test',
                                    script: {
                                        type: 'text/javascript',
                                        exec: ['console.log("Test script");']
                                    }
                                }
                            ]
                        });
                    });
                });
            });
        });
    });

    describe('prioritizeV2, noDefaults: true', function () {
        var options = {
            noDefaults: true,
            prioritizeV2: true,
            normalizeVersion: '1.0.0'
        };

        describe('auth', function () {
            it('should correctly prioritize v2 auth whilst normalizing', function (done) {
                var source = {
                    currentHelper: 'basicAuth',
                    helperAttributes: {
                        id: 'basic',
                        username: 'postman',
                        password: 'secret'
                    },
                    auth: {
                        type: 'bearer',
                        bearer: [{ key: 'token', value: 'secret', type: 'string' }]
                    }
                };

                transformer.normalizeSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(result).to.eql({
                        currentHelper: 'bearerAuth',
                        helperAttributes: {
                            id: 'bearer',
                            token: 'secret'
                        },
                        auth: {
                            type: 'bearer',
                            bearer: [{ key: 'token', value: 'secret', type: 'string' }]
                        }
                    });
                    done();
                });
            });

            it('should fall back to legacy properties if auth is falsy', function (done) {
                var source = {
                    currentHelper: 'basicAuth',
                    helperAttributes: {
                        id: 'basic',
                        username: 'postman',
                        password: 'secret'
                    },
                    auth: null
                };

                transformer.normalizeSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        currentHelper: 'basicAuth',
                        helperAttributes: {
                            id: 'basic',
                            username: 'postman',
                            password: 'secret'
                        },
                        auth: {
                            type: 'basic',
                            basic: [
                                { key: 'username', value: 'postman', type: 'string' },
                                { key: 'password', value: 'secret', type: 'string' },
                                { key: 'saveHelperData', type: 'any' },
                                { key: 'showPassword', value: false, type: 'boolean' }
                            ]
                        }
                    });
                    done();
                });
            });

            it('should retain type noauth if auth is noauth and currentHelper is null', function (done) {
                var source = {
                    currentHelper: null,
                    auth: { type: 'noauth' }
                };

                transformer.normalizeSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        currentHelper: null,
                        helperAttributes: null,
                        auth: { type: 'noauth' }
                    });
                    done();
                });
            });

            it('should nullify if both: legacy and new attributes are falsy', function (done) {
                var source = {
                    currentHelper: null,
                    helperAttributes: null,
                    auth: null
                };

                transformer.normalizeSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(result).to.eql({
                        currentHelper: null,
                        helperAttributes: null,
                        auth: null
                    });
                    done();
                });
            });

            it('should nullify auth if both: legacy is normal and the new attribute is falsy', function (done) {
                var source = {
                    currentHelper: 'normal',
                    helperAttributes: null,
                    auth: null
                };

                transformer.normalizeSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(result).to.eql({
                        currentHelper: null,
                        helperAttributes: null,
                        auth: null
                    });
                    done();
                });
            });

            describe('with missing properties', function () {
                it('should fall back to legacy properties if auth is missing', function (done) {
                    var source = {
                        currentHelper: 'basicAuth',
                        helperAttributes: {
                            id: 'basic',
                            username: 'postman',
                            password: 'secret'
                        }
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            currentHelper: 'basicAuth',
                            helperAttributes: {
                                id: 'basic',
                                username: 'postman',
                                password: 'secret'
                            },
                            auth: {
                                type: 'basic',
                                basic: [
                                    { key: 'username', value: 'postman', type: 'string' },
                                    { key: 'password', value: 'secret', type: 'string' },
                                    { key: 'saveHelperData', type: 'any' },
                                    { key: 'showPassword', value: false, type: 'boolean' }
                                ]
                            }
                        });
                        done();
                    });
                });

                it('should discard auth creation if both: legacy and new attributes are missing', function (done) {
                    var source = {};

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({});
                        done();
                    });
                });

                it('should discard auth if both: legacy is normal and new attributes are missing', function (done) {
                    var source = { currentHelper: 'normal' };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            auth: null,
                            currentHelper: null,
                            helperAttributes: null
                        });
                        done();
                    });
                });
            });
        });

        describe('scripts', function () {
            it('should correctly prioritize `events` over preRequestScript/tests', function (done) {
                var source = {
                    preRequestScript: 'console.log("Legacy prerequest script");',
                    tests: 'console.log("Legacy test script");',
                    events: [{
                        listen: 'prerequest',
                        script: { exec: ['console.log("Actual prerequest script");'] }
                    }, {
                        listen: 'test',
                        script: { exec: ['console.log("Actual test script");'] }
                    }]
                };

                transformer.normalizeSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(result).to.eql({
                        preRequestScript: 'console.log("Actual prerequest script");',
                        tests: 'console.log("Actual test script");',
                        events: [{
                            listen: 'prerequest',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Actual prerequest script");']
                            }
                        }, {
                            listen: 'test',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Actual test script");']
                            }
                        }]
                    });
                    done();
                });
            });

            it('should correctly handle events with falsy scripts', function (done) {
                var source = {
                    events: [{
                        listen: 'prerequest'
                    }, {
                        listen: 'test'
                    }]
                };

                transformer.normalizeSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(result).to.eql({
                        tests: null,
                        preRequestScript: null,
                        events: [{ listen: 'prerequest' }, { listen: 'test' }]
                    });
                    done();
                });
            });

            it('should correctly handle array legacy scripts', function (done) {
                var source = {
                    preRequestScript: ['console.log("Actual prerequest script");'],
                    tests: ['console.log("Actual test script");']
                };

                transformer.normalizeSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(result).to.eql({
                        preRequestScript: 'console.log("Actual prerequest script");',
                        tests: 'console.log("Actual test script");',
                        events: [{
                            listen: 'prerequest',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Actual prerequest script");']
                            }
                        }, {
                            listen: 'test',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Actual test script");']
                            }
                        }]
                    });
                    done();
                });
            });

            it('should correctly fall back to preRequestScript/tests if `events` is empty', function (done) {
                var source = {
                    preRequestScript: 'console.log("Legacy prerequest script");',
                    tests: 'console.log("Legacy test script");',
                    events: []
                };

                transformer.normalizeSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(result).to.eql({
                        preRequestScript: 'console.log("Legacy prerequest script");',
                        tests: 'console.log("Legacy test script");',
                        events: [{
                            listen: 'prerequest',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Legacy prerequest script");']
                            }
                        }, {
                            listen: 'test',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Legacy test script");']
                            }
                        }]
                    });
                    done();
                });
            });

            it('should nullify the event if both legacy and current attributes are empty', function (done) {
                var source = {
                    preRequestScript: null,
                    tests: null,
                    events: []
                };

                transformer.normalizeSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(result).to.eql({
                        preRequestScript: null,
                        tests: null
                    });
                    done();
                });
            });

            describe('with missing properties', function () {
                it('should handle missing preRequestScript and tests correctly', function (done) {
                    var source = {
                        events: [{
                            listen: 'prerequest',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Pre-request script");']
                            }
                        }, {
                            listen: 'test',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Test script");']
                            }
                        }]
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            preRequestScript: 'console.log("Pre-request script");',
                            tests: 'console.log("Test script");',
                            events: [{
                                listen: 'prerequest',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Pre-request script");']
                                }
                            }, {
                                listen: 'test',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Test script");']
                                }
                            }]
                        });
                        done();
                    });
                });

                it('should handle missing events correctly', function (done) {
                    var source = {
                        preRequestScript: 'console.log("Pre-request script");',
                        tests: 'console.log("Test script");'
                    };

                    transformer.normalizeSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            events: [{
                                listen: 'prerequest',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Pre-request script");']
                                }
                            }, {
                                listen: 'test',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Test script");']
                                }
                            }],
                            preRequestScript: 'console.log("Pre-request script");',
                            tests: 'console.log("Test script");'
                        });
                        done();
                    });
                });

                it('should discard property creation if both are absent', function (done) {
                    transformer.normalizeSingle({}, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({});
                        done();
                    });
                });
            });
        });
    });

    describe('malformed collections', function () {
        it('should be handled correctly', function (done) {
            transformer.normalize({
                id: '2509a94e-eca1-43ca-a8aa-0e200636764f',
                event: [
                    undefined, { script: undefined }, { script: { exec: undefined } }
                ],
                folders: [false, null, { id: 'F1' }, 0, NaN, '', undefined],
                folders_order: [false, null, 'F1', 0, NaN, '', undefined],
                requests: [false, null, {
                    id: 'R1'
                }, 0, NaN, '', undefined],
                order: [false, null, 'R1', 0, NaN, '', undefined]
            }, options, function (err, result) {
                expect(err).to.not.be.ok;
                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    id: '2509a94e-eca1-43ca-a8aa-0e200636764f',
                    event: [null, {}, { script: {} }],
                    folders: [{ id: 'F1' }],
                    folders_order: ['F1'],
                    requests: [{ id: 'R1' }],
                    order: ['R1']
                });
                done();
            });
        });

        it('should correctly convert text to string', function (done) {
            transformer.normalize({
                id: '2509a94e-eca1-43ca-a8aa-0e200636764f',
                auth: {
                    type: 'bearer',
                    bearer: [{ key: 'token', value: 'bar', type: 'text' }]
                },
                variables: [{
                    id: 'f42cc664-4823-4012-b7dd-9e9f965b736a', key: 'foo', value: 'bar', type: 'text'
                }]
            }, options, function (err, result) {
                expect(err).to.not.be.ok;
                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    id: '2509a94e-eca1-43ca-a8aa-0e200636764f',
                    auth: {
                        type: 'bearer',
                        bearer: [{ key: 'token', value: 'bar', type: 'string' }]
                    },
                    variables: [{
                        id: 'f42cc664-4823-4012-b7dd-9e9f965b736a', key: 'foo', value: 'bar', type: 'string'
                    }]
                });
                done();
            });
        });
    });

    describe('retainIds', function () {
        it('should handle IDs correctly when set to true', function () {
            transformer.normalize({
                id: '2509a94e-eca1-43ca-a8aa-0e200636764f',
                folders_order: [null, NaN, undefined, false, '', 0],
                folders: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }],
                requests: [
                    // eslint-disable-next-line max-len
                    { id: null, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: NaN, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: undefined, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: false, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: '', responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: 0, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] }
                ]
            }, options, function (err, result) {
                expect(err).to.not.be.ok;
                expect(result).to.be.ok;

                expect(result).to.have.property('id', '2509a94e-eca1-43ca-a8aa-0e200636764f');
                expect(result.requests).to.have.length(6);

                _.forEach(result.folders, function (folder) {
                    expect(folder.id).to.match(/[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}/);
                });
                _.forEach(result.requests, function (request) {
                    _.forEach(request.responses, function (response) {
                        expect(response.id).to.match(/[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}/);
                    });
                    expect(request.id).to.match(/[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}/);
                });
            });
        });

        it('should handle IDs correctly when set to false', function () {
            transformer.normalize({
                id: '2509a94e-eca1-43ca-a8aa-0e200636764f',
                folders_order: [null, NaN, undefined, false, '', 0],
                folders: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }],
                requests: [
                    // eslint-disable-next-line max-len
                    { id: null, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: NaN, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: undefined, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: false, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: '', responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: 0, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] }
                ]
            }, _.defaults({ retainIds: false }, options), function (err, result) {
                expect(err).to.not.be.ok;
                expect(result).to.be.ok;

                expect(result.id).to.match(/[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}/);
                expect(result.id).to.not.equal('2509a94e-eca1-43ca-a8aa-0e200636764f');

                expect(result.requests).to.have.length(6);

                _.forEach(result.folders, function (folder) {
                    expect(folder.id).to.match(/[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}/);
                });
                _.forEach(result.requests, function (request) {
                    _.forEach(request.responses, function (response) {
                        expect(response.id).to.match(/[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}/);
                    });
                    expect(request.id).to.match(/[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}/);
                });
            });
        });

        it('should handle IDs correctly when missing', function () {
            transformer.normalize({
                id: '2509a94e-eca1-43ca-a8aa-0e200636764f',
                folders_order: [null, NaN, undefined, false, '', 0],
                folders: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }],
                requests: [
                    // eslint-disable-next-line max-len
                    { id: null, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: NaN, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: undefined, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: false, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: '', responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] },
                    // eslint-disable-next-line max-len
                    { id: 0, responses: [{ id: null }, { id: NaN }, { id: undefined }, { id: false }, { id: '' }, { id: 0 }] }
                ]
            }, _.omit(options, ['retainIds']), function (err, result) {
                expect(err).to.not.be.ok;
                expect(result).to.be.ok;

                expect(result.id).to.match(/[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}/);
                expect(result.id).to.not.equal('2509a94e-eca1-43ca-a8aa-0e200636764f');

                expect(result.requests).to.have.length(6);

                _.forEach(result.folders, function (folder) {
                    expect(folder.id).to.match(/[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}/);
                });
                _.forEach(result.requests, function (request) {
                    _.forEach(request.responses, function (response) {
                        expect(response.id).to.match(/[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}/);
                    });
                    expect(request.id).to.match(/[a-f0-9]{8}(-[a-f0-9]{4}){4}[a-f0-9]{8}/);
                });
            });
        });
    });
});
