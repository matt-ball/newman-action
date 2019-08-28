var expect = require('chai').expect,
    util = require('../../lib/util');

/* global describe, it */
describe('url parsing', function () {
    it('should correctly unparse query parameters', function () {
        var v2url = {
            raw: '{{baseurl}}/folder1/:uriParam/resource?foo={{foo.var}}&bar={{bar.var}}',
            auth: {},
            host: [
                '{{baseurl}}'
            ],
            path: [
                'folder1',
                ':uriParam',
                'resource'
            ],
            query: [
                {
                    key: 'foo',
                    value: '{{foo.var}}'
                },
                {
                    key: 'bar',
                    value: '{{bar.var}}'
                }
            ],
            variable: [
                {
                    value: '',
                    id: 'uriParam'
                }
            ]
        };

        expect(util.urlunparse(v2url)).to.eql('{{baseurl}}/folder1/:uriParam/resource?foo={{foo.var}}&bar={{bar.var}}');
    });
});
