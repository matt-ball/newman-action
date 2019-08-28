/* eslint-disable quotes, max-len */

module.exports = {
    v1: {
        id: "03cf74df-32de-af8b-7db8-855b51b05e50",
        name: "Postman Echo (shamasified)",
        description: "Postman Echo is service you can use to test your REST clients and make sample API calls. It provides endpoints for `GET`, `POST`, `PUT`, various auth mechanisms and other utility endpoints.",
        order: [],
        folders: [
            {
                owner: "33232",
                lastUpdatedBy: "33232",
                lastRevision: 75111444,
                id: "ca633394-d946-8e44-f4fe-e0470be8cb64",
                name: "Auth: Digest",
                description: "Digest authentication protects an endpoint with a username and password without actually transmitting the password over network.\nOne has to apply a hash function (like MD5, etc) to the username and password before sending them over the network.\n\n> Username: `postman`\n>\n> Password: `password`\n\nUnlike Basic-Auth, authentication happens using two consecutive requests where the first request returns `401 Unauthorised` along with `WWW-Authenticate` header containing information that needs to be used to authenticate subsequent calls.\n\nTo know more about digest authentication, refer to the [Digest Access Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication) wikipedia article.\nThe article on [authentication helpers](https://www.getpostman.com/docs/helpers#digest-auth) elaborates how to use the same within the Postman app.",
                order: [
                    "a0d5867c-dd87-3f01-9560-8095271e2644",
                    "eecb504e-1736-d34c-990a-b86d36f06ddd"
                ]
            },
            {
                owner: "33232",
                lastUpdatedBy: "61671",
                lastRevision: 90671042,
                id: "b9707261-deb2-7bf3-f1ae-8edd1373f4b8",
                name: "Auth: Others",
                order: [
                    "ef90671a-ab14-16f5-0a57-41b32fc2a36f",
                    "ced12b69-9604-99a9-65e3-03d09f68efbc"
                ]
            },
            {
                owner: "33232",
                lastUpdatedBy: "33232",
                lastRevision: 75569578,
                id: "e3d0c773-6416-3c53-b933-96826acfa85a",
                name: "Cookies",
                description: "The cookie related endpoints allow one to get, set and delete simple cookies.\n\nCookies are small snippets of information that is stored in the browser and sent back to the server with every subsequent requests in order to store useful information between requests.\nIf you want to know more about cookies, read the [HTTP Cookie](https://en.wikipedia.org/wiki/HTTP_cookie) article on wikipedia.",
                order: [
                    "96a24790-4951-ba7e-aa4f-fb40a45a7fcb",
                    "4118ca21-f216-410f-510c-2d0e465022c5",
                    "4ac1e980-6990-fc1d-5f80-4e5cedce9812"
                ]
            },
            {
                owner: "33232",
                lastUpdatedBy: "33232",
                lastRevision: 75211067,
                id: "997e9a45-51e0-98b1-1894-319a72efca57",
                name: "Headers",
                description: "The following set of endpoints allow one to see the headers being sent as part of a request and to get a custom set of headers as part of response.\n\nHTTP header fields provide required information about the request or response, or about the object sent in the message body. Both request headers and response headers can be controlled using these endpoints.",
                order: [
                    "557b9d4d-bc9a-5172-5edf-d43a27055c89",
                    "5ec6f591-4460-e4cf-fdc1-0de07c10b2b1"
                ]
            },
            {
                owner: "33232",
                lastUpdatedBy: "61671",
                lastRevision: 75574910,
                id: "a3729195-78fd-52c3-0313-9aefed8af7eb",
                name: "Request Methods",
                description: "HTTP has multiple request \"verbs\", such as `GET`, `PUT`, `POST`, `DELETE`,\n`PATCH`, `HEAD`, etc. \n\nAn HTTP Method (verb) defines how a request should be interpreted by a server. \nThe endpoints in this section demonstrate various HTTP Verbs. Postman supports \nall the HTTP Verbs, including some rarely used ones, such as `PROPFIND`, `UNLINK`, \netc.\n\nFor details about HTTP Verbs, refer to [RFC 2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9)\n",
                order: [
                    "439a41a1-4bc7-0b90-6cb9-50accfd187ff",
                    "6325e9fd-d3fc-3ea7-d014-f1d41a56177c",
                    "21559428-a25b-cddc-c932-581e483e16e2",
                    "62be870e-f72e-eeeb-2efa-cd27ddae0d34",
                    "b4fcb293-1ef4-35f9-4f82-c4b519a55904"
                ]
            },
            {
                owner: "33232",
                lastUpdatedBy: "33232",
                lastRevision: 75050206,
                id: "3448365f-6534-c34d-14ed-01915810374e",
                name: "Utilities",
                order: [
                    "7212fe16-50d5-3f6d-2513-319d49a9ea44",
                    "9fc9c5d1-51c3-aa36-fdb2-dd4ff7bd5e18",
                    "502f7f5b-b129-78a7-b27f-8dc36ce58f66",
                    "b213d463-8587-8470-acdc-92f7dfb0660e",
                    "eb8e2717-56b0-6a61-5387-eb46530ec4be",
                    "947d31d6-16ce-2e3a-bf32-e0337c838ff8"
                ]
            },
            {
                owner: "33232",
                lastUpdatedBy: "33232",
                lastRevision: 75566609,
                id: "58b0685d-5e5c-d03e-8899-c1084704d0d3",
                name: "[draft] Auth: OAuth2.0",
                description: "OAuth 2.0 allows a client to access a resource owners(user) protected resources without direct access to the users credentials.\nThe client obtains an access token which can be used to access the resource owners resources.\nOAuth 2.0 implements 4 different types of grant flows. Postman Echo has implemented the [Authorization Code](https://tools.ietf.org/html/rfc6749#section-1.3.1) grant flow.\n\nThe OAuth flow typically consists of three steps. \nIn the first step the client requests an authentication code from the server implementing the OAuth flow.\nThe authentication code along with other client credentials is then used to get the access token.\nThe access token can be used by the client to access users resources.\n",
                order: [
                    "d8fbfb17-6993-d43e-43af-2996f5138b9a",
                    "0628a95f-c283-94e2-fa9f-53477775692f",
                    "b94ef436-e62e-bef3-bdbd-69be97d72579"
                ]
            }
        ],
        timestamp: 0,
        owner: "33232",
        remoteLink: "",
        public: false,
        requests: [
            {
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
                headers: "",
                method: "POST",
                pathVariables: {},
                url: "https://echo.getpostman.com/oauth2/token",
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
                            url: "https://echo.getpostman.com/oauth2/token",
                            pathVariables: {},
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
                        requestObject: "{\"name\":\"Access Token\",\"description\":\"Tries to get the access token by passing the clientId , clientSecret,\\nauthentication code, redirect URI and grant type.\\n\",\"url\":\"https://echo.getpostman.com/oauth2/token\",\"pathVariables\":{},\"data\":[{\"key\":\"code\",\"value\":\"xWnkliVQJURqB2x1\",\"type\":\"text\",\"enabled\":true},{\"key\":\"grant_type\",\"value\":\"authorization_code\",\"type\":\"text\",\"enabled\":true},{\"key\":\"redirect_uri\",\"value\":\"https://www.getpostman.com/oauth2/callback\",\"type\":\"text\",\"enabled\":true},{\"key\":\"client_id\",\"value\":\"abc123\",\"type\":\"text\",\"enabled\":true},{\"key\":\"client_secret\",\"value\":\"ssh-secret\",\"type\":\"text\",\"enabled\":true}],\"headers\":\"\",\"dataMode\":\"params\",\"method\":\"POST\",\"tests\":\"tests[\\\"response code is 200\\\"] = responseCode.code === 200;\\nvar body = JSON.parse(responseBody);\\ntests[\\\"body has access token\\\"] = \\\"access_token\\\" in body;\\ntests[\\\"body has bearer type\\\"] = \\\"token_type\\\" in body;\",\"isFromCollection\":true,\"write\":true,\"version\":2}",
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
                            url: "https://echo.getpostman.com/oauth2/token",
                            pathVariables: {},
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
                        requestObject: "{\"name\":\"Access Token\",\"description\":\"Tries to get the access token by passing the clientId , clientSecret,\\nauthentication code, redirect URI and grant type.\\n\",\"url\":\"https://echo.getpostman.com/oauth2/token\",\"pathVariables\":{},\"data\":[{\"key\":\"code\",\"value\":\"xWnkliVQJURqB2x1\",\"type\":\"text\",\"enabled\":true},{\"key\":\"grant_type\",\"value\":\"authorization_code\",\"type\":\"text\",\"enabled\":true},{\"key\":\"redirect_uri\",\"value\":\"https://www.getpostman.com/oauth2/callback\",\"type\":\"text\",\"enabled\":true},{\"key\":\"client_id\",\"value\":\"abc123\",\"type\":\"text\",\"enabled\":true},{\"key\":\"client_secret\",\"value\":\"ssh-secret\",\"type\":\"text\",\"enabled\":true}],\"headers\":\"\",\"dataMode\":\"params\",\"method\":\"POST\",\"tests\":\"tests[\\\"response code is 200\\\"] = responseCode.code === 200;\\nvar body = JSON.parse(responseBody);\\ntests[\\\"body has access token\\\"] = \\\"access_token\\\" in body;\\ntests[\\\"body has bearer type\\\"] = \\\"token_type\\\" in body;\",\"isFromCollection\":true,\"write\":true,\"version\":2}",
                        createdAt: "2015-11-02T13:11:08.000Z",
                        updatedAt: "2015-11-02T18:05:45.000Z",
                        write: true
                    }
                ]
            },
            {
                folder: "a3729195-78fd-52c3-0313-9aefed8af7eb",
                id: "21559428-a25b-cddc-c932-581e483e16e2",
                name: "PUT Request",
                dataMode: "raw",
                data: [],
                descriptionFormat: null,
                description: "The HTTP `PUT` request method is similar to HTTP `POST`. It too is meant to \ntransfer data to a server (and elicit a response). What data is returned depends on the implementation\nof the server.\n\nA `PUT` request can pass parameters to the server using \"Query String \nParameters\", as well as the Request Body. For example, in the following \nraw HTTP request,\n\n> PUT /hi/there?hand=wave\n>\n> <request-body>\n\n\n",
                headers: "",
                method: "PUT",
                pathVariables: {},
                url: "https://echo.getpostman.com/put",
                preRequestScript: "",
                tests: "var data;\n\ntry { responseJSON = JSON.parse(responseBody); }\ncatch (e) {}\n\ntests[\"Body contains files\"] = responseBody.has(\"files\");\ntests[\"Body contains args\"] = responseBody.has(\"args\");\ntests[\"Body contains form\"] = responseBody.has(\"form\");\ntests[\"Body contains headers\"] = responseBody.has(\"headers\");\ntests[\"Body contains url\"] = responseBody.has(\"url\");\n\n\n\ntests[\"Data has been passed\"] = (responseJSON && responseJSON.data && responseJSON.data.length)",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50",
                rawModeData: "Etiam mi lacus, cursus vitae felis et, blandit pellentesque neque. Vestibulum eget nisi a tortor commodo dignissim.\nQuisque ipsum ligula, faucibus a felis a, commodo elementum nisl. Mauris vulputate sapien et tincidunt viverra. Donec vitae velit nec metus."
            },
            {
                folder: "e3d0c773-6416-3c53-b933-96826acfa85a",
                id: "4118ca21-f216-410f-510c-2d0e465022c5",
                name: "Get Cookies",
                rawModeData: null,
                descriptionFormat: null,
                description: "Use this endpoint to get a list of all cookies that are stored with respect to this domain. Whatever key-value pairs that has been previously set by calling the \"Set Cookies\" endpoint, will be returned as response JSON.",
                headers: "",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/cookies",
                preRequestScript: "",
                tests: "tests[\"Status code is 200\"] = responseCode.code === 200;\ntests[\"Body contains cookies\"] = responseBody.has(\"cookies\");\nvar body = JSON.parse(responseBody);\ntests[\"Body contains cookie foo2\"] = 'foo2' in body.cookies;",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50",
                responses: [
                    {
                        owner: "33232",
                        lastUpdatedBy: "33232",
                        lastRevision: 74988989,
                        request: "4118ca21-f216-410f-510c-2d0e465022c5",
                        id: "e1fe98b4-1384-a4bb-efb8-7e6115a173f3",
                        name: "Cookies",
                        status: "",
                        responseCode: {
                            code: 200,
                            name: "OK"
                        },
                        time: "462",
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
                                value: "46"
                            },
                            {
                                name: "Content-Type",
                                key: "Content-Type",
                                value: "application/json; charset=utf-8"
                            },
                            {
                                name: "Date",
                                key: "Date",
                                value: "Thu, 29 Oct 2015 06:16:29 GMT"
                            },
                            {
                                name: "Server",
                                key: "Server",
                                value: "nginx/1.6.2"
                            },
                            {
                                name: "Vary",
                                key: "Vary",
                                value: "Accept-Encoding"
                            },
                            {
                                name: "X-Powered-By",
                                key: "X-Powered-By",
                                value: "Sails <sailsjs.org>"
                            }
                        ],
                        cookies: [],
                        mime: "",
                        text: "{\"cookies\":{\"foo2\":\"bar\"}}",
                        language: "javascript",
                        rawDataType: "text",
                        state: {
                            size: "normal"
                        },
                        previewType: "html",
                        searchResultScrolledTo: "-1",
                        version: null,
                        requestObject: "\"4118ca21-f216-410f-510c-2d0e465022c5\"",
                        createdAt: "2015-11-02T13:11:11.000Z",
                        updatedAt: "2015-11-02T13:48:46.000Z",
                        write: true
                    }
                ]
            },
            {
                folder: "a3729195-78fd-52c3-0313-9aefed8af7eb",
                id: "439a41a1-4bc7-0b90-6cb9-50accfd187ff",
                name: "GET Request ",
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
                description: "The HTTP `GET` request method is meant to retrieve data from a server. The data\nis identified by a unique URI (Uniform Resource Identifier). \n\nA `GET` request can pass parameters to the server using \"Query String \nParameters\". For example, in the following request,\n\n> http://example.com/hi/there?hand=wave\n\nThe parameter \"hand\" has the value \"wave\".\n\nThis endpoint echoes the HTTP headers, request parameters and the complete\nURI requested.",
                headers: "",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/get?test=123",
                preRequestScript: "",
                tests: "tests[\"Body contains headers\"] = responseBody.has(\"headers\");\ntests[\"Body contains args\"] = responseBody.has(\"args\");\ntests[\"Body contains url\"] = responseBody.has(\"url\");\n\nvar data = JSON.parse(responseBody)\n\ntests[\"Args key contains argument passed as url parameter\"] = 'test' in data.args",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50"
            },
            {
                folder: "e3d0c773-6416-3c53-b933-96826acfa85a",
                id: "4ac1e980-6990-fc1d-5f80-4e5cedce9812",
                name: "Delete Cookies",
                rawModeData: null,
                descriptionFormat: null,
                description: "One or more cookies that has been set for this domain can be deleted by providing the cookie names as part of the URL parameter. The response of this request is a JSON containing the list of currently set cookies.",
                headers: "",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/cookies/delete?foo1&foo2",
                preRequestScript: "",
                tests: "tests[\"Status code is 200\"] = responseCode.code === 200;\ntests[\"Body contains key cookies\"] = responseBody.has(\"cookies\");\nvar body = JSON.parse(responseBody);\ntests[\"Body contains cookie foo2\"] = 'foo2' in body.cookies;\ntests[\"Body does not contain cookie foo2\"] = !('foo1' in body.cookies);",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50",
                responses: [
                    {
                        owner: "33232",
                        lastUpdatedBy: "33232",
                        lastRevision: 74988921,
                        request: "4ac1e980-6990-fc1d-5f80-4e5cedce9812",
                        id: "85285106-9936-af7e-064a-201442533a7d",
                        name: "Cookies Response",
                        status: "",
                        responseCode: {
                            code: 200,
                            name: "OK"
                        },
                        time: "1417",
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
                                value: "46"
                            },
                            {
                                name: "Content-Type",
                                key: "Content-Type",
                                value: "application/json; charset=utf-8"
                            },
                            {
                                name: "Date",
                                key: "Date",
                                value: "Thu, 29 Oct 2015 06:16:00 GMT"
                            },
                            {
                                name: "Server",
                                key: "Server",
                                value: "nginx/1.6.2"
                            },
                            {
                                name: "Vary",
                                key: "Vary",
                                value: "Accept-Encoding"
                            },
                            {
                                name: "X-Powered-By",
                                key: "X-Powered-By",
                                value: "Sails <sailsjs.org>"
                            }
                        ],
                        cookies: [],
                        mime: "",
                        text: "{\"cookies\":{\"foo2\":\"bar\"}}",
                        language: "javascript",
                        rawDataType: "text",
                        state: {
                            size: "normal"
                        },
                        previewType: "html",
                        searchResultScrolledTo: "-1",
                        version: null,
                        requestObject: "\"4ac1e980-6990-fc1d-5f80-4e5cedce9812\"",
                        createdAt: "2015-11-02T13:11:10.000Z",
                        updatedAt: "2015-11-02T13:48:42.000Z",
                        write: true
                    }
                ]
            },
            {
                folder: "3448365f-6534-c34d-14ed-01915810374e",
                id: "502f7f5b-b129-78a7-b27f-8dc36ce58f66",
                name: "Delay Response",
                dataMode: "params",
                data: [
                    {
                        key: "test",
                        value: "123",
                        type: "text"
                    }
                ],
                rawModeData: null,
                descriptionFormat: null,
                description: "Using this endpoint one can configure how long it takes for the server to come back with a response. Appending a number to the URL defines the time (in seconds) the server will wait before responding.\n\nNote that a maximum delay of 10 seconds is accepted by the server.",
                headers: "",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/delay/3",
                preRequestScript: "",
                tests: "tests[\"response code is 200\"] = responseCode.code === 200;\n\nvar data = JSON.parse(responseBody);\n\ntests[\"response body has key delay\"] = 'delay' in data;",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50"
            },
            {
                folder: "997e9a45-51e0-98b1-1894-319a72efca57",
                id: "557b9d4d-bc9a-5172-5edf-d43a27055c89",
                name: "Request Headers",
                rawModeData: null,
                descriptionFormat: null,
                description: "A `GET` request to this endpoint returns the list of all request headers as part of the response JSON.\nIn Postman, sending your own set of headers through the [Headers tab](https://www.getpostman.com/docs/requests#headers) will reveal the headers as part of the response.",
                headers: "[object Object]",
                method: "GET",
                pathVariables: [],
                url: "https://echo.getpostman.com/headers",
                preRequestScript: "",
                tests: "tests[\"Body contains headers\"] = responseBody.has(\"headers\");\n\nvar data = JSON.parse(responseBody).headers;\n\ntests[\"Header contains host\"] = \"host\" in data;\ntests[\"Header contains test parameter sent as part of request header\"] = \"my-sample-header\" in data;",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50"
            },
            {
                folder: "997e9a45-51e0-98b1-1894-319a72efca57",
                id: "5ec6f591-4460-e4cf-fdc1-0de07c10b2b1",
                name: "Response Headers",
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
                description: "This endpoint causes the server to send custom set of response headers. Providing header values as part of the URL parameters of a `GET` request to this endpoint returns the same as part of response header.\n\nTo send your own set of headers, simply add or replace the the URL parameters with your own set.",
                headers: "",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/response-headers?Content-Type=text/html&Server=apibin",
                preRequestScript: "",
                tests: "tests[\"Body contains Content-Type\"] = responseBody.has(\"Content-Type\");\ntests[\"Body contains Server\"] = responseBody.has(\"Server\");",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50"
            },
            {
                folder: "a3729195-78fd-52c3-0313-9aefed8af7eb",
                id: "62be870e-f72e-eeeb-2efa-cd27ddae0d34",
                name: "PATCH Request",
                dataMode: "raw",
                data: [],
                descriptionFormat: null,
                description: "The HTTP `PATCH` method is used to update resources on a server. The exact\nuse of `PATCH` requests depends on the server in question. There are a number\nof server implementations which handle `PATCH` differently. Technically, \n`PATCH` supports both Query String parameters and a Request Body.\n\nThis endpoint accepts an HTTP `PATCH` request and provides debug information\nsuch as the HTTP headers, Query String arguments, and the Request Body.",
                headers: "",
                method: "PATCH",
                pathVariables: {},
                url: "https://echo.getpostman.com/patch",
                preRequestScript: "",
                tests: "tests[\"Body contains files\"] = responseBody.has(\"files\");\ntests[\"Body contains args\"] = responseBody.has(\"args\");\ntests[\"Body contains form\"] = responseBody.has(\"form\");\ntests[\"Body contains headers\"] = responseBody.has(\"headers\");\ntests[\"Body contains url\"] = responseBody.has(\"url\");\n\nvar data = JSON.parse(responseBody)\n\ntests[\"form key has data passed in as form-data\"] = 'test' in data.form",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50",
                rawModeData: "Curabitur auctor, elit nec pulvinar porttitor, ex augue condimentum enim, eget suscipit urna felis quis neque.\nSuspendisse sit amet luctus massa, nec venenatis mi. Suspendisse tincidunt massa at nibh efficitur fringilla. Nam quis congue mi. Etiam volutpat."
            },
            {
                folder: "a3729195-78fd-52c3-0313-9aefed8af7eb",
                id: "6325e9fd-d3fc-3ea7-d014-f1d41a56177c",
                name: "POST Request",
                dataMode: "raw",
                data: [],
                descriptionFormat: null,
                description: "The HTTP `POST` request method is meant to transfer data to a server \n(and elicit a response). What data is returned depends on the implementation\nof the server.\n\nA `POST` request can pass parameters to the server using \"Query String \nParameters\", as well as the Request Body. For example, in the following request,\n\n> POST /hi/there?hand=wave\n>\n> <request-body>\n\nThe parameter \"hand\" has the value \"wave\". The request body can be in multiple\nformats. These formats are defined by the MIME type of the request. The MIME \nType can be set using the ``Content-Type`` HTTP header. The most commonly used \nMIME types are:\n\n* `multipart/form-data`\n* `application/x-www-form-urlencoded`\n* `application/json`\n\nThis endpoint echoes the HTTP headers, request parameters, the contents of\nthe request body and the complete URI requested.",
                headers: "Content-Type: text/plain\n",
                method: "POST",
                pathVariables: {},
                url: "https://echo.getpostman.com/post",
                preRequestScript: "",
                tests: "var responseJSON;\n\ntry { responseJSON = JSON.parse(responseBody); }\ncatch (e) { }\n\n\ntests[\"response has data\"] = responseJSON && responseJSON.data && (responseJSON.data.length === 256);\ntests[\"content-type equals text/plain\"] = responseJSON && responseJSON.headers && (responseJSON.headers[\"content-type\"] === 'text/plain');",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50",
                rawModeData: "Duis posuere augue vel cursus pharetra. In luctus a ex nec pretium. Praesent neque quam, tincidunt nec leo eget, rutrum vehicula magna.\nMaecenas consequat elementum elit, id semper sem tristique et. Integer pulvinar enim quis consectetur interdum volutpat."
            },
            {
                folder: "3448365f-6534-c34d-14ed-01915810374e",
                id: "7212fe16-50d5-3f6d-2513-319d49a9ea44",
                name: "Response Status Code",
                dataMode: "params",
                data: [
                    {
                        key: "test",
                        value: "123",
                        type: "text"
                    }
                ],
                rawModeData: null,
                descriptionFormat: null,
                description: "This endpoint allows one to instruct the server which status code to respond with.\n\nEvery response is accompanied by a status code. The status code provides a summary of the nature of response sent by the server. For example, a status code of `200` means everything is okay with the response and a code of `404` implies that the requested URL does not exist on server. \nA list of all valid HTTP status code can be found at the [List of Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) wikipedia article. When using Postman, the response status code is described for easy reference.\n\nNote that if an invalid status code is requested to be sent, the server returns a status code of `400 Bad Request`.",
                headers: "",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/status/200",
                preRequestScript: "",
                tests: "tests[\"Body contains status\"] = responseBody.has(\"status\");\n\nvar data = JSON.parse(responseBody);\n\ntests[\"Status equals 200\"] = data.status === 200;\n",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50"
            },
            {
                folder: "3448365f-6534-c34d-14ed-01915810374e",
                id: "947d31d6-16ce-2e3a-bf32-e0337c838ff8",
                name: "Deflate Compressed Response",
                rawModeData: null,
                descriptionFormat: null,
                description: "This endpoint returns the response using [deflate compression algoritm](https://en.wikipedia.org/wiki/DEFLATE). \nThe uncompressed response is a JSON string containing the details of the request sent by the client. For this endpoint to work, one should request with `Accept-encoding` header containing `deflate` as part of its value. Postman supports gzip, deflate and SDCH decoding and automatically sends them as part of the request.\n\nHTTP Compression allows the server to send responses in a compressed format, which is uncompressed by the client before processing. This reduces network bandwidth consumption at the cost of increase in CPU usage.\nTo know more about this, refer the [HTTP Compression](https://en.wikipedia.org/wiki/HTTP_compression) wikipedia article.",
                headers: "",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/deflate",
                preRequestScript: "",
                tests: "tests[\"response code is 200\"] = responseCode.code === 200;\n\ntry {\n    var data = JSON.parse(responseBody);\n    tests[\"Body contains deflated\"] = responseBody.has(\"deflated\");\n    tests[\"Body contains headers\"] = responseBody.has(\"headers\");\n    tests[\"Body contains method\"] = responseBody.has(\"method\");\n}\ncatch(e) {\n    console.log('Cannot parse response,probably not a JSON');\n}\n",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50"
            },
            {
                folder: "e3d0c773-6416-3c53-b933-96826acfa85a",
                id: "96a24790-4951-ba7e-aa4f-fb40a45a7fcb",
                name: "Set Cookies",
                rawModeData: null,
                descriptionFormat: null,
                description: "The cookie setter endpoint accepts a list of cookies and their values as part of URL parameters of a `GET` request. These cookies are saved and can be subsequently retrieved or deleted. The response of this request returns a JSON with all cookies listed.\n\nTo set your own set of cookies, simply replace the URL parameters \"foo1=bar1&foo2=bar2\" with your own set of key-value pairs.",
                headers: "",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/cookies/set?foo1=bar1&foo2=bar2",
                preRequestScript: "",
                tests: "tests[\"Status code is 200\"] = responseCode.code === 200;\ntests[\"Body contains cookies\"] = responseBody.has(\"cookies\");\nvar body = JSON.parse(responseBody);\ntests[\"Body contains cookie foo1\"] = 'foo1' in body.cookies;\ntests[\"Body contains cookie foo2\"] = 'foo2' in body.cookies;\n\n",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50",
                responses: [
                    {
                        owner: "33232",
                        lastUpdatedBy: "33232",
                        lastRevision: 74988885,
                        request: "96a24790-4951-ba7e-aa4f-fb40a45a7fcb",
                        id: "987189b6-1a24-395b-8e4b-b601a193d13c",
                        name: "Cookies",
                        status: "",
                        responseCode: {
                            code: 200,
                            name: "OK"
                        },
                        time: "3063",
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
                                value: "51"
                            },
                            {
                                name: "Content-Type",
                                key: "Content-Type",
                                value: "application/json; charset=utf-8"
                            },
                            {
                                name: "Date",
                                key: "Date",
                                value: "Thu, 29 Oct 2015 06:15:28 GMT"
                            },
                            {
                                name: "Server",
                                key: "Server",
                                value: "nginx/1.6.2"
                            },
                            {
                                name: "Vary",
                                key: "Vary",
                                value: "Accept-Encoding"
                            },
                            {
                                name: "X-Powered-By",
                                key: "X-Powered-By",
                                value: "Sails <sailsjs.org>"
                            }
                        ],
                        cookies: [],
                        mime: "",
                        text: "{\"cookies\":{\"foo1\":\"bar\",\"foo2\":\"bar\"}}",
                        language: "javascript",
                        rawDataType: "text",
                        state: {
                            size: "normal"
                        },
                        previewType: "html",
                        searchResultScrolledTo: "-1",
                        version: null,
                        requestObject: "\"96a24790-4951-ba7e-aa4f-fb40a45a7fcb\"",
                        createdAt: "2015-11-02T13:11:12.000Z",
                        updatedAt: "2015-11-02T13:48:39.000Z",
                        write: true
                    }
                ]
            },
            {
                folder: "3448365f-6534-c34d-14ed-01915810374e",
                id: "9fc9c5d1-51c3-aa36-fdb2-dd4ff7bd5e18",
                name: "Streamed Response",
                rawModeData: null,
                descriptionFormat: null,
                description: "This endpoint allows one to recieve streaming http response using [chunked transfer encoding](https://en.wikipedia.org/wiki/Chunked_transfer_encoding) of a configurable length.\n\nA streaming response does not wait for the entire response to be generated on server before flushing it out. This implies that for a fairly large response, parts of it can be streamed to the requestee as and when it is generated on server. The client can then take actions of processing this partially received data.",
                headers: "",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/stream/10",
                preRequestScript: "",
                tests: "tests[\"response code is 200\"] = responseCode.code === 200;\n\n",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50"
            },
            {
                folder: "ca633394-d946-8e44-f4fe-e0470be8cb64",
                id: "a0d5867c-dd87-3f01-9560-8095271e2644",
                name: "DigestAuth Request",
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
                description: "Performing a simple `GET` request to this endpoint returns status code `401 Unauthorized` with `WWW-Authenticate` header containing information to successfully authenticate subsequent requests.\nThe `WWW-Authenticate` header must be processed to extract `realm` and `nonce` values to hash subsequent requests.\n\nWhen this request is executed within Postman, the script attached with this request does the hard work of extracting realm and nonce from the header and set it as [global variables](https://www.getpostman.com/docs/environments#global-variables) named `echo_digest_nonce` and `echo_digest_realm`.\nThese variables are re-used in subsequent request for seamless integration of the two requests.",
                headers: "",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/digest-auth",
                preRequestScript: "",
                tests: "tests[\"response code is 401\"] = responseCode.code === 401;\ntests[\"response has WWW-Authenticate header\"] = (postman.getResponseHeader('WWW-Authenticate'));\n\nvar authenticateHeader = postman.getResponseHeader('WWW-Authenticate'),\n    realmStart = authenticateHeader.indexOf('\"',authenticateHeader.indexOf(\"realm\")) + 1 ,\n    realmEnd = authenticateHeader.indexOf('\"',realmStart),\n    realm = authenticateHeader.slice(realmStart,realmEnd),\n    nonceStart = authenticateHeader.indexOf('\"',authenticateHeader.indexOf(\"nonce\")) + 1,\n    nonceEnd = authenticateHeader.indexOf('\"',nonceStart),\n    nonce = authenticateHeader.slice(nonceStart,nonceEnd);\n    \npostman.setGlobalVariable('echo_digest_realm', realm);\npostman.setGlobalVariable('echo_digest_nonce', nonce);",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50"
            },
            {
                folder: "3448365f-6534-c34d-14ed-01915810374e",
                id: "b213d463-8587-8470-acdc-92f7dfb0660e",
                name: "Get UTF8 Encoded Response",
                rawModeData: null,
                descriptionFormat: null,
                description: "If a response of an endpoint requires to send data beyond the basic English / ASCII character set, the `charset` parameter in the `Content-Type` response header defines the character encoding policy.\n\nThis endpoint returns an `UTF8` character encoded response body with text in various languages such as Greek, Latin, East Asian, etc. Postman can interpret the character encoding and use appropriate methods to display the character set in responses.",
                headers: "",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/encoding/utf8",
                preRequestScript: "",
                tests: "tests[\"response code is 200\"] = responseCode.code === 200;",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50"
            },
            {
                folder: "a3729195-78fd-52c3-0313-9aefed8af7eb",
                id: "b4fcb293-1ef4-35f9-4f82-c4b519a55904",
                name: "DELETE Request",
                dataMode: "raw",
                data: [],
                descriptionFormat: null,
                description: "The HTTP `DELETE` method is used to delete resources on a server. The exact\nuse of `DELETE` requests depends on the server implementation. In general, \n`DELETE` requests support both, Query String parameters as well as a Request \nBody.\n\nThis endpoint accepts an HTTP `DELETE` request and provides debug information\nsuch as the HTTP headers, Query String arguments, and the Request Body.",
                headers: "",
                method: "DELETE",
                pathVariables: {},
                url: "https://echo.getpostman.com/delete",
                preRequestScript: "",
                tests: "tests[\"Body contains files\"] = responseBody.has(\"files\");\ntests[\"Body contains args\"] = responseBody.has(\"args\");\ntests[\"Body contains form\"] = responseBody.has(\"form\");\ntests[\"Body contains headers\"] = responseBody.has(\"headers\");\ntests[\"Body contains url\"] = responseBody.has(\"url\");\n\nvar data = JSON.parse(responseBody)\n\ntests[\"form key has data passed in as form-data\"] = 'test' in data.form",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50",
                rawModeData: "Donec fermentum, nisi sed cursus eleifend, nulla tortor ultricies tellus, ut vehicula orci arcu ut velit. In volutpat egestas dapibus. \nMorbi condimentum vestibulum sapien. Etiam dignissim diam quis eros lobortis gravida vel lobortis est. Etiam gravida sed."
            },
            {
                folder: "58b0685d-5e5c-d03e-8899-c1084704d0d3",
                id: "b94ef436-e62e-bef3-bdbd-69be97d72579",
                name: "OAuth2.0 Get Resource",
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
                description: "Once the bearer token has been obtained, it can be passed as `Authorization` header to access user's resources.\n\n> Authorization: Bearer vp7jx...\n\nIf the `Authorization` header is not passed the endpoint returns `401 Unauthorized`.\n",
                headers: "Authorization: Bearer vp7jxTwqgczoFHs0uIdOvv4VdBWmvCkbVbNBCuaTQ3JZplPS40BaNV47HD1zt7MztQPILJvqYsOs6PfJpFYBgwbaE3CVEKOj\n",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/oauth2/user/info",
                preRequestScript: "",
                tests: "tests[\"response code is 401\"] = (responseCode.code === 200);\nvar body = JSON.parse(responseBody);\ntests[\"body has user_id\"] = \"user_id\" in body;\ntests[\"body has name\"] = \"name\" in body;",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50",
                responses: [
                    {
                        owner: "33232",
                        lastUpdatedBy: "33232",
                        lastRevision: 74989098,
                        request: "b94ef436-e62e-bef3-bdbd-69be97d72579",
                        id: "59c43487-94b4-2bcb-7c23-f516759ae799",
                        name: "401",
                        status: "",
                        responseCode: {
                            code: 401,
                            name: "Unauthorized"
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
                                name: "Date",
                                key: "Date",
                                value: "Sat, 31 Oct 2015 06:44:16 GMT"
                            },
                            {
                                name: "Server",
                                key: "Server",
                                value: "nginx/1.6.2"
                            },
                            {
                                name: "WWW-Authenticate",
                                key: "WWW-Authenticate",
                                value: "Bearer realm=\"Users\""
                            },
                            {
                                name: "X-Powered-By",
                                key: "X-Powered-By",
                                value: "Sails <sailsjs.org>"
                            },
                            {
                                name: "transfer-encoding",
                                key: "transfer-encoding",
                                value: "chunked"
                            }
                        ],
                        cookies: [],
                        mime: "",
                        text: "Unauthorized",
                        language: "html",
                        rawDataType: "text",
                        state: {
                            size: "normal"
                        },
                        previewType: "html",
                        searchResultScrolledTo: "-1",
                        version: null,
                        requestObject: "\"b94ef436-e62e-bef3-bdbd-69be97d72579\"",
                        createdAt: "2015-11-02T13:11:09.000Z",
                        updatedAt: "2015-11-02T13:48:57.000Z",
                        write: true
                    },
                    {
                        owner: "33232",
                        lastUpdatedBy: "33232",
                        lastRevision: 74989110,
                        request: "b94ef436-e62e-bef3-bdbd-69be97d72579",
                        id: "7a184607-2299-c702-1860-f00026b41b5f",
                        name: "200",
                        status: "",
                        responseCode: {
                            code: 200,
                            name: "OK"
                        },
                        time: "323",
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
                                value: "50"
                            },
                            {
                                name: "Content-Type",
                                key: "Content-Type",
                                value: "application/json; charset=utf-8"
                            },
                            {
                                name: "Date",
                                key: "Date",
                                value: "Sat, 31 Oct 2015 06:44:49 GMT"
                            },
                            {
                                name: "Server",
                                key: "Server",
                                value: "nginx/1.6.2"
                            },
                            {
                                name: "Vary",
                                key: "Vary",
                                value: "Accept-Encoding"
                            },
                            {
                                name: "X-Powered-By",
                                key: "X-Powered-By",
                                value: "Sails <sailsjs.org>"
                            }
                        ],
                        cookies: [],
                        mime: "",
                        text: "{\"user_id\":1,\"name\":\"postman\"}",
                        language: "javascript",
                        rawDataType: "text",
                        state: {
                            size: "normal"
                        },
                        previewType: "html",
                        searchResultScrolledTo: "-1",
                        version: null,
                        requestObject: "\"b94ef436-e62e-bef3-bdbd-69be97d72579\"",
                        createdAt: "2015-11-02T13:11:09.000Z",
                        updatedAt: "2015-11-02T13:48:58.000Z",
                        write: true
                    }
                ]
            },
            {
                folder: "b9707261-deb2-7bf3-f1ae-8edd1373f4b8",
                id: "ced12b69-9604-99a9-65e3-03d09f68efbc",
                name: "OAuth1.0 Verify Signature",
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
                description: "OAuth1.0a is a specification that defines a protocol that can be used by one\nservice to access \"protected\" resources (endpoints) on another service. A\nmajor part of OAuth1.0 is HTTP Request Signing. This endpoint allows you to \ncheck whether the request calculation works properly in the client. \n\nThe endpoint supports the HTTP ``Authorization`` header. In case the signature\nverification fails, the endpoint provides the four debug values,\n\n* ``base_uri``\n* ``normalized_param_string``\n* ``base_string``\n* ``signing_key``\n\nFor more details about these parameters, check the [OAuth1.0a Specification](http://oauth.net/core/1.0a/)\n\nIn order to use this endpoint, you can set the following values:\n\n> Consumer Key: ``RKCGzna7bv9YD57c``\n>\n> Consumer Secret: ``D+EdQ-gs$-%@2Nu7``\n\nIf you are using Postman, also check the \"Add params to header\" and \n\"Auto add parameters\" boxes.",
                headers: "Authorization: OAuth oauth_consumer_key=\"RKCGzna7bv9YD57c\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1442394747\",oauth_nonce=\"UIGipk\",oauth_version=\"1.0\",oauth_signature=\"CaeyGPr2mns1WCq4Cpm5aLvz6Gs=\"\n",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/oauth1",
                preRequestScript: "",
                tests: "tests[\"response code is 200\"] = responseCode.code === 200;\nvar body = JSON.parse(responseBody);\ntests[\"Body contains status pass\"] = body[\"status\"] == \"pass\"",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50"
            },
            {
                folder: "58b0685d-5e5c-d03e-8899-c1084704d0d3",
                id: "d8fbfb17-6993-d43e-43af-2996f5138b9a",
                name: "OAuth2.0 Get Auth Code",
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
                description: "In the first request for the OAuth 2.0 flow, the client tries to get an authentication code by passing in `client_id` and `response_type`.\n\n> client_id: `abc123`\n>\n> response_type: `code`\n\nThe authentication code is returned as a part of the redirect URI and can be used to get the access token.",
                headers: "",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/oauth2/authtoken?client_id=abc123&response_type=code",
                preRequestScript: "",
                tests: "tests[\"response code is 200\"] = responseCode.code === 200;",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50",
                responses: [
                    {
                        owner: "33232",
                        lastUpdatedBy: "33232",
                        lastRevision: 74989024,
                        request: "d8fbfb17-6993-d43e-43af-2996f5138b9a",
                        id: "a8413763-0cd4-8a55-b20d-35a41574fe9a",
                        name: "401",
                        status: "",
                        responseCode: {
                            code: 401,
                            name: "Unauthorized"
                        },
                        time: "291",
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
                                value: "Sat, 31 Oct 2015 06:43:23 GMT"
                            },
                            {
                                name: "ETag",
                                key: "ETag",
                                value: "W/\"2-2745614147\""
                            },
                            {
                                name: "Server",
                                key: "Server",
                                value: "nginx/1.6.2"
                            },
                            {
                                name: "Vary",
                                key: "Vary",
                                value: "Accept-Encoding"
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
                        requestObject: "\"d8fbfb17-6993-d43e-43af-2996f5138b9a\"",
                        createdAt: "2015-11-02T13:11:11.000Z",
                        updatedAt: "2015-11-02T13:48:49.000Z",
                        write: true
                    }
                ]
            },
            {
                folder: "3448365f-6534-c34d-14ed-01915810374e",
                id: "eb8e2717-56b0-6a61-5387-eb46530ec4be",
                name: "GZip Compressed Response",
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
                description: "This endpoint returns the response using [gzip compression algoritm](https://en.wikipedia.org/wiki/Gzip).\nThe uncompressed response is a JSON string containing the details of the request sent by the client. For this endpoint to work, one should request with `Accept-encoding` header containing `gzip` as part of its value. Postman supports gzip, deflate and SDCH decoding and automatically sends them as part of the request.\n\nHTTP Compression allows the server to send responses in a compressed format, which is uncompressed by the client before processing. This reduces network bandwidth consumption at the cost of increase in CPU usage.\nTo know more about this, refer the [HTTP Compression](https://en.wikipedia.org/wiki/HTTP_compression) wikipedia article.",
                headers: "",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/gzip",
                preRequestScript: "",
                tests: "tests[\"response code is 200\"] = responseCode.code === 200;\n\ntry {\n    var data = JSON.parse(responseBody);\n    tests[\"Body contains gzipped\"] = responseBody.has(\"gzipped\");\n    tests[\"Body contains headers\"] = responseBody.has(\"headers\");\n    tests[\"Body contains method\"] = responseBody.has(\"method\");\n}\ncatch(e) {\n    console.log('Cannot parse response,probably not a JSON');\n}",
                currentHelper: null,
                helperAttributes: null,
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50"
            },
            {
                folder: "ca633394-d946-8e44-f4fe-e0470be8cb64",
                id: "eecb504e-1736-d34c-990a-b86d36f06ddd",
                name: "DigestAuth Success",
                rawModeData: null,
                descriptionFormat: null,
                description: "This endpoint sends a hashed Digest Authorization header to gain access to a valid `200 Ok` response code. In Postman, it uses the stored [global variables](https://www.getpostman.com/docs/environments#gloval-variables), `echo_digest_realm` and `echo_digest_nonce`, to generate the hashed authorisation header.\n\nWithin Postman, for this request to successfully authenticate, running the previous request \"DigestAuth Request\" stores the relevant information within the global variables.",
                headers: "Authorization: Digest username=\"postman\", realm=\"Users\", nonce=\"ni1LiL0O37PRRhofWdCLmwFsnEtH1lew\", uri=\"/digest-auth\", response=\"254679099562cf07df9b6f5d8d15db44\", opaque=\"\"\n",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/digest-auth",
                preRequestScript: "",
                tests: "tests[\"response code is 200\"] = responseCode.code === 200;\ntests[\"body contains authenticated\"] = responseBody.has(\"authenticated\");",
                currentHelper: "digestAuth",
                helperAttributes: {
                    id: "digest",
                    time: 1446551845396,
                    algorithm: "MD5",
                    username: "postman",
                    realm: "{{echo_digest_realm}}",
                    password: "password",
                    nonce: "{{echo_digest_nonce}}",
                    nonceCount: "",
                    clientNonce: "",
                    opaque: "",
                    qop: "",
                    disableRetryRequest: false,
                    saveToRequest: true
                },
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50",
                responses: [
                    {
                        owner: "33232",
                        lastUpdatedBy: "33232",
                        lastRevision: 74989378,
                        request: "eecb504e-1736-d34c-990a-b86d36f06ddd",
                        id: "13fb4261-112d-c199-0a77-3e657047b9ac",
                        name: "200",
                        status: "",
                        responseCode: {
                            code: 200,
                            name: "OK"
                        },
                        time: "9843",
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
                                value: "42"
                            },
                            {
                                name: "Content-Type",
                                key: "Content-Type",
                                value: "application/json; charset=utf-8"
                            },
                            {
                                name: "Date",
                                key: "Date",
                                value: "Thu, 29 Oct 2015 06:17:51 GMT"
                            },
                            {
                                name: "Server",
                                key: "Server",
                                value: "nginx/1.6.2"
                            },
                            {
                                name: "Vary",
                                key: "Vary",
                                value: "Accept-Encoding"
                            },
                            {
                                name: "X-Powered-By",
                                key: "X-Powered-By",
                                value: "Sails <sailsjs.org>"
                            }
                        ],
                        cookies: [],
                        mime: "",
                        text: "{\"authenticated\":true}",
                        language: "javascript",
                        rawDataType: "text",
                        state: {
                            size: "normal"
                        },
                        previewType: "html",
                        searchResultScrolledTo: "-1",
                        version: null,
                        requestObject: "\"eecb504e-1736-d34c-990a-b86d36f06ddd\"",
                        createdAt: "2015-11-02T13:11:09.000Z",
                        updatedAt: "2015-11-02T13:49:19.000Z",
                        write: true
                    }
                ]
            },
            {
                folder: "b9707261-deb2-7bf3-f1ae-8edd1373f4b8",
                id: "ef90671a-ab14-16f5-0a57-41b32fc2a36f",
                name: "Basic Auth",
                rawModeData: null,
                descriptionFormat: null,
                description: "This endpoint simulates a **basic-auth** protected endpoint. \nThe endpoint accepts a default username and password and returns a status code of `200 ok` only if the same is provided. \nOtherwise it will return a status code `401 unauthorized`.\n\n> Username: `postman`\n> \n> Password: `password`\n\nTo use this endpoint, send a request with the header `Authorization: Basic cG9zdG1hbjpwYXNzd29yZA==`. \nThe cryptic latter half of the header value is a base64 encoded concatenation of the default username and password. \nUsing Postman, to send this request, you can simply fill in the username and password in the \"Authorization\" tab and Postman will do the rest for you.\n\nTo know more about basic authentication, refer to the [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) wikipedia article.\nThe article on [authentication helpers](https://www.getpostman.com/docs/helpers#basic-auth) elaborates how to use the same within the Postman app.",
                headers: "Authorization: Basic cG9zdG1hbjpwYXNzd29yZA==\n",
                method: "GET",
                pathVariables: {},
                url: "https://echo.getpostman.com/basic-auth",
                preRequestScript: "",
                tests: "tests[\"response code is 200\"] = responseCode.code === 200;\ntests[\"Body contains authenticated\"] = responseBody.has(\"authenticated\");",
                currentHelper: "basicAuth",
                helperAttributes: {
                    username: "postman",
                    password: "password",
                    saveToRequest: true,
                    id: "basic",
                    timestamp: 1441099408703
                },
                collectionId: "03cf74df-32de-af8b-7db8-855b51b05e50",
                responses: [
                    {
                        owner: "33232",
                        lastUpdatedBy: "33232",
                        lastRevision: 74989338,
                        request: "ef90671a-ab14-16f5-0a57-41b32fc2a36f",
                        id: "42787973-b3b3-4a53-d31a-e59e17f7154e",
                        name: "401",
                        status: "",
                        responseCode: {
                            code: 401,
                            name: "Unauthorized"
                        },
                        time: "276",
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
                                name: "Date",
                                key: "Date",
                                value: "Sat, 31 Oct 2015 06:38:51 GMT"
                            },
                            {
                                name: "Server",
                                key: "Server",
                                value: "nginx/1.6.2"
                            },
                            {
                                name: "WWW-Authenticate",
                                key: "WWW-Authenticate",
                                value: "Basic realm=\"Users\""
                            },
                            {
                                name: "X-Powered-By",
                                key: "X-Powered-By",
                                value: "Sails <sailsjs.org>"
                            },
                            {
                                name: "transfer-encoding",
                                key: "transfer-encoding",
                                value: "chunked"
                            }
                        ],
                        cookies: [],
                        mime: "",
                        text: "Unauthorized",
                        language: "html",
                        rawDataType: "text",
                        state: {
                            size: "normal"
                        },
                        previewType: "html",
                        searchResultScrolledTo: "-1",
                        version: null,
                        requestObject: "\"ef90671a-ab14-16f5-0a57-41b32fc2a36f\"",
                        createdAt: "2015-11-02T13:11:09.000Z",
                        updatedAt: "2015-11-02T13:49:16.000Z",
                        write: true
                    },
                    {
                        owner: "33232",
                        lastUpdatedBy: "33232",
                        lastRevision: 74989356,
                        request: "ef90671a-ab14-16f5-0a57-41b32fc2a36f",
                        id: "821c95e4-e3c3-5906-233d-eab41b095470",
                        name: "200",
                        status: "",
                        responseCode: {
                            code: 200,
                            name: "OK"
                        },
                        time: "377",
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
                                value: "42"
                            },
                            {
                                name: "Content-Type",
                                key: "Content-Type",
                                value: "application/json; charset=utf-8"
                            },
                            {
                                name: "Date",
                                key: "Date",
                                value: "Sat, 31 Oct 2015 06:38:25 GMT"
                            },
                            {
                                name: "Server",
                                key: "Server",
                                value: "nginx/1.6.2"
                            },
                            {
                                name: "Vary",
                                key: "Vary",
                                value: "Accept-Encoding"
                            },
                            {
                                name: "X-Powered-By",
                                key: "X-Powered-By",
                                value: "Sails <sailsjs.org>"
                            }
                        ],
                        cookies: [],
                        mime: "",
                        text: "{\"authenticated\":true}",
                        language: "javascript",
                        rawDataType: "text",
                        state: {
                            size: "normal"
                        },
                        previewType: "html",
                        searchResultScrolledTo: "-1",
                        version: null,
                        requestObject: "\"ef90671a-ab14-16f5-0a57-41b32fc2a36f\"",
                        createdAt: "2015-11-02T13:11:09.000Z",
                        updatedAt: "2015-11-02T13:49:17.000Z",
                        write: true
                    }
                ]
            }
        ]
    },
    v2: {
        info: {
            name: "Postman Echo (shamasified)",
            _postman_id: "03cf74df-32de-af8b-7db8-855b51b05e50",
            description: "Postman Echo is service you can use to test your REST clients and make sample API calls. It provides endpoints for `GET`, `POST`, `PUT`, various auth mechanisms and other utility endpoints.",
            schema: "https://schema.getpostman.com/json/collection/v2.0.0/collection.json"
        },
        item: [
            {
                _postman_id: "ca633394-d946-8e44-f4fe-e0470be8cb64",
                name: "Auth: Digest",
                description: "Digest authentication protects an endpoint with a username and password without actually transmitting the password over network.\nOne has to apply a hash function (like MD5, etc) to the username and password before sending them over the network.\n\n> Username: `postman`\n>\n> Password: `password`\n\nUnlike Basic-Auth, authentication happens using two consecutive requests where the first request returns `401 Unauthorised` along with `WWW-Authenticate` header containing information that needs to be used to authenticate subsequent calls.\n\nTo know more about digest authentication, refer to the [Digest Access Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication) wikipedia article.\nThe article on [authentication helpers](https://www.getpostman.com/docs/helpers#digest-auth) elaborates how to use the same within the Postman app.",
                item: [
                    {
                        _postman_id: "a0d5867c-dd87-3f01-9560-8095271e2644",
                        name: "DigestAuth Request",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 401\"] = responseCode.code === 401;",
                                        "tests[\"response has WWW-Authenticate header\"] = (postman.getResponseHeader('WWW-Authenticate'));",
                                        "",
                                        "var authenticateHeader = postman.getResponseHeader('WWW-Authenticate'),",
                                        "    realmStart = authenticateHeader.indexOf('\"',authenticateHeader.indexOf(\"realm\")) + 1 ,",
                                        "    realmEnd = authenticateHeader.indexOf('\"',realmStart),",
                                        "    realm = authenticateHeader.slice(realmStart,realmEnd),",
                                        "    nonceStart = authenticateHeader.indexOf('\"',authenticateHeader.indexOf(\"nonce\")) + 1,",
                                        "    nonceEnd = authenticateHeader.indexOf('\"',nonceStart),",
                                        "    nonce = authenticateHeader.slice(nonceStart,nonceEnd);",
                                        "    ",
                                        "postman.setGlobalVariable('echo_digest_realm', realm);",
                                        "postman.setGlobalVariable('echo_digest_nonce', nonce);"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/digest-auth",
                            method: "GET",
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
                            description: "Performing a simple `GET` request to this endpoint returns status code `401 Unauthorized` with `WWW-Authenticate` header containing information to successfully authenticate subsequent requests.\nThe `WWW-Authenticate` header must be processed to extract `realm` and `nonce` values to hash subsequent requests.\n\nWhen this request is executed within Postman, the script attached with this request does the hard work of extracting realm and nonce from the header and set it as [global variables](https://www.getpostman.com/docs/environments#global-variables) named `echo_digest_nonce` and `echo_digest_realm`.\nThese variables are re-used in subsequent request for seamless integration of the two requests."
                        },
                        response: []
                    },
                    {
                        _postman_id: "eecb504e-1736-d34c-990a-b86d36f06ddd",
                        name: "DigestAuth Success",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "tests[\"body contains authenticated\"] = responseBody.has(\"authenticated\");"
                                    ]
                                }
                            }
                        ],
                        request: {
                            auth: {
                                type: "digest",
                                digest: {
                                    algorithm: "MD5",
                                    username: "postman",
                                    realm: "{{echo_digest_realm}}",
                                    password: "password",
                                    nonce: "{{echo_digest_nonce}}",
                                    nonceCount: "",
                                    clientNonce: "",
                                    opaque: "",
                                    qop: "",
                                    disableRetryRequest: false
                                }
                            },
                            url: "https://echo.getpostman.com/digest-auth",
                            method: "GET",
                            header: [
                                {
                                    key: "Authorization",
                                    value: "Digest username=\"postman\", realm=\"Users\", nonce=\"ni1LiL0O37PRRhofWdCLmwFsnEtH1lew\", uri=\"/digest-auth\", response=\"254679099562cf07df9b6f5d8d15db44\", opaque=\"\""
                                }
                            ],
                            description: "This endpoint sends a hashed Digest Authorization header to gain access to a valid `200 Ok` response code. In Postman, it uses the stored [global variables](https://www.getpostman.com/docs/environments#gloval-variables), `echo_digest_realm` and `echo_digest_nonce`, to generate the hashed authorisation header.\n\nWithin Postman, for this request to successfully authenticate, running the previous request \"DigestAuth Request\" stores the relevant information within the global variables."
                        },
                        response: [
                            {
                                id: "13fb4261-112d-c199-0a77-3e657047b9ac",
                                name: "200",
                                originalRequest: {
                                    header: []
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
                                        value: "42"
                                    },
                                    {
                                        name: "Content-Type",
                                        key: "Content-Type",
                                        value: "application/json; charset=utf-8"
                                    },
                                    {
                                        name: "Date",
                                        key: "Date",
                                        value: "Thu, 29 Oct 2015 06:17:51 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "9843",
                                body: "{\"authenticated\":true}"
                            }
                        ]
                    }
                ]
            },
            {
                _postman_id: "b9707261-deb2-7bf3-f1ae-8edd1373f4b8",
                name: "Auth: Others",
                item: [
                    {
                        _postman_id: "ef90671a-ab14-16f5-0a57-41b32fc2a36f",
                        name: "Basic Auth",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "tests[\"Body contains authenticated\"] = responseBody.has(\"authenticated\");"
                                    ]
                                }
                            }
                        ],
                        request: {
                            auth: {
                                type: "basic",
                                basic: {
                                    username: "postman",
                                    password: "password",
                                    saveHelperData: true,
                                    showPassword: false
                                }
                            },
                            url: "https://echo.getpostman.com/basic-auth",
                            method: "GET",
                            header: [
                                {
                                    key: "Authorization",
                                    value: "Basic cG9zdG1hbjpwYXNzd29yZA=="
                                }
                            ],
                            description: "This endpoint simulates a **basic-auth** protected endpoint. \nThe endpoint accepts a default username and password and returns a status code of `200 ok` only if the same is provided. \nOtherwise it will return a status code `401 unauthorized`.\n\n> Username: `postman`\n> \n> Password: `password`\n\nTo use this endpoint, send a request with the header `Authorization: Basic cG9zdG1hbjpwYXNzd29yZA==`. \nThe cryptic latter half of the header value is a base64 encoded concatenation of the default username and password. \nUsing Postman, to send this request, you can simply fill in the username and password in the \"Authorization\" tab and Postman will do the rest for you.\n\nTo know more about basic authentication, refer to the [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) wikipedia article.\nThe article on [authentication helpers](https://www.getpostman.com/docs/helpers#basic-auth) elaborates how to use the same within the Postman app."
                        },
                        response: [
                            {
                                id: "42787973-b3b3-4a53-d31a-e59e17f7154e",
                                name: "401",
                                originalRequest: {
                                    header: []
                                },
                                status: "Unauthorized",
                                code: 401,
                                _postman_previewlanguage: "html",
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
                                        name: "Date",
                                        key: "Date",
                                        value: "Sat, 31 Oct 2015 06:38:51 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "WWW-Authenticate",
                                        key: "WWW-Authenticate",
                                        value: "Basic realm=\"Users\""
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    },
                                    {
                                        name: "transfer-encoding",
                                        key: "transfer-encoding",
                                        value: "chunked"
                                    }
                                ],
                                cookie: [],
                                responseTime: "276",
                                body: "Unauthorized"
                            },
                            {
                                id: "821c95e4-e3c3-5906-233d-eab41b095470",
                                name: "200",
                                originalRequest: {
                                    header: []
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
                                        value: "42"
                                    },
                                    {
                                        name: "Content-Type",
                                        key: "Content-Type",
                                        value: "application/json; charset=utf-8"
                                    },
                                    {
                                        name: "Date",
                                        key: "Date",
                                        value: "Sat, 31 Oct 2015 06:38:25 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "377",
                                body: "{\"authenticated\":true}"
                            }
                        ]
                    },
                    {
                        _postman_id: "ced12b69-9604-99a9-65e3-03d09f68efbc",
                        name: "OAuth1.0 Verify Signature",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "var body = JSON.parse(responseBody);",
                                        "tests[\"Body contains status pass\"] = body[\"status\"] == \"pass\""
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/oauth1",
                            method: "GET",
                            header: [
                                {
                                    key: "Authorization",
                                    value: "OAuth oauth_consumer_key=\"RKCGzna7bv9YD57c\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1442394747\",oauth_nonce=\"UIGipk\",oauth_version=\"1.0\",oauth_signature=\"CaeyGPr2mns1WCq4Cpm5aLvz6Gs=\""
                                }
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
                            description: "OAuth1.0a is a specification that defines a protocol that can be used by one\nservice to access \"protected\" resources (endpoints) on another service. A\nmajor part of OAuth1.0 is HTTP Request Signing. This endpoint allows you to \ncheck whether the request calculation works properly in the client. \n\nThe endpoint supports the HTTP ``Authorization`` header. In case the signature\nverification fails, the endpoint provides the four debug values,\n\n* ``base_uri``\n* ``normalized_param_string``\n* ``base_string``\n* ``signing_key``\n\nFor more details about these parameters, check the [OAuth1.0a Specification](http://oauth.net/core/1.0a/)\n\nIn order to use this endpoint, you can set the following values:\n\n> Consumer Key: ``RKCGzna7bv9YD57c``\n>\n> Consumer Secret: ``D+EdQ-gs$-%@2Nu7``\n\nIf you are using Postman, also check the \"Add params to header\" and \n\"Auto add parameters\" boxes."
                        },
                        response: []
                    }
                ]
            },
            {
                _postman_id: "e3d0c773-6416-3c53-b933-96826acfa85a",
                name: "Cookies",
                description: "The cookie related endpoints allow one to get, set and delete simple cookies.\n\nCookies are small snippets of information that is stored in the browser and sent back to the server with every subsequent requests in order to store useful information between requests.\nIf you want to know more about cookies, read the [HTTP Cookie](https://en.wikipedia.org/wiki/HTTP_cookie) article on wikipedia.",
                item: [
                    {
                        _postman_id: "96a24790-4951-ba7e-aa4f-fb40a45a7fcb",
                        name: "Set Cookies",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Status code is 200\"] = responseCode.code === 200;",
                                        "tests[\"Body contains cookies\"] = responseBody.has(\"cookies\");",
                                        "var body = JSON.parse(responseBody);",
                                        "tests[\"Body contains cookie foo1\"] = 'foo1' in body.cookies;",
                                        "tests[\"Body contains cookie foo2\"] = 'foo2' in body.cookies;",
                                        "",
                                        ""
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/cookies/set?foo1=bar1&foo2=bar2",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["cookies", "set"],
                                query: [{ key: "foo1", value: "bar1" }, { key: "foo2", value: "bar2" }]
                            },
                            method: "GET",
                            header: [],
                            description: "The cookie setter endpoint accepts a list of cookies and their values as part of URL parameters of a `GET` request. These cookies are saved and can be subsequently retrieved or deleted. The response of this request returns a JSON with all cookies listed.\n\nTo set your own set of cookies, simply replace the URL parameters \"foo1=bar1&foo2=bar2\" with your own set of key-value pairs."
                        },
                        response: [
                            {
                                id: "987189b6-1a24-395b-8e4b-b601a193d13c",
                                name: "Cookies",
                                originalRequest: {
                                    header: []
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
                                        value: "51"
                                    },
                                    {
                                        name: "Content-Type",
                                        key: "Content-Type",
                                        value: "application/json; charset=utf-8"
                                    },
                                    {
                                        name: "Date",
                                        key: "Date",
                                        value: "Thu, 29 Oct 2015 06:15:28 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "3063",
                                body: "{\"cookies\":{\"foo1\":\"bar\",\"foo2\":\"bar\"}}"
                            }
                        ]
                    },
                    {
                        _postman_id: "4118ca21-f216-410f-510c-2d0e465022c5",
                        name: "Get Cookies",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Status code is 200\"] = responseCode.code === 200;",
                                        "tests[\"Body contains cookies\"] = responseBody.has(\"cookies\");",
                                        "var body = JSON.parse(responseBody);",
                                        "tests[\"Body contains cookie foo2\"] = 'foo2' in body.cookies;"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/cookies",
                            method: "GET",
                            header: [],
                            description: "Use this endpoint to get a list of all cookies that are stored with respect to this domain. Whatever key-value pairs that has been previously set by calling the \"Set Cookies\" endpoint, will be returned as response JSON."
                        },
                        response: [
                            {
                                id: "e1fe98b4-1384-a4bb-efb8-7e6115a173f3",
                                name: "Cookies",
                                originalRequest: {
                                    header: []
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
                                        value: "46"
                                    },
                                    {
                                        name: "Content-Type",
                                        key: "Content-Type",
                                        value: "application/json; charset=utf-8"
                                    },
                                    {
                                        name: "Date",
                                        key: "Date",
                                        value: "Thu, 29 Oct 2015 06:16:29 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "462",
                                body: "{\"cookies\":{\"foo2\":\"bar\"}}"
                            }
                        ]
                    },
                    {
                        _postman_id: "4ac1e980-6990-fc1d-5f80-4e5cedce9812",
                        name: "Delete Cookies",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Status code is 200\"] = responseCode.code === 200;",
                                        "tests[\"Body contains key cookies\"] = responseBody.has(\"cookies\");",
                                        "var body = JSON.parse(responseBody);",
                                        "tests[\"Body contains cookie foo2\"] = 'foo2' in body.cookies;",
                                        "tests[\"Body does not contain cookie foo2\"] = !('foo1' in body.cookies);"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/cookies/delete?foo1&foo2",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["cookies", "delete"],
                                query: [{ key: "foo1", value: null }, { key: "foo2", value: null }]
                            },
                            method: "GET",
                            header: [],
                            description: "One or more cookies that has been set for this domain can be deleted by providing the cookie names as part of the URL parameter. The response of this request is a JSON containing the list of currently set cookies."
                        },
                        response: [
                            {
                                id: "85285106-9936-af7e-064a-201442533a7d",
                                name: "Cookies Response",
                                originalRequest: {
                                    header: []
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
                                        value: "46"
                                    },
                                    {
                                        name: "Content-Type",
                                        key: "Content-Type",
                                        value: "application/json; charset=utf-8"
                                    },
                                    {
                                        name: "Date",
                                        key: "Date",
                                        value: "Thu, 29 Oct 2015 06:16:00 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "1417",
                                body: "{\"cookies\":{\"foo2\":\"bar\"}}"
                            }
                        ]
                    }
                ]
            },
            {
                _postman_id: "997e9a45-51e0-98b1-1894-319a72efca57",
                name: "Headers",
                description: "The following set of endpoints allow one to see the headers being sent as part of a request and to get a custom set of headers as part of response.\n\nHTTP header fields provide required information about the request or response, or about the object sent in the message body. Both request headers and response headers can be controlled using these endpoints.",
                item: [
                    {
                        _postman_id: "557b9d4d-bc9a-5172-5edf-d43a27055c89",
                        name: "Request Headers",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "",
                                        "var data = JSON.parse(responseBody).headers;",
                                        "",
                                        "tests[\"Header contains host\"] = \"host\" in data;",
                                        "tests[\"Header contains test parameter sent as part of request header\"] = \"my-sample-header\" in data;"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/headers",
                            method: "GET",
                            header: [],
                            description: "A `GET` request to this endpoint returns the list of all request headers as part of the response JSON.\nIn Postman, sending your own set of headers through the [Headers tab](https://www.getpostman.com/docs/requests#headers) will reveal the headers as part of the response."
                        },
                        response: []
                    },
                    {
                        _postman_id: "5ec6f591-4460-e4cf-fdc1-0de07c10b2b1",
                        name: "Response Headers",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Body contains Content-Type\"] = responseBody.has(\"Content-Type\");",
                                        "tests[\"Body contains Server\"] = responseBody.has(\"Server\");"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/response-headers?Content-Type=text/html&Server=apibin",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["response-headers"],
                                query: [{ key: "Content-Type", value: "text/html" }, { key: "Server", value: "apibin" }]
                            },
                            method: "GET",
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
                            description: "This endpoint causes the server to send custom set of response headers. Providing header values as part of the URL parameters of a `GET` request to this endpoint returns the same as part of response header.\n\nTo send your own set of headers, simply add or replace the the URL parameters with your own set."
                        },
                        response: []
                    }
                ]
            },
            {
                _postman_id: "a3729195-78fd-52c3-0313-9aefed8af7eb",
                name: "Request Methods",
                description: "HTTP has multiple request \"verbs\", such as `GET`, `PUT`, `POST`, `DELETE`,\n`PATCH`, `HEAD`, etc. \n\nAn HTTP Method (verb) defines how a request should be interpreted by a server. \nThe endpoints in this section demonstrate various HTTP Verbs. Postman supports \nall the HTTP Verbs, including some rarely used ones, such as `PROPFIND`, `UNLINK`, \netc.\n\nFor details about HTTP Verbs, refer to [RFC 2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9)\n",
                item: [
                    {
                        _postman_id: "439a41a1-4bc7-0b90-6cb9-50accfd187ff",
                        name: "GET Request ",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "tests[\"Body contains args\"] = responseBody.has(\"args\");",
                                        "tests[\"Body contains url\"] = responseBody.has(\"url\");",
                                        "",
                                        "var data = JSON.parse(responseBody)",
                                        "",
                                        "tests[\"Args key contains argument passed as url parameter\"] = 'test' in data.args"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/get?test=123",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["get"],
                                query: [{ key: "test", value: "123" }]
                            },
                            method: "GET",
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
                            description: "The HTTP `GET` request method is meant to retrieve data from a server. The data\nis identified by a unique URI (Uniform Resource Identifier). \n\nA `GET` request can pass parameters to the server using \"Query String \nParameters\". For example, in the following request,\n\n> http://example.com/hi/there?hand=wave\n\nThe parameter \"hand\" has the value \"wave\".\n\nThis endpoint echoes the HTTP headers, request parameters and the complete\nURI requested."
                        },
                        response: []
                    },
                    {
                        _postman_id: "6325e9fd-d3fc-3ea7-d014-f1d41a56177c",
                        name: "POST Request",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "var responseJSON;",
                                        "",
                                        "try { responseJSON = JSON.parse(responseBody); }",
                                        "catch (e) { }",
                                        "",
                                        "",
                                        "tests[\"response has data\"] = responseJSON && responseJSON.data && (responseJSON.data.length === 256);",
                                        "tests[\"content-type equals text/plain\"] = responseJSON && responseJSON.headers && (responseJSON.headers[\"content-type\"] === 'text/plain');"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/post",
                            method: "POST",
                            header: [
                                {
                                    key: "Content-Type",
                                    value: "text/plain"
                                }
                            ],
                            body: {
                                mode: "raw",
                                raw: "Duis posuere augue vel cursus pharetra. In luctus a ex nec pretium. Praesent neque quam, tincidunt nec leo eget, rutrum vehicula magna.\nMaecenas consequat elementum elit, id semper sem tristique et. Integer pulvinar enim quis consectetur interdum volutpat."
                            },
                            description: "The HTTP `POST` request method is meant to transfer data to a server \n(and elicit a response). What data is returned depends on the implementation\nof the server.\n\nA `POST` request can pass parameters to the server using \"Query String \nParameters\", as well as the Request Body. For example, in the following request,\n\n> POST /hi/there?hand=wave\n>\n> <request-body>\n\nThe parameter \"hand\" has the value \"wave\". The request body can be in multiple\nformats. These formats are defined by the MIME type of the request. The MIME \nType can be set using the ``Content-Type`` HTTP header. The most commonly used \nMIME types are:\n\n* `multipart/form-data`\n* `application/x-www-form-urlencoded`\n* `application/json`\n\nThis endpoint echoes the HTTP headers, request parameters, the contents of\nthe request body and the complete URI requested."
                        },
                        response: []
                    },
                    {
                        _postman_id: "21559428-a25b-cddc-c932-581e483e16e2",
                        name: "PUT Request",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "var data;",
                                        "",
                                        "try { responseJSON = JSON.parse(responseBody); }",
                                        "catch (e) {}",
                                        "",
                                        "tests[\"Body contains files\"] = responseBody.has(\"files\");",
                                        "tests[\"Body contains args\"] = responseBody.has(\"args\");",
                                        "tests[\"Body contains form\"] = responseBody.has(\"form\");",
                                        "tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "tests[\"Body contains url\"] = responseBody.has(\"url\");",
                                        "",
                                        "",
                                        "",
                                        "tests[\"Data has been passed\"] = (responseJSON && responseJSON.data && responseJSON.data.length)"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/put",
                            method: "PUT",
                            header: [],
                            body: {
                                mode: "raw",
                                raw: "Etiam mi lacus, cursus vitae felis et, blandit pellentesque neque. Vestibulum eget nisi a tortor commodo dignissim.\nQuisque ipsum ligula, faucibus a felis a, commodo elementum nisl. Mauris vulputate sapien et tincidunt viverra. Donec vitae velit nec metus."
                            },
                            description: "The HTTP `PUT` request method is similar to HTTP `POST`. It too is meant to \ntransfer data to a server (and elicit a response). What data is returned depends on the implementation\nof the server.\n\nA `PUT` request can pass parameters to the server using \"Query String \nParameters\", as well as the Request Body. For example, in the following \nraw HTTP request,\n\n> PUT /hi/there?hand=wave\n>\n> <request-body>\n\n\n"
                        },
                        response: []
                    },
                    {
                        _postman_id: "62be870e-f72e-eeeb-2efa-cd27ddae0d34",
                        name: "PATCH Request",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Body contains files\"] = responseBody.has(\"files\");",
                                        "tests[\"Body contains args\"] = responseBody.has(\"args\");",
                                        "tests[\"Body contains form\"] = responseBody.has(\"form\");",
                                        "tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "tests[\"Body contains url\"] = responseBody.has(\"url\");",
                                        "",
                                        "var data = JSON.parse(responseBody)",
                                        "",
                                        "tests[\"form key has data passed in as form-data\"] = 'test' in data.form"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/patch",
                            method: "PATCH",
                            header: [],
                            body: {
                                mode: "raw",
                                raw: "Curabitur auctor, elit nec pulvinar porttitor, ex augue condimentum enim, eget suscipit urna felis quis neque.\nSuspendisse sit amet luctus massa, nec venenatis mi. Suspendisse tincidunt massa at nibh efficitur fringilla. Nam quis congue mi. Etiam volutpat."
                            },
                            description: "The HTTP `PATCH` method is used to update resources on a server. The exact\nuse of `PATCH` requests depends on the server in question. There are a number\nof server implementations which handle `PATCH` differently. Technically, \n`PATCH` supports both Query String parameters and a Request Body.\n\nThis endpoint accepts an HTTP `PATCH` request and provides debug information\nsuch as the HTTP headers, Query String arguments, and the Request Body."
                        },
                        response: []
                    },
                    {
                        _postman_id: "b4fcb293-1ef4-35f9-4f82-c4b519a55904",
                        name: "DELETE Request",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Body contains files\"] = responseBody.has(\"files\");",
                                        "tests[\"Body contains args\"] = responseBody.has(\"args\");",
                                        "tests[\"Body contains form\"] = responseBody.has(\"form\");",
                                        "tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "tests[\"Body contains url\"] = responseBody.has(\"url\");",
                                        "",
                                        "var data = JSON.parse(responseBody)",
                                        "",
                                        "tests[\"form key has data passed in as form-data\"] = 'test' in data.form"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/delete",
                            method: "DELETE",
                            header: [],
                            body: {
                                mode: "raw",
                                raw: "Donec fermentum, nisi sed cursus eleifend, nulla tortor ultricies tellus, ut vehicula orci arcu ut velit. In volutpat egestas dapibus. \nMorbi condimentum vestibulum sapien. Etiam dignissim diam quis eros lobortis gravida vel lobortis est. Etiam gravida sed."
                            },
                            description: "The HTTP `DELETE` method is used to delete resources on a server. The exact\nuse of `DELETE` requests depends on the server implementation. In general, \n`DELETE` requests support both, Query String parameters as well as a Request \nBody.\n\nThis endpoint accepts an HTTP `DELETE` request and provides debug information\nsuch as the HTTP headers, Query String arguments, and the Request Body."
                        },
                        response: []
                    }
                ]
            },
            {
                _postman_id: "3448365f-6534-c34d-14ed-01915810374e",
                name: "Utilities",
                item: [
                    {
                        _postman_id: "7212fe16-50d5-3f6d-2513-319d49a9ea44",
                        name: "Response Status Code",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Body contains status\"] = responseBody.has(\"status\");",
                                        "",
                                        "var data = JSON.parse(responseBody);",
                                        "",
                                        "tests[\"Status equals 200\"] = data.status === 200;",
                                        ""
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/status/200",
                            method: "GET",
                            header: [],
                            body: {
                                mode: "formdata",
                                formdata: [
                                    {
                                        key: "test",
                                        value: "123",
                                        type: "text"
                                    }
                                ]
                            },
                            description: "This endpoint allows one to instruct the server which status code to respond with.\n\nEvery response is accompanied by a status code. The status code provides a summary of the nature of response sent by the server. For example, a status code of `200` means everything is okay with the response and a code of `404` implies that the requested URL does not exist on server. \nA list of all valid HTTP status code can be found at the [List of Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) wikipedia article. When using Postman, the response status code is described for easy reference.\n\nNote that if an invalid status code is requested to be sent, the server returns a status code of `400 Bad Request`."
                        },
                        response: []
                    },
                    {
                        _postman_id: "9fc9c5d1-51c3-aa36-fdb2-dd4ff7bd5e18",
                        name: "Streamed Response",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "",
                                        ""
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/stream/10",
                            method: "GET",
                            header: [],
                            description: "This endpoint allows one to recieve streaming http response using [chunked transfer encoding](https://en.wikipedia.org/wiki/Chunked_transfer_encoding) of a configurable length.\n\nA streaming response does not wait for the entire response to be generated on server before flushing it out. This implies that for a fairly large response, parts of it can be streamed to the requestee as and when it is generated on server. The client can then take actions of processing this partially received data."
                        },
                        response: []
                    },
                    {
                        _postman_id: "502f7f5b-b129-78a7-b27f-8dc36ce58f66",
                        name: "Delay Response",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "",
                                        "var data = JSON.parse(responseBody);",
                                        "",
                                        "tests[\"response body has key delay\"] = 'delay' in data;"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/delay/3",
                            method: "GET",
                            header: [],
                            body: {
                                mode: "formdata",
                                formdata: [
                                    {
                                        key: "test",
                                        value: "123",
                                        type: "text"
                                    }
                                ]
                            },
                            description: "Using this endpoint one can configure how long it takes for the server to come back with a response. Appending a number to the URL defines the time (in seconds) the server will wait before responding.\n\nNote that a maximum delay of 10 seconds is accepted by the server."
                        },
                        response: []
                    },
                    {
                        _postman_id: "b213d463-8587-8470-acdc-92f7dfb0660e",
                        name: "Get UTF8 Encoded Response",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/encoding/utf8",
                            method: "GET",
                            header: [],
                            description: "If a response of an endpoint requires to send data beyond the basic English / ASCII character set, the `charset` parameter in the `Content-Type` response header defines the character encoding policy.\n\nThis endpoint returns an `UTF8` character encoded response body with text in various languages such as Greek, Latin, East Asian, etc. Postman can interpret the character encoding and use appropriate methods to display the character set in responses."
                        },
                        response: []
                    },
                    {
                        _postman_id: "eb8e2717-56b0-6a61-5387-eb46530ec4be",
                        name: "GZip Compressed Response",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "",
                                        "try {",
                                        "    var data = JSON.parse(responseBody);",
                                        "    tests[\"Body contains gzipped\"] = responseBody.has(\"gzipped\");",
                                        "    tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "    tests[\"Body contains method\"] = responseBody.has(\"method\");",
                                        "}",
                                        "catch(e) {",
                                        "    console.log('Cannot parse response,probably not a JSON');",
                                        "}"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/gzip",
                            method: "GET",
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
                            description: "This endpoint returns the response using [gzip compression algoritm](https://en.wikipedia.org/wiki/Gzip).\nThe uncompressed response is a JSON string containing the details of the request sent by the client. For this endpoint to work, one should request with `Accept-encoding` header containing `gzip` as part of its value. Postman supports gzip, deflate and SDCH decoding and automatically sends them as part of the request.\n\nHTTP Compression allows the server to send responses in a compressed format, which is uncompressed by the client before processing. This reduces network bandwidth consumption at the cost of increase in CPU usage.\nTo know more about this, refer the [HTTP Compression](https://en.wikipedia.org/wiki/HTTP_compression) wikipedia article."
                        },
                        response: []
                    },
                    {
                        _postman_id: "947d31d6-16ce-2e3a-bf32-e0337c838ff8",
                        name: "Deflate Compressed Response",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "",
                                        "try {",
                                        "    var data = JSON.parse(responseBody);",
                                        "    tests[\"Body contains deflated\"] = responseBody.has(\"deflated\");",
                                        "    tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "    tests[\"Body contains method\"] = responseBody.has(\"method\");",
                                        "}",
                                        "catch(e) {",
                                        "    console.log('Cannot parse response,probably not a JSON');",
                                        "}",
                                        ""
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/deflate",
                            method: "GET",
                            header: [],
                            description: "This endpoint returns the response using [deflate compression algoritm](https://en.wikipedia.org/wiki/DEFLATE). \nThe uncompressed response is a JSON string containing the details of the request sent by the client. For this endpoint to work, one should request with `Accept-encoding` header containing `deflate` as part of its value. Postman supports gzip, deflate and SDCH decoding and automatically sends them as part of the request.\n\nHTTP Compression allows the server to send responses in a compressed format, which is uncompressed by the client before processing. This reduces network bandwidth consumption at the cost of increase in CPU usage.\nTo know more about this, refer the [HTTP Compression](https://en.wikipedia.org/wiki/HTTP_compression) wikipedia article."
                        },
                        response: []
                    }
                ]
            },
            {
                _postman_id: "58b0685d-5e5c-d03e-8899-c1084704d0d3",
                name: "[draft] Auth: OAuth2.0",
                description: "OAuth 2.0 allows a client to access a resource owners(user) protected resources without direct access to the users credentials.\nThe client obtains an access token which can be used to access the resource owners resources.\nOAuth 2.0 implements 4 different types of grant flows. Postman Echo has implemented the [Authorization Code](https://tools.ietf.org/html/rfc6749#section-1.3.1) grant flow.\n\nThe OAuth flow typically consists of three steps. \nIn the first step the client requests an authentication code from the server implementing the OAuth flow.\nThe authentication code along with other client credentials is then used to get the access token.\nThe access token can be used by the client to access users resources.\n",
                item: [
                    {
                        _postman_id: "d8fbfb17-6993-d43e-43af-2996f5138b9a",
                        name: "OAuth2.0 Get Auth Code",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/oauth2/authtoken?client_id=abc123&response_type=code",
                                protocol: 'https',
                                host: ['echo', 'getpostman', 'com'],
                                path: ['oauth2', 'authtoken'],
                                query: [{ key: 'client_id', value: 'abc123' }, { key: 'response_type', value: 'code' }]
                            },
                            method: "GET",
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
                            description: "In the first request for the OAuth 2.0 flow, the client tries to get an authentication code by passing in `client_id` and `response_type`.\n\n> client_id: `abc123`\n>\n> response_type: `code`\n\nThe authentication code is returned as a part of the redirect URI and can be used to get the access token."
                        },
                        response: [
                            {
                                id: "a8413763-0cd4-8a55-b20d-35a41574fe9a",
                                name: "401",
                                originalRequest: {
                                    header: []
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
                                        value: "Sat, 31 Oct 2015 06:43:23 GMT"
                                    },
                                    {
                                        name: "ETag",
                                        key: "ETag",
                                        value: "W/\"2-2745614147\""
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "291",
                                body: "{}"
                            }
                        ]
                    },
                    {
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
                            url: "https://echo.getpostman.com/oauth2/token",
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
                            description: "This endpoint is used to get the `access_token`\n\nIt requires the following secret client credentials to be sent as part of the form body along with the `authentication code` obtained as part of the `redirect_uri` from the previous request.\n\n> code: xWnkliVQJURqB2x1\n>\n> grant_type: authorization_code\n>\n> redirect_uri: https://www.getpostman.com/oauth2/callback\n>\n> client_id: abc123\n>\n> client_secret: ssh-secret\n\nIf the correct credentials are not passed, the server returns with a `401 Unauthorized` response."
                        },
                        response: [
                            {
                                id: "0716233b-474d-bac7-bf1f-ccb461ecd3b9",
                                name: "401",
                                originalRequest: {
                                    url: "https://echo.getpostman.com/oauth2/token",
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
                                    url: "https://echo.getpostman.com/oauth2/token",
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
                    {
                        _postman_id: "b94ef436-e62e-bef3-bdbd-69be97d72579",
                        name: "OAuth2.0 Get Resource",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 401\"] = (responseCode.code === 200);",
                                        "var body = JSON.parse(responseBody);",
                                        "tests[\"body has user_id\"] = \"user_id\" in body;",
                                        "tests[\"body has name\"] = \"name\" in body;"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: "https://echo.getpostman.com/oauth2/user/info",
                            method: "GET",
                            header: [
                                {
                                    key: "Authorization",
                                    value: "Bearer vp7jxTwqgczoFHs0uIdOvv4VdBWmvCkbVbNBCuaTQ3JZplPS40BaNV47HD1zt7MztQPILJvqYsOs6PfJpFYBgwbaE3CVEKOj"
                                }
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
                            description: "Once the bearer token has been obtained, it can be passed as `Authorization` header to access user's resources.\n\n> Authorization: Bearer vp7jx...\n\nIf the `Authorization` header is not passed the endpoint returns `401 Unauthorized`.\n"
                        },
                        response: [
                            {
                                id: "59c43487-94b4-2bcb-7c23-f516759ae799",
                                name: "401",
                                originalRequest: {
                                    header: []
                                },
                                status: "Unauthorized",
                                code: 401,
                                _postman_previewlanguage: "html",
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
                                        name: "Date",
                                        key: "Date",
                                        value: "Sat, 31 Oct 2015 06:44:16 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "WWW-Authenticate",
                                        key: "WWW-Authenticate",
                                        value: "Bearer realm=\"Users\""
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    },
                                    {
                                        name: "transfer-encoding",
                                        key: "transfer-encoding",
                                        value: "chunked"
                                    }
                                ],
                                cookie: [],
                                responseTime: "303",
                                body: "Unauthorized"
                            },
                            {
                                id: "7a184607-2299-c702-1860-f00026b41b5f",
                                name: "200",
                                originalRequest: {
                                    header: []
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
                                        value: "50"
                                    },
                                    {
                                        name: "Content-Type",
                                        key: "Content-Type",
                                        value: "application/json; charset=utf-8"
                                    },
                                    {
                                        name: "Date",
                                        key: "Date",
                                        value: "Sat, 31 Oct 2015 06:44:49 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "323",
                                body: "{\"user_id\":1,\"name\":\"postman\"}"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    v21: {
        info: {
            name: "Postman Echo (shamasified)",
            _postman_id: "03cf74df-32de-af8b-7db8-855b51b05e50",
            description: "Postman Echo is service you can use to test your REST clients and make sample API calls. It provides endpoints for `GET`, `POST`, `PUT`, various auth mechanisms and other utility endpoints.",
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: [
            {
                _postman_id: "ca633394-d946-8e44-f4fe-e0470be8cb64",
                name: "Auth: Digest",
                description: "Digest authentication protects an endpoint with a username and password without actually transmitting the password over network.\nOne has to apply a hash function (like MD5, etc) to the username and password before sending them over the network.\n\n> Username: `postman`\n>\n> Password: `password`\n\nUnlike Basic-Auth, authentication happens using two consecutive requests where the first request returns `401 Unauthorised` along with `WWW-Authenticate` header containing information that needs to be used to authenticate subsequent calls.\n\nTo know more about digest authentication, refer to the [Digest Access Authentication](https://en.wikipedia.org/wiki/Digest_access_authentication) wikipedia article.\nThe article on [authentication helpers](https://www.getpostman.com/docs/helpers#digest-auth) elaborates how to use the same within the Postman app.",
                item: [
                    {
                        _postman_id: "a0d5867c-dd87-3f01-9560-8095271e2644",
                        name: "DigestAuth Request",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 401\"] = responseCode.code === 401;",
                                        "tests[\"response has WWW-Authenticate header\"] = (postman.getResponseHeader('WWW-Authenticate'));",
                                        "",
                                        "var authenticateHeader = postman.getResponseHeader('WWW-Authenticate'),",
                                        "    realmStart = authenticateHeader.indexOf('\"',authenticateHeader.indexOf(\"realm\")) + 1 ,",
                                        "    realmEnd = authenticateHeader.indexOf('\"',realmStart),",
                                        "    realm = authenticateHeader.slice(realmStart,realmEnd),",
                                        "    nonceStart = authenticateHeader.indexOf('\"',authenticateHeader.indexOf(\"nonce\")) + 1,",
                                        "    nonceEnd = authenticateHeader.indexOf('\"',nonceStart),",
                                        "    nonce = authenticateHeader.slice(nonceStart,nonceEnd);",
                                        "    ",
                                        "postman.setGlobalVariable('echo_digest_realm', realm);",
                                        "postman.setGlobalVariable('echo_digest_nonce', nonce);"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/digest-auth",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["digest-auth"]
                            },
                            method: "GET",
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
                            description: "Performing a simple `GET` request to this endpoint returns status code `401 Unauthorized` with `WWW-Authenticate` header containing information to successfully authenticate subsequent requests.\nThe `WWW-Authenticate` header must be processed to extract `realm` and `nonce` values to hash subsequent requests.\n\nWhen this request is executed within Postman, the script attached with this request does the hard work of extracting realm and nonce from the header and set it as [global variables](https://www.getpostman.com/docs/environments#global-variables) named `echo_digest_nonce` and `echo_digest_realm`.\nThese variables are re-used in subsequent request for seamless integration of the two requests."
                        },
                        response: []
                    },
                    {
                        _postman_id: "eecb504e-1736-d34c-990a-b86d36f06ddd",
                        name: "DigestAuth Success",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "tests[\"body contains authenticated\"] = responseBody.has(\"authenticated\");"
                                    ]
                                }
                            }
                        ],
                        request: {
                            auth: {
                                type: "digest",
                                digest: [
                                    { key: 'algorithm', value: 'MD5', type: 'string' },
                                    { key: 'username', value: 'postman', type: 'string' },
                                    { key: 'realm', value: '{{echo_digest_realm}}', type: 'string' },
                                    { key: 'password', value: 'password', type: 'string' },
                                    { key: 'nonce', value: '{{echo_digest_nonce}}', type: 'string' },
                                    { key: 'nonceCount', value: '', type: 'string' },
                                    { key: 'clientNonce', value: '', type: 'string' },
                                    { key: 'opaque', value: '', type: 'string' },
                                    { key: 'qop', value: '', type: 'string' },
                                    { key: 'disableRetryRequest', value: false, type: 'boolean' }
                                ]
                            },
                            url: {
                                raw: "https://echo.getpostman.com/digest-auth",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["digest-auth"]
                            },
                            method: "GET",
                            header: [
                                {
                                    key: "Authorization",
                                    value: "Digest username=\"postman\", realm=\"Users\", nonce=\"ni1LiL0O37PRRhofWdCLmwFsnEtH1lew\", uri=\"/digest-auth\", response=\"254679099562cf07df9b6f5d8d15db44\", opaque=\"\""
                                }
                            ],
                            description: "This endpoint sends a hashed Digest Authorization header to gain access to a valid `200 Ok` response code. In Postman, it uses the stored [global variables](https://www.getpostman.com/docs/environments#gloval-variables), `echo_digest_realm` and `echo_digest_nonce`, to generate the hashed authorisation header.\n\nWithin Postman, for this request to successfully authenticate, running the previous request \"DigestAuth Request\" stores the relevant information within the global variables."
                        },
                        response: [
                            {
                                id: "13fb4261-112d-c199-0a77-3e657047b9ac",
                                name: "200",
                                originalRequest: {
                                    header: []
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
                                        value: "42"
                                    },
                                    {
                                        name: "Content-Type",
                                        key: "Content-Type",
                                        value: "application/json; charset=utf-8"
                                    },
                                    {
                                        name: "Date",
                                        key: "Date",
                                        value: "Thu, 29 Oct 2015 06:17:51 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "9843",
                                body: "{\"authenticated\":true}"
                            }
                        ]
                    }
                ]
            },
            {
                _postman_id: "b9707261-deb2-7bf3-f1ae-8edd1373f4b8",
                name: "Auth: Others",
                item: [
                    {
                        _postman_id: "ef90671a-ab14-16f5-0a57-41b32fc2a36f",
                        name: "Basic Auth",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "tests[\"Body contains authenticated\"] = responseBody.has(\"authenticated\");"
                                    ]
                                }
                            }
                        ],
                        request: {
                            auth: {
                                type: "basic",
                                basic: [
                                    { key: 'username', value: 'postman', type: 'string' },
                                    { key: 'password', value: 'password', type: 'string' },
                                    { key: 'saveHelperData', value: true, type: 'boolean' },
                                    { key: 'showPassword', value: false, type: 'boolean' }
                                ]
                            },
                            url: {
                                raw: "https://echo.getpostman.com/basic-auth",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["basic-auth"]
                            },
                            method: "GET",
                            header: [
                                {
                                    key: "Authorization",
                                    value: "Basic cG9zdG1hbjpwYXNzd29yZA=="
                                }
                            ],
                            description: "This endpoint simulates a **basic-auth** protected endpoint. \nThe endpoint accepts a default username and password and returns a status code of `200 ok` only if the same is provided. \nOtherwise it will return a status code `401 unauthorized`.\n\n> Username: `postman`\n> \n> Password: `password`\n\nTo use this endpoint, send a request with the header `Authorization: Basic cG9zdG1hbjpwYXNzd29yZA==`. \nThe cryptic latter half of the header value is a base64 encoded concatenation of the default username and password. \nUsing Postman, to send this request, you can simply fill in the username and password in the \"Authorization\" tab and Postman will do the rest for you.\n\nTo know more about basic authentication, refer to the [Basic Access Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) wikipedia article.\nThe article on [authentication helpers](https://www.getpostman.com/docs/helpers#basic-auth) elaborates how to use the same within the Postman app."
                        },
                        response: [
                            {
                                id: "42787973-b3b3-4a53-d31a-e59e17f7154e",
                                name: "401",
                                originalRequest: {
                                    header: []
                                },
                                status: "Unauthorized",
                                code: 401,
                                _postman_previewlanguage: "html",
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
                                        name: "Date",
                                        key: "Date",
                                        value: "Sat, 31 Oct 2015 06:38:51 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "WWW-Authenticate",
                                        key: "WWW-Authenticate",
                                        value: "Basic realm=\"Users\""
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    },
                                    {
                                        name: "transfer-encoding",
                                        key: "transfer-encoding",
                                        value: "chunked"
                                    }
                                ],
                                cookie: [],
                                responseTime: "276",
                                body: "Unauthorized"
                            },
                            {
                                id: "821c95e4-e3c3-5906-233d-eab41b095470",
                                name: "200",
                                originalRequest: {
                                    header: []
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
                                        value: "42"
                                    },
                                    {
                                        name: "Content-Type",
                                        key: "Content-Type",
                                        value: "application/json; charset=utf-8"
                                    },
                                    {
                                        name: "Date",
                                        key: "Date",
                                        value: "Sat, 31 Oct 2015 06:38:25 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "377",
                                body: "{\"authenticated\":true}"
                            }
                        ]
                    },
                    {
                        _postman_id: "ced12b69-9604-99a9-65e3-03d09f68efbc",
                        name: "OAuth1.0 Verify Signature",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "var body = JSON.parse(responseBody);",
                                        "tests[\"Body contains status pass\"] = body[\"status\"] == \"pass\""
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/oauth1",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["oauth1"]
                            },
                            method: "GET",
                            header: [
                                {
                                    key: "Authorization",
                                    value: "OAuth oauth_consumer_key=\"RKCGzna7bv9YD57c\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1442394747\",oauth_nonce=\"UIGipk\",oauth_version=\"1.0\",oauth_signature=\"CaeyGPr2mns1WCq4Cpm5aLvz6Gs=\""
                                }
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
                            description: "OAuth1.0a is a specification that defines a protocol that can be used by one\nservice to access \"protected\" resources (endpoints) on another service. A\nmajor part of OAuth1.0 is HTTP Request Signing. This endpoint allows you to \ncheck whether the request calculation works properly in the client. \n\nThe endpoint supports the HTTP ``Authorization`` header. In case the signature\nverification fails, the endpoint provides the four debug values,\n\n* ``base_uri``\n* ``normalized_param_string``\n* ``base_string``\n* ``signing_key``\n\nFor more details about these parameters, check the [OAuth1.0a Specification](http://oauth.net/core/1.0a/)\n\nIn order to use this endpoint, you can set the following values:\n\n> Consumer Key: ``RKCGzna7bv9YD57c``\n>\n> Consumer Secret: ``D+EdQ-gs$-%@2Nu7``\n\nIf you are using Postman, also check the \"Add params to header\" and \n\"Auto add parameters\" boxes."
                        },
                        response: []
                    }
                ]
            },
            {
                _postman_id: "e3d0c773-6416-3c53-b933-96826acfa85a",
                name: "Cookies",
                description: "The cookie related endpoints allow one to get, set and delete simple cookies.\n\nCookies are small snippets of information that is stored in the browser and sent back to the server with every subsequent requests in order to store useful information between requests.\nIf you want to know more about cookies, read the [HTTP Cookie](https://en.wikipedia.org/wiki/HTTP_cookie) article on wikipedia.",
                item: [
                    {
                        _postman_id: "96a24790-4951-ba7e-aa4f-fb40a45a7fcb",
                        name: "Set Cookies",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Status code is 200\"] = responseCode.code === 200;",
                                        "tests[\"Body contains cookies\"] = responseBody.has(\"cookies\");",
                                        "var body = JSON.parse(responseBody);",
                                        "tests[\"Body contains cookie foo1\"] = 'foo1' in body.cookies;",
                                        "tests[\"Body contains cookie foo2\"] = 'foo2' in body.cookies;",
                                        "",
                                        ""
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/cookies/set?foo1=bar1&foo2=bar2",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["cookies", "set"],
                                query: [{ key: "foo1", value: "bar1" }, { key: "foo2", value: "bar2" }]
                            },
                            method: "GET",
                            header: [],
                            description: "The cookie setter endpoint accepts a list of cookies and their values as part of URL parameters of a `GET` request. These cookies are saved and can be subsequently retrieved or deleted. The response of this request returns a JSON with all cookies listed.\n\nTo set your own set of cookies, simply replace the URL parameters \"foo1=bar1&foo2=bar2\" with your own set of key-value pairs."
                        },
                        response: [
                            {
                                id: "987189b6-1a24-395b-8e4b-b601a193d13c",
                                name: "Cookies",
                                originalRequest: {
                                    header: []
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
                                        value: "51"
                                    },
                                    {
                                        name: "Content-Type",
                                        key: "Content-Type",
                                        value: "application/json; charset=utf-8"
                                    },
                                    {
                                        name: "Date",
                                        key: "Date",
                                        value: "Thu, 29 Oct 2015 06:15:28 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "3063",
                                body: "{\"cookies\":{\"foo1\":\"bar\",\"foo2\":\"bar\"}}"
                            }
                        ]
                    },
                    {
                        _postman_id: "4118ca21-f216-410f-510c-2d0e465022c5",
                        name: "Get Cookies",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Status code is 200\"] = responseCode.code === 200;",
                                        "tests[\"Body contains cookies\"] = responseBody.has(\"cookies\");",
                                        "var body = JSON.parse(responseBody);",
                                        "tests[\"Body contains cookie foo2\"] = 'foo2' in body.cookies;"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/cookies",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["cookies"]
                            },
                            method: "GET",
                            header: [],
                            description: "Use this endpoint to get a list of all cookies that are stored with respect to this domain. Whatever key-value pairs that has been previously set by calling the \"Set Cookies\" endpoint, will be returned as response JSON."
                        },
                        response: [
                            {
                                id: "e1fe98b4-1384-a4bb-efb8-7e6115a173f3",
                                name: "Cookies",
                                originalRequest: {
                                    header: []
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
                                        value: "46"
                                    },
                                    {
                                        name: "Content-Type",
                                        key: "Content-Type",
                                        value: "application/json; charset=utf-8"
                                    },
                                    {
                                        name: "Date",
                                        key: "Date",
                                        value: "Thu, 29 Oct 2015 06:16:29 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "462",
                                body: "{\"cookies\":{\"foo2\":\"bar\"}}"
                            }
                        ]
                    },
                    {
                        _postman_id: "4ac1e980-6990-fc1d-5f80-4e5cedce9812",
                        name: "Delete Cookies",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Status code is 200\"] = responseCode.code === 200;",
                                        "tests[\"Body contains key cookies\"] = responseBody.has(\"cookies\");",
                                        "var body = JSON.parse(responseBody);",
                                        "tests[\"Body contains cookie foo2\"] = 'foo2' in body.cookies;",
                                        "tests[\"Body does not contain cookie foo2\"] = !('foo1' in body.cookies);"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/cookies/delete?foo1&foo2",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["cookies", "delete"],
                                query: [{ key: "foo1", value: null }, { key: "foo2", value: null }]
                            },
                            method: "GET",
                            header: [],
                            description: "One or more cookies that has been set for this domain can be deleted by providing the cookie names as part of the URL parameter. The response of this request is a JSON containing the list of currently set cookies."
                        },
                        response: [
                            {
                                id: "85285106-9936-af7e-064a-201442533a7d",
                                name: "Cookies Response",
                                originalRequest: {
                                    header: []
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
                                        value: "46"
                                    },
                                    {
                                        name: "Content-Type",
                                        key: "Content-Type",
                                        value: "application/json; charset=utf-8"
                                    },
                                    {
                                        name: "Date",
                                        key: "Date",
                                        value: "Thu, 29 Oct 2015 06:16:00 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "1417",
                                body: "{\"cookies\":{\"foo2\":\"bar\"}}"
                            }
                        ]
                    }
                ]
            },
            {
                _postman_id: "997e9a45-51e0-98b1-1894-319a72efca57",
                name: "Headers",
                description: "The following set of endpoints allow one to see the headers being sent as part of a request and to get a custom set of headers as part of response.\n\nHTTP header fields provide required information about the request or response, or about the object sent in the message body. Both request headers and response headers can be controlled using these endpoints.",
                item: [
                    {
                        _postman_id: "557b9d4d-bc9a-5172-5edf-d43a27055c89",
                        name: "Request Headers",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "",
                                        "var data = JSON.parse(responseBody).headers;",
                                        "",
                                        "tests[\"Header contains host\"] = \"host\" in data;",
                                        "tests[\"Header contains test parameter sent as part of request header\"] = \"my-sample-header\" in data;"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/headers",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["headers"]
                            },
                            method: "GET",
                            header: [],
                            description: "A `GET` request to this endpoint returns the list of all request headers as part of the response JSON.\nIn Postman, sending your own set of headers through the [Headers tab](https://www.getpostman.com/docs/requests#headers) will reveal the headers as part of the response."
                        },
                        response: []
                    },
                    {
                        _postman_id: "5ec6f591-4460-e4cf-fdc1-0de07c10b2b1",
                        name: "Response Headers",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Body contains Content-Type\"] = responseBody.has(\"Content-Type\");",
                                        "tests[\"Body contains Server\"] = responseBody.has(\"Server\");"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/response-headers?Content-Type=text/html&Server=apibin",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["response-headers"],
                                query: [{ key: "Content-Type", value: "text/html" }, { key: "Server", value: "apibin" }]
                            },
                            method: "GET",
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
                            description: "This endpoint causes the server to send custom set of response headers. Providing header values as part of the URL parameters of a `GET` request to this endpoint returns the same as part of response header.\n\nTo send your own set of headers, simply add or replace the the URL parameters with your own set."
                        },
                        response: []
                    }
                ]
            },
            {
                _postman_id: "a3729195-78fd-52c3-0313-9aefed8af7eb",
                name: "Request Methods",
                description: "HTTP has multiple request \"verbs\", such as `GET`, `PUT`, `POST`, `DELETE`,\n`PATCH`, `HEAD`, etc. \n\nAn HTTP Method (verb) defines how a request should be interpreted by a server. \nThe endpoints in this section demonstrate various HTTP Verbs. Postman supports \nall the HTTP Verbs, including some rarely used ones, such as `PROPFIND`, `UNLINK`, \netc.\n\nFor details about HTTP Verbs, refer to [RFC 2616](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9)\n",
                item: [
                    {
                        _postman_id: "439a41a1-4bc7-0b90-6cb9-50accfd187ff",
                        name: "GET Request ",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "tests[\"Body contains args\"] = responseBody.has(\"args\");",
                                        "tests[\"Body contains url\"] = responseBody.has(\"url\");",
                                        "",
                                        "var data = JSON.parse(responseBody)",
                                        "",
                                        "tests[\"Args key contains argument passed as url parameter\"] = 'test' in data.args"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/get?test=123",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["get"],
                                query: [{ key: "test", value: "123" }]
                            },
                            method: "GET",
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
                            description: "The HTTP `GET` request method is meant to retrieve data from a server. The data\nis identified by a unique URI (Uniform Resource Identifier). \n\nA `GET` request can pass parameters to the server using \"Query String \nParameters\". For example, in the following request,\n\n> http://example.com/hi/there?hand=wave\n\nThe parameter \"hand\" has the value \"wave\".\n\nThis endpoint echoes the HTTP headers, request parameters and the complete\nURI requested."
                        },
                        response: []
                    },
                    {
                        _postman_id: "6325e9fd-d3fc-3ea7-d014-f1d41a56177c",
                        name: "POST Request",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "var responseJSON;",
                                        "",
                                        "try { responseJSON = JSON.parse(responseBody); }",
                                        "catch (e) { }",
                                        "",
                                        "",
                                        "tests[\"response has data\"] = responseJSON && responseJSON.data && (responseJSON.data.length === 256);",
                                        "tests[\"content-type equals text/plain\"] = responseJSON && responseJSON.headers && (responseJSON.headers[\"content-type\"] === 'text/plain');"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/post",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["post"]
                            },
                            method: "POST",
                            header: [
                                {
                                    key: "Content-Type",
                                    value: "text/plain"
                                }
                            ],
                            body: {
                                mode: "raw",
                                raw: "Duis posuere augue vel cursus pharetra. In luctus a ex nec pretium. Praesent neque quam, tincidunt nec leo eget, rutrum vehicula magna.\nMaecenas consequat elementum elit, id semper sem tristique et. Integer pulvinar enim quis consectetur interdum volutpat."
                            },
                            description: "The HTTP `POST` request method is meant to transfer data to a server \n(and elicit a response). What data is returned depends on the implementation\nof the server.\n\nA `POST` request can pass parameters to the server using \"Query String \nParameters\", as well as the Request Body. For example, in the following request,\n\n> POST /hi/there?hand=wave\n>\n> <request-body>\n\nThe parameter \"hand\" has the value \"wave\". The request body can be in multiple\nformats. These formats are defined by the MIME type of the request. The MIME \nType can be set using the ``Content-Type`` HTTP header. The most commonly used \nMIME types are:\n\n* `multipart/form-data`\n* `application/x-www-form-urlencoded`\n* `application/json`\n\nThis endpoint echoes the HTTP headers, request parameters, the contents of\nthe request body and the complete URI requested."
                        },
                        response: []
                    },
                    {
                        _postman_id: "21559428-a25b-cddc-c932-581e483e16e2",
                        name: "PUT Request",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "var data;",
                                        "",
                                        "try { responseJSON = JSON.parse(responseBody); }",
                                        "catch (e) {}",
                                        "",
                                        "tests[\"Body contains files\"] = responseBody.has(\"files\");",
                                        "tests[\"Body contains args\"] = responseBody.has(\"args\");",
                                        "tests[\"Body contains form\"] = responseBody.has(\"form\");",
                                        "tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "tests[\"Body contains url\"] = responseBody.has(\"url\");",
                                        "",
                                        "",
                                        "",
                                        "tests[\"Data has been passed\"] = (responseJSON && responseJSON.data && responseJSON.data.length)"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/put",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["put"]
                            },
                            method: "PUT",
                            header: [],
                            body: {
                                mode: "raw",
                                raw: "Etiam mi lacus, cursus vitae felis et, blandit pellentesque neque. Vestibulum eget nisi a tortor commodo dignissim.\nQuisque ipsum ligula, faucibus a felis a, commodo elementum nisl. Mauris vulputate sapien et tincidunt viverra. Donec vitae velit nec metus."
                            },
                            description: "The HTTP `PUT` request method is similar to HTTP `POST`. It too is meant to \ntransfer data to a server (and elicit a response). What data is returned depends on the implementation\nof the server.\n\nA `PUT` request can pass parameters to the server using \"Query String \nParameters\", as well as the Request Body. For example, in the following \nraw HTTP request,\n\n> PUT /hi/there?hand=wave\n>\n> <request-body>\n\n\n"
                        },
                        response: []
                    },
                    {
                        _postman_id: "62be870e-f72e-eeeb-2efa-cd27ddae0d34",
                        name: "PATCH Request",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Body contains files\"] = responseBody.has(\"files\");",
                                        "tests[\"Body contains args\"] = responseBody.has(\"args\");",
                                        "tests[\"Body contains form\"] = responseBody.has(\"form\");",
                                        "tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "tests[\"Body contains url\"] = responseBody.has(\"url\");",
                                        "",
                                        "var data = JSON.parse(responseBody)",
                                        "",
                                        "tests[\"form key has data passed in as form-data\"] = 'test' in data.form"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/patch",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["patch"]
                            },
                            method: "PATCH",
                            header: [],
                            body: {
                                mode: "raw",
                                raw: "Curabitur auctor, elit nec pulvinar porttitor, ex augue condimentum enim, eget suscipit urna felis quis neque.\nSuspendisse sit amet luctus massa, nec venenatis mi. Suspendisse tincidunt massa at nibh efficitur fringilla. Nam quis congue mi. Etiam volutpat."
                            },
                            description: "The HTTP `PATCH` method is used to update resources on a server. The exact\nuse of `PATCH` requests depends on the server in question. There are a number\nof server implementations which handle `PATCH` differently. Technically, \n`PATCH` supports both Query String parameters and a Request Body.\n\nThis endpoint accepts an HTTP `PATCH` request and provides debug information\nsuch as the HTTP headers, Query String arguments, and the Request Body."
                        },
                        response: []
                    },
                    {
                        _postman_id: "b4fcb293-1ef4-35f9-4f82-c4b519a55904",
                        name: "DELETE Request",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Body contains files\"] = responseBody.has(\"files\");",
                                        "tests[\"Body contains args\"] = responseBody.has(\"args\");",
                                        "tests[\"Body contains form\"] = responseBody.has(\"form\");",
                                        "tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "tests[\"Body contains url\"] = responseBody.has(\"url\");",
                                        "",
                                        "var data = JSON.parse(responseBody)",
                                        "",
                                        "tests[\"form key has data passed in as form-data\"] = 'test' in data.form"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/delete",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["delete"]
                            },
                            method: "DELETE",
                            header: [],
                            body: {
                                mode: "raw",
                                raw: "Donec fermentum, nisi sed cursus eleifend, nulla tortor ultricies tellus, ut vehicula orci arcu ut velit. In volutpat egestas dapibus. \nMorbi condimentum vestibulum sapien. Etiam dignissim diam quis eros lobortis gravida vel lobortis est. Etiam gravida sed."
                            },
                            description: "The HTTP `DELETE` method is used to delete resources on a server. The exact\nuse of `DELETE` requests depends on the server implementation. In general, \n`DELETE` requests support both, Query String parameters as well as a Request \nBody.\n\nThis endpoint accepts an HTTP `DELETE` request and provides debug information\nsuch as the HTTP headers, Query String arguments, and the Request Body."
                        },
                        response: []
                    }
                ]
            },
            {
                _postman_id: "3448365f-6534-c34d-14ed-01915810374e",
                name: "Utilities",
                item: [
                    {
                        _postman_id: "7212fe16-50d5-3f6d-2513-319d49a9ea44",
                        name: "Response Status Code",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"Body contains status\"] = responseBody.has(\"status\");",
                                        "",
                                        "var data = JSON.parse(responseBody);",
                                        "",
                                        "tests[\"Status equals 200\"] = data.status === 200;",
                                        ""
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/status/200",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["status", "200"]
                            },
                            method: "GET",
                            header: [],
                            body: {
                                mode: "formdata",
                                formdata: [
                                    {
                                        key: "test",
                                        value: "123",
                                        type: "text"
                                    }
                                ]
                            },
                            description: "This endpoint allows one to instruct the server which status code to respond with.\n\nEvery response is accompanied by a status code. The status code provides a summary of the nature of response sent by the server. For example, a status code of `200` means everything is okay with the response and a code of `404` implies that the requested URL does not exist on server. \nA list of all valid HTTP status code can be found at the [List of Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) wikipedia article. When using Postman, the response status code is described for easy reference.\n\nNote that if an invalid status code is requested to be sent, the server returns a status code of `400 Bad Request`."
                        },
                        response: []
                    },
                    {
                        _postman_id: "9fc9c5d1-51c3-aa36-fdb2-dd4ff7bd5e18",
                        name: "Streamed Response",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "",
                                        ""
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/stream/10",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["stream", "10"]
                            },
                            method: "GET",
                            header: [],
                            description: "This endpoint allows one to recieve streaming http response using [chunked transfer encoding](https://en.wikipedia.org/wiki/Chunked_transfer_encoding) of a configurable length.\n\nA streaming response does not wait for the entire response to be generated on server before flushing it out. This implies that for a fairly large response, parts of it can be streamed to the requestee as and when it is generated on server. The client can then take actions of processing this partially received data."
                        },
                        response: []
                    },
                    {
                        _postman_id: "502f7f5b-b129-78a7-b27f-8dc36ce58f66",
                        name: "Delay Response",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "",
                                        "var data = JSON.parse(responseBody);",
                                        "",
                                        "tests[\"response body has key delay\"] = 'delay' in data;"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/delay/3",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["delay", "3"]
                            },
                            method: "GET",
                            header: [],
                            body: {
                                mode: "formdata",
                                formdata: [
                                    {
                                        key: "test",
                                        value: "123",
                                        type: "text"
                                    }
                                ]
                            },
                            description: "Using this endpoint one can configure how long it takes for the server to come back with a response. Appending a number to the URL defines the time (in seconds) the server will wait before responding.\n\nNote that a maximum delay of 10 seconds is accepted by the server."
                        },
                        response: []
                    },
                    {
                        _postman_id: "b213d463-8587-8470-acdc-92f7dfb0660e",
                        name: "Get UTF8 Encoded Response",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/encoding/utf8",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["encoding", "utf8"]
                            },
                            method: "GET",
                            header: [],
                            description: "If a response of an endpoint requires to send data beyond the basic English / ASCII character set, the `charset` parameter in the `Content-Type` response header defines the character encoding policy.\n\nThis endpoint returns an `UTF8` character encoded response body with text in various languages such as Greek, Latin, East Asian, etc. Postman can interpret the character encoding and use appropriate methods to display the character set in responses."
                        },
                        response: []
                    },
                    {
                        _postman_id: "eb8e2717-56b0-6a61-5387-eb46530ec4be",
                        name: "GZip Compressed Response",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "",
                                        "try {",
                                        "    var data = JSON.parse(responseBody);",
                                        "    tests[\"Body contains gzipped\"] = responseBody.has(\"gzipped\");",
                                        "    tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "    tests[\"Body contains method\"] = responseBody.has(\"method\");",
                                        "}",
                                        "catch(e) {",
                                        "    console.log('Cannot parse response,probably not a JSON');",
                                        "}"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/gzip",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["gzip"]
                            },
                            method: "GET",
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
                            description: "This endpoint returns the response using [gzip compression algoritm](https://en.wikipedia.org/wiki/Gzip).\nThe uncompressed response is a JSON string containing the details of the request sent by the client. For this endpoint to work, one should request with `Accept-encoding` header containing `gzip` as part of its value. Postman supports gzip, deflate and SDCH decoding and automatically sends them as part of the request.\n\nHTTP Compression allows the server to send responses in a compressed format, which is uncompressed by the client before processing. This reduces network bandwidth consumption at the cost of increase in CPU usage.\nTo know more about this, refer the [HTTP Compression](https://en.wikipedia.org/wiki/HTTP_compression) wikipedia article."
                        },
                        response: []
                    },
                    {
                        _postman_id: "947d31d6-16ce-2e3a-bf32-e0337c838ff8",
                        name: "Deflate Compressed Response",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;",
                                        "",
                                        "try {",
                                        "    var data = JSON.parse(responseBody);",
                                        "    tests[\"Body contains deflated\"] = responseBody.has(\"deflated\");",
                                        "    tests[\"Body contains headers\"] = responseBody.has(\"headers\");",
                                        "    tests[\"Body contains method\"] = responseBody.has(\"method\");",
                                        "}",
                                        "catch(e) {",
                                        "    console.log('Cannot parse response,probably not a JSON');",
                                        "}",
                                        ""
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/deflate",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["deflate"]
                            },
                            method: "GET",
                            header: [],
                            description: "This endpoint returns the response using [deflate compression algoritm](https://en.wikipedia.org/wiki/DEFLATE). \nThe uncompressed response is a JSON string containing the details of the request sent by the client. For this endpoint to work, one should request with `Accept-encoding` header containing `deflate` as part of its value. Postman supports gzip, deflate and SDCH decoding and automatically sends them as part of the request.\n\nHTTP Compression allows the server to send responses in a compressed format, which is uncompressed by the client before processing. This reduces network bandwidth consumption at the cost of increase in CPU usage.\nTo know more about this, refer the [HTTP Compression](https://en.wikipedia.org/wiki/HTTP_compression) wikipedia article."
                        },
                        response: []
                    }
                ]
            },
            {
                _postman_id: "58b0685d-5e5c-d03e-8899-c1084704d0d3",
                name: "[draft] Auth: OAuth2.0",
                description: "OAuth 2.0 allows a client to access a resource owners(user) protected resources without direct access to the users credentials.\nThe client obtains an access token which can be used to access the resource owners resources.\nOAuth 2.0 implements 4 different types of grant flows. Postman Echo has implemented the [Authorization Code](https://tools.ietf.org/html/rfc6749#section-1.3.1) grant flow.\n\nThe OAuth flow typically consists of three steps. \nIn the first step the client requests an authentication code from the server implementing the OAuth flow.\nThe authentication code along with other client credentials is then used to get the access token.\nThe access token can be used by the client to access users resources.\n",
                item: [
                    {
                        _postman_id: "d8fbfb17-6993-d43e-43af-2996f5138b9a",
                        name: "OAuth2.0 Get Auth Code",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 200\"] = responseCode.code === 200;"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/oauth2/authtoken?client_id=abc123&response_type=code",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["oauth2", "authtoken"],
                                query: [{ key: "client_id", value: "abc123" }, { key: "response_type", value: "code" }]
                            },
                            method: "GET",
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
                            description: "In the first request for the OAuth 2.0 flow, the client tries to get an authentication code by passing in `client_id` and `response_type`.\n\n> client_id: `abc123`\n>\n> response_type: `code`\n\nThe authentication code is returned as a part of the redirect URI and can be used to get the access token."
                        },
                        response: [
                            {
                                id: "a8413763-0cd4-8a55-b20d-35a41574fe9a",
                                name: "401",
                                originalRequest: {
                                    header: []
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
                                        value: "Sat, 31 Oct 2015 06:43:23 GMT"
                                    },
                                    {
                                        name: "ETag",
                                        key: "ETag",
                                        value: "W/\"2-2745614147\""
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "291",
                                body: "{}"
                            }
                        ]
                    },
                    {
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
                                raw: "https://echo.getpostman.com/oauth2/token",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["oauth2", "token"]
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
                            description: "This endpoint is used to get the `access_token`\n\nIt requires the following secret client credentials to be sent as part of the form body along with the `authentication code` obtained as part of the `redirect_uri` from the previous request.\n\n> code: xWnkliVQJURqB2x1\n>\n> grant_type: authorization_code\n>\n> redirect_uri: https://www.getpostman.com/oauth2/callback\n>\n> client_id: abc123\n>\n> client_secret: ssh-secret\n\nIf the correct credentials are not passed, the server returns with a `401 Unauthorized` response."
                        },
                        response: [
                            {
                                id: "0716233b-474d-bac7-bf1f-ccb461ecd3b9",
                                name: "401",
                                originalRequest: {
                                    url: {
                                        raw: "https://echo.getpostman.com/oauth2/token",
                                        protocol: "https",
                                        host: ["echo", "getpostman", "com"],
                                        path: ["oauth2", "token"]
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
                                        raw: "https://echo.getpostman.com/oauth2/token",
                                        protocol: "https",
                                        host: ["echo", "getpostman", "com"],
                                        path: ["oauth2", "token"]
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
                    },
                    {
                        _postman_id: "b94ef436-e62e-bef3-bdbd-69be97d72579",
                        name: "OAuth2.0 Get Resource",
                        event: [
                            {
                                listen: "test",
                                script: {
                                    type: "text/javascript",
                                    exec: [
                                        "tests[\"response code is 401\"] = (responseCode.code === 200);",
                                        "var body = JSON.parse(responseBody);",
                                        "tests[\"body has user_id\"] = \"user_id\" in body;",
                                        "tests[\"body has name\"] = \"name\" in body;"
                                    ]
                                }
                            }
                        ],
                        request: {
                            url: {
                                raw: "https://echo.getpostman.com/oauth2/user/info",
                                protocol: "https",
                                host: ["echo", "getpostman", "com"],
                                path: ["oauth2", "user", "info"]
                            },
                            method: "GET",
                            header: [
                                {
                                    key: "Authorization",
                                    value: "Bearer vp7jxTwqgczoFHs0uIdOvv4VdBWmvCkbVbNBCuaTQ3JZplPS40BaNV47HD1zt7MztQPILJvqYsOs6PfJpFYBgwbaE3CVEKOj"
                                }
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
                            description: "Once the bearer token has been obtained, it can be passed as `Authorization` header to access user's resources.\n\n> Authorization: Bearer vp7jx...\n\nIf the `Authorization` header is not passed the endpoint returns `401 Unauthorized`.\n"
                        },
                        response: [
                            {
                                id: "59c43487-94b4-2bcb-7c23-f516759ae799",
                                name: "401",
                                originalRequest: {
                                    header: []
                                },
                                status: "Unauthorized",
                                code: 401,
                                _postman_previewlanguage: "html",
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
                                        name: "Date",
                                        key: "Date",
                                        value: "Sat, 31 Oct 2015 06:44:16 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "WWW-Authenticate",
                                        key: "WWW-Authenticate",
                                        value: "Bearer realm=\"Users\""
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    },
                                    {
                                        name: "transfer-encoding",
                                        key: "transfer-encoding",
                                        value: "chunked"
                                    }
                                ],
                                cookie: [],
                                responseTime: "303",
                                body: "Unauthorized"
                            },
                            {
                                id: "7a184607-2299-c702-1860-f00026b41b5f",
                                name: "200",
                                originalRequest: {
                                    header: []
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
                                        value: "50"
                                    },
                                    {
                                        name: "Content-Type",
                                        key: "Content-Type",
                                        value: "application/json; charset=utf-8"
                                    },
                                    {
                                        name: "Date",
                                        key: "Date",
                                        value: "Sat, 31 Oct 2015 06:44:49 GMT"
                                    },
                                    {
                                        name: "Server",
                                        key: "Server",
                                        value: "nginx/1.6.2"
                                    },
                                    {
                                        name: "Vary",
                                        key: "Vary",
                                        value: "Accept-Encoding"
                                    },
                                    {
                                        name: "X-Powered-By",
                                        key: "X-Powered-By",
                                        value: "Sails <sailsjs.org>"
                                    }
                                ],
                                cookie: [],
                                responseTime: "323",
                                body: "{\"user_id\":1,\"name\":\"postman\"}"
                            }
                        ]
                    }
                ]
            }
        ]
    }
};
