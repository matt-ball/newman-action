module.exports = {
    v1: {
        folders: [],
        folders_order: [],
        id: 'e1036383-ba43-d240-5e9d-19614febed77',
        name: 'Sample descriptions',
        requests: [
            {
                id: 'e18e734b-4259-db7d-3728-215b2df05a19',
                headers: 'h_foo: h_alpha\nh_bar: h_beta\n// h_baz: h_gamma',
                headerData: [
                    {
                        key: 'h_foo',
                        value: 'h_alpha',
                        description: 'This is the first header'
                    },
                    {
                        key: 'h_bar',
                        value: 'h_beta',
                        description: 'This is the second header'
                    },
                    {
                        key: 'h_baz',
                        value: 'h_gamma',
                        enabled: false,
                        description: 'This is the third header (disabled)'
                    }
                ],
                url: 'https://postman-echo.com/post/:a?qp_foo=qp_alpha&qp_bar=qp_beta&qp_foo=qp_alpha',
                queryParams: [
                    {
                        key: 'qp_foo',
                        value: 'qp_alpha',
                        description: 'This is the first url query parameter'
                    },
                    {
                        key: 'qp_bar',
                        value: 'qp_beta',
                        description: 'This is the second url query parameter'
                    },
                    {
                        key: 'qp_foo',
                        value: 'qp_alpha',
                        description: 'This is the third url query parameter'
                    },
                    {
                        key: 'qp_baz',
                        value: 'qp_gamma',
                        enabled: false,
                        description: 'This is the fourth url query parameter (disabled)'
                    }
                ],
                method: 'POST',
                data: [
                    {
                        key: 'rb_foo',
                        value: 'rb_alpha',
                        description: 'This is the first request body datum',
                        type: 'text'
                    },
                    {
                        key: 'rb_bar',
                        value: 'rb_beta',
                        description: 'This is the second request body datum',
                        type: 'text'
                    }
                ],
                dataMode: 'params',
                name: 'Simple POST request',
                // eslint-disable-next-line max-len
                description: 'A simple `POST` request to demonstrate the usage of descriptions across various parts of a request.',
                collectionId: 'e1036383-ba43-d240-5e9d-19614febed77',
                pathVariableData: [{ key: 'a' }],
                pathVariables: {},
                responses: []
            }
        ],
        order: [
            'e18e734b-4259-db7d-3728-215b2df05a19'
        ]
    },
    v2: {
        info: {
            name: 'Sample descriptions',
            _postman_id: 'e1036383-ba43-d240-5e9d-19614febed77',
            schema: 'https://schema.getpostman.com/json/collection/v2.0.0/collection.json'
        },
        item: [
            {
                _postman_id: 'e18e734b-4259-db7d-3728-215b2df05a19',
                name: 'Simple POST request',
                request: {
                    url: {
                        raw: 'https://postman-echo.com/post/:a?qp_foo=qp_alpha&qp_bar=qp_beta&qp_foo=qp_alpha',
                        protocol: 'https',
                        host: [
                            'postman-echo',
                            'com'
                        ],
                        path: [
                            'post',
                            ':a'
                        ],
                        query: [
                            {
                                key: 'qp_foo',
                                value: 'qp_alpha',
                                description: 'This is the first url query parameter'
                            },
                            {
                                key: 'qp_bar',
                                value: 'qp_beta',
                                description: 'This is the second url query parameter'
                            },
                            {
                                key: 'qp_foo',
                                value: 'qp_alpha',
                                description: 'This is the third url query parameter'
                            },
                            {
                                key: 'qp_baz',
                                value: 'qp_gamma',
                                disabled: true,
                                description: 'This is the fourth url query parameter (disabled)'
                            }
                        ],
                        variable: [{ key: 'a' }]
                    },
                    method: 'POST',
                    header: [
                        {
                            key: 'h_foo',
                            value: 'h_alpha',
                            description: 'This is the first header'
                        },
                        {
                            key: 'h_bar',
                            value: 'h_beta',
                            description: 'This is the second header'
                        },
                        {
                            key: 'h_baz',
                            value: 'h_gamma',
                            disabled: true,
                            description: 'This is the third header (disabled)'
                        }
                    ],
                    body: {
                        mode: 'formdata',
                        formdata: [
                            {
                                key: 'rb_foo',
                                value: 'rb_alpha',
                                description: 'This is the first request body datum',
                                type: 'text'
                            },
                            {
                                key: 'rb_bar',
                                value: 'rb_beta',
                                description: 'This is the second request body datum',
                                type: 'text'
                            }
                        ]
                    },
                    // eslint-disable-next-line max-len
                    description: 'A simple `POST` request to demonstrate the usage of descriptions across various parts of a request.'
                },
                response: []
            }
        ]
    },
    v21: {
        info: {
            name: 'Sample descriptions',
            _postman_id: 'e1036383-ba43-d240-5e9d-19614febed77',
            schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
        },
        item: [
            {
                _postman_id: 'e18e734b-4259-db7d-3728-215b2df05a19',
                name: 'Simple POST request',
                request: {
                    url: {
                        raw: 'https://postman-echo.com/post/:a?qp_foo=qp_alpha&qp_bar=qp_beta&qp_foo=qp_alpha',
                        protocol: 'https',
                        host: [
                            'postman-echo',
                            'com'
                        ],
                        path: [
                            'post',
                            ':a'
                        ],
                        query: [
                            {
                                key: 'qp_foo',
                                value: 'qp_alpha',
                                description: 'This is the first url query parameter'
                            },
                            {
                                key: 'qp_bar',
                                value: 'qp_beta',
                                description: 'This is the second url query parameter'
                            },
                            {
                                key: 'qp_foo',
                                value: 'qp_alpha',
                                description: 'This is the third url query parameter'
                            },
                            {
                                key: 'qp_baz',
                                value: 'qp_gamma',
                                disabled: true,
                                description: 'This is the fourth url query parameter (disabled)'
                            }
                        ],
                        variable: [{ key: 'a' }]
                    },
                    method: 'POST',
                    header: [
                        {
                            key: 'h_foo',
                            value: 'h_alpha',
                            description: 'This is the first header'
                        },
                        {
                            key: 'h_bar',
                            value: 'h_beta',
                            description: 'This is the second header'
                        },
                        {
                            key: 'h_baz',
                            value: 'h_gamma',
                            disabled: true,
                            description: 'This is the third header (disabled)'
                        }
                    ],
                    body: {
                        mode: 'formdata',
                        formdata: [
                            {
                                key: 'rb_foo',
                                value: 'rb_alpha',
                                description: 'This is the first request body datum',
                                type: 'text'
                            },
                            {
                                key: 'rb_bar',
                                value: 'rb_beta',
                                description: 'This is the second request body datum',
                                type: 'text'
                            }
                        ]
                    },
                    // eslint-disable-next-line max-len
                    description: 'A simple `POST` request to demonstrate the usage of descriptions across various parts of a request.'
                },
                response: []
            }
        ]
    }
};
