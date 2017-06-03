import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { debounce } from '../utils';

import './Store.less';

import { Product } from './Product';
import { Ad } from './Ad';

export class Store extends Component {

	constructor(props) {
		super(props);
		this._onScroll = debounce(this._onScroll.bind(this), 50);
	}

	componentDidMount(){
		this.props.fetchNewPageOfProducts();
	}

	_renderProducts(){
		let end = this.props.api.page_number * this.props.api.per_page;
		return this.props.products.ascii.slice(0,end)
			.map((product,index,ascii) => {
				return ((index + 1)%20 !== 0)
					? <Product key={product.id}
					           price={product.price}
					           face={product.face}/>
					: <Ad key={index} />
			});
	}

	_onScroll(){
		let scrollPosition = (this.refs.productsList.scrollHeight - this.refs.productsList.clientHeight) - this.refs.productsList.scrollTop;
		(scrollPosition < 50)
			? this.props.getNewPageOfProducts()
			: null;
	};

	render() {
		return (
			<div className="products-list" ref="productsList" onScroll={this._onScroll.bind(this)} >
				{this._renderProducts()}
				{(this.props.api.isBusy
				&& this.props.products.ascii.length < this.props.api.page_number * this.props.api.per_page)
					? <p>Loading More Product, please wait !</p>
					: null }
				{!this.props.api.hasMore
					? <p>... No More Product ... {this.props.products.ascii.length}</p>
					: null }
			</div>
		);
	}
}

/*
* <div style={{'height':'100%'}}>
 <p>
 {this.props.api.page_number} -
 {this.props.products.ascii.length} -
 {this.props.api.hasMore}
 </p>
 */