/* eslint-disable object-shorthand */
var semver = require('semver'),

    // @todo: Add support for more normalizers
    normalizers = {
        '1.0.0': require('./v1')
    };

module.exports = {
    /**
     * Accepts the arguments for normalization and invokes the appropriate normalizer with them.
     *
     * @param {Object} collection - The plain collection JSON to be normalized.
     * @param {Object} options - A set of options for the current normalization.
     * @param {String} options.normalizeVersion - The base collection schema version for which to normalize.
     * @param {?Boolean} [options.mutate=false] - When set to true, normalization is done in place.
     * @param {?Boolean} [options.noDefaults=false] - When set to true, sensible defaults are not added.
     * @param {?Boolean} [options.prioritizeV2=false] - When set to true, v2 style properties are checked first.
     * @param {?Boolean} [options.retainEmptyValues=false] - When set to true, empty values are set to '' instead of
     * being removed.
     * @param {Function} callback - A function invoked to indicate the completion of the normalization process.
     * @returns {*}
     */
    normalize: function (collection, options, callback) {
        var version;

        if (!options || !(version = semver.valid(options.normalizeVersion, true)) || !normalizers[version]) {
            return callback(new Error('Version not specified or invalid: ' + options.normalizeVersion));
        }

        return normalizers[version].normalize(collection, options, callback);
    },

    /**
     * Normalizes a single request or item as per the provided version.
     *
     * @param {Object} object - The entity to be normalized.
     * @param {Object} options - The set of options to be applied to the current normalization.
     * @param {String} options.normalizeVersion - The base collection schema version for which to normalize.
     * @param {?Boolean} [options.mutate=false] - When set to true, normalization is done in place.
     * @param {?Boolean} [options.noDefaults=false] - When set to true, sensible defaults are not added.
     * @param {?Boolean} [options.prioritizeV2=false] - When set to true, v2 style properties are checked first.
     * @param {?Boolean} [options.retainEmptyValues=false] - When set to true, empty values are set to '' instead of
     * being removed.
     * @param {Function} callback - The function invoked when the normalization has completed.
     */
    normalizeSingle: function (object, options, callback) {
        var version;

        if (!options || !(version = semver.valid(options.normalizeVersion, true)) || !normalizers[version]) {
            return callback(new Error('Version not specified or invalid: ' + options.normalizeVersion));
        }

        return normalizers[version].normalizeSingle(object, options, callback);
    },

    /**
     * Normalizes a single response as per the provided version.
     *
     * @param {Object} response - The response to be normalized.
     * @param {Object} options - The set of options to be applied to the current normalization.
     * @param {String} options.normalizeVersion - The base collection schema version for which to normalize.
     * @param {?Boolean} [options.mutate=false] - When set to true, normalization is done in place.
     * @param {?Boolean} [options.noDefaults=false] - When set to true, sensible defaults are not added.
     * @param {?Boolean} [options.prioritizeV2=false] - When set to true, v2 style properties are checked first.
     * @param {?Boolean} [options.retainEmptyValues=false] - When set to true, empty values are set to '' instead of
     * being removed.
     * @param {Function} callback - The function invoked when the normalization has completed.
     */
    normalizeResponse: function (response, options, callback) {
        var version;

        if (!options || !(version = semver.valid(options.normalizeVersion, true)) || !normalizers[version]) {
            return callback(new Error('Version not specified or invalid: ' + options.normalizeVersion));
        }

        return normalizers[version].normalizeResponse(response, options, callback);
    }
};
