var { h, Component } = require('preact')
var EVENTS = require('../EVENTS')
var Router = require('../routes')
// var Box = require('3box')

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
        // console.log('win', window.Box)
        await this.getAddressFromMetaMask()
        const box = await Box.openBox(this.state.accounts[0],
            window.ethereum)
        const space = await box.openSpace('foo-bar-space')
        this.setState({ space, box })

        const rach = "0x2f4cE4f714C68A3fC871d1f543FFC24b9b3c2386"
        const thread = await space.joinThread('thread-name', {
            firstModerator: rach,
            members: false
        })

        this.setState({ thread }, () => (this.getAppsthread()))
    }

    async getAppsThread () {
         if (!this.state.thread) {
             console.error("apps thread not in react state");
             return;
        }

        const posts = await this.state.thread.getPosts();
        this.setState({posts});

        await this.state.thread.onUpdate(async()=> {
            const posts = await this.state.thread.getPosts();
            this.setState({posts});
        })
    }

    render (props, state) {
        console.log('in render', props, state)
        return <h1>App</h1>
    }
}

module.exports = View

