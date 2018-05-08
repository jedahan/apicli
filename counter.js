const { h, Component, Text } = require('ink')

class Counter extends Component {
  constructor () {
    super()

    this.state = {
      i: 0
    }
  }

  render() {
    return (
      <div>
        <div>
          <Text red>λ </Text>
          <Text green> node </Text>
          <Text> media/example </Text>
        </div>
        <br />
        <Text green> {this.state.i} tests passed </Text>
      </div>
    )
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      if (this.state.i === 50) {
        process.exit(0)
      }

      this.setState({
        i: this.state.i + 1
      })
    }, 100)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }
}

module.exports = Counter
