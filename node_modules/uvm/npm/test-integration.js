#!/usr/bin/env node
// ---------------------------------------------------------------------------------------------------------------------
// This script is intended to execute all unit tests.
// ---------------------------------------------------------------------------------------------------------------------
/* eslint-env node, es6 */

// set directories and files for test and coverage report
var path = require('path'),

    NYC = require('nyc'),
    sh = require('shelljs'),
    chalk = require('chalk'),
    expect = require('chai').expect,
    recursive = require('recursive-readdir'),

    COV_REPORT_PATH = '.coverage',
    SPEC_SOURCE_DIR = path.join('test', 'integration');

module.exports = function (exit) {
    // banner line
    console.log(chalk.yellow.bold('Running integration tests using mocha on node...'));

    sh.test('-d', COV_REPORT_PATH) && sh.rm('-rf', COV_REPORT_PATH);
    sh.mkdir('-p', COV_REPORT_PATH);

    var Mocha = require('mocha'),
        nyc = new NYC({
            hookRequire: true,
            reporter: ['text', 'lcov', 'text-summary'],
            reportDir: COV_REPORT_PATH,
            tempDirectory: COV_REPORT_PATH
        });

    nyc.wrap();
    // add all spec files to mocha
    recursive(SPEC_SOURCE_DIR, function (err, files) {
        if (err) { console.error(err); return exit(1); }

        var mocha = new Mocha({ timeout: 1000 * 60 });

        // specially load bootstrap file
        mocha.addFile(path.join(SPEC_SOURCE_DIR, '_bootstrap.js'));

        files.filter(function (file) { // extract all test files
            return (file.substr(-8) === '.test.js');
        }).forEach(mocha.addFile.bind(mocha));

        // start the mocha run
        global.expect = expect; // for easy reference

        mocha.run(function (runError) {
            // clear references and overrides
            delete global.expect;

            runError && console.error(runError.stack || runError);

            nyc.reset();
            nyc.writeCoverageFile();
            nyc.report();
            exit(runError ? 1 : 0);
        });
        // cleanup
        mocha = null;
    });
};

// ensure we run this script exports if this is a direct stdin.tty run
!module.parent && module.exports(process.exit);
