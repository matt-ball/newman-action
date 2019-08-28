module.exports = {
    v1: {
        id: 'd497d10e-e280-8c83-709a-a4d4ea12ad14',
        name: 'AuthTest',
        description: 'Sample auth tests',
        order: [
            '51e6ecc7-ff3c-9bc0-8aea-b417c4723f69',
            '951fc3e8-c6b6-5c19-9f69-4e7499b3127f',
            '951fc3e8-c6b6-5c19-9f69-4e7499b3127g'
        ],
        folders: [],
        folders_order: [],
        requests: [
            {
                id: '51e6ecc7-ff3c-9bc0-8aea-b417c4723f69',
                headers: '',
                url: 'httpbin.org/post',
                preRequestScript: '',
                queryParams: [],
                rawModeData: '',
                pathVariableData: [],
                method: 'POST',
                dataMode: 'raw',
                headerData: [],
                events: [{
                    listen: 'test',
                    script: {
                        type: 'text/javascript',
                        exec: [
                            'var data = JSON.parse(responseBody);',
                            'var oldNonce = environment.oldNonce;',
                            'var newNonce = data.form.oauth_nonce;',
                            'tests["NewNonce"]=(oldNonce != newNonce);',
                            'postman.setEnvironmentVariable("oldNonce", newNonce);',
                            // eslint-disable-next-line max-len
                            'tests["HasNonce"]=data.form.oauth_nonce;console.log("oldNonce: "+oldNonce+", newNonce="+newNonce);console.log("Signature: "+data.form.oauth_signature);'
                        ]
                    }
                }],
                // eslint-disable-next-line max-len
                tests: 'var data = JSON.parse(responseBody);\nvar oldNonce = environment.oldNonce;\nvar newNonce = data.form.oauth_nonce;\ntests["NewNonce"]=(oldNonce != newNonce);\npostman.setEnvironmentVariable("oldNonce", newNonce);\ntests["HasNonce"]=data.form.oauth_nonce;console.log("oldNonce: "+oldNonce+", newNonce="+newNonce);console.log("Signature: "+data.form.oauth_signature);',
                auth: {
                    type: 'oauth2',
                    oauth2: [
                        { key: 'accessToken', value: 'secretToken', type: 'string' },
                        { key: 'addTokenTo', value: 'header', type: 'string' },
                        { key: 'callBackUrl', value: 'https://foo.com/cb', type: 'string' },
                        { key: 'authUrl', value: 'https://foo.com/au', type: 'string' },
                        { key: 'accessTokenUrl', value: 'https://foo.com/at', type: 'string' },
                        { key: 'clientId', value: 'uniqueClientIdentifier', type: 'string' },
                        { key: 'clientSecret', value: 'secretClientValue', type: 'string' },
                        { key: 'clientAuth', value: 'body', type: 'string' },
                        { key: 'grantType', value: 'implicit', type: 'string' },
                        { key: 'scope', value: 'all', type: 'string' },
                        { key: 'username', value: 'postman', type: 'string' },
                        { key: 'password', value: 'randomSecretString', type: 'string' },
                        { key: 'tokenType', value: 'bearer', type: 'string' },
                        { key: 'redirectUri', value: 'https://foo.com/rd', type: 'string' },
                        { key: 'refreshToken', value: 'refreshToken', type: 'string' }
                    ]
                },
                currentHelper: 'oAuth2',
                helperAttributes: {
                    id: 'oAuth2',
                    accessToken: 'secretToken',
                    addTokenTo: 'header',
                    callBackUrl: 'https://foo.com/cb',
                    authUrl: 'https://foo.com/au',
                    accessTokenUrl: 'https://foo.com/at',
                    clientId: 'uniqueClientIdentifier',
                    clientSecret: 'secretClientValue',
                    clientAuth: 'body',
                    grantType: 'implicit',
                    scope: 'all',
                    username: 'postman',
                    password: 'randomSecretString',
                    tokenType: 'bearer',
                    redirectUri: 'https://foo.com/rd',
                    refreshToken: 'refreshToken'
                },
                name: 'OAuth2',
                collectionId: 'd497d10e-e280-8c83-709a-a4d4ea12ad14',
                responses: []
            },
            {
                id: '951fc3e8-c6b6-5c19-9f69-4e7499b3127f',
                headers: 'Authorization: Bearer wkjehbxoqnunc2k3',
                url: 'http://echo.getpostman.com/auth/bearer',
                preRequestScript: '',
                method: 'GET',
                queryParams: [],
                rawModeData: '',
                headerData: [{
                    key: 'Authorization',
                    value: 'Bearer wkjehbxoqnunc2k3'
                }],
                dataMode: 'raw',
                pathVariableData: [],
                events: [{
                    listen: 'test',
                    script: {
                        type: 'text/javascript',
                        // eslint-disable-next-line max-len
                        exec: ['var response = JSON.parse(responseBody); tests["Bearer auth should pass"] = response.status === "pass";']
                    }
                }],
                // eslint-disable-next-line max-len
                tests: 'var response = JSON.parse(responseBody); tests["Bearer auth should pass"] = response.status === "pass";',
                auth: {
                    type: 'bearer',
                    bearer: [{ key: 'token', value: 'wkjehbxoqnunc2k3', type: 'string' }]
                },
                currentHelper: 'bearerAuth',
                helperAttributes: {
                    id: 'bearer',
                    token: 'wkjehbxoqnunc2k3'
                },
                name: 'test bearer auth success',
                collectionId: 'd497d10e-e280-8c83-709a-a4d4ea12ad14',
                responses: []
            },
            {
                id: '951fc3e8-c6b6-5c19-9f69-4e7499b3127g',
                // eslint-disable-next-line max-len
                headers: 'Authorization: NTLM TlRMTVNTUAADAAAAGAAYAFYAAAAYABgAbgAAAAAAAABIAAAADgAOAEgAAAAAAAAAVgAAAAAAAACGAAAABYKIogUBKAoAAAAPcABvAHMAdABtAGEAbgCDJfCgEQC+3wAAAAAAAAAAAAAAAAAAAAB6O2T1blvWpb/pqHtSdqcZ/A34nPBZe20=',
                url: 'http://echo.getpostman.com/auth/ntlm',
                preRequestScript: '',
                method: 'GET',
                queryParams: [],
                rawModeData: '',
                headerData: [{
                    key: 'Authorization',
                    // eslint-disable-next-line max-len
                    value: 'NTLM TlRMTVNTUAADAAAAGAAYAFYAAAAYABgAbgAAAAAAAABIAAAADgAOAEgAAAAAAAAAVgAAAAAAAACGAAAABYKIogUBKAoAAAAPcABvAHMAdABtAGEAbgCDJfCgEQC+3wAAAAAAAAAAAAAAAAAAAAB6O2T1blvWpb/pqHtSdqcZ/A34nPBZe20='
                }],
                dataMode: 'raw',
                pathVariableData: [],
                events: [{
                    listen: 'test',
                    script: {
                        type: 'text/javascript',
                        // eslint-disable-next-line max-len
                        exec: ['var response = JSON.parse(responseBody); tests["NTLM auth should pass"] = response.status === "pass";']
                    }
                }],
                // eslint-disable-next-line max-len
                tests: 'var response = JSON.parse(responseBody); tests["NTLM auth should pass"] = response.status === "pass";',
                auth: {
                    type: 'ntlm',
                    ntlm: [
                        { key: 'username', value: 'foo', type: 'string' },
                        { key: 'password', value: 'password', type: 'string' },
                        { key: 'domain', value: 'domain', type: 'string' },
                        { key: 'workstation', value: 'workstation', type: 'string' },
                        { key: 'disableRetryRequest', value: false, type: 'boolean' }
                    ]
                },
                currentHelper: 'ntlmAuth',
                helperAttributes: {
                    id: 'ntlm',
                    username: 'foo',
                    password: 'password',
                    domain: 'domain',
                    workstation: 'workstation',
                    disableRetryRequest: false
                },
                name: 'test ntlm auth success',
                collectionId: 'd497d10e-e280-8c83-709a-a4d4ea12ad14',
                responses: []
            }
        ]
    },
    v2: {
        info: {
            name: 'AuthTest',
            _postman_id: 'd497d10e-e280-8c83-709a-a4d4ea12ad14',
            description: 'Sample auth tests',
            schema: 'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
        },
        item: [
            {
                _postman_id: '51e6ecc7-ff3c-9bc0-8aea-b417c4723f69',
                name: 'OAuth2',
                event: [
                    {
                        listen: 'test',
                        script: {
                            type: 'text/javascript',
                            exec: [
                                'var data = JSON.parse(responseBody);',
                                'var oldNonce = environment.oldNonce;',
                                'var newNonce = data.form.oauth_nonce;',
                                'tests["NewNonce"]=(oldNonce != newNonce);',
                                'postman.setEnvironmentVariable("oldNonce", newNonce);',
                                // eslint-disable-next-line max-len
                                'tests["HasNonce"]=data.form.oauth_nonce;console.log("oldNonce: "+oldNonce+", newNonce="+newNonce);console.log("Signature: "+data.form.oauth_signature);'
                            ]
                        }
                    }
                ],
                request: {
                    auth: {
                        type: 'oauth2',
                        oauth2: {
                            accessToken: 'secretToken',
                            addTokenTo: 'header',
                            callBackUrl: 'https://foo.com/cb',
                            authUrl: 'https://foo.com/au',
                            accessTokenUrl: 'https://foo.com/at',
                            clientId: 'uniqueClientIdentifier',
                            clientSecret: 'secretClientValue',
                            clientAuth: 'body',
                            grantType: 'implicit',
                            scope: 'all',
                            username: 'postman',
                            password: 'randomSecretString',
                            tokenType: 'bearer',
                            redirectUri: 'https://foo.com/rd',
                            refreshToken: 'refreshToken'
                        }
                    },
                    url: 'httpbin.org/post',
                    method: 'POST',
                    header: [],
                    body: {
                        mode: 'raw',
                        raw: ''
                    }
                },
                response: []
            },
            {
                _postman_id: '951fc3e8-c6b6-5c19-9f69-4e7499b3127f',
                name: 'test bearer auth success',
                event: [
                    {
                        listen: 'test',
                        script: {
                            type: 'text/javascript',
                            exec: [
                                // eslint-disable-next-line max-len
                                'var response = JSON.parse(responseBody); tests["Bearer auth should pass"] = response.status === "pass";'
                            ]
                        }
                    }
                ],
                request: {
                    auth: {
                        type: 'bearer',
                        bearer: {
                            token: 'wkjehbxoqnunc2k3'
                        }
                    },
                    url: 'http://echo.getpostman.com/auth/bearer',
                    method: 'GET',
                    header: [
                        {
                            key: 'Authorization',
                            value: 'Bearer wkjehbxoqnunc2k3'
                        }
                    ],
                    body: {
                        mode: 'raw',
                        raw: ''
                    }
                },
                response: []
            },
            {
                _postman_id: '951fc3e8-c6b6-5c19-9f69-4e7499b3127g',
                name: 'test ntlm auth success',
                event: [
                    {
                        listen: 'test',
                        script: {
                            type: 'text/javascript',
                            exec: [
                                // eslint-disable-next-line max-len
                                'var response = JSON.parse(responseBody); tests["NTLM auth should pass"] = response.status === "pass";'
                            ]
                        }
                    }
                ],
                request: {
                    auth: {
                        type: 'ntlm',
                        ntlm: {
                            username: 'foo',
                            password: 'password',
                            domain: 'domain',
                            workstation: 'workstation',
                            disableRetryRequest: false
                        }
                    },
                    url: 'http://echo.getpostman.com/auth/ntlm',
                    method: 'GET',
                    header: [
                        {
                            key: 'Authorization',
                            // eslint-disable-next-line max-len
                            value: 'NTLM TlRMTVNTUAADAAAAGAAYAFYAAAAYABgAbgAAAAAAAABIAAAADgAOAEgAAAAAAAAAVgAAAAAAAACGAAAABYKIogUBKAoAAAAPcABvAHMAdABtAGEAbgCDJfCgEQC+3wAAAAAAAAAAAAAAAAAAAAB6O2T1blvWpb/pqHtSdqcZ/A34nPBZe20='
                        }
                    ],
                    body: {
                        mode: 'raw',
                        raw: ''
                    }
                },
                response: []
            }
        ]
    },
    v21: {
        info: {
            name: 'AuthTest',
            _postman_id: 'd497d10e-e280-8c83-709a-a4d4ea12ad14',
            description: 'Sample auth tests',
            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
        },
        item: [
            {
                _postman_id: '51e6ecc7-ff3c-9bc0-8aea-b417c4723f69',
                name: 'OAuth2',
                event: [
                    {
                        listen: 'test',
                        script: {
                            type: 'text/javascript',
                            exec: [
                                'var data = JSON.parse(responseBody);',
                                'var oldNonce = environment.oldNonce;',
                                'var newNonce = data.form.oauth_nonce;',
                                'tests["NewNonce"]=(oldNonce != newNonce);',
                                'postman.setEnvironmentVariable("oldNonce", newNonce);',
                                // eslint-disable-next-line max-len
                                'tests["HasNonce"]=data.form.oauth_nonce;console.log("oldNonce: "+oldNonce+", newNonce="+newNonce);console.log("Signature: "+data.form.oauth_signature);'
                            ]
                        }
                    }
                ],
                request: {
                    auth: {
                        type: 'oauth2',
                        oauth2: [
                            {
                                key: 'accessToken',
                                value: 'secretToken',
                                type: 'string'
                            },
                            {
                                key: 'addTokenTo',
                                value: 'header',
                                type: 'string'
                            },
                            {
                                key: 'callBackUrl',
                                value: 'https://foo.com/cb',
                                type: 'string'
                            },
                            {
                                key: 'authUrl',
                                value: 'https://foo.com/au',
                                type: 'string'
                            },
                            {
                                key: 'accessTokenUrl',
                                value: 'https://foo.com/at',
                                type: 'string'
                            },
                            {
                                key: 'clientId',
                                value: 'uniqueClientIdentifier',
                                type: 'string'
                            },
                            {
                                key: 'clientSecret',
                                value: 'secretClientValue',
                                type: 'string'
                            },
                            {
                                key: 'clientAuth',
                                value: 'body',
                                type: 'string'
                            },
                            {
                                key: 'grantType',
                                value: 'implicit',
                                type: 'string'
                            },
                            {
                                key: 'scope',
                                value: 'all',
                                type: 'string'
                            },
                            {
                                key: 'username',
                                value: 'postman',
                                type: 'string'
                            },
                            {
                                key: 'password',
                                value: 'randomSecretString',
                                type: 'string'
                            },
                            {
                                key: 'tokenType',
                                value: 'bearer',
                                type: 'string'
                            },
                            {
                                key: 'redirectUri',
                                value: 'https://foo.com/rd',
                                type: 'string'
                            },
                            {
                                key: 'refreshToken',
                                value: 'refreshToken',
                                type: 'string'
                            }
                        ]
                    },
                    url: {
                        raw: 'httpbin.org/post',
                        host: ['httpbin', 'org'],
                        path: ['post']
                    },
                    method: 'POST',
                    header: [],
                    body: {
                        mode: 'raw',
                        raw: ''
                    }
                },
                response: []
            },
            {
                _postman_id: '951fc3e8-c6b6-5c19-9f69-4e7499b3127f',
                name: 'test bearer auth success',
                event: [
                    {
                        listen: 'test',
                        script: {
                            type: 'text/javascript',
                            exec: [
                                // eslint-disable-next-line max-len
                                'var response = JSON.parse(responseBody); tests["Bearer auth should pass"] = response.status === "pass";'
                            ]
                        }
                    }
                ],
                request: {
                    auth: {
                        type: 'bearer',
                        bearer: [
                            {
                                key: 'token',
                                value: 'wkjehbxoqnunc2k3',
                                type: 'string'
                            }
                        ]
                    },
                    url: {
                        raw: 'http://echo.getpostman.com/auth/bearer',
                        protocol: 'http',
                        host: ['echo', 'getpostman', 'com'],
                        path: ['auth', 'bearer']
                    },
                    method: 'GET',
                    header: [
                        {
                            key: 'Authorization',
                            value: 'Bearer wkjehbxoqnunc2k3'
                        }
                    ],
                    body: {
                        mode: 'raw',
                        raw: ''
                    }
                },
                response: []
            },
            {
                _postman_id: '951fc3e8-c6b6-5c19-9f69-4e7499b3127g',
                name: 'test ntlm auth success',
                event: [
                    {
                        listen: 'test',
                        script: {
                            type: 'text/javascript',
                            exec: [
                                // eslint-disable-next-line max-len
                                'var response = JSON.parse(responseBody); tests["NTLM auth should pass"] = response.status === "pass";'
                            ]
                        }
                    }
                ],
                request: {
                    auth: {
                        type: 'ntlm',
                        ntlm: [
                            {
                                key: 'username',
                                value: 'foo',
                                type: 'string'
                            },
                            {
                                key: 'password',
                                value: 'password',
                                type: 'string'
                            },
                            {
                                key: 'domain',
                                value: 'domain',
                                type: 'string'
                            },
                            {
                                key: 'workstation',
                                value: 'workstation',
                                type: 'string'
                            },
                            {
                                key: 'disableRetryRequest',
                                value: false,
                                type: 'boolean'
                            }
                        ]
                    },
                    url: {
                        raw: 'http://echo.getpostman.com/auth/ntlm',
                        protocol: 'http',
                        host: ['echo', 'getpostman', 'com'],
                        path: ['auth', 'ntlm']
                    },
                    method: 'GET',
                    header: [
                        {
                            key: 'Authorization',
                            // eslint-disable-next-line max-len
                            value: 'NTLM TlRMTVNTUAADAAAAGAAYAFYAAAAYABgAbgAAAAAAAABIAAAADgAOAEgAAAAAAAAAVgAAAAAAAACGAAAABYKIogUBKAoAAAAPcABvAHMAdABtAGEAbgCDJfCgEQC+3wAAAAAAAAAAAAAAAAAAAAB6O2T1blvWpb/pqHtSdqcZ/A34nPBZe20='
                        }
                    ],
                    body: {
                        mode: 'raw',
                        raw: ''
                    }
                },
                response: []
            }
        ]
    }
};
