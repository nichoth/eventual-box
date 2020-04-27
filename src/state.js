var observ = require('observ')
var struct = require('observ-struct')

function State () {
    return struct({
        foo: observ('world'),
        route: struct({})  // required
    })
}

module.exports = State

