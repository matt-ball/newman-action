# uvm

Module that exposes an event emitter to send data across contexts (vm in node and iframe in browser)

## Usage

```
var uvm = require('uvm');

uvm.createHost({
    bootTimeout: 30 * 1000, // default 30s. set `undefined` for Infinity
    bootCode: `bridge.on('ping', function () {
        bridge.send('pong', Date.now())
    });`
}, function (err, bridge) {

    bridge.on('pong', console.log);
    bridge.send('ping');
});
```
