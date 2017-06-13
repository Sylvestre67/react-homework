import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { debounce } from '../utils';

import './Store.less';

import { Product } from './Product';
import { Ad } from './Ad';

export class Store extends Component {

	constructor(props) {
		super(props);
		// Debounce the onScroll, otherwise it is getting messy on the UI !
		this._onScroll = debounce(this._onScroll.bind(this), 50);
	}

	componentDidMount(){
		/*
		* Initial fetch of product list.
		* */
		this.props.getMoreProducts();
	}

	_renderSorting(){
		/*
		* Sorting select field.
		* This should be a proper component, to make this re-usable.
		* The component would fire back the onchange event to his parent
		* and the _onSort() method would then be invoked.
		* */
		let sorting_options = this.props.api.sorting_options.map((value,index) => {
			return <option key={index} value={index}>{value}</option>
		});
		return(
			<div>
				<select value={(this.props.api.sortingBy).toString()}
				        onChange={this._onSort.bind(this)}>
					{sorting_options}
				</select>
			</div>
		)
	}

	_renderProducts(){
		/*
		* Render the list of products.
		* */
		let end = this.props.api.products_displayed;
		return this.props.api.ascii.slice(0,end)
			.map((product,index,ascii) => {
				return ((index + 1)%20 !== 0)
					? <Product key={product.id}
					           date={product.date}
					           price={product.price}
					           face={product.face}/>
					: <Ad key={index} />
			});
	}

	_onScroll(){
		let scrollPosition = (this.refs.productsList.scrollHeight - this.refs.productsList.clientHeight) - this.refs.productsList.scrollTop;
		(scrollPosition < 50)
			? this.props.getMoreProducts()
			: null;
	};

	_onSort(event){
		/*
		* This should also update the UI to mask the current list
		* until the newly sorted list is presented.
		* */
		this.props.fetchSortProducts(parseInt(event.target.value));
	}

	render() {
		return (
			<div className="products-list" ref="productsList" onScroll={this._onScroll.bind(this)}>
				{this._renderSorting()}
				{this._renderProducts()}
				{(this.props.api.isBusy && this.props.api.ascii.length <= this.props.api.products_displayed)
					? <p>Loading, please wait !</p>
					: null }
				{!this.props.api.hasMore && this.props.api.products_displayed >= this.props.api.ascii.length
					? <p>... No More Product ... {this.props.api.ascii.length}</p>
					: null }
			</div>
		);
	}
}
