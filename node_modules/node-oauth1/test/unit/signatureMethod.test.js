var expect = require('chai').expect,
    sign = require('../../index').SignatureMethod.sign;

describe('SignatureMethod.sign()', function () {
    it('should throw error for unsupported signature method', function () {
        var message = {
                action: 'https://postman.com/path',
                method: 'GET',
                parameters: {
                    oauth_signature_method: 'UNKNOWN'
                }
            },
            accessor = {};
        expect(function () {sign(message, accessor)}).to.throw('Unsupported signature method');
    });

    it('should generate correct PLAINTEXT signature', function () {
        var message = {
                action: 'https://postman.com/path',
                method: 'GET',
                parameters: {
                    oauth_signature_method: 'PLAINTEXT',
                    oauth_consumer_key: 'foo',
                    oauth_token: 'bar',
                    oauth_nonce: 'baz',
                    oauth_timestamp: '1588771035',
                    oauth_version: '1.0'
                }
            },
            accessor = {
                consumerSecret: 'alpha',
                tokenSecret: 'beta'
            },
            signature = 'alpha&beta';

        expect(sign(message, accessor)).to.eql(signature);
    });

    it('should generate correct HMAC-SHA1 signature', function () {
        var message = {
                action: 'https://postman.com/path',
                method: 'GET',
                parameters: {
                    oauth_signature_method: 'HMAC-SHA1',
                    oauth_consumer_key: 'foo',
                    oauth_token: 'bar',
                    oauth_nonce: 'baz',
                    oauth_timestamp: '1588771035',
                    oauth_version: '1.0'
                }
            },
            accessor = {
                consumerSecret: 'alpha',
                tokenSecret: 'beta'
            },
            signature= 'kst31ZZPywC/vi+UVOU93hgdEMg=';

        expect(sign(message, accessor)).to.eql(signature);
    });

    it('should generate correct HMAC-SHA256 signature', function () {
        var message = {
                action: 'https://postman.com/path',
                method: 'GET',
                parameters: {
                    oauth_signature_method: 'HMAC-SHA256',
                    oauth_consumer_key: 'foo',
                    oauth_token: 'bar',
                    oauth_nonce: 'baz',
                    oauth_timestamp: '1588771035',
                    oauth_version: '1.0'
                }
            },
            accessor = {
                consumerSecret: 'alpha',
                tokenSecret: 'beta'
            },
            signature= 'H3w+AlCMRPSZNn8gOI6GyvEXol6R0jVqNw4rr58nZmg=';

        expect(sign(message, accessor)).to.eql(signature);
    });

    it('should generate correct HMAC-SHA512 signature', function () {
        var message = {
                action: 'https://postman.com/path',
                method: 'GET',
                parameters: {
                    oauth_signature_method: 'HMAC-SHA512',
                    oauth_consumer_key: 'foo',
                    oauth_token: 'bar',
                    oauth_nonce: 'baz',
                    oauth_timestamp: '1588771035',
                    oauth_version: '1.0'
                }
            },
            accessor = {
                consumerSecret: 'alpha',
                tokenSecret: 'beta'
            },
            signature = 'GF7ju0CZzAT7dM7cYx8z1km5MOrrjaQ+cJY00CX1sz052gIOOWacY55NcJkqSi28OQqcO6mhdxTOnO60uH4cEw==';

        expect(sign(message, accessor)).to.eql(signature);
    });

    it('should generate correct RSA-SHA1 signature', function () {
        var message = {
                action: 'https://postman.com/path',
                method: 'GET',
                parameters: {
                    oauth_signature_method: 'RSA-SHA1',
                    oauth_consumer_key: 'foo',
                    oauth_token: 'bar',
                    oauth_nonce: 'baz',
                    oauth_timestamp: '1588771035',
                    oauth_version: '1.0'
                }
            },
            accessor = {
                privateKey: '-----BEGIN RSA PRIVATE KEY-----\nMIICWwIBAAKBgFKLvzM9zbm3I0+HWcHlBSqpfRY/bKs6NDLclERrzfnReFV4utjkhjaEQPPT6tHVHKrZkcxmIgwe3XrkJkUjcuingXIF+Fc3KpY61qJ4HSM50qIuHdi+C5YfuXwNrh6OOeZAhhqgSw2e2XqPfATbkYYwpIFpdVdcH/Pb2ynpd6VXAgMBAAECgYAbQE+LFyhH25Iou0KCpJ0kDHhjU+UIUlrRP8kjHYQOqXzUmtr0p903OkpHNPsc8wJX1SQxGra60aXE4HVR9fYFQNliAnSmA/ztGR4ddnirK1Gzog4y2OOkicTdSqJ/1XXtTEDSRkA0Z2DIqcWgudeSDzVjUpreYwQ/rCEZbi50AQJBAJcf9wi5bU8tdZUCg3/8MNDwHhr4If4V/9kmhsgNp+M/9tHwCbD05hCbiGS7g58DPF+6V2K30qQYq7yvBP8Te4ECQQCL1GhX/YwkD6rexi0E1bjz+RqhNLTR9kexkTfSYmL6zHeeIFSH8ROioGOJMU51lUtMNkkrKEeki5SZpkfaQOzXAkAvBnJPU6vQ7HtfH8YdiDMEgQNNLxMcxmmzf4qHK8CnNRsvnnrVho8kcdFSTwsY6t/Zhdl1TXANQeQGtYtfeAeBAkEAhUB351JSWJMtrHqCsFbTmHxNKk7F+kiObeMLpUvpM0PiwifhJmNQ6Oubr0Pzlw4c4ZXiCGSsUVxK0lmpo423pQJATYDoxVhZrKA3xDAifWoyxbyxf/WXtUGDaAOuZc/naVN5TKiqaEO6G+k3NpmOXNKsYU/Zd9e6P/TnfU74TyDDDA==\n-----END RSA PRIVATE KEY-----'
            },
            signature = 'Tok9L4dAnBWzd0KNgI9/kR3fhfE2keZybvf8UYPB1/bbdQsMHQRQYL1Ui1V94ZBlijeQmyHo67XLJe1zGwCTK5fAGSOtQU0mfvj4AvG4sG5SVg8auWgm5BQt/Lhe9cQJpVNqRhV8rMxOZ6mF9STpDGSx80MY2+FG4eThexe0vkQ=';

        expect(sign(message, accessor)).to.eql(signature);
    });

    it('should generate correct RSA-SHA256 signature', function () {
        var message = {
                action: 'https://postman.com/path',
                method: 'GET',
                parameters: {
                    oauth_signature_method: 'RSA-SHA256',
                    oauth_consumer_key: 'foo',
                    oauth_token: 'bar',
                    oauth_nonce: 'baz',
                    oauth_timestamp: '1588771035',
                    oauth_version: '1.0'
                }
            },
            accessor = {
                privateKey: '-----BEGIN RSA PRIVATE KEY-----\nMIICWwIBAAKBgFKLvzM9zbm3I0+HWcHlBSqpfRY/bKs6NDLclERrzfnReFV4utjkhjaEQPPT6tHVHKrZkcxmIgwe3XrkJkUjcuingXIF+Fc3KpY61qJ4HSM50qIuHdi+C5YfuXwNrh6OOeZAhhqgSw2e2XqPfATbkYYwpIFpdVdcH/Pb2ynpd6VXAgMBAAECgYAbQE+LFyhH25Iou0KCpJ0kDHhjU+UIUlrRP8kjHYQOqXzUmtr0p903OkpHNPsc8wJX1SQxGra60aXE4HVR9fYFQNliAnSmA/ztGR4ddnirK1Gzog4y2OOkicTdSqJ/1XXtTEDSRkA0Z2DIqcWgudeSDzVjUpreYwQ/rCEZbi50AQJBAJcf9wi5bU8tdZUCg3/8MNDwHhr4If4V/9kmhsgNp+M/9tHwCbD05hCbiGS7g58DPF+6V2K30qQYq7yvBP8Te4ECQQCL1GhX/YwkD6rexi0E1bjz+RqhNLTR9kexkTfSYmL6zHeeIFSH8ROioGOJMU51lUtMNkkrKEeki5SZpkfaQOzXAkAvBnJPU6vQ7HtfH8YdiDMEgQNNLxMcxmmzf4qHK8CnNRsvnnrVho8kcdFSTwsY6t/Zhdl1TXANQeQGtYtfeAeBAkEAhUB351JSWJMtrHqCsFbTmHxNKk7F+kiObeMLpUvpM0PiwifhJmNQ6Oubr0Pzlw4c4ZXiCGSsUVxK0lmpo423pQJATYDoxVhZrKA3xDAifWoyxbyxf/WXtUGDaAOuZc/naVN5TKiqaEO6G+k3NpmOXNKsYU/Zd9e6P/TnfU74TyDDDA==\n-----END RSA PRIVATE KEY-----'
            },
            signature = 'A8ayuJe1RJd0zL4R8aBgbEY0PFviN6bk8G4QqAcGPSZfeGjFjwBlXWFysNy5iR8mm3/yWGboUMHWmtyPDtOnL2cJTc8fKhXwITFi7FmsUeA5cBK/HdWYoHLdWuNIZgDHsv8qvZCS4QD4qIILiys4uFK+W1br0zSJR9bsOTIZLng=';

        expect(sign(message, accessor)).to.eql(signature);
    });

    it('should generate correct RSA-SHA512 signature', function () {
        var message = {
                action: 'https://postman.com/path',
                method: 'GET',
                parameters: {
                    oauth_signature_method: 'RSA-SHA512',
                    oauth_consumer_key: 'foo',
                    oauth_token: 'bar',
                    oauth_nonce: 'baz',
                    oauth_timestamp: '1588771035',
                    oauth_version: '1.0'
                }
            },
            accessor = {
                privateKey: '-----BEGIN RSA PRIVATE KEY-----\nMIICWwIBAAKBgFKLvzM9zbm3I0+HWcHlBSqpfRY/bKs6NDLclERrzfnReFV4utjkhjaEQPPT6tHVHKrZkcxmIgwe3XrkJkUjcuingXIF+Fc3KpY61qJ4HSM50qIuHdi+C5YfuXwNrh6OOeZAhhqgSw2e2XqPfATbkYYwpIFpdVdcH/Pb2ynpd6VXAgMBAAECgYAbQE+LFyhH25Iou0KCpJ0kDHhjU+UIUlrRP8kjHYQOqXzUmtr0p903OkpHNPsc8wJX1SQxGra60aXE4HVR9fYFQNliAnSmA/ztGR4ddnirK1Gzog4y2OOkicTdSqJ/1XXtTEDSRkA0Z2DIqcWgudeSDzVjUpreYwQ/rCEZbi50AQJBAJcf9wi5bU8tdZUCg3/8MNDwHhr4If4V/9kmhsgNp+M/9tHwCbD05hCbiGS7g58DPF+6V2K30qQYq7yvBP8Te4ECQQCL1GhX/YwkD6rexi0E1bjz+RqhNLTR9kexkTfSYmL6zHeeIFSH8ROioGOJMU51lUtMNkkrKEeki5SZpkfaQOzXAkAvBnJPU6vQ7HtfH8YdiDMEgQNNLxMcxmmzf4qHK8CnNRsvnnrVho8kcdFSTwsY6t/Zhdl1TXANQeQGtYtfeAeBAkEAhUB351JSWJMtrHqCsFbTmHxNKk7F+kiObeMLpUvpM0PiwifhJmNQ6Oubr0Pzlw4c4ZXiCGSsUVxK0lmpo423pQJATYDoxVhZrKA3xDAifWoyxbyxf/WXtUGDaAOuZc/naVN5TKiqaEO6G+k3NpmOXNKsYU/Zd9e6P/TnfU74TyDDDA==\n-----END RSA PRIVATE KEY-----'
            },
            signature = 'ArsxDvfXOVTQBfXLbNEkWEm+xfEnzAQLM7RET04cMtHrrcm80mWWMcsMN1jykR8ZnXVsVufO565cJQgWqBJ2aWQgUa4Yu2RQWGLuIYwnaiX6TxysO/ZuV5zDlTWQdQpjUmFWKuixZouMDH7CiV37PJLKkYaJzQaGTamHsJiUubE=';

        expect(sign(message, accessor)).to.eql(signature);
    });

    it('should generate correct HMAC signature without tokenSecret', function () {
        var message = {
                action: 'https://postman.com/path',
                method: 'GET',
                parameters: {
                    oauth_signature_method: 'HMAC-SHA512',
                    oauth_consumer_key: 'foo',
                    oauth_token: 'bar',
                    oauth_nonce: 'baz',
                    oauth_timestamp: '1588771035',
                    oauth_version: '1.0'
                }
            },
            accessor = {
                consumerSecret: 'alpha',
                tokenSecret: undefined
            },
            signature = 'zWgwoT1cmeYYmDXiEo9ylEAwu9h7qu/EG+Ylj6n0cedV9aK/gMkgGmTylrAbFpCmEKWo6wwfyvh+YFuJl2+1EQ==';

        expect(sign(message, accessor)).to.eql(signature);
    });

    it('should generate correct HMAC signature without consumerSecret', function () {
        var message = {
                action: 'https://postman.com/path',
                method: 'GET',
                parameters: {
                    oauth_signature_method: 'HMAC-SHA512',
                    oauth_consumer_key: 'foo',
                    oauth_token: 'bar',
                    oauth_nonce: 'baz',
                    oauth_timestamp: '1588771035',
                    oauth_version: '1.0'
                }
            },
            accessor = {
                consumerSecret: undefined,
                tokenSecret: 'beta'
            },
            signature = 'gyU8TWOoUeCIWgduAZvQ7WpA7hcvdvfvulksm8vyR17fQt+ZwuwnL6TSZCXbCtV7gmTi3Ggr6hO/UjEItG2qew==';

        expect(sign(message, accessor)).to.eql(signature);
    });

    it('should generate correct HMAC signature without consumerSecret and tokenSecret', function () {
        var message = {
                action: 'https://postman.com/path',
                method: 'GET',
                parameters: {
                    oauth_signature_method: 'HMAC-SHA512',
                    oauth_consumer_key: 'foo',
                    oauth_token: 'bar',
                    oauth_nonce: 'baz',
                    oauth_timestamp: '1588771035',
                    oauth_version: '1.0'
                }
            },
            accessor = {
                consumerSecret: 'alpha',
                tokenSecret: undefined
            },
            signature = 'zWgwoT1cmeYYmDXiEo9ylEAwu9h7qu/EG+Ylj6n0cedV9aK/gMkgGmTylrAbFpCmEKWo6wwfyvh+YFuJl2+1EQ==';

        expect(sign(message, accessor)).to.eql(signature);
    });

    it('should throw error if private key is absent for RSA signature', function () {
        var message = {
                action: 'https://postman.com/path',
                method: 'GET',
                parameters: {
                    oauth_signature_method: 'RSA-SHA512',
                    oauth_consumer_key: 'foo',
                    oauth_token: 'bar',
                    oauth_nonce: 'baz',
                    oauth_timestamp: '1588771035',
                    oauth_version: '1.0'
                }
            },
            accessor = {
                privateKey: undefined
            };

        expect(function () {sign(message, accessor)}).to.throw();
    });

    it('should throw error if private key is not in valid PEM format', function () {
        var message = {
                action: 'https://postman.com/path',
                method: 'GET',
                parameters: {
                    oauth_signature_method: 'RSA-SHA512',
                    oauth_consumer_key: 'foo',
                    oauth_token: 'bar',
                    oauth_nonce: 'baz',
                    oauth_timestamp: '1588771035',
                    oauth_version: '1.0'
                }
            },
            accessor = {
                privateKey: 'invalid private key!!'
            };

        expect(function () {sign(message, accessor)}).to.throw();
    });
});
