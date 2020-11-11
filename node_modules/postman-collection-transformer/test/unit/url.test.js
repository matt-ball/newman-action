/**
 * @fileoverview This test suite runs tests on the V1 to V2 converter.
 */

var expect = require('chai').expect,
    url = require('../../lib/url');

/* global describe, it */
describe('url', function () {
    describe('parsing', function () {
        it('should parse empty string', function () {
            var subject = url.parse('');

            // explicitly match object to track addition/deletion of properties.
            expect(subject).to.eql({
                raw: '',
                port: undefined,
                auth: undefined,
                protocol: undefined,
                host: undefined,
                path: undefined,
                query: undefined,
                hash: undefined,
                variable: undefined
            });
        });

        it('must parse bare ipv4 addresses', function () {
            var subject = url.parse('127.0.0.1');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: undefined,
                path: undefined,
                query: undefined,
                hash: undefined
            });
        });

        it('must parse bare ipv4 addresses with variables', function () {
            var subject = url.parse('127.0.{{subnet}}.1');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: undefined,
                host: ['127', '0', '{{subnet}}', '1'],
                port: undefined,
                path: undefined,
                query: undefined,
                hash: undefined
            });
        });

        it('must parse bare ipv4 addresses with protocol', function () {
            var subject = url.parse('http://127.0.0.1');

            expect(subject).to.deep.include({
                protocol: 'http',
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: undefined,
                path: undefined,
                query: undefined,
                hash: undefined
            });
        });

        it('must parse bare ipv4 addresses with non standard protocol', function () {
            var subject = url.parse('{{my-protocol}}://127.0.0.1');

            expect(subject).to.deep.include({
                protocol: '{{my-protocol}}',
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: undefined,
                path: undefined,
                query: undefined,
                hash: undefined
            });
        });

        it('must parse bare ipv4 addresses with port', function () {
            var subject = url.parse('127.0.0.1:80');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: '80',
                path: undefined,
                query: undefined,
                hash: undefined
            });
        });

        it('must parse invalid port of bare ipv4 addresses', function () {
            var subject = url.parse('127.0.0.1:{{my-port}}');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: '{{my-port}}',
                path: undefined,
                query: undefined,
                hash: undefined
            });
        });

        it('must parse bare ipv4 addresses with protocol and port', function () {
            var subject = url.parse('http://127.0.0.1:80');

            expect(subject).to.deep.include({
                protocol: 'http',
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: '80',
                path: undefined,
                query: undefined,
                hash: undefined
            });
        });

        it('must parse bare ipv4 addresses with protocol and port as variables', function () {
            var subject = url.parse('{{my-protocol}}://127.0.0.1:{{my-port}}');

            expect(subject).to.deep.include({
                protocol: '{{my-protocol}}',
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: '{{my-port}}',
                path: undefined,
                query: undefined,
                hash: undefined
            });
        });

        it('must parse variable as host with protocol and port as variables', function () {
            var subject = url.parse('{{my-protocol}}://{{my-host}}:{{my-port}}');

            expect(subject).to.deep.include({
                protocol: '{{my-protocol}}',
                auth: undefined,
                host: ['{{my-host}}'],
                port: '{{my-port}}',
                path: undefined,
                query: undefined,
                hash: undefined
            });
        });

        it('must parse trailing path backslash in ipv4 address', function () {
            var subject = url.parse('http://127.0.0.1/');

            expect(subject).to.deep.include({
                protocol: 'http',
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: undefined,
                path: [''],
                query: undefined,
                hash: undefined
            });
        });

        it('must parse trailing path backslash in ipv4 address and port', function () {
            var subject = url.parse('http://127.0.0.1:8080/');

            expect(subject).to.deep.include({
                protocol: 'http',
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: '8080',
                path: [''],
                query: undefined,
                hash: undefined
            });
        });

        it('must parse path backslash in ipv4 address and port', function () {
            var subject = url.parse('http://127.0.0.1:8080/hello/world');

            expect(subject).to.deep.include({
                protocol: 'http',
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: '8080',
                path: ['hello', 'world'],
                query: undefined,
                hash: undefined
            });
        });

        it('must parse path backslash in ipv4 address and port and retain trailing slash marker', function () {
            var subject = url.parse('http://127.0.0.1:8080/hello/world/');

            expect(subject).to.deep.include({
                protocol: 'http',
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: '8080',
                path: ['hello', 'world', ''],
                query: undefined,
                hash: undefined
            });
        });

        it('must parse path and query in ipv4 address and port and retain trailing slash marker', function () {
            var subject = url.parse('127.0.0.1/hello/world/?query=param');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: undefined,
                path: ['hello', 'world', ''],
                query: [{
                    key: 'query',
                    value: 'param'
                }],
                hash: undefined
            });
        });

        it('must parse ip address host with query param and hash', function () {
            var subject = url.parse('127.0.0.1/hello/world/?query=param#test-api');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: undefined,
                path: ['hello', 'world', ''],
                query: [{
                    key: 'query',
                    value: 'param'
                }],
                hash: 'test-api'
            });
        });

        it('must parse url query-param even if `?` is present in the URL hash', function () {
            var subject = url.parse('127.0.0.1/hello/world/?query=param#?test-api=true');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: undefined,
                path: ['hello', 'world', ''],
                query: [{
                    key: 'query',
                    value: 'param'
                }],
                hash: '?test-api=true'
            });
        });

        it('must parse url even if dulicate `?` is present in query-param', function () {
            var subject = url.parse('127.0.0.1/hello/world/?query=param&err?ng=v_l?e@!');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: undefined,
                path: ['hello', 'world', ''],
                query: [{
                    key: 'query',
                    value: 'param'
                }, {
                    key: 'err?ng',
                    value: 'v_l?e@!'
                }],
                hash: undefined
            });
        });

        it('must parse url having auth even if dulicate `@` is present in query-param', function () {
            var subject = url.parse('username:password@127.0.0.1/hello/world/?query=param&err?ng=v_l?e@!');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: {
                    user: 'username',
                    password: 'password'
                },
                host: ['127', '0', '0', '1'],
                port: undefined,
                path: ['hello', 'world', ''],
                query: [{
                    key: 'query',
                    value: 'param'
                }, {
                    key: 'err?ng',
                    value: 'v_l?e@!'
                }],
                hash: undefined
            });
        });

        it('must parse query params with no values and save the value as null', function () {
            var subject = url.parse('127.0.0.1/hello/world/?query=param&valueless1&valueless2');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: undefined,
                host: ['127', '0', '0', '1'],
                port: undefined,
                path: ['hello', 'world', ''],
                query: [{
                    key: 'query',
                    value: 'param'
                }, {
                    key: 'valueless1',
                    value: null
                }, {
                    key: 'valueless2',
                    value: null
                }],
                hash: undefined
            });
        });

        it('must parse url hosts having dots within variables', function () {
            var subject = url.parse('127.0.{{ip.subnet}}.1/get');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: undefined,
                host: ['127', '0', '{{ip.subnet}}', '1'],
                port: undefined,
                path: ['get']
            });
        });

        it('must parse url hosts having dots within variables and with values around variable', function () {
            var subject = url.parse('127.0.1{{ip.subnet}}2.1/get');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: undefined,
                host: ['127', '0', '1{{ip.subnet}}2', '1'],
                port: undefined,
                path: ['get']
            });
        });

        it('must parse url hosts with invalid non-closing double braces', function () {
            var subject = url.parse('127.0.{{ip.subnet.1');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: undefined,
                host: ['127', '0', '{{ip', 'subnet', '1'],
                port: undefined
            });
        });

        it('must parse url hosts with multiple variables with dots', function () {
            var subject = url.parse('{{ip.network_identifier}}.{{ip.subnet}}.1');

            expect(subject).to.deep.include({
                protocol: undefined,
                auth: undefined,
                host: ['{{ip.network_identifier}}', '{{ip.subnet}}', '1'],
                port: undefined
            });
        });

        it('must parse url with file protocol', function () {
            var subject = url.parse('file://hostname/path/to/file.txt');

            expect(subject).to.deep.include({
                protocol: 'file',
                auth: undefined,
                host: ['hostname'],
                path: ['path', 'to', 'file.txt'],
                port: undefined
            });
        });

        it('must parse url with file protocol and file name without extension', function () {
            var subject = url.parse('file://hostname/path/to/file');

            expect(subject).to.deep.include({
                protocol: 'file',
                auth: undefined,
                host: ['hostname'],
                path: ['path', 'to', 'file'],
                port: undefined
            });
        });

        it('must parse url with file protocol and relative path to files', function () {
            var subject = url.parse('file://../path/to/file');

            expect(subject).to.deep.include({
                protocol: 'file',
                auth: undefined,
                host: ['', '', ''],
                path: ['path', 'to', 'file'],
                port: undefined
            });
        });

        it('must parse url with file protocol and with leading / in path', function () {
            var subject = url.parse('file:///etc/hosts');

            expect(subject.protocol).to.equal('file');
            expect(subject.auth).to.be.undefined;
            expect(subject.host).to.be.undefined;
            expect(subject.path).to.eql(['etc', 'hosts']);
            expect(subject.port).to.be.undefined;
        });

        it('must parse url with file protocol and with leading / in path and relative path', function () {
            var subject = url.parse('file:///../etc/hosts');

            expect(subject.protocol).to.equal('file');
            expect(subject.auth).to.be.undefined;
            expect(subject.host).to.be.undefined;
            expect(subject.path).to.eql(['..', 'etc', 'hosts']);
            expect(subject.port).to.be.undefined;
        });

        it('must parse url with file protocol and with multiple leading / in path and relative path', function () {
            var subject = url.parse('file:////../etc/hosts');

            expect(subject).to.deep.include({
                protocol: 'file',
                host: undefined,
                path: ['', '..', 'etc', 'hosts']
            });
            expect(subject.auth).to.be.undefined;
            expect(subject.port).to.be.undefined;
        });

        it('should parse path variables properly', function () {
            var subject = url.parse('http://127.0.0.1/:a/:ab.json/:a+b');

            expect(subject).to.have.property('variable').that.has.lengthOf(3).that.eql([
                { key: 'a' }, { key: 'ab.json' }, { key: 'a+b' }
            ]);
        });

        it('should not parse empty path variables', function () {
            var subject = url.parse('http://127.0.0.1/:/:/:var');

            expect(subject.path).to.eql([':', ':', ':var']);
            expect(subject.variable).to.have.lengthOf(1).that.eql([{ key: 'var' }]);
        });

        it('should parse a path variable only once if it is used multiple times', function () {
            var subject = url.parse('http://127.0.0.1/:foo/:bar/:foo');

            expect(subject).to.have.property('variable').that.has.lengthOf(2).that.eql([
                { key: 'foo' }, { key: 'bar' }
            ]);
        });

        it('should parse path variables containing special characters properly', function () {
            var subject = url.parse('http://127.0.0.1/:郵差/:foo.json');

            expect(subject).to.have.property('variable').that.has.lengthOf(2).that.eql([
                { key: '郵差' }, { key: 'foo.json' }
            ]);
        });

        it('should parse with variables having reserved characters', function () {
            var subject = url.parse('{{p://}}://{{@}}:{{###}}@{{host.name}}:{{:p}}/{{f/o/o}}/bar?{{?}}={{&}}#{{[#]}}');

            expect(subject).to.deep.include({
                raw: '{{p://}}://{{@}}:{{###}}@{{host.name}}:{{:p}}/{{f/o/o}}/bar?{{?}}={{&}}#{{[#]}}',
                protocol: '{{p://}}',
                auth: { user: '{{@}}', password: '{{###}}' },
                host: ['{{host.name}}'],
                port: '{{:p}}',
                path: ['{{f/o/o}}', 'bar'],
                query: [{ key: '{{?}}', value: '{{&}}' }],
                hash: '{{[#]}}'
            });
        });

        it('should handle newlines in every segment', function () {
            var subject = url.parse('http://\n:\r@\r.\n:\n/\n/\n?\n=\r#\n');

            expect(subject).to.deep.include({
                raw: 'http://\n:\r@\r.\n:\n/\n/\n?\n=\r#\n',
                protocol: 'http',
                auth: { user: '\n', password: '\r' },
                host: ['\r', '\n'],
                port: '\n',
                path: ['\n', '\n'],
                query: [{ key: '\n', value: '\r' }],
                hash: '\n'
            });
        });

        it('should handle empty port', function () {
            var subject = url.parse('localhost:/path');

            expect(subject).to.deep.include({
                raw: 'localhost:/path',
                host: ['localhost'],
                port: '',
                path: ['path']
            });
        });

        it('should handle \\ in pathname', function () {
            var subject = url.parse('http://localhost\\foo\\bar');

            expect(subject).to.deep.include({
                raw: 'http://localhost\\foo\\bar',
                host: ['localhost'],
                path: ['foo', 'bar']
            });
        });

        it('should distinguish between hostname and path', function () {
            var subject = url.parse('http://postman.com:80\\@evil.com/#foo\\bar');

            expect(subject).to.deep.include({
                raw: 'http://postman.com:80\\@evil.com/#foo\\bar',
                protocol: 'http',
                host: ['postman', 'com'],
                port: '80',
                path: ['@evil.com', ''],
                hash: 'foo\\bar'
            });
        });

        it('should handle local IPv6 address', function () {
            var subject = url.parse('http://[::1]/path');

            expect(subject).to.deep.include({
                raw: 'http://[::1]/path',
                host: ['[::1]'],
                path: ['path']
            });
        });

        it('should handle IPv6 address with port', function () {
            var subject = url.parse('http://[::1]:8080');

            expect(subject).to.deep.include({
                raw: 'http://[::1]:8080',
                protocol: 'http',
                host: ['[::1]'],
                port: '8080'
            });
        });

        it('should handle IPv6 address without port', function () {
            var subject = url.parse('http://[1080:0:0:0:8:800:200C:417A]/foo/bar?q=z');

            expect(subject).to.deep.include({
                raw: 'http://[1080:0:0:0:8:800:200C:417A]/foo/bar?q=z',
                protocol: 'http',
                host: ['[1080:0:0:0:8:800:200C:417A]'],
                path: ['foo', 'bar'],
                query: [{ key: 'q', value: 'z' }]
            });
        });

        it('should handle IPv6 with auth', function () {
            var subject = url.parse('http://user:password@[1080:0:0:0:8:800:200C:417A]:8080');

            expect(subject).to.deep.include({
                raw: 'http://user:password@[1080:0:0:0:8:800:200C:417A]:8080',
                protocol: 'http',
                host: ['[1080:0:0:0:8:800:200C:417A]'],
                auth: {
                    user: 'user',
                    password: 'password'
                },
                port: '8080'
            });
        });

        it('should trim whitespace on the left', function () {
            var subject = url.parse(' \n\t\rhttp://localhost/path\n/name\n ');

            expect(subject).to.deep.include({
                raw: 'http://localhost/path\n/name\n ',
                protocol: 'http',
                host: ['localhost'],
                path: ['path\n', 'name\n ']
            });
        });

        it('should handle multiple : in auth', function () {
            var subject = url.parse('http://user:p:a:s:s@localhost');

            expect(subject).to.deep.include({
                raw: 'http://user:p:a:s:s@localhost',
                protocol: 'http',
                host: ['localhost'],
                auth: {
                    user: 'user',
                    password: 'p:a:s:s'
                }
            });
        });

        it('should handle multiple @ in auth', function () {
            var subject = url.parse('http://us@r:p@ssword@localhost');

            expect(subject).to.deep.include({
                raw: 'http://us@r:p@ssword@localhost',
                protocol: 'http',
                host: ['localhost'],
                auth: {
                    user: 'us@r',
                    password: 'p@ssword'
                }
            });
        });

        it('should handle multiple ???', function () {
            var subject = url.parse('http://localhost/p/q=foo@bar???&hl=en&src=api&x=2&y=2&z=3&s=');

            expect(subject).to.deep.include({
                raw: 'http://localhost/p/q=foo@bar???&hl=en&src=api&x=2&y=2&z=3&s=',
                protocol: 'http',
                host: ['localhost'],
                path: ['p', 'q=foo@bar'],
                query: [
                    { key: '??', value: null },
                    { key: 'hl', value: 'en' },
                    { key: 'src', value: 'api' },
                    { key: 'x', value: '2' },
                    { key: 'y', value: '2' },
                    { key: 'z', value: '3' },
                    { key: 's', value: '' }
                ]
            });
        });

        it('should handle multiple &&&', function () {
            var subject = url.parse('http://localhost?foo=bar&&&bar=baz');

            expect(subject).to.deep.include({
                raw: 'http://localhost?foo=bar&&&bar=baz',
                protocol: 'http',
                host: ['localhost'],
                query: [
                    { key: 'foo', value: 'bar' },
                    { key: null, value: null },
                    { key: null, value: null },
                    { key: 'bar', value: 'baz' }
                ]
            });
        });

        it('should handle auth without password', function () {
            var subject = url.parse('http://root@localhost');

            expect(subject).to.deep.include({
                raw: 'http://root@localhost',
                protocol: 'http',
                host: ['localhost'],
                auth: {
                    user: 'root',
                    password: undefined
                }
            });
        });

        it('should handle handle protocol with backslashes', function () {
            var subject = url.parse('http:\\\\localhost');

            expect(subject).to.deep.include({
                raw: 'http:\\\\localhost',
                protocol: 'http',
                host: ['localhost']
            });
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

        it('should encode &, = and # in query parameters', function () {
            var fixture = {
                host: 'https://postman-echo.com',
                query: [{
                    key: '#&=',
                    value: '#&='
                }]
            };

            expect(url.unparse(fixture)).to.eql('https://postman-echo.com?%23%26%3D=%23%26=');
        });

        it('should not encode = in query parameters value', function () {
            var fixture = {
                host: 'https://postman-echo.com',
                query: [{
                    key: 'foo',
                    value: 'bar='
                }]
            };

            expect(url.unparse(fixture)).to.eql('https://postman-echo.com?foo=bar=');
        });

        it('should not encode &, = and # inside variables in query parameters', function () {
            var fixture = {
                host: 'https://postman-echo.com',
                query: [{
                    key: '{{#&=}}',
                    value: '{{#&=}}'
                }]
            };

            expect(url.unparse(fixture)).to.eql('https://postman-echo.com?{{#&=}}={{#&=}}');
        });

        it('should handle bare ipv4 addresses with variables', function () {
            var fixture = '127.0.{{subnet}}.1';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should handle bare ipv4 addresses with protocol and port as variables', function () {
            var fixture = '{{my-protocol}}://127.0.0.1:{{my-port}}';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should handle trailing path backslash in ipv4 address and port', function () {
            var fixture = 'http://127.0.0.1:8080/';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should handle url with file protocol and relative path to files', function () {
            var fixture = 'file://../path/to/file';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should handle path variables', function () {
            var fixture = 'http://127.0.0.1/:郵差/:/:foo.json';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should handle variables having reserved characters', function () {
            var fixture = '{{p://}}://{{@}}:{{###}}@{{host.name}}:{{:p}}/{{f/o/o}}/bar?{{?}}={{&}}#{{[#]}}';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should handle whitespace and newlines', function () {
            var fixture = 'http://\n:\r@\r.\n:\n/\n/\n?\n=\r#\n';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should trim whitespace on the left', function () {
            var fixture = ' \n\t\rhttp://localhost/path\n/name\n ';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture.trimLeft());
        });

        it('should replace \\ in pathname with /', function () {
            var fixture = 'http://localhost\\foo\\bar';

            expect(url.unparse(url.parse(fixture))).to.equal('http://localhost/foo/bar');
        });

        it('should replace \\ in protocol with /', function () {
            var fixture = 'http:\\\\localhost/foo\\bar';

            expect(url.unparse(url.parse(fixture))).to.equal('http://localhost/foo/bar');
        });

        it('should handle IPv6 with auth', function () {
            var fixture = 'http://user:password@[1080:0:0:0:8:800:200C:417A]:8080';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should handle multiple : and @ in auth', function () {
            var fixture = 'http://us@r:p@ssword@localhost';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);

            fixture = 'http://user:p:a:s:s@localhost';
            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should handle auth without user', function () {
            var fixture = 'http://:password@localhost';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should handle auth without password', function () {
            var fixture = 'http://user@localhost';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should retain @ in auth without user and password', function () {
            var fixture = 'http://@localhost';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should retain : in auth with empty user and password', function () {
            var fixture = 'http://:@localhost';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should retain : in empty port', function () {
            var fixture = 'localhost:/path';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should retain / in empty path', function () {
            var fixture = 'localhost/';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should retain # in empty hash', function () {
            var fixture = 'localhost#';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should retain ? in empty query param', function () {
            var fixture = 'http://localhost?';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });

        it('should retain & in empty query params', function () {
            var fixture = 'http://localhost?&';

            expect(url.unparse(url.parse(fixture))).to.equal(fixture);

            fixture = 'http://localhost?&&';
            expect(url.unparse(url.parse(fixture))).to.equal(fixture);

            fixture = 'http://localhost?foo&';
            expect(url.unparse(url.parse(fixture))).to.equal(fixture);

            fixture = 'http://localhost?&foo';
            expect(url.unparse(url.parse(fixture))).to.equal(fixture);
        });
    });
});
