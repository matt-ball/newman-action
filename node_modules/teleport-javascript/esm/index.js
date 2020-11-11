var TeleportJS = (function (Primitive, primitive) { // eslint-disable-line no-unused-vars
  var REF_KEY_PREFIX = '_'
  var SINGLE_REF = REF_KEY_PREFIX + '0'
  var REF_PREFIX = {
    undefined: 'u',
    number: 'n',
    bigint: 'b',
    symbol: 's',
    Map: 'M',
    Set: 'S',
    Date: 'D',
    RegExp: 'R',
    Buffer: 'B',
    Int8Array: 'H',
    Uint8Array: 'I',
    Uint8ClampedArray: 'J',
    Int16Array: 'P',
    Uint16Array: 'Q',
    Int32Array: 'F',
    Uint32Array: 'G',
    Float32Array: 'K',
    Float64Array: 'L'
  }

  /*!
   * ISC License
   *
   * Copyright (c) 2018, Andrea Giammarchi, @WebReflection
   */

  var TeleportJS = {

    parse: function parse (text, reviver) {
      var input = JSON.parse(text, Primitives).map(primitives)
      var len = input.length
      var refs = len > 1 ? input[len - 1] : []
      var value = input[0]
      var $ = reviver || noop
      var tmp = typeof value === 'object' && value
        ? revive(input, refs, new Set(), value, $)
        : (value === SINGLE_REF && refs.length ? reviveRefs(refs, 0) : value)
      return $.call({ '': tmp }, '', tmp)
    },

    stringify: function stringify (value, replacer, space) {
      for (var
        firstRun,
        known = new Map(),
        knownRefs = new Map(),
        refs = [],
        input = [],
        output = [],
        $ = replacer && typeof replacer === typeof input
          ? function (k, v) {
            if (k === '' || replacer.indexOf(k) > -1) return v
          }
          : (replacer || noop),
        i = +set(known, input, $.call({ '': value }, '', value)),
        replace = function (key, value) {
          var after = $.call(this, key, value)
          var refIndex = setRefs(knownRefs, refs, key, after, this)

          // bail out if value set via ref
          if (refIndex) {
            return refIndex
          }

          if (firstRun) {
            firstRun = !firstRun
            return value
            // this was invoking twice each root object
            // return i < 1 ? value : $.call(this, key, value);
          }

          switch (typeof after) {
            case 'object':
              if (after === null) return after
              // eslint-disable-next-line no-fallthrough
            case primitive:
              return known.get(after) || set(known, input, after)
          }
          return after
        };
        i < input.length; i++
      ) {
        firstRun = true
        output[i] = JSON.stringify(input[i], replace, space)
      }
      refs.length && output.push(JSON.stringify(refs))
      return '[' + output.join(',') + ']'
    }

  }

  return TeleportJS

  function noop (key, value) {
    return value
  }

  function reviveRefs (refs, index) {
    var value = refs[index].substring(1)

    switch (refs[index].charAt(0)) {
      case REF_PREFIX.undefined:
        refs[index] = undefined
        break
      case REF_PREFIX.number:
        refs[index] = Number(value)
        break
      case REF_PREFIX.bigint:
        refs[index] = BigInt(value)
        break
      case REF_PREFIX.symbol:
        refs[index] = Symbol.for(value)
        break
      case REF_PREFIX.RegExp:
        var parts = /\/(.*)\/(.*)/.exec(value)
        refs[index] = new RegExp(parts[1], parts[2])
        break
      case REF_PREFIX.Buffer:
        refs[index] = Buffer.from(JSON.parse(value))
        break
      case REF_PREFIX.Date:
        refs[index] = new Date(value)
        break
      case REF_PREFIX.Map:
        refs[index] = new Map(TeleportJS.parse(value))
        break
      case REF_PREFIX.Set:
        refs[index] = new Set(TeleportJS.parse(value))
        break
      case REF_PREFIX.Int8Array:
        refs[index] = new Int8Array(JSON.parse(value))
        break
      case REF_PREFIX.Uint8Array:
        refs[index] = new Uint8Array(JSON.parse(value))
        break
      case REF_PREFIX.Uint8ClampedArray:
        refs[index] = new Uint8ClampedArray(JSON.parse(value))
        break
      case REF_PREFIX.Int16Array:
        refs[index] = new Int16Array(JSON.parse(value))
        break
      case REF_PREFIX.Uint16Array:
        refs[index] = new Uint16Array(JSON.parse(value))
        break
      case REF_PREFIX.Int32Array:
        refs[index] = new Int32Array(JSON.parse(value))
        break
      case REF_PREFIX.Uint32Array:
        refs[index] = new Uint32Array(JSON.parse(value))
        break
      case REF_PREFIX.Float32Array:
        refs[index] = new Float32Array(JSON.parse(value))
        break
      case REF_PREFIX.Float64Array:
        refs[index] = new Float64Array(JSON.parse(value))
        break
    }

    return refs[index]
  }

  function revive (input, refs, parsed, output, $) {
    return Object.keys(output).reduce(
      function (output, key) {
        var value = output[key]
        if (value instanceof Primitive) {
          if (value.startsWith(REF_KEY_PREFIX)) {
            var index = value.substring(1)

            if (refs[index] instanceof Primitive) {
              reviveRefs(refs, index)
            }

            output[key] = refs[index]
            return output
          }

          var tmp = input[value]
          if (typeof tmp === 'object' && !parsed.has(tmp)) {
            parsed.add(tmp)
            output[key] = $.call(output, key, revive(input, refs, parsed, tmp, $))
          } else {
            output[key] = $.call(output, key, tmp)
          }
        } else { output[key] = $.call(output, key, value) }
        return output
      },
      output
    )
  }

  function set (known, input, value) {
    var index = Primitive(input.push(value) - 1)
    known.set(value, index)
    return index
  }

  function setRefs (known, refs, key, value, obj) {
    var after
    var i

    switch (typeof value) {
      // case 'boolean': break
      // case 'function': break
      case 'string':
        if (obj[key] instanceof Date) {
          after = REF_PREFIX.Date + value
        }
        break
      case 'undefined':
        after = REF_PREFIX.undefined
        break
      case 'number':
        if (!Number.isFinite(value)) {
          after = REF_PREFIX.number + Primitive(value)
        }
        break
      case 'bigint':
        after = REF_PREFIX.bigint + Primitive(value)
        break
      case 'symbol':
        var description = Primitive(value)
        after = REF_PREFIX.symbol + description.substring(7, description.length - 1)
        break
      case 'object':
        if (value === null) {
          break
        } else if (value.type === 'Buffer' && value.data && Buffer.isBuffer(obj[key])) {
          after = REF_PREFIX.Buffer + JSON.stringify(value.data)
        } else if (value instanceof RegExp) {
          after = REF_PREFIX.RegExp + Primitive(value)
        } else if (value instanceof Map) {
          var m = []
          for (i of value.entries()) m.push(i)
          after = REF_PREFIX.Map + TeleportJS.stringify(m)
        } else if (value instanceof Set) {
          var s = []
          for (i of value.values()) s.push(i)
          after = REF_PREFIX.Set + TeleportJS.stringify(s)
        } else if (value instanceof Int8Array) {
          after = REF_PREFIX.Int8Array + JSON.stringify(Array.apply([], value))
        } else if (value instanceof Uint8Array) {
          after = REF_PREFIX.Uint8Array + JSON.stringify(Array.apply([], value))
        } else if (value instanceof Uint8ClampedArray) {
          after = REF_PREFIX.Uint8ClampedArray + JSON.stringify(Array.apply([], value))
        } else if (value instanceof Int16Array) {
          after = REF_PREFIX.Int16Array + JSON.stringify(Array.apply([], value))
        } else if (value instanceof Uint16Array) {
          after = REF_PREFIX.Uint16Array + JSON.stringify(Array.apply([], value))
        } else if (value instanceof Int32Array) {
          after = REF_PREFIX.Int32Array + JSON.stringify(Array.apply([], value))
        } else if (value instanceof Uint32Array) {
          after = REF_PREFIX.Uint32Array + JSON.stringify(Array.apply([], value))
        } else if (value instanceof Float32Array) {
          after = REF_PREFIX.Float32Array + JSON.stringify(Array.apply([], value))
        } else if (value instanceof Float64Array) {
          after = REF_PREFIX.Float64Array + JSON.stringify(Array.apply([], value))
        }
        break
    }

    if (!after) {
      return
    }

    var index = known.get(after)

    if (index) {
      return index
    }

    index = REF_KEY_PREFIX + Primitive(refs.push(after) - 1)
    known.set(after, index)
    return index
  }

  // the two kinds of primitives
  //  1. the real one
  //  2. the wrapped one

  function primitives (value) {
    return value instanceof Primitive ? Primitive(value) : value
  }

  function Primitives (key, value) {
    // eslint-disable-next-line valid-typeof
    return typeof value === primitive ? new Primitive(value) : value
  }
}(String, 'string'))
export default TeleportJS
export var parse = TeleportJS.parse
export var stringify = TeleportJS.stringify
