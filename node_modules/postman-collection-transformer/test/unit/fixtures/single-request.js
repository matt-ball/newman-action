/* eslint-disable quotes, max-len */

module.exports = {
    v1: {
        folder: "58b0685d-5e5c-d03e-8899-c1084704d0d3",
        id: "0628a95f-c283-94e2-fa9f-53477775692f",
        name: "OAuth2.0 Get Access Token",
        dataMode: "params",
        data: [
            {
                key: "code",
                value: "xWnkliVQJURqB2x1",
                type: "text"
            },
            {
                key: "grant_type",
                value: "authorization_code",
                type: "text"
            },
            {
                key: "redirect_uri",
                value: "https://www.getpostman.com/oauth2/callback",
                type: "text"
            },
            {
                key: "client_id",
                value: "abc123",
                type: "text"
            },
            {
                key: "client_secret",
                value: "ssh-secret",
                type: "text"
            }
        ],
        rawModeData: null,
        descriptionFormat: null,
        description: "This endpoint is used to get the `access_token`\n\nIt requires the following secret client credentials to be sent as part of the form body along with the `authentication code` obtained as part of the `redirect_uri` from the previous request.\n\n> code: xWnkliVQJURqB2x1\n>\n> grant_type: authorization_code\n>\n> redirect_uri: https://www.getpostman.com/oauth2/callback\n>\n> client_id: abc123\n>\n> client_secret: ssh-secret\n\nIf the correct credentials are not passed, the server returns with a `401 Unauthorized` response.",
        headers: "A:B\nC:D\n// E: F",
        method: "POST",
        pathVariables: {},
        url: "https://yo.postman.wtf/oauth2/token",
        preRequestScript: "",
        tests: "tests[\"response code is 200\"] = responseCode.code === 200;\nvar body = JSON.parse(responseBody);\ntests[\"body has access token\"] = \"access_token\" in body;\ntests[\"body has bearer type\"] = \"token_type\" in body;",
        currentHelper: null,
        helperAttributes: null,
        collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50",
        responses: [
            {
                owner: "33232",
                lastUpdatedBy: "33232",
                lastRevision: 75106841,
                request: {
                    name: "Access Token",
                    description: "Tries to get the access token by passing the clientId , clientSecret,\nauthentication code, redirect URI and grant type.\n",
                    url: "https://yo.postman.wtf/oauth2/token",
                    pathVariables: {},
                    data: [
                        {
                            key: "code",
                            value: "xWnkliVQJURqB2x1",
                            type: "text",
                            enabled: true
                        },
                        {
                            key: "grant_type",
                            value: "authorization_code",
                            type: "text",
                            enabled: true
                        },
                        {
                            key: "redirect_uri",
                            value: "https://www.getpostman.com/oauth2/callback",
                            type: "text",
                            enabled: true
                        },
                        {
                            key: "client_id",
                            value: "abc123",
                            type: "text",
                            enabled: true
                        },
                        {
                            key: "client_secret",
                            value: "ssh-secret",
                            type: "text",
                            enabled: true
                        }
                    ],
                    headers: "",
                    dataMode: "params",
                    method: "POST",
                    tests: "tests[\"response code is 200\"] = responseCode.code === 200;\nvar body = JSON.parse(responseBody);\ntests[\"body has access token\"] = \"access_token\" in body;\ntests[\"body has bearer type\"] = \"token_type\" in body;",
                    isFromCollection: true,
                    write: true,
                    version: 2
                },
                id: "0716233b-474d-bac7-bf1f-ccb461ecd3b9",
                name: "401",
                status: "",
                responseCode: {
                    code: 401,
                    name: "Unauthorized"
                },
                time: "287",
                headers: [
                    {
                        name: "Access-Control-Allow-Credentials",
                        key: "Access-Control-Allow-Credentials",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Headers",
                        key: "Access-Control-Allow-Headers",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Methods",
                        key: "Access-Control-Allow-Methods",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Origin",
                        key: "Access-Control-Allow-Origin",
                        value: ""
                    },
                    {
                        name: "Connection",
                        key: "Connection",
                        value: "keep-alive"
                    },
                    {
                        name: "Content-Length",
                        key: "Content-Length",
                        value: "2"
                    },
                    {
                        name: "Content-Type",
                        key: "Content-Type",
                        value: "application/json; charset=utf-8"
                    },
                    {
                        name: "Date",
                        key: "Date",
                        value: "Sat, 31 Oct 2015 06:43:44 GMT"
                    },
                    {
                        name: "Server",
                        key: "Server",
                        value: "nginx/1.6.2"
                    },
                    {
                        name: "Vary",
                        key: "Vary",
                        value: "X-HTTP-Method-Override, Accept-Encoding"
                    },
                    {
                        name: "X-Powered-By",
                        key: "X-Powered-By",
                        value: "Sails <sailsjs.org>"
                    }
                ],
                cookies: [],
                mime: "",
                text: "{}",
                language: "javascript",
                rawDataType: "text",
                state: {
                    size: "normal"
                },
                previewType: "html",
                searchResultScrolledTo: "-1",
                version: null,
                requestObject: "{\"name\":\"Access Token\",\"description\":\"Tries to get the access token by passing the clientId , clientSecret,\\nauthentication code, redirect URI and grant type.\\n\",\"url\":\"https://yo.postman.wtf/oauth2/token\",\"pathVariables\":{},\"data\":[{\"key\":\"code\",\"value\":\"xWnkliVQJURqB2x1\",\"type\":\"text\",\"enabled\":true},{\"key\":\"grant_type\",\"value\":\"authorization_code\",\"type\":\"text\",\"enabled\":true},{\"key\":\"redirect_uri\",\"value\":\"https://www.getpostman.com/oauth2/callback\",\"type\":\"text\",\"enabled\":true},{\"key\":\"client_id\",\"value\":\"abc123\",\"type\":\"text\",\"enabled\":true},{\"key\":\"client_secret\",\"value\":\"ssh-secret\",\"type\":\"text\",\"enabled\":true}],\"headers\":\"\",\"dataMode\":\"params\",\"method\":\"POST\",\"tests\":\"tests[\\\"response code is 200\\\"] = responseCode.code === 200;\\nvar body = JSON.parse(responseBody);\\ntests[\\\"body has access token\\\"] = \\\"access_token\\\" in body;\\ntests[\\\"body has bearer type\\\"] = \\\"token_type\\\" in body;\",\"isFromCollection\":true,\"write\":true,\"version\":2}",
                createdAt: "2015-11-02T13:11:08.000Z",
                updatedAt: "2015-11-02T18:05:45.000Z",
                write: true
            },
            {
                owner: "33232",
                lastUpdatedBy: "33232",
                lastRevision: 75106842,
                request: {
                    name: "Access Token",
                    description: "Tries to get the access token by passing the clientId , clientSecret,\nauthentication code, redirect URI and grant type.\n",
                    url: "https://yo.postman.wtf/oauth2/token",
                    pathVariables: {},
                    data: [
                        {
                            key: "code",
                            value: "xWnkliVQJURqB2x1",
                            type: "text",
                            enabled: true
                        },
                        {
                            key: "grant_type",
                            value: "authorization_code",
                            type: "text",
                            enabled: true
                        },
                        {
                            key: "redirect_uri",
                            value: "https://www.getpostman.com/oauth2/callback",
                            type: "text",
                            enabled: true
                        },
                        {
                            key: "client_id",
                            value: "abc123",
                            type: "text",
                            enabled: true
                        },
                        {
                            key: "client_secret",
                            value: "ssh-secret",
                            type: "text",
                            enabled: true
                        }
                    ],
                    headers: "",
                    dataMode: "params",
                    method: "POST",
                    tests: "tests[\"response code is 200\"] = responseCode.code === 200;\nvar body = JSON.parse(responseBody);\ntests[\"body has access token\"] = \"access_token\" in body;\ntests[\"body has bearer type\"] = \"token_type\" in body;",
                    isFromCollection: true,
                    write: true,
                    version: 2
                },
                id: "aa6e8983-172d-692b-f8da-a69af6a27371",
                name: "200",
                status: "",
                responseCode: {
                    code: 200,
                    name: "OK"
                },
                time: "303",
                headers: [
                    {
                        name: "Access-Control-Allow-Credentials",
                        key: "Access-Control-Allow-Credentials",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Headers",
                        key: "Access-Control-Allow-Headers",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Methods",
                        key: "Access-Control-Allow-Methods",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Origin",
                        key: "Access-Control-Allow-Origin",
                        value: ""
                    },
                    {
                        name: "Connection",
                        key: "Connection",
                        value: "keep-alive"
                    },
                    {
                        name: "Content-Encoding",
                        key: "Content-Encoding",
                        value: "gzip"
                    },
                    {
                        name: "Content-Length",
                        key: "Content-Length",
                        value: "153"
                    },
                    {
                        name: "Content-Type",
                        key: "Content-Type",
                        value: "application/json; charset=utf-8"
                    },
                    {
                        name: "Date",
                        key: "Date",
                        value: "Sat, 31 Oct 2015 06:43:34 GMT"
                    },
                    {
                        name: "Server",
                        key: "Server",
                        value: "nginx/1.6.2"
                    },
                    {
                        name: "Vary",
                        key: "Vary",
                        value: "X-HTTP-Method-Override, Accept-Encoding"
                    },
                    {
                        name: "X-Powered-By",
                        key: "X-Powered-By",
                        value: "Sails <sailsjs.org>"
                    }
                ],
                cookies: [],
                mime: "",
                text: "{\"access_token\":\"vp7jxTwqgczoFHs0uIdOvv4VdBWmvCkbVbNBCuaTQ3JZplPS40BaNV47HD1zt7MztQPILJvqYsOs6PfJpFYBgwbaE3CVEKOj\",\"token_type\":\"Bearer\"}",
                language: "javascript",
                rawDataType: "text",
                state: {
                    size: "normal"
                },
                previewType: "html",
                searchResultScrolledTo: "-1",
                version: null,
                requestObject: "{\"name\":\"Access Token\",\"description\":\"Tries to get the access token by passing the clientId , clientSecret,\\nauthentication code, redirect URI and grant type.\\n\",\"url\":\"https://yo.postman.wtf/oauth2/token\",\"pathVariables\":{},\"data\":[{\"key\":\"code\",\"value\":\"xWnkliVQJURqB2x1\",\"type\":\"text\",\"enabled\":true},{\"key\":\"grant_type\",\"value\":\"authorization_code\",\"type\":\"text\",\"enabled\":true},{\"key\":\"redirect_uri\",\"value\":\"https://www.getpostman.com/oauth2/callback\",\"type\":\"text\",\"enabled\":true},{\"key\":\"client_id\",\"value\":\"abc123\",\"type\":\"text\",\"enabled\":true},{\"key\":\"client_secret\",\"value\":\"ssh-secret\",\"type\":\"text\",\"enabled\":true}],\"headers\":\"\",\"dataMode\":\"params\",\"method\":\"POST\",\"tests\":\"tests[\\\"response code is 200\\\"] = responseCode.code === 200;\\nvar body = JSON.parse(responseBody);\\ntests[\\\"body has access token\\\"] = \\\"access_token\\\" in body;\\ntests[\\\"body has bearer type\\\"] = \\\"token_type\\\" in body;\",\"isFromCollection\":true,\"write\":true,\"version\":2}",
                createdAt: "2015-11-02T13:11:08.000Z",
                updatedAt: "2015-11-02T18:05:45.000Z",
                write: true
            }
        ]
    },
    v2: {
        _postman_id: "0628a95f-c283-94e2-fa9f-53477775692f",
        name: "OAuth2.0 Get Access Token",
        event: [
            {
                listen: "test",
                script: {
                    type: "text/javascript",
                    exec: [
                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                        "var body = JSON.parse(responseBody);",
                        "tests[\"body has access token\"] = \"access_token\" in body;",
                        "tests[\"body has bearer type\"] = \"token_type\" in body;"
                    ]
                }
            }
        ],
        request: {
            url: 'https://yo.postman.wtf/oauth2/token',
            method: "POST",
            header: [
                { key: 'A', value: 'B' },
                { key: 'C', value: 'D' },
                { key: 'E', value: 'F', disabled: true }
            ],
            body: {
                mode: "formdata",
                formdata: [
                    {
                        key: "code",
                        value: "xWnkliVQJURqB2x1",
                        type: "text"
                    },
                    {
                        key: "grant_type",
                        value: "authorization_code",
                        type: "text"
                    },
                    {
                        key: "redirect_uri",
                        value: "https://www.getpostman.com/oauth2/callback",
                        type: "text"
                    },
                    {
                        key: "client_id",
                        value: "abc123",
                        type: "text"
                    },
                    {
                        key: "client_secret",
                        value: "ssh-secret",
                        type: "text"
                    }
                ]
            },
            description: "This endpoint is used to get the `access_token`\n\nIt requires the following secret client credentials to be sent as part of the form body along with the `authentication code` obtained as part of the `redirect_uri` from the previous request.\n\n> code: xWnkliVQJURqB2x1\n>\n> grant_type: authorization_code\n>\n> redirect_uri: https://www.getpostman.com/oauth2/callback\n>\n> client_id: abc123\n>\n> client_secret: ssh-secret\n\nIf the correct credentials are not passed, the server returns with a `401 Unauthorized` response."
        },
        response: [
            {
                id: "0716233b-474d-bac7-bf1f-ccb461ecd3b9",
                name: "401",
                originalRequest: {
                    url: "https://yo.postman.wtf/oauth2/token",
                    method: "POST",
                    header: [],
                    body: {
                        mode: "formdata",
                        formdata: [
                            {
                                key: "code",
                                value: "xWnkliVQJURqB2x1",
                                type: "text"
                            },
                            {
                                key: "grant_type",
                                value: "authorization_code",
                                type: "text"
                            },
                            {
                                key: "redirect_uri",
                                value: "https://www.getpostman.com/oauth2/callback",
                                type: "text"
                            },
                            {
                                key: "client_id",
                                value: "abc123",
                                type: "text"
                            },
                            {
                                key: "client_secret",
                                value: "ssh-secret",
                                type: "text"
                            }
                        ]
                    },
                    description: "Tries to get the access token by passing the clientId , clientSecret,\nauthentication code, redirect URI and grant type.\n"
                },
                status: "Unauthorized",
                code: 401,
                _postman_previewlanguage: "javascript",
                _postman_previewtype: "html",
                header: [
                    {
                        name: "Access-Control-Allow-Credentials",
                        key: "Access-Control-Allow-Credentials",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Headers",
                        key: "Access-Control-Allow-Headers",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Methods",
                        key: "Access-Control-Allow-Methods",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Origin",
                        key: "Access-Control-Allow-Origin",
                        value: ""
                    },
                    {
                        name: "Connection",
                        key: "Connection",
                        value: "keep-alive"
                    },
                    {
                        name: "Content-Length",
                        key: "Content-Length",
                        value: "2"
                    },
                    {
                        name: "Content-Type",
                        key: "Content-Type",
                        value: "application/json; charset=utf-8"
                    },
                    {
                        name: "Date",
                        key: "Date",
                        value: "Sat, 31 Oct 2015 06:43:44 GMT"
                    },
                    {
                        name: "Server",
                        key: "Server",
                        value: "nginx/1.6.2"
                    },
                    {
                        name: "Vary",
                        key: "Vary",
                        value: "X-HTTP-Method-Override, Accept-Encoding"
                    },
                    {
                        name: "X-Powered-By",
                        key: "X-Powered-By",
                        value: "Sails <sailsjs.org>"
                    }
                ],
                cookie: [],
                responseTime: "287",
                body: "{}"
            },
            {
                id: "aa6e8983-172d-692b-f8da-a69af6a27371",
                name: "200",
                originalRequest: {
                    url: "https://yo.postman.wtf/oauth2/token",
                    method: "POST",
                    header: [],
                    body: {
                        mode: "formdata",
                        formdata: [
                            {
                                key: "code",
                                value: "xWnkliVQJURqB2x1",
                                type: "text"
                            },
                            {
                                key: "grant_type",
                                value: "authorization_code",
                                type: "text"
                            },
                            {
                                key: "redirect_uri",
                                value: "https://www.getpostman.com/oauth2/callback",
                                type: "text"
                            },
                            {
                                key: "client_id",
                                value: "abc123",
                                type: "text"
                            },
                            {
                                key: "client_secret",
                                value: "ssh-secret",
                                type: "text"
                            }
                        ]
                    },
                    description: "Tries to get the access token by passing the clientId , clientSecret,\nauthentication code, redirect URI and grant type.\n"
                },
                status: "OK",
                code: 200,
                _postman_previewlanguage: "javascript",
                _postman_previewtype: "html",
                header: [
                    {
                        name: "Access-Control-Allow-Credentials",
                        key: "Access-Control-Allow-Credentials",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Headers",
                        key: "Access-Control-Allow-Headers",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Methods",
                        key: "Access-Control-Allow-Methods",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Origin",
                        key: "Access-Control-Allow-Origin",
                        value: ""
                    },
                    {
                        name: "Connection",
                        key: "Connection",
                        value: "keep-alive"
                    },
                    {
                        name: "Content-Encoding",
                        key: "Content-Encoding",
                        value: "gzip"
                    },
                    {
                        name: "Content-Length",
                        key: "Content-Length",
                        value: "153"
                    },
                    {
                        name: "Content-Type",
                        key: "Content-Type",
                        value: "application/json; charset=utf-8"
                    },
                    {
                        name: "Date",
                        key: "Date",
                        value: "Sat, 31 Oct 2015 06:43:34 GMT"
                    },
                    {
                        name: "Server",
                        key: "Server",
                        value: "nginx/1.6.2"
                    },
                    {
                        name: "Vary",
                        key: "Vary",
                        value: "X-HTTP-Method-Override, Accept-Encoding"
                    },
                    {
                        name: "X-Powered-By",
                        key: "X-Powered-By",
                        value: "Sails <sailsjs.org>"
                    }
                ],
                cookie: [],
                responseTime: "303",
                body: "{\"access_token\":\"vp7jxTwqgczoFHs0uIdOvv4VdBWmvCkbVbNBCuaTQ3JZplPS40BaNV47HD1zt7MztQPILJvqYsOs6PfJpFYBgwbaE3CVEKOj\",\"token_type\":\"Bearer\"}"
            }
        ]
    },
    v21: {
        _postman_id: "0628a95f-c283-94e2-fa9f-53477775692f",
        name: "OAuth2.0 Get Access Token",
        event: [
            {
                listen: "test",
                script: {
                    type: "text/javascript",
                    exec: [
                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                        "var body = JSON.parse(responseBody);",
                        "tests[\"body has access token\"] = \"access_token\" in body;",
                        "tests[\"body has bearer type\"] = \"token_type\" in body;"
                    ]
                }
            }
        ],
        request: {
            url: {
                raw: 'https://yo.postman.wtf/oauth2/token',
                protocol: 'https',
                host: ['yo', 'postman', 'wtf'],
                path: ['oauth2', 'token']
            },
            method: "POST",
            header: [
                { key: 'A', value: 'B' },
                { key: 'C', value: 'D' },
                { key: 'E', value: 'F', disabled: true }
            ],
            body: {
                mode: "formdata",
                formdata: [
                    {
                        key: "code",
                        value: "xWnkliVQJURqB2x1",
                        type: "text"
                    },
                    {
                        key: "grant_type",
                        value: "authorization_code",
                        type: "text"
                    },
                    {
                        key: "redirect_uri",
                        value: "https://www.getpostman.com/oauth2/callback",
                        type: "text"
                    },
                    {
                        key: "client_id",
                        value: "abc123",
                        type: "text"
                    },
                    {
                        key: "client_secret",
                        value: "ssh-secret",
                        type: "text"
                    }
                ]
            },
            description: "This endpoint is used to get the `access_token`\n\nIt requires the following secret client credentials to be sent as part of the form body along with the `authentication code` obtained as part of the `redirect_uri` from the previous request.\n\n> code: xWnkliVQJURqB2x1\n>\n> grant_type: authorization_code\n>\n> redirect_uri: https://www.getpostman.com/oauth2/callback\n>\n> client_id: abc123\n>\n> client_secret: ssh-secret\n\nIf the correct credentials are not passed, the server returns with a `401 Unauthorized` response."
        },
        response: [
            {
                id: "0716233b-474d-bac7-bf1f-ccb461ecd3b9",
                name: "401",
                originalRequest: {
                    url: {
                        raw: "https://yo.postman.wtf/oauth2/token",
                        protocol: 'https',
                        host: ['yo', 'postman', 'wtf'],
                        path: ['oauth2', 'token']
                    },
                    method: "POST",
                    header: [],
                    body: {
                        mode: "formdata",
                        formdata: [
                            {
                                key: "code",
                                value: "xWnkliVQJURqB2x1",
                                type: "text"
                            },
                            {
                                key: "grant_type",
                                value: "authorization_code",
                                type: "text"
                            },
                            {
                                key: "redirect_uri",
                                value: "https://www.getpostman.com/oauth2/callback",
                                type: "text"
                            },
                            {
                                key: "client_id",
                                value: "abc123",
                                type: "text"
                            },
                            {
                                key: "client_secret",
                                value: "ssh-secret",
                                type: "text"
                            }
                        ]
                    },
                    description: "Tries to get the access token by passing the clientId , clientSecret,\nauthentication code, redirect URI and grant type.\n"
                },
                status: "Unauthorized",
                code: 401,
                _postman_previewlanguage: "javascript",
                _postman_previewtype: "html",
                header: [
                    {
                        name: "Access-Control-Allow-Credentials",
                        key: "Access-Control-Allow-Credentials",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Headers",
                        key: "Access-Control-Allow-Headers",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Methods",
                        key: "Access-Control-Allow-Methods",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Origin",
                        key: "Access-Control-Allow-Origin",
                        value: ""
                    },
                    {
                        name: "Connection",
                        key: "Connection",
                        value: "keep-alive"
                    },
                    {
                        name: "Content-Length",
                        key: "Content-Length",
                        value: "2"
                    },
                    {
                        name: "Content-Type",
                        key: "Content-Type",
                        value: "application/json; charset=utf-8"
                    },
                    {
                        name: "Date",
                        key: "Date",
                        value: "Sat, 31 Oct 2015 06:43:44 GMT"
                    },
                    {
                        name: "Server",
                        key: "Server",
                        value: "nginx/1.6.2"
                    },
                    {
                        name: "Vary",
                        key: "Vary",
                        value: "X-HTTP-Method-Override, Accept-Encoding"
                    },
                    {
                        name: "X-Powered-By",
                        key: "X-Powered-By",
                        value: "Sails <sailsjs.org>"
                    }
                ],
                cookie: [],
                responseTime: "287",
                body: "{}"
            },
            {
                id: "aa6e8983-172d-692b-f8da-a69af6a27371",
                name: "200",
                originalRequest: {
                    url: {
                        raw: "https://yo.postman.wtf/oauth2/token",
                        protocol: 'https',
                        host: ['yo', 'postman', 'wtf'],
                        path: ['oauth2', 'token']
                    },
                    method: "POST",
                    header: [],
                    body: {
                        mode: "formdata",
                        formdata: [
                            {
                                key: "code",
                                value: "xWnkliVQJURqB2x1",
                                type: "text"
                            },
                            {
                                key: "grant_type",
                                value: "authorization_code",
                                type: "text"
                            },
                            {
                                key: "redirect_uri",
                                value: "https://www.getpostman.com/oauth2/callback",
                                type: "text"
                            },
                            {
                                key: "client_id",
                                value: "abc123",
                                type: "text"
                            },
                            {
                                key: "client_secret",
                                value: "ssh-secret",
                                type: "text"
                            }
                        ]
                    },
                    description: "Tries to get the access token by passing the clientId , clientSecret,\nauthentication code, redirect URI and grant type.\n"
                },
                status: "OK",
                code: 200,
                _postman_previewlanguage: "javascript",
                _postman_previewtype: "html",
                header: [
                    {
                        name: "Access-Control-Allow-Credentials",
                        key: "Access-Control-Allow-Credentials",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Headers",
                        key: "Access-Control-Allow-Headers",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Methods",
                        key: "Access-Control-Allow-Methods",
                        value: ""
                    },
                    {
                        name: "Access-Control-Allow-Origin",
                        key: "Access-Control-Allow-Origin",
                        value: ""
                    },
                    {
                        name: "Connection",
                        key: "Connection",
                        value: "keep-alive"
                    },
                    {
                        name: "Content-Encoding",
                        key: "Content-Encoding",
                        value: "gzip"
                    },
                    {
                        name: "Content-Length",
                        key: "Content-Length",
                        value: "153"
                    },
                    {
                        name: "Content-Type",
                        key: "Content-Type",
                        value: "application/json; charset=utf-8"
                    },
                    {
                        name: "Date",
                        key: "Date",
                        value: "Sat, 31 Oct 2015 06:43:34 GMT"
                    },
                    {
                        name: "Server",
                        key: "Server",
                        value: "nginx/1.6.2"
                    },
                    {
                        name: "Vary",
                        key: "Vary",
                        value: "X-HTTP-Method-Override, Accept-Encoding"
                    },
                    {
                        name: "X-Powered-By",
                        key: "X-Powered-By",
                        value: "Sails <sailsjs.org>"
                    }
                ],
                cookie: [],
                responseTime: "303",
                body: "{\"access_token\":\"vp7jxTwqgczoFHs0uIdOvv4VdBWmvCkbVbNBCuaTQ3JZplPS40BaNV47HD1zt7MztQPILJvqYsOs6PfJpFYBgwbaE3CVEKOj\",\"token_type\":\"Bearer\"}"
            }
        ]
    }
};
