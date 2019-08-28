var Benchmark = require('benchmark'),
    suite = new Benchmark.Suite(),
    uuid = require('uuid'),
    uvm = require('../../lib'),
    context,
    defers;

context = uvm.spawn({
    bootCode: `
        bridge.on('loopback', function (data) {
            bridge.dispatch('loopback', data);
        });
    `
});
defers = {};

context.on('loopback', function (data) {
    defers[data.__id].resolve();
});

suite.add('no object communication', {
    defer: true,
    fn: function (deferred) {
        var id = uuid();
        defers[id] = deferred;
        context.dispatch('loopback', {
            __id: id
        });
    }
}).add('flat object communication', {
    defer: true,
    fn: function (deferred) {
        var id = uuid();
        defers[id] = deferred;
        context.dispatch('loopback', {
            __id: id,
            testObject1: {},
            testObject2: {},
            testObject3: {},
            testObject4: {},
            testObject5: {},
            testObject6: {}
        });
    }
}).add('one level nested object communication', {
    defer: true,
    fn: function (deferred) {
        var id = uuid();
        defers[id] = deferred;
        context.dispatch('loopback', {
            __id: id,
            testObject1: {
                testObject2: {}
            },
            testObject3: {
                testObject4: {}
            },
            testObject5: {
                testObject6: {}
            }
        });
    }
}).add('two levels nested object communication', {
    defer: true,
    fn: function (deferred) {
        var id = uuid();
        defers[id] = deferred;
        context.dispatch('loopback', {
            __id: id,
            testObject1: {
                testObject2: {
                    testObject3: {}
                }
            },
            testObject4: {
                testObject5: {
                    testObject6: {}
                }
            }
        });
    }
}).add('full nested object communication', {
    defer: true,
    fn: function (deferred) {
        var id = uuid();
        defers[id] = deferred;
        context.dispatch('loopback', {
            __id: id,
            testObject1: {
                testObject2: {
                    testObject3: {
                        testObject4: {
                            testObject5: {
                                testObject6: {}
                            }
                        }
                    }
                }
            }
        });
    }
}).add('recursive nested object communication', {
    defer: true,
    fn: function (deferred) {
        var id = uuid(),
            testObject1,
            testObject4;

        testObject1 = {
            testObject2: {}
        };
        testObject4 = {
            testObject5: {}
        };

        testObject1.testObject2.testObject3 = testObject1;
        testObject4.testObject5.testObject6 = testObject4;

        defers[id] = deferred;
        context.dispatch('loopback', {
            __id: id,
            testObject1: testObject1,
            testObject4: testObject4
        });
    }
}).on('cycle', function (event) {
    console.log(String(event.target));
    defers = {}; // cleanup defers
}).on('complete', function () {
    defers = null; // cleanup defers
}).run({ async: true });
