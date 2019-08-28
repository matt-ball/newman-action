// There is a string variant of the library in bridge-client.js
describe('flatted dependency', function () {
    // To update flatted, the package needs to be updated and then post installing flatted, one needs to
    // manually copy node_modules/flatted/min.js and replace it in where the previous
    // circular-json code existed within lib/uvm/bridge-client.js. Finally, we should replace all backslash "\"
    // characters with double backslash "\\". (if any)
    it('must be version locked, unless modified intentionally', function () {
        expect(require('../../package.json').dependencies.flatted).to.equal('2.0.1');
    });
});
