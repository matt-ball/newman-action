var stacktrace = require('stack-trace'),
    hash = require('object-hash'),
    uuid = require('uuid'),
    SerialisedError;

SerialisedError = function (err, decorate) {
    var now = new Date(); // to hold date here before any more time is lost

    // If the function is called without the `new` operator, then we do it on behalf of the callee
	if (!(this instanceof SerialisedError)) {
		return new SerialisedError(err, decorate);
	}

    // Iterate on user-defined properties of error and mix in the default non ennumerable properties
	(typeof err === 'object') && (err !== null) &&
        Object.keys(err).concat(['name', 'message', 'stack']).forEach(function (key) {
    		this[key] = err[key];
    	}, this);

    // add additional meta information
    if (decorate) {
        this.checksum = hash.MD5(this);
        this.id = uuid.v4();
        this.timestamp = now.getTime();
        this.stacktrace = stacktrace.parse(this);
    }
};

module.exports = SerialisedError;
