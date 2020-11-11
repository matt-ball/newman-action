module.exports = {
    isObject (subject) {
        return (typeof subject === 'object' && subject !== null);
    },

    isFunction (subject) {
        return (typeof subject === 'function');
    },

    isString (subject) {
        return (typeof subject === 'string');
    },

    randomNumber () {
        return ~~(Math.random() * 100000000);
    }
};
