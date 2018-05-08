const importJsx = require('import-jsx')
const {h, Component, Text} = require('ink')
const SearchQuery = importJsx('./query')
const PropTypes = require('prop-types')

class UI extends Component {
	render({name}) {
		return (
			<SearchQuery />
		)
	}
}

UI.propTypes = {
	name: PropTypes.string
}

UI.defaultProps = {
	name: 'Ink'
}

module.exports = UI
