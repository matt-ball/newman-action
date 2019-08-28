#!/usr/bin/env node
var fs = require('fs'),

    log = require('intel'),
    transformer = require('..'),
    program = require('commander'),
    stripJSONComments = require('strip-json-comments'),

    FSWF_FLAG_W = { flag: 'w' },
    FSWF_FLAG_WX = { flag: 'wx' },

    /**
     * Loads a JSON in a safe and compatible way from a file
     *
     * @param {String} path - The file path to read JSON content from.
     */
    loadJSON = function (path) {
        var data = fs.readFileSync(path); // eslint-disable-line security/detect-non-literal-fs-filename

        return JSON.parse(stripJSONComments(data.toString()));
    },

    /**
     * Writes a JSON blob to the given path.
     * ``options.path`` must contain the path to the output file.
     * If ``options.pretty`` is true, output will be pretty printed. (Default false)
     * If ``options.overwrite`` is false, output file will be overwritten (Default true)
     *
     * @param {Object} data - The JSON data to be written.
     * @param {Object} options - The options for JSON data writing.
     * @param {Boolean} [options.pretty=false] - When set to true, indents JSON data by 4 spaces.
     * @param {String} options.output - The file to write data to.
     * @param {Boolean} [options.overwrite=false] - When set to true, allows overwriting files that exist.
     * @param {Function} callback - A function to be invoked after writing is complete ,
     */
    writeJSON = function (data, options, callback) {
        var json;

        try {
            json = JSON.stringify(data, null, options.pretty ? 4 : 0);
        }
        catch (e) {
            return callback(e);
        }

        // eslint-disable-next-line security/detect-non-literal-fs-filename
        return fs.writeFile(options.output, json, options.overwrite ? FSWF_FLAG_W : FSWF_FLAG_WX, callback);
    };

// Setup logging
log.basicConfig({
    format: '%(date)s [%(levelname)s] %(message)s',
    level: log.DEBUG
});

program
    .usage('[command] [options]')
    .version(require('../package.json').version);

// Describe the options and usage instruction for the `convert` command
program
    .command('convert')
    .description('Convert Postman Collection from one format to another')
    .option('-e, --env <path>', 'optional path to the associated postman environment file to be used')
    .option('-i, --input <path>', 'path to the input postman collection file')
    .option('-j, --input-version [version]', 'the version of the input collection format standard (v1 or v2)')
    .option('-o, --output <path>', 'target file path where the converted collection will be written')
    .option('-p, --output-version [version]', 'required version to which the collection is needed to be converted to')
    .option('-P, --pretty', 'Pretty print the output')
    .option('--retain-ids', 'Retain the request and folder IDs during conversion (collection ID is always retained)')
    .option('-w, --overwrite', 'Overwrite the output file if it exists')
    .action(function (options) {
        var input;

        if (!options.output) {
            return log.error('Output file must be specified!');
        }
        if (!options.input) {
            return log.error('Input file must be specified!');
        }

        try {
            input = loadJSON(options.input);
        }
        catch (e) {
            return log.error('Unable to load the input file!', e);
        }

        return transformer.convert(input, options, function (err, result) {
            if (err) {
                return log.error('Unable to convert the input:', err);
            }

            return writeJSON(result, options, function (error) {
                if (error) {
                    log.error('Could not create output file %s', options.output, error);
                }
            });
        });
    });

program
    .command('normalize')
    .description('Normalizes a postman collection according to the provided version')
    .option('-i, --input <path>', 'Path to the collection JSON file to be normalized')
    .option('-n, --normalize-version <version>', 'The version to normalize the provided collection on')
    .option('-o, --output <path>', 'Path to the target file, where the normalized collection will be written')
    .option('-P, --pretty', 'Pretty print the output')
    .option('--retain-ids', 'Retain the request and folder IDs during conversion (collection ID is always retained)')
    .option('-w, --overwrite', 'Overwrite the output file if it exists')
    .action(function (options) {
        if (!options.input) { return log.error('Input file must be specified!'); }
        if (!options.output) { return log.error('Output file must be specified!'); }

        var input;

        try { input = loadJSON(options.input); }
        catch (e) { return log.error('Unable to load the input file!', e); }

        return transformer.normalize(input, options, function (err, result) {
            if (err) { return log.error('Unable to convert the input: ', err); }

            return writeJSON(result, options, function (error) {
                error && log.error('Could not create output file %s', options.output, error);
            });
        });
    });

// Describe the options and usage instructions for the `validate` command
program
    .command('validate')
    .description('Verify whether a postman collection adheres to version specifications')
    .option('-i, --input <path>', 'path to the input postman collection file')
    .option('-s, --schema [version]', 'the version of the input collection format standard')
    .action(function (options) {
        console.warn('yet to be implemented', options, transformer);
        // @todo implement with as little and concise code as possible with least external dependencies
    });

program
    .command('*', 'Display usage text', { isDefault: true })
    .action(function () {
        program.outputHelp();
    });

program.parse(process.argv);
