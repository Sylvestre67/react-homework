import React, { Component } from 'react';
//import { PropTypes } from 'prop-types';

//import { connect } from 'react-redux'

class App extends Component {

	componentDidMount(){
		//this.props.getSlideData('Campaign Summary');
	}

	render() {
		return (
			<p>Hello World !</p>
		);
	}
}

export default App;

/*App.propTypes = {
	getSlideData: PropTypes.func.isRequired
};

export default App

let mapStateToProps = (state) => {
	return { };
};

let mapDispatchToProps = (dispatch) => {
	return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);*/

