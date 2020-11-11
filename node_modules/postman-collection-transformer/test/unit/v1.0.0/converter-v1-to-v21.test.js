/**
 * @fileoverview This test suite runs tests on the V1 to V2 converter.
 */

var _ = require('lodash'),
    expect = require('chai').expect,
    transformer = require('../../../index');

/* global describe, it */
describe('v1.0.0 to v2.1.0', function () {
    var options = {
        inputVersion: '1.0.0',
        outputVersion: '2.1.0',
        retainIds: true
    };

    describe('api', function () {
        it('should have a .convertSingle() function', function () {
            expect(transformer.convertSingle).to.be.a('function');
            expect(transformer.convertSingle.length).to.equal(3);
        });

        it('should have a .convert() function', function () {
            expect(transformer.convert).to.be.a('function');
            expect(transformer.convert.length).to.equal(3);
        });
    });

    describe('transformer', function () {
        describe('.convertSingle()', function () {
            it('should work as intended', function (done) {
                var fixture = require('../fixtures/single-request');

                transformer.convertSingle(fixture.v1, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql(fixture.v21);
                    done();
                });
            });

            it('should handle pathVariables correctly', function (done) {
                transformer.convertSingle({
                    id: '591dad6f-1067-4f1e-a51e-96f2c30cbcd9',
                    pathVariables: { foo: 'bar' }
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        _postman_id: '591dad6f-1067-4f1e-a51e-96f2c30cbcd9',
                        name: '',
                        request: {
                            header: [],
                            url: {
                                raw: '',
                                variable: [{ id: 'foo', value: 'bar' }]
                            }
                        },
                        response: []
                    });
                    done();
                });
            });

            it('should handle disabled body elements correctly', function (done) {
                transformer.convertSingle({
                    id: '591dad6f-1067-4f1e-a51e-96f2c30cbcd9',
                    dataMode: 'params',
                    data: [{ key: 'foo', value: 'bar', enabled: false }]
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        _postman_id: '591dad6f-1067-4f1e-a51e-96f2c30cbcd9',
                        name: '',
                        request: {
                            body: {
                                mode: 'formdata',
                                formdata: [{ key: 'foo', value: 'bar', disabled: true }]
                            },
                            header: []
                        },
                        response: []
                    });
                    done();
                });
            });

            it('should work as intended without callbacks', function () {
                var fixture = require('../fixtures/single-request');

                expect(JSON.parse(JSON.stringify(transformer.convertSingle(fixture.v1, options)))).to.eql(fixture.v21);
            });
        });

        describe('.convert()', function () {
            it('should work as intended', function (done) {
                var fixture = require('../fixtures/sample-collection');

                transformer.convert(fixture.v1, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql(fixture.v21);
                    done();
                });
            });

            it('should work as intended without callbacks', function () {
                var fixture = require('../fixtures/sample-collection');

                expect(JSON.parse(JSON.stringify(transformer.convert(fixture.v1, options)))).to.eql(fixture.v21);
            });

            it('should generate new collection IDs when missing', function (done) {
                transformer.convert({}, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.include.keys({
                        info: {
                            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                        },
                        item: []
                    });
                    expect(converted.info._postman_id).to.match(/^[a-f0-9]{4}([a-f0-9]{4}-){4}[a-f0-9]{12}$/);
                    done();
                });
            });

            it('should work correctly for nested folders', function (done) {
                transformer.convert({
                    id: '9be04d9c-511b-4089-a184-9f0dedc7b21d',
                    folders: [{ id: 'F1', folders_order: ['F1.F2'] }, { id: 'F1.F2' }],
                    folders_order: ['F1']
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        info: {
                            _postman_id: '9be04d9c-511b-4089-a184-9f0dedc7b21d',
                            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                        },
                        item: [{
                            _postman_id: 'F1',
                            item: [{
                                _postman_id: 'F1.F2',
                                _postman_isSubFolder: true,
                                item: []
                            }]
                        }]
                    });
                    done();
                });
            });
        });

        describe('.convertResponse()', function () {
            it('should work as intended', function (done) {
                var fixture = require('../fixtures/single-response');

                transformer.convertResponse(fixture.v1, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));
                    expect(converted).to.eql(fixture.v21);
                    done();
                });
            });

            it('should handle cookies correctly', function (done) {
                transformer.convertResponse({
                    id: '7b007f3d-dc1a-4e55-9795-c6a88315a0cd',
                    cookies: [{
                        expirationDate: 1532253966,
                        hostOnly: true,
                        httpOnly: true,
                        domain: 'postman-echo.com',
                        path: '/',
                        secure: true,
                        value: 'Foo',
                        name: 'Session'
                    }]
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));
                    expect(converted).to.include.keys({
                        id: '7b007f3d-dc1a-4e55-9795-c6a88315a0cd',
                        name: 'response',
                        cookie: [{
                            // eslint-disable-next-line max-len
                            expires: `Sun Jul 22 2018 15:36:06 GMT+0530 (${typeof browser === 'undefined' ? 'IST' : 'India Standard Time'})`,
                            hostOnly: true,
                            httpOnly: true,
                            domain: 'postman-echo.com',
                            path: '/',
                            secure: true,
                            value: 'Foo',
                            key: 'Session'
                        }]
                    });
                    done();
                });
            });

            it('should work as intended without callbacks', function () {
                var fixture = require('../fixtures/single-response');

                expect(JSON.parse(JSON.stringify(transformer.convertResponse(fixture.v1, options))))
                    .to.eql(fixture.v21);
            });
        });
    });

    describe('descriptions', function () {
        it('should correctly handle descriptions whilst converting from v1 to v2.1.0', function (done) {
            var fixture = require('../fixtures/sample-description');

            transformer.convert(fixture.v1, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql(fixture.v21);
                done();
            });
        });

        it('should correctly handle falsy descriptions whilst converting from v1.0.0 to v2.1.0', function (done) {
            transformer.convert({
                id: 'C1',
                name: 'collection',
                description: null,
                requests: [{
                    id: 'R1',
                    collectionId: 'C1',
                    name: 'request one',
                    description: ''
                }],
                folders: [{
                    id: 'F1',
                    order: ['R1'],
                    name: 'folder one',
                    description: undefined
                }],
                order: [],
                folders_order: ['F1']
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                expect(JSON.parse(JSON.stringify(converted))).to.eql({
                    info: {
                        _postman_id: 'C1',
                        name: 'collection',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: 'F1',
                        name: 'folder one',
                        item: [{
                            _postman_id: 'R1',
                            name: 'request one',
                            request: {
                                header: []
                            },
                            response: []
                        }]
                    }]
                });
                done();
            });
        });
    });

    describe('request file body', function () {
        it('should correctly handle request file bodies whilst converting from v1 to v2', function (done) {
            var fixture = require('../fixtures/request-body-file');

            transformer.convert(fixture.v1, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql(fixture.v21);
                done();
            });
        });

        it('should convert non-string values to an explicit null', function (done) {
            transformer.convert({
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
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'body-src-check',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [
                        {
                            _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                            name: '',
                            request: {
                                body: {
                                    mode: 'formdata',
                                    formdata: [
                                        { key: 'alpha', src: null, type: 'file' },
                                        { key: 'beta', src: null, type: 'file' },
                                        { key: 'gamma', src: null, type: 'file' }
                                    ]
                                },
                                header: [],
                                method: 'POST',
                                url: {
                                    raw: 'https://postman-echo.com/post',
                                    protocol: 'https',
                                    host: ['postman-echo', 'com'],
                                    path: ['post']
                                }
                            },
                            response: []
                        }
                    ]
                });
                done();
            });
        });

        it('should convert non-string values to an explicit null in requests', function (done) {
            transformer.convertSingle({
                id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                headers: '',
                url: 'https://postman-echo.com/post',
                method: 'POST',
                data: [
                    { key: 'alpha', value: 1, type: 'file' },
                    { key: 'beta', value: {}, type: 'file' },
                    { key: 'gamma', value: true, type: 'file' }
                ],
                dataMode: 'params'
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    name: '',
                    request: {
                        body: {
                            mode: 'formdata',
                            formdata: [
                                { key: 'alpha', src: null, type: 'file' },
                                { key: 'beta', src: null, type: 'file' },
                                { key: 'gamma', src: null, type: 'file' }
                            ]
                        },
                        header: [],
                        method: 'POST',
                        url: {
                            raw: 'https://postman-echo.com/post',
                            protocol: 'https',
                            host: ['postman-echo', 'com'],
                            path: ['post']
                        }
                    },
                    response: []
                });
                done();
            });
        });
    });

    describe('disabled request body', function () {
        it('should handle disabled request body correctly', function (done) {
            transformer.convert({
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
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'disabled-body',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                disabled: true,
                                mode: 'raw',
                                raw: 'foo=bar'
                            },
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should not include disabled property unless its true', function (done) {
            transformer.convert({
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
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'disabled-body',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                mode: 'raw',
                                raw: 'foo=bar'
                            },
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });
    });

    describe('null request body', function () {
        it('should handle request without body correctly', function (done) {
            transformer.convert({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-request-body',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
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
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'null-request-body',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should handle request with dataMode set to `null` but data is present', function (done) {
            transformer.convert({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-dataMode',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    dataMode: null,
                    data: 'foo=bar',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'null-dataMode',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should handle request with dataMode set to `null` but data is present, with `retainEmptyValues` set to ' +
            'true', function (done) {
            transformer.convert({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-dataMode',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    dataMode: null,
                    data: 'foo=bar',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, Object.assign({}, options, {
                retainEmptyValues: true
            }), function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'null-dataMode',
                        description: null,
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: null,
                            header: [],
                            method: 'POST',
                            description: null,
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should set mode to raw if dataMode is not set but data is present', function (done) {
            transformer.convert({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-dataMode',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    data: 'foo=bar',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'null-dataMode',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                mode: 'raw',
                                raw: 'foo=bar'
                            },
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should set mode to raw if dataMode is not set but rawModeData is present', function (done) {
            transformer.convert({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-dataMode',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    rawModeData: 'foo=bar',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'null-dataMode',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                mode: 'raw',
                                raw: 'foo=bar'
                            },
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should set mode to raw if dataMode is not set but all other data props are set', function (done) {
            transformer.convert({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-dataMode',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    data: [{ key: 'foo', value: 'bar' }],
                    rawModeData: 'RAW MODE HAS HIGHEST PRECEDENCE',
                    graphqlModeData: 'Am I a Joke To You?',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'null-dataMode',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                mode: 'raw',
                                raw: 'RAW MODE HAS HIGHEST PRECEDENCE'
                            },
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should set mode to formdata if both data and graphqlModeData are set', function (done) {
            transformer.convert({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-dataMode',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    data: [{
                        key: 'foo',
                        value: 'FORMDATA MODE HAS HIGHER PRECEDENCE'
                    }],
                    graphqlModeData: 'Am I a Joke To You?',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'null-dataMode',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                mode: 'formdata',
                                formdata: [{
                                    key: 'foo',
                                    value: 'FORMDATA MODE HAS HIGHER PRECEDENCE'
                                }]
                            },
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should set mode to graphql if dataMode is not set but graphqlModeData is present', function (done) {
            transformer.convert({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-dataMode',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    graphqlModeData: {
                        query: 'query Test { hello }',
                        operationName: 'Test',
                        variables: '{"foo":"bar"}'
                    },
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'null-dataMode',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                mode: 'graphql',
                                graphql: {
                                    query: 'query Test { hello }',
                                    operationName: 'Test',
                                    variables: '{"foo":"bar"}'
                                }
                            },
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should set dataMode (file) even if data is not set', function (done) {
            transformer.convert({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-data',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    dataMode: 'binary',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'null-data',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                mode: 'file',
                                file: {}
                            },
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should set dataMode (raw) even if data is not set', function (done) {
            transformer.convert({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-data',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    dataMode: 'raw',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'null-data',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                mode: 'raw',
                                raw: ''
                            },
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should set dataMode (graphql) even if data is not set', function (done) {
            transformer.convert({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-data',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    dataMode: 'graphql',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'null-data',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                mode: 'graphql'
                            },
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should set dataMode (formdata) even if data is not set', function (done) {
            transformer.convert({
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
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'null-data',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                mode: 'formdata',
                                formdata: []
                            },
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should set dataMode (urlencoded) even if data is not set', function (done) {
            transformer.convert({
                id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                name: 'null-data',
                order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                folders: [],
                folders_order: [],
                requests: [{
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    headers: '',
                    url: 'https://postman-echo.com/post',
                    dataMode: 'urlencoded',
                    method: 'POST',
                    collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                }]
            }, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    info: {
                        _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                        name: 'null-data',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                mode: 'urlencoded',
                                urlencoded: []
                            },
                            header: [],
                            method: 'POST',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['post'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/post'
                            }
                        },
                        response: []
                    }]
                });
                done();
            });
        });
    });

    describe('request body options', function () {
        describe('with convert', function () {
            it('should transform body options', function (done) {
                transformer.convert({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'get-with-body',
                    order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                    folders: [],
                    folders_order: [],
                    requests: [{
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        data: 'foo=bar',
                        method: 'GET',
                        dataMode: 'raw',
                        dataOptions: {
                            urlencoded: {
                                contentType: 'application/x-www-form-urlencoded'
                            },
                            raw: {
                                contentType: 'application/json'
                            },
                            params: {
                                contentType: 'multipart/form-data'
                            },
                            binary: {
                                contentType: 'application/json'
                            }
                        },
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }]
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        info: {
                            _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                            name: 'get-with-body',
                            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                        },
                        item: [{
                            _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                            name: '',
                            request: {
                                body: {
                                    mode: 'raw',
                                    raw: 'foo=bar',
                                    options: {
                                        urlencoded: {
                                            contentType: 'application/x-www-form-urlencoded'
                                        },
                                        raw: {
                                            contentType: 'application/json'
                                        },
                                        formdata: {
                                            contentType: 'multipart/form-data'
                                        },
                                        file: {
                                            contentType: 'application/json'
                                        }
                                    }
                                },
                                header: [],
                                method: 'GET'
                            },
                            response: []
                        }]
                    });
                    done();
                });
            });

            it('should transform when dataOptions are not present', function (done) {
                transformer.convert({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'get-with-body',
                    order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                    folders: [],
                    folders_order: [],
                    requests: [{
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        data: 'foo=bar',
                        method: 'GET',
                        dataMode: 'raw',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }]
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        info: {
                            _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                            name: 'get-with-body',
                            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                        },
                        item: [{
                            _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                            name: '',
                            request: {
                                body: {
                                    mode: 'raw',
                                    raw: 'foo=bar'
                                },
                                header: [],
                                method: 'GET'
                            },
                            response: []
                        }]
                    });
                    done();
                });
            });

            it('should transform body options to empty if invalid option is provided', function (done) {
                transformer.convert({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'get-with-body',
                    order: ['4f65e265-dd38-0a67-71a5-d9dd50fa37a1'],
                    folders: [],
                    folders_order: [],
                    requests: [{
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        data: 'foo=bar',
                        method: 'GET',
                        dataMode: 'raw',
                        dataOptions: 'INVALID_OPTIONS',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }]
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        info: {
                            _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                            name: 'get-with-body',
                            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                        },
                        item: [{
                            _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                            name: '',
                            request: {
                                body: {
                                    mode: 'raw',
                                    raw: 'foo=bar',
                                    options: {}
                                },
                                header: [],
                                method: 'GET'
                            },
                            response: []
                        }]
                    });
                    done();
                });
            });
        });

        describe('with convertSingle', function () {
            it('should transform body options', function (done) {
                transformer.convertSingle({
                    id: '591dad6f-1067-4f1e-a51e-96f2c30cbcd9',
                    dataMode: 'params',
                    data: [{
                        key: 'foo',
                        value: 'bar',
                        enabled: false
                    }],
                    dataOptions: {
                        urlencoded: {
                            contentType: 'application/x-www-form-urlencoded'
                        },
                        raw: {
                            contentType: 'application/json'
                        },
                        params: {
                            contentType: 'multipart/form-data'
                        },
                        binary: {
                            contentType: 'application/json'
                        }
                    }
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        _postman_id: '591dad6f-1067-4f1e-a51e-96f2c30cbcd9',
                        name: '',
                        request: {
                            body: {
                                mode: 'formdata',
                                formdata: [{
                                    key: 'foo',
                                    value: 'bar',
                                    disabled: true
                                }],
                                options: {
                                    urlencoded: {
                                        contentType: 'application/x-www-form-urlencoded'
                                    },
                                    raw: {
                                        contentType: 'application/json'
                                    },
                                    formdata: {
                                        contentType: 'multipart/form-data'
                                    },
                                    file: {
                                        contentType: 'application/json'
                                    }
                                }
                            },
                            header: []
                        },
                        response: []
                    });
                    done();
                });
            });

            it('should transform when dataOptions are not present', function (done) {
                transformer.convertSingle({
                    id: '591dad6f-1067-4f1e-a51e-96f2c30cbcd9',
                    dataMode: 'raw',
                    rawModeData: '[{ key: \'foo\', value: \'bar\', disabled: true }]'
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        _postman_id: '591dad6f-1067-4f1e-a51e-96f2c30cbcd9',
                        name: '',
                        request: {
                            body: {
                                mode: 'raw',
                                raw: '[{ key: \'foo\', value: \'bar\', disabled: true }]'
                            },
                            header: []
                        },
                        response: []
                    });
                    done();
                });
            });

            it('should transform body options to empty if invalid option is provided', function (done) {
                transformer.convertSingle({
                    id: '591dad6f-1067-4f1e-a51e-96f2c30cbcd9',
                    dataMode: 'params',
                    data: [{
                        key: 'foo',
                        value: 'bar',
                        enabled: false
                    }],
                    dataOptions: 'INVALID_OPTIONS'
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        _postman_id: '591dad6f-1067-4f1e-a51e-96f2c30cbcd9',
                        name: '',
                        request: {
                            body: {
                                mode: 'formdata',
                                formdata: [{
                                    key: 'foo',
                                    value: 'bar',
                                    disabled: true
                                }],
                                options: {}
                            },
                            header: []
                        },
                        response: []
                    });
                    done();
                });
            });
        });
    });

    describe('protocolProfileBehavior', function () {
        describe('with convert', function () {
            it('should be converted at request level', function (done) {
                transformer.convert({
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
                        info: {
                            _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                            name: 'get-with-body',
                            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                        },
                        item: [{
                            _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                            name: '',
                            request: {
                                body: {
                                    mode: 'raw',
                                    raw: 'foo=bar'
                                },
                                header: [],
                                method: 'GET',
                                url: {
                                    host: ['postman-echo', 'com'],
                                    path: ['get'],
                                    protocol: 'https',
                                    raw: 'https://postman-echo.com/get'
                                }
                            },
                            response: [],
                            protocolProfileBehavior: {
                                disableBodyPruning: true
                            }
                        }]
                    });
                    done();
                });
            });

            it('should be converted at collection level', function (done) {
                transformer.convert({
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
                        info: {
                            _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                            name: 'get-with-body',
                            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                        },
                        item: [{
                            _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                            name: '',
                            request: {
                                body: {
                                    mode: 'raw',
                                    raw: 'foo=bar'
                                },
                                header: [],
                                method: 'GET',
                                url: {
                                    host: ['postman-echo', 'com'],
                                    path: ['get'],
                                    protocol: 'https',
                                    raw: 'https://postman-echo.com/get'
                                }
                            },
                            response: []
                        }],
                        protocolProfileBehavior: {
                            disableBodyPruning: true
                        }
                    });
                    done();
                });
            });

            it('should be converted at folder level', function (done) {
                transformer.convert({
                    id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                    name: 'get-with-body',
                    order: [],
                    folders: [{
                        id: '5f321b3e-bfdd-4018-80d0-789351444674',
                        order: [
                            '4f65e265-dd38-0a67-71a5-d9dd50fa37a1'
                        ],
                        protocolProfileBehavior: {
                            disableBodyPruning: true
                        }
                    }],
                    folders_order: [
                        '5f321b3e-bfdd-4018-80d0-789351444674'
                    ],
                    requests: [{
                        id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        headers: '',
                        url: 'https://postman-echo.com/get',
                        data: 'foo=bar',
                        method: 'GET',
                        dataMode: 'raw',
                        collectionId: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2'
                    }]
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        info: {
                            _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                            name: 'get-with-body',
                            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                        },
                        item: [{
                            _postman_id: '5f321b3e-bfdd-4018-80d0-789351444674',
                            item: [{
                                _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                                name: '',
                                request: {
                                    body: {
                                        mode: 'raw',
                                        raw: 'foo=bar'
                                    },
                                    header: [],
                                    method: 'GET',
                                    url: {
                                        host: ['postman-echo', 'com'],
                                        path: ['get'],
                                        protocol: 'https',
                                        raw: 'https://postman-echo.com/get'
                                    }
                                },
                                response: []
                            }],
                            protocolProfileBehavior: {
                                disableBodyPruning: true
                            }
                        }]
                    });
                    done();
                });
            });

            it('should not include the property for invalid values', function (done) {
                transformer.convert({
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
                        info: {
                            _postman_id: '84b2b626-d3a6-0f31-c7a0-47733c01d0c2',
                            name: 'get-with-body',
                            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                        },
                        item: [{
                            _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                            name: '',
                            request: {
                                body: {
                                    mode: 'raw',
                                    raw: 'foo=bar'
                                },
                                header: [],
                                method: 'GET',
                                url: {
                                    host: ['postman-echo', 'com'],
                                    path: ['get'],
                                    protocol: 'https',
                                    raw: 'https://postman-echo.com/get'
                                }
                            },
                            response: []
                        }]
                    });
                    done();
                });
            });
        });

        describe('with convertSingle', function () {
            it('should be handled correctly', function (done) {
                transformer.convertSingle({
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    url: 'https://postman-echo.com/get',
                    data: 'foo=bar',
                    method: 'GET',
                    dataMode: 'raw',
                    protocolProfileBehavior: {
                        disableBodyPruning: true
                    }
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                mode: 'raw',
                                raw: 'foo=bar'
                            },
                            header: [],
                            method: 'GET',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['get'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/get'
                            }
                        },
                        response: [],
                        protocolProfileBehavior: {
                            disableBodyPruning: true
                        }
                    });
                    done();
                });
            });

            it('should not include the property for invalid values', function (done) {
                transformer.convertSingle({
                    id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                    url: 'https://postman-echo.com/get',
                    data: 'foo=bar',
                    method: 'GET',
                    dataMode: 'raw',
                    protocolProfileBehavior: 'random'
                }, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    converted = JSON.parse(JSON.stringify(converted));

                    expect(converted).to.eql({
                        _postman_id: '4f65e265-dd38-0a67-71a5-d9dd50fa37a1',
                        name: '',
                        request: {
                            body: {
                                mode: 'raw',
                                raw: 'foo=bar'
                            },
                            header: [],
                            method: 'GET',
                            url: {
                                host: ['postman-echo', 'com'],
                                path: ['get'],
                                protocol: 'https',
                                raw: 'https://postman-echo.com/get'
                            }
                        },
                        response: []
                    });
                    done();
                });
            });
        });
    });

    describe('auth', function () {
        it('should be handled correctly in v1 -> v2.1.0 conversions', function (done) {
            var fixture = require('../fixtures/sample-auth');

            transformer.convert(fixture.v1, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql(fixture.v21);
                done();
            });
        });

        it('should override auth with legacy attributes if they exist', function (done) {
            var source = {
                id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
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

            transformer.convertSingle(source, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    name: '',
                    request: {
                        auth: {
                            type: 'basic',
                            basic: [
                                { key: 'username', value: 'username', type: 'string' },
                                { key: 'password', value: 'password', type: 'string' },
                                { key: 'saveHelperData', type: 'any' },
                                { key: 'showPassword', value: false, type: 'boolean' }
                            ]
                        },
                        header: []
                    },
                    response: []
                });
                done();
            });
        });

        it('should use auth if legacy auth attributes are absent', function (done) {
            var source = {
                id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                auth: {
                    type: 'basic',
                    basic: [{
                        key: 'username',
                        value: 'username',
                        type: 'string'
                    }, {
                        key: 'password',
                        value: 'password',
                        type: 'string'
                    }]
                }
            };

            transformer.convertSingle(source, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    name: '',
                    request: {
                        auth: {
                            type: 'basic',
                            basic: [
                                { key: 'username', value: 'username', type: 'string' },
                                { key: 'password', value: 'password', type: 'string' }
                            ]
                        },
                        header: []
                    },
                    response: []
                });
                done();
            });
        });

        it('should correctly handle currentHelper (normal) and auth (noauth)', function (done) {
            var source = {
                id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                auth: { type: 'noauth' },
                currentHelper: 'normal'
            };

            transformer.convertSingle(source, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                expect(JSON.parse(JSON.stringify(converted))).to.eql({
                    _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    name: '',
                    request: {
                        header: []
                    },
                    response: []
                });
                done();
            });
        });

        it('should handle invalid legacy data correctly', function (done) {
            var source = {
                id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                currentHelper: 'random',
                helperAttributes: ''
            };

            transformer.convertSingle(source, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    name: '',
                    request: {
                        header: []
                    },
                    response: []
                });
                done();
            });
        });

        describe('requests', function () {
            describe('with noauth', function () {
                it('should correctly infer a noauth type from the auth object.', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        auth: { type: 'noauth' }
                    };

                    transformer.convertSingle(source, options, function (err, converted) {
                        expect(err).to.not.be.ok;

                        // remove `undefined` properties for testing
                        expect(JSON.parse(JSON.stringify(converted))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                auth: { type: 'noauth' },
                                header: []
                            },
                            response: []
                        });
                        done();
                    });
                });

                it('should correctly infer a noauth type from `currentHelper`', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        currentHelper: 'normal',
                        helperAttributes: { id: 'normal', foo: 'bar' }
                    };

                    transformer.convertSingle(source, options, function (err, converted) {
                        expect(err).to.not.be.ok;

                        // remove `undefined` properties for testing
                        expect(JSON.parse(JSON.stringify(converted))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                header: []
                            },
                            response: []
                        });
                        done();
                    });
                });

                it('should correctly infer a noauth type from `currentHelper`, even if auth exists', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        currentHelper: 'normal',
                        helperAttributes: { id: 'normal', foo: 'bar' },
                        auth: {
                            type: 'basic',
                            basic: { username: 'postman', password: 'password' }
                        }
                    };

                    transformer.convertSingle(source, options, function (err, converted) {
                        expect(err).to.not.be.ok;

                        // remove `undefined` properties for testing
                        expect(JSON.parse(JSON.stringify(converted))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                header: []
                            },
                            response: []
                        });
                        done();
                    });
                });
            });

            describe('with null', function () {
                it('should correctly infer a noauth type from the auth object.', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        auth: null
                    };

                    transformer.convertSingle(source, options, function (err, converted) {
                        expect(err).to.not.be.ok;

                        // remove `undefined` properties for testing
                        expect(JSON.parse(JSON.stringify(converted))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                header: []
                            },
                            response: []
                        });
                        done();
                    });
                });

                it('should correctly infer a noauth type from `currentHelper`', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        currentHelper: null,
                        helperAttributes: { id: 'normal', foo: 'bar' }
                    };

                    transformer.convertSingle(source, options, function (err, converted) {
                        expect(err).to.not.be.ok;

                        // remove `undefined` properties for testing
                        expect(JSON.parse(JSON.stringify(converted))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                header: []
                            },
                            response: []
                        });
                        done();
                    });
                });

                it('should correctly handle currentHelper and auth set to null', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        auth: null,
                        currentHelper: null
                    };

                    transformer.convertSingle(source, options, function (err, converted) {
                        expect(err).to.not.be.ok;

                        // remove `undefined` properties for testing
                        expect(JSON.parse(JSON.stringify(converted))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                header: []
                            },
                            response: []
                        });
                        done();
                    });
                });

                it('should correctly handle currentHelper (null) and auth (noauth)', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        auth: { type: 'noauth' },
                        currentHelper: null
                    };

                    transformer.convertSingle(source, options, function (err, converted) {
                        expect(err).to.not.be.ok;

                        // remove `undefined` properties for testing
                        expect(JSON.parse(JSON.stringify(converted))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                header: []
                            },
                            response: []
                        });
                        done();
                    });
                });

                it('should correctly infer a noauth type from `currentHelper`, even if auth exists', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        currentHelper: null,
                        helperAttributes: { id: 'normal', foo: 'bar' },
                        auth: {
                            type: 'basic',
                            basic: { username: 'postman', password: 'password' }
                        }
                    };

                    transformer.convertSingle(source, options, function (err, converted) {
                        expect(err).to.not.be.ok;

                        // remove `undefined` properties for testing
                        expect(JSON.parse(JSON.stringify(converted))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                header: []
                            },
                            response: []
                        });
                        done();
                    });
                });

                it('should discard auth if both: legacy is null and new attributes are missing', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        currentHelper: null
                    };

                    transformer.convertSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                header: []
                            },
                            response: []
                        });
                        done();
                    });
                });
            });
        });

        describe('collections', function () {
            it('should correctly infer a noauth type from a regular auth object', function (done) {
                var source = {
                    id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    auth: { type: 'noauth' },
                    folders: [{
                        id: '3658e838-9cee-434b-ac17-2fd2bae386bb',
                        auth: { type: 'noauth' }
                    }]
                };

                transformer.convert(source, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    expect(JSON.parse(JSON.stringify(converted))).to.eql({
                        info: {
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                        },
                        item: [{
                            _postman_id: '3658e838-9cee-434b-ac17-2fd2bae386bb',
                            auth: { type: 'noauth' },
                            item: []
                        }]
                    });
                    done();
                });
            });

            it('should correctly infer a noauth type from a null auth object', function (done) {
                var source = {
                    id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    auth: null,
                    folders: [{
                        id: '3658e838-9cee-434b-ac17-2fd2bae386bb',
                        auth: null
                    }]
                };

                transformer.convert(source, options, function (err, converted) {
                    expect(err).to.not.be.ok;

                    // remove `undefined` properties for testing
                    expect(JSON.parse(JSON.stringify(converted))).to.eql({
                        info: {
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                        },
                        item: [{
                            _postman_id: '3658e838-9cee-434b-ac17-2fd2bae386bb',
                            item: []
                        }]
                    });
                    done();
                });
            });
        });

        describe('with missing properties', function () {
            it('should fall back to legacy properties if auth is missing', function (done) {
                var source = {
                    id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    currentHelper: 'basicAuth',
                    helperAttributes: {
                        id: 'basic',
                        username: 'postman',
                        password: 'secret'
                    }
                };

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: [],
                            auth: {
                                type: 'basic',
                                basic: [
                                    { key: 'username', value: 'postman', type: 'string' },
                                    { key: 'password', value: 'secret', type: 'string' },
                                    { key: 'saveHelperData', type: 'any' },
                                    { key: 'showPassword', value: false, type: 'boolean' }
                                ]
                            }
                        },
                        response: []
                    });
                    done();
                });
            });

            it('should discard auth creation if both: legacy and new attributes are missing', function (done) {
                var source = { id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c' };

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: []
                        },
                        response: []
                    });
                    done();
                });
            });

            it('should discard auth if both: legacy is normal and new attributes are missing', function (done) {
                var source = {
                    id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    currentHelper: 'normal'
                };

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: []
                        },
                        response: []
                    });
                    done();
                });
            });

            it('should handle valid auth and missing legacy properties correctly', function (done) {
                var source = {
                    id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    auth: {
                        type: 'bearer',
                        bearer: [{ key: 'token', value: 'secret', type: 'string' }]
                    }
                };

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: [],
                            auth: {
                                type: 'bearer',
                                bearer: [{ key: 'token', value: 'secret', type: 'string' }]
                            }
                        },
                        response: []
                    });
                    done();
                });
            });
        });

        describe('prioritizeV2: true', function () {
            var options = {
                inputVersion: '1.0.0',
                outputVersion: '2.1.0',
                prioritizeV2: true,
                retainIds: true
            };

            it('should correctly prioritize v2 auth whilst converting', function (done) {
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

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: [],
                            auth: {
                                type: 'bearer',
                                bearer: [{ key: 'token', value: 'secret', type: 'string' }]
                            }
                        },
                        response: []
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

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: [],
                            auth: {
                                type: 'basic',
                                basic: [
                                    { key: 'username', value: 'postman', type: 'string' },
                                    { key: 'password', value: 'secret', type: 'string' },
                                    { key: 'saveHelperData', type: 'any' },
                                    { key: 'showPassword', type: 'boolean', value: false }
                                ]
                            }
                        },
                        response: []
                    });
                    done();
                });
            });

            it('should retain type noauth if auth is noauth and currentHelper is null', function (done) {
                var source = {
                    id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    currentHelper: null,
                    auth: { type: 'noauth' }
                };

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;

                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: [],
                            auth: { type: 'noauth' }
                        },
                        response: []
                    });
                    done();
                });
            });

            it('should discard auth creation if both: legacy and new attributes are falsy', function (done) {
                var source = {
                    id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    currentHelper: null,
                    helperAttributes: null,
                    auth: null
                };

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: []
                        },
                        response: []
                    });
                    done();
                });
            });

            it('should discard auth creation if both: legacy is normal and new attributes are falsy', function (done) {
                var source = {
                    id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    currentHelper: 'normal',
                    helperAttributes: null,
                    auth: null
                };

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: []
                        },
                        response: []
                    });
                    done();
                });
            });

            it('should discard auth creation if both: legacy is null and new attributes are falsy', function (done) {
                var source = {
                    id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    currentHelper: null,
                    helperAttributes: null,
                    auth: null
                };

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: []
                        },
                        response: []
                    });
                    done();
                });
            });

            describe('with missing properties', function () {
                it('should fall back to legacy properties if auth is missing', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        currentHelper: 'basicAuth',
                        helperAttributes: {
                            id: 'basic',
                            username: 'postman',
                            password: 'secret'
                        }
                    };

                    transformer.convertSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;

                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                header: [],
                                auth: {
                                    type: 'basic',
                                    basic: [
                                        { key: 'username', value: 'postman', type: 'string' },
                                        { key: 'password', value: 'secret', type: 'string' },
                                        { key: 'saveHelperData', type: 'any' },
                                        { key: 'showPassword', value: false, type: 'boolean' }
                                    ]
                                }
                            },
                            response: []
                        });
                        done();
                    });
                });

                it('should discard auth creation if both: legacy and new attributes are missing', function (done) {
                    var source = { id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c' };

                    transformer.convertSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                header: []
                            },
                            response: []
                        });
                        done();
                    });
                });

                it('should discard auth if both: legacy is normal and new attributes are missing', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        currentHelper: 'normal'
                    };

                    transformer.convertSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                header: []
                            },
                            response: []
                        });
                        done();
                    });
                });

                it('should handle valid auth and missing legacy properties correctly', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        auth: {
                            type: 'bearer',
                            bearer: [{ key: 'token', value: 'secret', type: 'string' }]
                        }
                    };

                    transformer.convertSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                header: [],
                                auth: {
                                    type: 'bearer',
                                    bearer: [{ key: 'token', value: 'secret', type: 'string' }]
                                }
                            },
                            response: []
                        });
                        done();
                    });
                });
            });
        });
    });

    describe('nested entities', function () {
        it('should be handled correctly in v1 -> v2.1.0 conversions', function (done) {
            var fixture = require('../fixtures/nested-entities');

            transformer.convert(fixture.v1, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql(fixture.v21);
                done();
            });
        });
    });

    describe('scripts', function () {
        it('should override events with legacy properties if they exist', function (done) {
            var source = {
                id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
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

            transformer.convertSingle(source, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    name: '',
                    event: [{
                        listen: 'test',
                        script: {
                            type: 'text/javascript',
                            exec: ['console.log("Request level test script");']
                        }
                    }, {
                        listen: 'prerequest',
                        script: {
                            type: 'text/javascript',
                            exec: ['console.log("Request level pre-request script");']
                        }
                    }],
                    request: {
                        header: []
                    },
                    response: []
                });
                done();
            });
        });

        it('should use legacy array properties correctly', function (done) {
            var source = {
                id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                preRequestScript: ['console.log("Request level pre-request script");'],
                tests: ['console.log("Request level test script");']
            };

            transformer.convertSingle(source, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    name: '',
                    event: [{
                        listen: 'test',
                        script: {
                            type: 'text/javascript',
                            exec: ['console.log("Request level test script");']
                        }
                    }, {
                        listen: 'prerequest',
                        script: {
                            type: 'text/javascript',
                            exec: ['console.log("Request level pre-request script");']
                        }
                    }],
                    request: {
                        header: []
                    },
                    response: []
                });
                done();
            });
        });

        it('should use events if legacy properties are absent', function (done) {
            var source = {
                id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
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

            transformer.convertSingle(source, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    name: '',
                    event: [{
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
                    }],
                    request: {
                        header: []
                    },
                    response: []
                });
                done();
            });
        });

        it('should correctly use fallbacks in event definitions as applicable', function (done) {
            var source = {
                id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                events: [{
                    listen: 'prerequest',
                    script: {
                        type: 'text/javascript',
                        exec: 'console.log("Alternative request level pre-request script");'
                    }
                }, {}]
            };

            transformer.convertSingle(source, options, function (err, converted) {
                expect(err).to.not.be.ok;

                // remove `undefined` properties for testing
                converted = JSON.parse(JSON.stringify(converted));

                expect(converted).to.eql({
                    _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    name: '',
                    event: [{
                        listen: 'prerequest',
                        script: {
                            type: 'text/javascript',
                            exec: ['console.log("Alternative request level pre-request script");']
                        }
                    }, {
                        listen: 'test'
                    }],
                    request: {
                        header: []
                    },
                    response: []
                });
                done();
            });
        });

        describe('with missing properties', function () {
            it('should handle missing events correctly', function (done) {
                var source = {
                    id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    preRequestScript: 'console.log("Pre-request script");',
                    tests: 'console.log("Test script");'
                };

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        event: [{
                            listen: 'test',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Test script");']
                            }
                        }, {
                            listen: 'prerequest',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Pre-request script");']
                            }
                        }],
                        request: {
                            header: []
                        },
                        response: []
                    });
                    done();
                });
            });

            it('should discard property creation if both are absent', function (done) {
                var source = {
                    id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c'
                };

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: []
                        },
                        response: []
                    });
                    done();
                });
            });
        });

        describe('prioritizeV2: true', function () {
            var options = {
                inputVersion: '1.0.0',
                outputVersion: '2.1.0',
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

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: []
                        },
                        response: [],
                        event: [{
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

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: []
                        },
                        response: [],
                        event: [{
                            listen: 'test',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Legacy test script");']
                            }
                        }, {
                            listen: 'prerequest',
                            script: {
                                type: 'text/javascript',
                                exec: ['console.log("Legacy prerequest script");']
                            }
                        }]
                    });
                    done();
                });
            });

            it('should discard event from the result if both legacy and current attributes are empty', function (done) {
                var source = {
                    id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    preRequestScript: null,
                    tests: null,
                    events: []
                };

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: []
                        },
                        response: []
                    });
                    done();
                });
            });

            it('should handle empty legacy script strings correctly', function (done) {
                var source = {
                    id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                    preRequestScript: '',
                    tests: '',
                    events: []
                };

                transformer.convertSingle(source, options, function (err, result) {
                    expect(err).to.not.be.ok;
                    expect(JSON.parse(JSON.stringify(result))).to.eql({
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        name: '',
                        request: {
                            header: []
                        },
                        response: []
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

                    transformer.convertSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            event: [{
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
                            request: {
                                header: []
                            },
                            response: []
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

                    transformer.convertSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            event: [{
                                listen: 'test',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Test script");']
                                }
                            }, {
                                listen: 'prerequest',
                                script: {
                                    type: 'text/javascript',
                                    exec: ['console.log("Pre-request script");']
                                }
                            }],
                            request: {
                                header: []
                            },
                            response: []
                        });
                        done();
                    });
                });

                it('should discard property creation if both are absent', function (done) {
                    var source = {
                        id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c'
                    };

                    transformer.convertSingle(source, options, function (err, result) {
                        expect(err).to.not.be.ok;
                        expect(JSON.parse(JSON.stringify(result))).to.eql({
                            _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                            name: '',
                            request: {
                                header: []
                            },
                            response: []
                        });
                        done();
                    });
                });
            });
        });
    });

    describe('malformed collections', function () {
        it('should be handled correctly', function (done) {
            transformer.convert({
                id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                folders: [false, null, { id: 'F1' }, 0, NaN, '', undefined],
                folders_order: [false, null, 'F1', 0, NaN, '', undefined],
                requests: [false, null, {
                    id: 'R1'
                }, 0, NaN, '', undefined],
                order: [false, null, 'R1', 0, NaN, '', undefined]
            }, options, function (err, result) {
                expect(err).to.not.be.ok;
                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    info: {
                        _postman_id: '27ad5d23-f158-41e2-900d-4f81e62c0a1c',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: 'F1',
                        item: []
                    }, {
                        _postman_id: 'R1',
                        name: '',
                        request: {
                            header: []
                        },
                        response: []
                    }]
                });
                done();
            });
        });

        it('should correctly convert text to string', function (done) {
            transformer.convert({
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
                    info: {
                        _postman_id: '2509a94e-eca1-43ca-a8aa-0e200636764f',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    auth: {
                        type: 'bearer',
                        bearer: [{ key: 'token', value: 'bar', type: 'string' }]
                    },
                    item: [],
                    variable: [{
                        id: 'f42cc664-4823-4012-b7dd-9e9f965b736a', key: 'foo', value: 'bar', type: 'string'
                    }]
                });
                done();
            });
        });
    });

    describe('query parameters', function () {
        it('should work correctly for .convertSingle', function () {
            transformer.convertSingle({
                id: '0628a95f-c283-94e2-fa9f-53477775692f',
                name: 'A world of foo!',
                url: 'https://postman-echo.com/get?alpha&beta&gamma&delta=&epsilon=&gamma=&=&&=&',
                collectionId: '03cf74df-32de-af8b-7db8-855b51b05e50',
                queryParams: [
                    { key: 'alpha', value: null, equals: false },
                    { key: 'beta', value: null, equals: true },
                    { key: 'gamma', value: null },
                    { key: 'delta', value: '', equals: false },
                    { key: 'epsilon', value: '', equals: true },
                    { key: 'gamma', value: '' },
                    { key: '', value: '', equals: true },
                    { key: '', value: '', equals: false },
                    { key: null, value: null, equals: true },
                    { key: null, value: null, equals: false }
                ]
            }, options, function (err, result) {
                expect(err).to.not.be.ok;
                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    _postman_id: '0628a95f-c283-94e2-fa9f-53477775692f',
                    name: 'A world of foo!',
                    request: {
                        header: [],
                        url: {
                            raw: 'https://postman-echo.com/get?alpha&beta=&gamma&delta&epsilon=&gamma=&=&&=&',
                            protocol: 'https',
                            host: ['postman-echo', 'com'],
                            path: ['get'],
                            query: [
                                { key: 'alpha', value: null },
                                { key: 'beta', value: '' },
                                { key: 'gamma', value: null },
                                { key: 'delta', value: null },
                                { key: 'epsilon', value: '' },
                                { key: 'gamma', value: '' },
                                { key: '', value: '' },
                                { key: '', value: null },
                                { key: null, value: '' },
                                { key: null, value: null }
                            ]
                        }
                    },
                    response: []
                });
            });
        });

        it('should work correctly for .convert', function () {
            transformer.convert({
                id: '03cf74df-32de-af8b-7db8-855b51b05e50',
                name: 'Mini echo',
                order: ['ef90671a-ab14-16f5-0a57-41b32fc2a36f'],
                requests: [
                    {
                        id: 'ef90671a-ab14-16f5-0a57-41b32fc2a36f',
                        name: 'GET request',
                        method: 'GET',
                        url: 'https://postman-echo.com/get?alpha&beta&gamma&delta&epsilon=&gamma=&=&&=&',
                        queryParams: [
                            { key: 'alpha', value: null, equals: false },
                            { key: 'beta', value: null, equals: true },
                            { key: 'gamma', value: null },
                            { key: 'delta', value: '', equals: false },
                            { key: 'epsilon', value: '', equals: true },
                            { key: 'gamma', value: '' },
                            { key: '', value: '', equals: true },
                            { key: '', value: '', equals: false },
                            { key: null, value: null, equals: true },
                            { key: null, value: null, equals: false }
                        ],
                        collectionId: '03cf74df-32de-af8b-7db8-855b51b05e50'
                    }
                ]
            }, options, function (err, result) {
                expect(err).to.not.be.ok;
                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    info: {
                        _postman_id: '03cf74df-32de-af8b-7db8-855b51b05e50',
                        name: 'Mini echo',
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [
                        {
                            _postman_id: 'ef90671a-ab14-16f5-0a57-41b32fc2a36f',
                            name: 'GET request',
                            request: {
                                header: [],
                                method: 'GET',
                                url: {
                                    protocol: 'https',
                                    host: ['postman-echo', 'com'],
                                    path: ['get'],
                                    query: [
                                        { key: 'alpha', value: null },
                                        { key: 'beta', value: '' },
                                        { key: 'gamma', value: null },
                                        { key: 'delta', value: null },
                                        { key: 'epsilon', value: '' },
                                        { key: 'gamma', value: '' },
                                        { key: '', value: '' },
                                        { key: '', value: null },
                                        { key: null, value: '' },
                                        { key: null, value: null }
                                    ],
                                    raw: 'https://postman-echo.com/get?alpha&beta=&gamma&delta&epsilon=&gamma=&=&&=&'
                                }
                            },
                            response: []
                        }
                    ]
                });
            });
        });

        it('should work correctly for .convertResponse', function () {
            transformer.convertResponse({
                responseCode: { code: 200, name: 'OK' },
                time: 412,
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'text/html; charset=ISO-8859-1',
                        name: 'Content-Type',
                        description: 'The mime type of this content'
                    },
                    {
                        key: 'Date',
                        value: 'Fri, 19 May 2017 11:35:14 GMT',
                        name: 'Date',
                        description: 'The date and time that the message was sent'
                    }
                ],
                cookies: [],
                text: '<html></html>',
                code: 200,
                responseSize: {
                    body: 14560,
                    header: 669
                },
                mimeType: 'text',
                fileName: 'response.html',
                dataURI: 'data:text/html;base64, PGh0bWw+PC9odG1sPg==',
                id: '21c40bcc-c1d5-1f91-06df-d7f4e66d1647',
                name: 'Sample Response',
                request: {
                    url: 'https://foo.com?alpha&beta&gamma&delta=&epsilon=&gamma=',
                    queryParams: [
                        { key: 'alpha', value: null, equals: false },
                        { key: 'beta', value: null, equals: true },
                        { key: 'gamma', value: null },
                        { key: 'delta', value: '', equals: false },
                        { key: 'epsilon', value: '', equals: true },
                        { key: 'gamma', value: '' }
                    ],
                    headers: [],
                    data: 'akjshgdajhsgd',
                    method: 'GET',
                    dataMode: 'raw'
                }
            }, options, function (err, result) {
                expect(err).to.not.be.ok;
                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    body: '<html></html>',
                    code: 200,
                    cookie: [],
                    header: [
                        {
                            key: 'Content-Type',
                            value: 'text/html; charset=ISO-8859-1',
                            name: 'Content-Type',
                            description: 'The mime type of this content'
                        },
                        {
                            key: 'Date',
                            value: 'Fri, 19 May 2017 11:35:14 GMT',
                            name: 'Date',
                            description: 'The date and time that the message was sent'
                        }
                    ],
                    id: '21c40bcc-c1d5-1f91-06df-d7f4e66d1647',
                    name: 'Sample Response',
                    originalRequest: {
                        body: { mode: 'raw', raw: 'akjshgdajhsgd' },
                        header: [],
                        method: 'GET',
                        url: {
                            host: ['foo', 'com'],
                            protocol: 'https',
                            query: [
                                { key: 'alpha', value: null },
                                { key: 'beta', value: '' },
                                { key: 'gamma', value: null },
                                { key: 'delta', value: null },
                                { key: 'epsilon', value: '' },
                                { key: 'gamma', value: '' }
                            ],
                            raw: 'https://foo.com?alpha&beta=&gamma&delta&epsilon=&gamma='
                        }
                    },
                    responseTime: 412,
                    status: 'OK'
                });
            });
        });

        it('should ignore params from URL if given explicitly', function () {
            transformer.convertSingle({
                id: '0628a95f-c283-94e2-fa9f-53477775692f',
                name: 'A world of foo!',
                url: 'https://postman-echo.com/get?foo=bar',
                collectionId: '03cf74df-32de-af8b-7db8-855b51b05e50',
                queryParams: [
                    { key: 'alpha', value: 'beta' }
                ]
            }, options, function (err, result) {
                expect(err).to.not.be.ok;
                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    _postman_id: '0628a95f-c283-94e2-fa9f-53477775692f',
                    name: 'A world of foo!',
                    request: {
                        header: [],
                        url: {
                            raw: 'https://postman-echo.com/get?foo=bar',
                            protocol: 'https',
                            host: ['postman-echo', 'com'],
                            path: ['get'],
                            query: [
                                { key: 'alpha', value: 'beta' }
                            ]
                        }
                    },
                    response: []
                });
            });
        });

        it('should return params from URL if not given explicitly', function () {
            transformer.convertSingle({
                id: '0628a95f-c283-94e2-fa9f-53477775692f',
                name: 'A world of foo!',
                url: 'https://postman-echo.com/get?foo=bar&baz=&&alpha',
                collectionId: '03cf74df-32de-af8b-7db8-855b51b05e50'
            }, options, function (err, result) {
                expect(err).to.not.be.ok;
                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    _postman_id: '0628a95f-c283-94e2-fa9f-53477775692f',
                    name: 'A world of foo!',
                    request: {
                        header: [],
                        url: {
                            raw: 'https://postman-echo.com/get?foo=bar&baz=&&alpha',
                            protocol: 'https',
                            host: ['postman-echo', 'com'],
                            path: ['get'],
                            query: [
                                { key: 'foo', value: 'bar' },
                                { key: 'baz', value: '' },
                                { key: null, value: null },
                                { key: 'alpha', value: null }
                            ]
                        }
                    },
                    response: []
                });
            });
        });

        // [GitHub #8251, #8374]
        it('should preserve param value when equals is false', function () {
            transformer.convertSingle({
                id: '0628a95f-c283-94e2-fa9f-53477775692f',
                name: 'A world of foo!',
                url: 'https://postman-echo.com/get?alpha=beta',
                collectionId: '03cf74df-32de-af8b-7db8-855b51b05e50',
                queryParams: [
                    // param having `equals:false`
                    { key: 'alpha', value: 'beta', equals: false }
                ]
            }, options, function (err, result) {
                expect(err).to.not.be.ok;
                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    _postman_id: '0628a95f-c283-94e2-fa9f-53477775692f',
                    name: 'A world of foo!',
                    request: {
                        header: [],
                        url: {
                            raw: 'https://postman-echo.com/get?alpha=beta',
                            protocol: 'https',
                            host: ['postman-echo', 'com'],
                            path: ['get'],
                            query: [
                                // param value is preserved here
                                { key: 'alpha', value: 'beta' }
                            ]
                        }
                    },
                    response: []
                });
            });
        });
    });

    describe('retainIds', function () {
        it('should handle IDs correctly when set to true', function () {
            transformer.convert({
                id: '2509a94e-eca1-43ca-a8aa-0e200636764f',
                order: [null, NaN, undefined, false, '', 0],
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
                expect(result && result.info).to.be.ok;

                expect(result).to.not.have.property('id');
                expect(result.info).to.not.have.property('id');
                expect(result.info).to.have.property('_postman_id', '2509a94e-eca1-43ca-a8aa-0e200636764f');
                expect(result.item).to.have.length(12);

                _.forEach(result.item, function (elem) {
                    _.forEach(elem.item, function (item) {
                        expect(item._postman_id).to.match(/^[a-f0-9]{4}([a-f0-9]{4}-){4}[a-f0-9]{12}$/);
                        _.forEach(item.response, function (response) {
                            expect(response.id).to.match(/^[a-f0-9]{4}([a-f0-9]{4}-){4}[a-f0-9]{12}$/);
                        });
                    });
                    expect(elem._postman_id).to.match(/^[a-f0-9]{4}([a-f0-9]{4}-){4}[a-f0-9]{12}$/);
                });
            });
        });

        it('should handle IDs correctly when false (collection.info._postman_id should be retained)', function () {
            transformer.convert({
                id: '2509a94e-eca1-43ca-a8aa-0e200636764f',
                order: [null, NaN, undefined, false, '', 0, 'R1'],
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
                expect(result && result.info).to.be.ok;

                // collection.info._postman_id should not change even if retainIds is set to false
                expect(result.info._postman_id).to.equal('2509a94e-eca1-43ca-a8aa-0e200636764f');
                expect(result).to.not.have.property('id');
                expect(result.info).to.not.have.property('id');

                expect(result.item).to.have.length(12);
                _.forEach(result.item, function (elem) {
                    _.forEach(elem.item, function (item) {
                        expect(item).not.to.have.property('_postman_id');
                        _.forEach(item.response, function (response) {
                            expect(response).not.to.have.property('id');
                        });
                    });
                    expect(elem).not.to.have.property('_postman_id');
                });
            });
        });

        it('should handle IDs correctly when missing (collection.info._postman_id should be retained)', function () {
            transformer.convert({
                id: '2509a94e-eca1-43ca-a8aa-0e200636764f',
                order: [null, NaN, undefined, false, '', 0, 'R1'],
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
                expect(result && result.info).to.be.ok;

                // collection.info._postman_id should not change even if retainIds is set to false
                expect(result.info._postman_id).to.equal('2509a94e-eca1-43ca-a8aa-0e200636764f');
                expect(result).to.not.have.property('id');
                expect(result.info).to.not.have.property('id');

                expect(result.item).to.have.length(12);
                _.forEach(result.item, function (elem) {
                    _.forEach(elem.item, function (item) {
                        expect(item).not.to.have.property('_postman_id');
                        _.forEach(item.response, function (response) {
                            expect(response).not.to.have.property('id');
                        });
                    });
                    expect(elem).not.to.have.property('_postman_id');
                });
            });
        });
    });

    describe('retainEmptyValues', function () {
        var options = {
            inputVersion: '1.0.0',
            outputVersion: '2.1.0',
            retainIds: true,
            retainEmptyValues: true
        };

        it('should nullify empty descriptions when set to true', function () {
            transformer.convert({
                id: '9ac7325c-cc3f-4c20-b0f8-a435766cb74c',
                description: '', // this represents the case where descriptions are removed
                folders: [{
                    id: 'f3285fa0-e361-43ba-ba15-618c7a911e84',
                    description: null,
                    order: ['9d123ce5-314a-40cd-9852-6a8569513f4e']
                }],
                requests: [{
                    id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                    description: false,
                    dataMode: 'params',
                    dataDisabled: false,
                    data: [{ key: 'body_foo', value: 'body_bar', description: 0 }],
                    auth: { type: 'bearer', bearer: [{ key: 'token', value: 'random' }] },
                    pathVariableData: [{ key: 'pv_foo', value: 'pv_bar', description: '' }],
                    headerData: [{ key: 'header_foo', value: 'header_bar', description: undefined }],
                    queryParams: [{ key: 'query_foo', value: 'query_bar', description: NaN }]
                }]
            }, options, function (err, result) {
                expect(err).not.to.be.ok;

                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    info: {
                        _postman_id: '9ac7325c-cc3f-4c20-b0f8-a435766cb74c',
                        description: null,
                        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
                    },
                    item: [{
                        _postman_id: 'f3285fa0-e361-43ba-ba15-618c7a911e84',
                        item: [{
                            _postman_id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                            name: '',
                            request: {
                                auth: { type: 'bearer', bearer: [{ key: 'token', value: 'random', type: 'string' }] },
                                description: null,
                                body: {
                                    disabled: false,
                                    mode: 'formdata',
                                    formdata: [{ description: null, key: 'body_foo', value: 'body_bar' }]
                                },
                                header: [{ description: null, key: 'header_foo', value: 'header_bar' }],
                                url: {
                                    query: [{ description: null, key: 'query_foo', value: 'query_bar' }],
                                    raw: '',
                                    variable: [{ description: null, key: 'pv_foo', value: 'pv_bar' }]
                                }
                            },
                            response: []
                        }],
                        description: null
                    }]
                });
            });
        });

        it('should nullify empty descriptions in requests when set to true', function () {
            transformer.convertSingle({
                id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                description: false,
                dataMode: 'params',
                dataDisabled: false,
                data: [{ key: 'body_foo', value: 'body_bar', description: 0 }],
                auth: { type: 'bearer', bearer: [{ key: 'token', value: 'random' }] },
                pathVariableData: [{ key: 'pv_foo', value: 'pv_bar', description: '' }],
                headerData: [{ key: 'header_foo', value: 'header_bar', description: undefined }],
                queryParams: [{ key: 'query_foo', value: 'query_bar', description: NaN }]
            }, options, function (err, result) {
                expect(err).not.to.be.ok;

                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    _postman_id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                    name: '',
                    request: {
                        auth: { type: 'bearer', bearer: [{ key: 'token', value: 'random', type: 'string' }] },
                        body: {
                            disabled: false,
                            mode: 'formdata',
                            formdata: [{ description: null, key: 'body_foo', value: 'body_bar' }]
                        },
                        description: null,
                        header: [{ description: null, key: 'header_foo', value: 'header_bar' }],
                        url: {
                            query: [{ description: null, key: 'query_foo', value: 'query_bar' }],
                            raw: '',
                            variable: [{ description: null, key: 'pv_foo', value: 'pv_bar' }]
                        }
                    },
                    response: []
                });
            });
        });

        it('should work correctly for urlencoded bodies', function () {
            transformer.convertSingle({
                id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                description: false,
                dataDisabled: false,
                dataMode: 'urlencoded',
                data: [{ key: 'body_foo', value: 'body_bar', description: 0 }],
                auth: { type: 'bearer', bearer: [{ key: 'token', value: 'random' }] },
                pathVariableData: [{ key: 'pv_foo', value: 'pv_bar', description: '' }],
                headerData: [{ key: 'header_foo', value: 'header_bar', description: undefined }],
                queryParams: [{ key: 'query_foo', value: 'query_bar', description: NaN }]
            }, options, function (err, result) {
                expect(err).not.to.be.ok;

                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    _postman_id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                    name: '',
                    request: {
                        auth: { type: 'bearer', bearer: [{ key: 'token', value: 'random', type: 'string' }] },
                        body: {
                            disabled: false,
                            mode: 'urlencoded',
                            urlencoded: [{ description: null, key: 'body_foo', value: 'body_bar' }]
                        },
                        description: null,
                        header: [{ description: null, key: 'header_foo', value: 'header_bar' }],
                        url: {
                            query: [{ description: null, key: 'query_foo', value: 'query_bar' }],
                            raw: '',
                            variable: [{ description: null, key: 'pv_foo', value: 'pv_bar' }]
                        }
                    },
                    response: []
                });
            });
        });

        it('should work correctly for graphql bodies', function () {
            transformer.convertSingle({
                id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                dataDisabled: false,
                dataMode: 'graphql',
                graphqlModeData: {
                    query: 'query Test { hello }',
                    operationName: 'Test',
                    variables: '{"foo":"bar"}'
                },
                url: 'https://postman-echo.com/get'
            }, options, function (err, result) {
                expect(err).not.to.be.ok;

                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    _postman_id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                    name: '',
                    request: {
                        description: null,
                        header: [],
                        body: {
                            disabled: false,
                            mode: 'graphql',
                            graphql: {
                                query: 'query Test { hello }',
                                operationName: 'Test',
                                variables: '{"foo":"bar"}'
                            }
                        },
                        url: {
                            protocol: 'https',
                            raw: 'https://postman-echo.com/get',
                            host: ['postman-echo', 'com'],
                            path: ['get']
                        }
                    },
                    response: []
                });
            });
        });

        it('should work correctly for raw bodies', function () {
            transformer.convertSingle({
                id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                dataDisabled: false,
                dataMode: 'raw',
                rawModeData: 'foobar',
                url: 'https://postman-echo.com/get'
            }, options, function (err, result) {
                expect(err).not.to.be.ok;

                expect(JSON.parse(JSON.stringify(result))).to.eql({
                    _postman_id: '9d123ce5-314a-40cd-9852-6a8569513f4e',
                    name: '',
                    request: {
                        description: null,
                        header: [],
                        body: {
                            disabled: false,
                            mode: 'raw',
                            raw: 'foobar'
                        },
                        url: {
                            protocol: 'https',
                            raw: 'https://postman-echo.com/get',
                            host: ['postman-echo', 'com'],
                            path: ['get']
                        }
                    },
                    response: []
                });
            });
        });
    });
});
