import React, { Component } from 'react';
//import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'

import { fetchItems, getPageOfProducts } from '../store/actions';

import { Store } from './Store'

class StoreContainer extends Component {
	constructor(props) {
		super(props);
	}
}

let mapStateToProps = (state) => {
	return {
		api: state.api,
		ads: state.ads,
		products: state.products
	};
};

let mapDispatchToProps = (dispatch) => {
	return {
		getItems: (endpoint,params,nextChunk) => {
			dispatch(fetchItems(endpoint,params,nextChunk))
		},
		getPageOfProducts: (pageNumber) => {
			dispatch(getPageOfProducts(pageNumber))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
