/**
 * This is a cross-platform event emitter with bridge interface.
 * It uses Flatted as dependency where code is modified slightly to allow loading as a string
 */

/**
 * Hold reference to this for security purpose
 *
 * @private
 */
const toString = String.prototype.toString;

/**
 * Generate code to be executed inside a VM for bootstrap.
 *
 * @param {String|Buffer} bootCode
 * @return {String}
 */
/* eslint-disable max-len */
module.exports = function (bootCode) {
    return `;
(function (emit) {
    /*! (c) 2020 Andrea Giammarchi, (ISC) */
    var Flatted=function(n){"use strict";var t=JSON.parse,r=JSON.stringify,e=Object.keys,a=String,u="string",f={},i="object",c=function(n,t){return t},l=function(n){return n instanceof a?a(n):n},o=function(n,t){return typeof t===u?new a(t):t},s=function(n,t,r){var e=a(t.push(r)-1);return n.set(r,e),e};return n.parse=function(n,r){var u=t(n,o).map(l),s=u[0],p=r||c,v=typeof s===i&&s?function n(t,r,u,c){for(var l=[],o=e(u),s=o.length,p=0;p<s;p++){var v=o[p],y=u[v];if(y instanceof a){var g=t[y];typeof g!==i||r.has(g)?u[v]=c.call(u,v,g):(r.add(g),u[v]=f,l.push({k:v,a:[t,r,g,c]}))}else u[v]!==f&&(u[v]=c.call(u,v,y))}for(var h=l.length,d=0;d<h;d++){var w=l[d],O=w.k,S=w.a;u[O]=c.call(u,O,n.apply(null,S))}return u}(u,new Set,s,p):s;return p.call({"":v},"",v)},n.stringify=function(n,t,e){for(var a=t&&typeof t===i?function(n,r){return""===n||-1<t.indexOf(n)?r:void 0}:t||c,f=new Map,l=[],o=[],p=+s(f,l,a.call({"":n},"",n)),v=!p;p<l.length;)v=!0,o[p]=r(l[p++],y,e);return"["+o.join(",")+"]";function y(n,t){if(v)return v=!v,t;var r=a.call(this,n,t);switch(typeof r){case i:if(null===r)return r;case u:return f.get(r)||s(f,l,r)}return r}},n}({});

    /*! (C) Postdot Technologies, Inc (Apache-2.0) */
    var arrayProtoSlice = Array.prototype.slice;

    bridge = { // ensure global using no var
        _events: {},
        emit: function (name) {
            var self = this,
                args = arrayProtoSlice.call(arguments, 1);
            this._events[name] && this._events[name].forEach(function (listener) {
                listener.apply(self, args);
            });
        },

        dispatch: function () {
            emit(Flatted.stringify(arrayProtoSlice.call(arguments)));
        },

        on: function (name, listener) {
            if (typeof listener !== 'function') { return; }
            !this._events[name] && (this._events[name] = []);
            this._events[name].push(listener);
        },

        off: function (name, listener) {
            var e = this._events[name],
                i = e && e.length || 0;

            if (!e) { return; }
            if (arguments.length === 1) {
                return delete this._events[name];
            }

            if (typeof listener === 'function' && (i >= 1)) {
                while (i >= 0) {
                    (e[i] === listener) && e.splice(i, 1);
                    i -= 1;
                }
            }
            if (!e.length) { delete this._events[name]; }
        }
    };

    // create the dispatch function inside a closure to ensure that actual function references are never modified
    __uvm_dispatch = (function (bridge, bridgeEmit) { // ensure global by not using var statement
        return function (args) {
            bridgeEmit.apply(bridge, Flatted.parse(args));
        };
    }(bridge, bridge.emit));

}(__uvm_emit));

// boot code starts hereafter
${(typeof bootCode === 'string') ? toString.call(bootCode) : ''};`;
};
