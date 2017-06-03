import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { debounce } from '../utils';

import { Product } from './Product';
import { Ad } from './Ad';

export class Store extends Component {

	constructor(props) {
		super(props);
		this._onScroll = debounce(this._onScroll.bind(this), 250);
	}

	componentDidMount(){
		this.props.getItems(true);
	}

	_renderProducts(){
		let end = this.props.api.page_number * this.props.api.per_page;
		return this.props.products.ascii.slice(0,end)
			.map((product,index,ascii) => {
				return ((index + 1)%20 !== 0)
					? <Product key={product.id}
								 price={product.price}
			                    face={product.face}/>
					: <Ad id={index} />
			});
	}

	_onScroll(){
		let scrollPosition = (this.refs.productsList.scrollHeight - this.refs.productsList.clientHeight) - this.refs.productsList.scrollTop;
		(scrollPosition < 100 && !this.props.api.isFetching && this.props.products.isFetching)
			? this.props.getPageOfProducts((this.props.api.page_number + 1))
			: null;
	};

	render() {
		return (
			<div className="products-list" ref="productsList" onScroll={this._onScroll.bind(this)}>
				{this._renderProducts()}
				{(this.props.api.isFetching)
					? <p>Loading More Product, please wait !</p>
					: null }
				{!this.props.products.hasMore
					? <p>... No More Product ...</p>
					: null }
			</div>
		);
	}
}
