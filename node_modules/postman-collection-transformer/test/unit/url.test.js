/**
 * @fileoverview This test suite runs tests on the V1 to V2 converter.
 */

var expect = require('chai').expect,
    url = require('../../lib/url');

/* global describe, it */
describe('url', function () {
    describe('parsing', function () {
        it('should handle `@` character', function (done) {
            var fixture = 'postman-echo.com/get?user_email=fred@gmail.com',
                parsed;

            parsed = JSON.parse(JSON.stringify(url.parse(fixture)));

            expect(parsed).to.eql({
                raw: 'postman-echo.com/get?user_email=fred@gmail.com',
                host: ['postman-echo', 'com'],
                path: ['get'],
                query: [{
                    key: 'user_email',
                    value: 'fred@gmail.com'
                }]
            });
            done();
        });

        it('should extract protocol from the url', function (done) {
            var fixture = 'https://postman-echo.com/get?go=http://getpostman.com',
                parsed;

            parsed = JSON.parse(JSON.stringify(url.parse(fixture)));

            expect(parsed).to.eql({
                raw: fixture,
                protocol: 'https',
                host: ['postman-echo', 'com'],
                path: ['get'],
                query: [{
                    key: 'go',
                    value: 'http://getpostman.com'
                }]
            });
            done();
        });

        it('should correctly handle the absence of a protocol', function (done) {
            var fixture = 'postman-echo.com/get?go=http://getpostman.com',
                parsed;

            parsed = JSON.parse(JSON.stringify(url.parse(fixture)));

            expect(parsed).to.eql({
                raw: fixture,
                host: ['postman-echo', 'com'],
                path: ['get'],
                query: [{
                    key: 'go',
                    value: 'http://getpostman.com'
                }]
            });
            done();
        });

        it('should correctly extract auth', function (done) {
            var parsed,
                fixture = 'https://user:pass@postman-echo.com';

            parsed = JSON.parse(JSON.stringify(url.parse(fixture)));

            expect(parsed).to.eql({
                raw: fixture,
                protocol: 'https',
                auth: { user: 'user', password: 'pass' },
                host: ['postman-echo', 'com']
            });
            done();
        });

        it('should correctly extract port', function (done) {
            var parsed,
                fixture = 'https://postman-echo.com:8443';

            parsed = JSON.parse(JSON.stringify(url.parse(fixture)));

            expect(parsed).to.eql({
                raw: fixture,
                protocol: 'https',
                host: ['postman-echo', 'com'],
                port: '8443'
            });
            done();
        });

        it('should correctly handle querystrings with consecutive &', function (done) {
            var parsed,
                fixture = 'https://postman-echo.com?foo=bar&&bar=baz';

            parsed = JSON.parse(JSON.stringify(url.parse(fixture)));

            expect(parsed).to.eql({
                raw: fixture,
                protocol: 'https',
                host: ['postman-echo', 'com'],
                query: [{ key: 'foo', value: 'bar' }, { key: null, value: null }, { key: 'bar', value: 'baz' }]
            });
            done();
        });

        it('should correctly extract path variables', function (done) {
            var parsed,
                fixture = 'http://127.0.0.1/:a/:ab.json/:a+b';

            parsed = JSON.parse(JSON.stringify(url.parse(fixture)));

            expect(parsed).to.eql({
                raw: 'http://127.0.0.1/:a/:ab.json/:a+b',
                protocol: 'http',
                host: ['127', '0', '0', '1'],
                path: [':a', ':ab.json', ':a+b'],
                variable: [{ key: 'a' }, { key: 'ab.json' }, { key: 'a+b' }]
            });
            done();
        });

        it('should correctly handle empty path variables', function (done) {
            var parsed,
                fixture = 'http://127.0.0.1/:/:/:var';

            parsed = JSON.parse(JSON.stringify(url.parse(fixture)));

            expect(parsed).to.eql({
                raw: 'http://127.0.0.1/:/:/:var',
                protocol: 'http',
                host: ['127', '0', '0', '1'],
                path: [':', ':', ':var'],
                variable: [{ key: 'var' }]
            });
            done();
        });
    });

    describe('unparsing', function () {
        it('should handle the `@` character', function (done) {
            var fixture = {
                raw: 'postman-echo.com/get?user_email=fred@gmail.com',
                host: ['postman-echo', 'com'],
                path: ['get'],
                query: [{
                    key: 'user_email',
                    value: 'fred@gmail.com',
                    equals: true,
                    description: ''
                }],
                variable: []
            };

            expect(url.unparse(fixture)).to.eql('postman-echo.com/get?user_email=fred@gmail.com');
            done();
        });

        it('should remove trailing separators if present in the protocol', function (done) {
            var fixture = {
                raw: 'https://postman-echo.com',
                protocol: 'https://',
                host: ['postman-echo', 'com']
            };

            expect(url.unparse(fixture)).to.eql('https://postman-echo.com');
            done();
        });

        it('should handle auth without password correctly', function (done) {
            var fixture = {
                raw: 'https://postman-echo.com',
                protocol: 'https',
                auth: {
                    user: 'foo'
                },
                host: 'postman-echo.com'
            };

            expect(url.unparse(fixture)).to.eql('https://foo@postman-echo.com');
            done();
        });

        it('should handle auth with password correctly', function (done) {
            var fixture = {
                raw: 'https://postman-echo.com',
                protocol: 'https',
                auth: {
                    user: 'foo',
                    password: 'pass'
                },
                host: 'postman-echo.com'
            };

            expect(url.unparse(fixture)).to.eql('https://foo:pass@postman-echo.com');
            done();
        });

        it('should handle string hosts correctly', function (done) {
            var fixture = {
                raw: 'https://postman-echo.com',
                protocol: 'https',
                host: 'postman-echo.com'
            };

            expect(url.unparse(fixture)).to.eql('https://postman-echo.com');
            done();
        });

        it('should handle ports correctly', function (done) {
            var fixture = {
                raw: 'https://postman-echo.com',
                protocol: 'https',
                port: 8443,
                host: ['postman-echo', 'com']
            };

            expect(url.unparse(fixture)).to.eql('https://postman-echo.com:8443');
            done();
        });

        it('should handle string paths correctly', function (done) {
            var fixture = {
                raw: 'https://postman-echo.com',
                protocol: 'https',
                host: ['postman-echo', 'com'],
                path: '/type/html'
            };

            expect(url.unparse(fixture)).to.eql('https://postman-echo.com/type/html');
            done();
        });

        it('should handle empty keyed query params correctly', function (done) {
            var fixture = {
                raw: 'https://postman-echo.com',
                protocol: 'https',
                host: ['postman-echo', 'com'],
                query: [{ value: 'foo' }]
            };

            expect(url.unparse(fixture)).to.eql('https://postman-echo.com?=foo');
            done();
        });

        it('should handle hashes correctly', function (done) {
            var fixture = {
                raw: 'https://postman-echo.com',
                protocol: 'https',
                host: ['postman-echo', 'com'],
                hash: 'foo'
            };

            expect(url.unparse(fixture)).to.eql('https://postman-echo.com#foo');
            done();
        });
    });
});
