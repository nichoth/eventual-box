var { h, Component } = require('preact')
var EVENTS = require('../EVENTS')
var Router = require('../routes')

var router = Router()

function View (props) {
    var { emit } = props
    if (props.route.pathname) var m = router.match(props.route.pathname)
    if (m) var RouteView = m.action(m)
    else return <div>path not found</div>

    return <div>
        <RouteView {...props} />
        <hr />
        <App />
        hello {props.foo + ' '}
        <button onClick={emit(EVENTS.hello.world)}>emit event</button>
    </div>
}

class App extends Component {
    constructor () {
        super()
        this.state = { needToAWeb3Browser: false }
    }

    async getAddressFromMetaMask() {
        console.log('here', window.ethereum)
        if (typeof window.ethereum == "undefined") {
          this.setState({ needToAWeb3Browser: true });
        } else {
          const accounts = await window.ethereum.enable();
          this.setState({ accounts });
        }
    }

    async componentDidMount () {
        await this.getAddressFromMetaMask()
    }

    render (props, state) {
        console.log('in render', props, state)
        return <h1>App</h1>
    }
}

module.exports = View

