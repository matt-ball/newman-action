var semver = require('semver'),
    FN = 'function',
    generateConverter; // constructor

/**
 * Prototype interface definition of a converter
 *
 * @param {Object} model - A manifest that defines the conversion process.
 * @param {String} model.input - The input version to convert from.
 * @param {String} model.output - The output version to convert to.
 * @param {Function} model.convert - A function to convert entire collections.
 * @param {Function} model.create - A function to perform creation operations.
 * @param {Function} [model.init] - An initializer function to bootstrap the generated converter.
 *
 * @throws {Error} If model definition does not meet requirements
 */
generateConverter = function (model) {
    var error;

    // validate the model
    if (!model) {
        error = 'invalid definition of converter';
    }
    // ensure that the input version support is a valid semver
    else if (!semver.valid(model.input)) {
        error = 'input version support for converter is invalid';
    }
    // ensure that the output version support is a valid semver
    else if (!semver.valid(model.output)) {
        error = 'output version support for converter is invalid';
    }
    else if (typeof model.convert !== FN) {
        error = 'convert function is not defined';
    }
    else if (typeof model.convertSingle !== FN) {
        error = 'convertSingle function is not defined';
    }

    if (semver.satisfies(model.input, model.output)) {
        error = 'input version ' + model.input + ' matches output version ' + model.output + ' for converter';
    }

    // If we had encountered any error during validation, we simply exit by executing the callback and forwarding the
    // error.
    if (error) {
        throw new Error(error);
    }

    return model;
};

module.exports = {
    /**
     * All converters
     *
     * @type {object<Converter>}
     *
     * @note this form of loading is most likely not browser friendly, find browser alternative
     */
    converters: {
        'converter-v1-to-v2': require('./v1.0.0/converter-v1-to-v2'),
        'converter-v1-to-v21': require('./v1.0.0/converter-v1-to-v21'),
        'converter-v2-to-v1': require('./v2.0.0/converter-v2-to-v1'),
        'converter-v21-to-v1': require('./v2.1.0/converter-v21-to-v1')
    },

    /**
     * Fetches a converter for the given input and output versions
     *
     * @param {String} inputVersion - The version to convert from.
     * @param {String} outputVersion - The version to convert to.
     * @returns {Converter} - A converter for the given set of options.
     */
    getConverter: function (inputVersion, outputVersion) {
        var converter;

        inputVersion = semver.clean(inputVersion);
        outputVersion = semver.clean(outputVersion);

        for (converter in this.converters) {
            // eslint-disable-next-line no-prototype-builtins
            converter = this.converters.hasOwnProperty(converter) && this.converters[converter];
            if (converter && semver.eq(converter.input, inputVersion) && semver.eq(converter.output, outputVersion)) {
                return generateConverter(converter);
            }
        }
    },

    /**
     * Picks the appropriate converter and converts the given collection.
     *
     * @param {Object} collection - The collection to be converted.
     * @param {Object} options - The set of options for request conversion.
     * @param {Function} callback - The function to be invoked after the completion of conversion process.
     */
    convert: function (collection, options, callback) {
        var chosenConverter = this.getConverter(options.inputVersion, options.outputVersion);

        if (!chosenConverter) {
            return callback(new Error('no conversion path found'));
        }

        return chosenConverter.convert(collection, options, callback);
    },

    /**
     * Picks the appropriate converter and converts the given object.
     *
     * @param {Object} object - A single V1 request or a V2 Item.
     * @param {Object} options - The set of options for request conversion.
     * @param {Function} callback - The function to be invoked after the completion of conversion process.
     */
    convertSingle: function (object, options, callback) {
        var chosenConverter = this.getConverter(options.inputVersion, options.outputVersion);

        if (!chosenConverter) {
            return callback(new Error('no conversion path found'));
        }

        return chosenConverter.convertSingle(object, options, callback);
    },

    /**
     * Picks the appropriate converter and converts the given object.
     *
     * @param {Object} object - A single V1 Response or a V2 Response.
     * @param {Object} options - The set of options for response conversion.
     * @param {Function} callback - The function invoked to mark the completion of the conversion process.
     * @returns {*}
     */
    convertResponse: function (object, options, callback) {
        var chosenConverter = this.getConverter(options.inputVersion, options.outputVersion);

        if (!chosenConverter) {
            return callback(new Error('no conversion path found'));
        }

        return chosenConverter.convertResponse(object, options, callback);
    },

    /**
     * Returns a builder, which can be used to convert individual requests, etc.
     *
     * @param {Object} options - The set of options for builder creation.
     * @returns {Function} - The builder for the given set of options.
     */
    builder: function (options) {
        var chosenConverter = this.getConverter(options.inputVersion, options.outputVersion);

        return chosenConverter.create(options);
    }
};
