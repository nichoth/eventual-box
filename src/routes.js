var Router = require('ruta3')
var { h } = require('preact')

function createRoutes () {
    var router = Router()

    router.addRoute('/', function foo (match) {
        return function (props) {
            console.log('props', props)
            return <div>foo</div>
        }
    })

    return router
}

module.exports = createRoutes

