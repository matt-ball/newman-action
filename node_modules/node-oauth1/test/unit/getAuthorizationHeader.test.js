var expect = require('chai').expect,
    oauth = require('../../index'),
    encode = oauth.percentEncode,
    getAuthHeader = oauth.getAuthorizationHeader;

describe('getAuthorizationHeader()', function () {
    it('should include all oauth1 params', function () {
        var key,
            params = {
                oauth_signature_method: 'PLAINTEXT',
                oauth_consumer_key: 'foo',
                oauth_token: 'bar',
                oauth_nonce: 'baz',
                oauth_timestamp: '1588771035',
                oauth_version: '1.0',
                oauth_callback: 'http://postman.com',
                oauth_verifier: 'secret',
                oauth_body_hash: 'xyz=',
                oauth_signature: 'generatedSignature=='
            },
            authHeader = getAuthHeader(null, params);
        
        for (key in params) {
            expect(authHeader).to.include(`${key}="${encode(params[key])}"`);
        }
    });

    it('should not encode params when disableParamsEncoding:true', function () {
        var params = {
                oauth_signature_method: 'PLAINTEXT',
                oauth_consumer_key: 'foo',
                oauth_token: 'bar',
                oauth_nonce: 'baz',
                oauth_timestamp: '1588771035',
                oauth_version: '1.0',
                oauth_callback: 'http://postman.com',
                oauth_verifier: 'secret',
                oauth_body_hash: 'xyz=',
                oauth_signature: 'generatedSignature=='
            },
            key,
            authHeader = getAuthHeader(null, params, true);
        
        for (key in params) {
            expect(authHeader).to.include(`${key}="${params[key]}"`);
        }
    });

    it('should add relm if provided', function () {
        var realm = 'postman',
            params = {
                oauth_signature_method: 'PLAINTEXT',
                oauth_consumer_key: 'foo',
                oauth_token: 'bar',
                oauth_nonce: 'baz',
                oauth_timestamp: '1588771035',
                oauth_version: '1.0'
            };
        
        expect(getAuthHeader(realm, params)).to.include('realm="postman"');
    });

    it('should not include non-oauth1 params', function () {
        var realm = 'postman',
            params = {
                oauth_signature_method: 'PLAINTEXT',
                oauth_consumer_key: 'foo',
                oauth_token: 'bar',
                oauth_nonce: 'baz',
                oauth_timestamp: '1588771035',
                oauth_version: '1.0',
                random: 'non-oauth1 param'
            };
        
        expect(getAuthHeader(realm, params)).to.not.include('random');
    });
});
