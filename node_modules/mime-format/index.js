var /**
     * @private
     * @type {Object}
     */
    db = require('./db.json'),
    /**
     * @private
     * @const
     * @type {String}
     */
    SEP = '/',
    /**
     * @private
     * @const
     * @type {string}
     */
    E = '',
    /**
     * @private
     * @const
     * @type {string}
     */
    TEXT = 'text',
    /**
     * @private
     * @const
     * @type {string}
     */
    RAW = 'raw',
    /**
     * @private
     * @const
     * @type {string}
     */
    UNKNOWN = 'unknown',
    /**
     * @private
     * @const
     * @type {string}
     */
    PLAIN = 'plain',

    /**
     * All the content type base types that mostly mean what they are meant to do!
     *
     * @private
     * @const
     * @type {RegExp}
     */
    AUDIO_VIDEO_IMAGE_TEXT = /(audio|video|image|text)/,
    /**
     * A blanket check for commonly used keywords that are associated with text content type
     *
     * @private
     * @const
     * @type {RegExp}
     */
    JSON_XML_SCRIPT_SIBLINGS = /(jsonp|json|xml|html|yaml|vml|webml|script)/,
    /**
     * Same check as the sure-shot bases, except that these must be sub-types
     *
     * @private
     * @const
     * @type {RegExp}
     */
    AUDIO_VIDEO_IMAGE_TEXT_SUBTYPE = /\/[^\/]*(audio|video|image|text)/,
    /**
     * The content type bases that are not well defined or ambiguous to classify
     *
     * @private
     * @const
     * @type {RegExp}
     */
    APPLICATION_MESSAGE_MULTIPART = /(application|message|multipart)/;

module.exports = {
    /**
     * Attempts to guess the format by analysing mime type and not a db lookup
     *
     * @param {String} mime - contentType header value
     *
     * @returns {Object}
     */
    guess: function (mime) {
        var info = {
                type: UNKNOWN,
                format: RAW,
                guessed: true
            },
            match,
            base;

        // extract the mime base
        base = (base = mime.split(SEP)) && base[0] || E;

        // bail out on the mime types that are sure-shot ones with no ambiguity
        match = base.match(AUDIO_VIDEO_IMAGE_TEXT);
        if (match && match[1]) {
            info.type = info.format = match[1];

            // we do special kane matching to extract the format in case the match was text
            // this ensures that we get same formats like we will do in kane match later down the line
            if (info.type === TEXT) {
                match = mime.match(JSON_XML_SCRIPT_SIBLINGS);
                info.format = match && match[1] || PLAIN;
            }
            return info;
        }

        // we do a kane match on entire mime (not just base) to find texts
        match = mime.match(JSON_XML_SCRIPT_SIBLINGS);
        if (match && match[1]) {
            info.type = TEXT;
            info.format = match[1];
            return info;
        }

        // now we match the subtype having names from the sure shot bases
        match = mime.match(AUDIO_VIDEO_IMAGE_TEXT_SUBTYPE);
        if (match && match[1]) {
            info.type = info.format = match[1];
            return info;
        }

        // now that most text and sure-shot types and sub-types are out of our way, we detect standard bases
        // and rest are unknown
        match = base.match(APPLICATION_MESSAGE_MULTIPART);
        if (match && match[1]) {
            info.type = match[1];
            info.format = RAW;
            return info;
        }

        // at this point nothing has matched nothing. it is worth keeping a note of it
        info.orphan = true;
        return info;
    },

    /**
     * @param {String} mime - contentType header value
     * @returns {Object}
     */
    lookup: function mimeFormatLookup (mime) {
        var charset = require('charset')(mime);

        // sanitise the mime argument
        mime = String(mime).toLowerCase().replace(/\s/g, E).replace(/^([^;]+).*$/g, '$1');
        var result = db[mime] || module.exports.guess(mime);

        // add the charset info to the mime.
        result && charset && (result.charset = charset);
        result && (result.source = mime); // store the sanitised mime
        return result;
    }
};
