const {h, render, Component, Text} = require('ink')
const TextInput = require('ink-text-input')
const { ApolloClient } = require('apollo-boost')
const { InMemoryCache } = require("apollo-cache-inmemory")
const { createHttpLink } = require("apollo-link-http")
const fetch = require('node-fetch')

const { request } = require('graphql-request')
const client = new ApolloClient({
  link: createHttpLink({uri: "http://localhost:4000/graphql", fetch}),
  cache: new InMemoryCache()
})

const gql = require('graphql-tag')

class SearchQuery extends Component {
	constructor() {
		super();

		this.state = {
			query: '{ hello { there } }',
			result: 'oh, '
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render(props, state) {
		return (
		  <div>
  			<div>
  				<Text green>
  				  Result: {state.result}
  				</Text>
  			</div>
  			<br />
  			<div>
  				Query:

  				<TextInput
  					value={state.query}
  					onChange={this.handleChange}
  					onSubmit={this.handleSubmit}
  				/>
  			</div>
			</div>
		);
	}

	handleChange(value) {
		this.setState({
			query: value
		})
	}

	handleSubmit(value) {
	  request('http://localhost:4000/graphql', value)
  		.then(data => {
  		  const state = { query: value }
  		  if (data.hello) {
   		    state.result = data.hello.there
    		} else {
    		  data = data.objects[0]
    		  state.result = `${data.title} by ${data.maker}`
    		}
    		this.setState(state)
  		})
  		.catch(console.error)
  }
}

module.exports = SearchQuery
