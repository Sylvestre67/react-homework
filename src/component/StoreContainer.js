import React, { Component } from 'react';
//import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'

import { getNewPageOfProducts, fetchNewPageOfProducts } from '../store/actions';

import { Store } from './Store'

class StoreContainer extends Component {
	constructor(props) {
		super(props);
	}
}

let mapStateToProps = (state) => {
	return {
		api: state.api,
		products: state.products
	};
};

let mapDispatchToProps = (dispatch) => {
	return {
		fetchNewPageOfProducts: () => {
			dispatch(fetchNewPageOfProducts())
		},
		getNewPageOfProducts: () => {
			dispatch(getNewPageOfProducts())
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
