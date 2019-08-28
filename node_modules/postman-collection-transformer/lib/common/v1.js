var _ = require('lodash').noConflict(),

    regexes = {
        fold: /\r\n([ \t])/g,
        trim: /^\s*(.*\S)?\s*$/, // eslint-disable-line security/detect-unsafe-regex
        header: /^((\/\/\s*)?\S+):(.*)$/gm // eslint-disable-line security/detect-unsafe-regex
    },
    headersCommentPrefix = '//';

module.exports = {
    authMap: {
        apikeyAuth: 'apikey',
        basicAuth: 'basic',
        bearerAuth: 'bearer',
        digestAuth: 'digest',
        hawkAuth: 'hawk',
        oAuth1: 'oauth1',
        oAuth2: 'oauth2',
        ntlmAuth: 'ntlm',
        awsSigV4: 'awsv4',
        normal: null
    },

    /**
     * Parses a string of headers to an object.
     *
     * @param {String} data - A string of newline concatenated header key-value pairs.
     * @param {?Boolean} [legacy] - A flag to indicate whether the parsing is being done for v1 normalization or v1 to
     * v2 conversion.
     * @returns {Object[]|*} - The parsed list of header key-value pair objects.
     * @private
     */
    parseHeaders: function (data, legacy) {
        if (!data) { return; }

        var head,
            headers = [],
            statusValue = !legacy,
            match = regexes.header.exec(data),
            property = legacy ? 'enabled' : 'disabled';

        data = data.toString().replace(regexes.fold, '$1');

        while (match) {
            head = {
                key: match[1],
                value: match[3].replace(regexes.trim, '$1')
            };

            if (_.startsWith(head.key, headersCommentPrefix)) {
                head[property] = statusValue;
                head.key = head.key.replace(headersCommentPrefix, '').trim();
            }

            headers.push(head);
            match = regexes.header.exec(data);
        }

        return headers;
    }
};
