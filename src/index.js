var ok = require('@nichoth/ok')
var State = require('./state')
var View = require('./view')
var EVENTS = require('./EVENTS')
var subscribe = require('./subscribe')

var state = State()

var { view } = ok(state, View, document.getElementById('content'))
subscribe({ state, view })

if (process.env.NODE_ENV === 'development') {
    window.app = { state, view, EVENTS }
}

