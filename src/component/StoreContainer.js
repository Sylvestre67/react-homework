import React, { Component } from 'react';
//import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'

import { getMoreProducts } from '../store/actions';
import { fetchSortProducts } from '../store/actions';

import { Store } from './Store'

class StoreContainer extends Component {
	constructor(props) {
		super(props);
	}
}

let mapStateToProps = (state) => {
	return {
		api: state.api
	};
};

let mapDispatchToProps = (dispatch) => {
	return {
		getMoreProducts: () => {
			dispatch(getMoreProducts())
		},
		fetchSortProducts: (sortIndex) => {
			dispatch(fetchSortProducts(sortIndex))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
