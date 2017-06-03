import axios from 'axios';
import { parseNDJSON } from '../utils';

/*
 * action types
 */
export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const REQUEST_NEW_PAGE = 'REQUEST_NEW_PAGE';
export const NO_MORE_PRODUCTS = 'NO_MORE_PRODUCTS';

/*
 * action creators
 */

const requestItems = () => {
	return {
		type: REQUEST_ITEMS,
	}
};

export function updatePageOfProducts(pageNumber){
	return {
		type: REQUEST_NEW_PAGE,
		page: pageNumber
	}
}

const receiveChunkOfItems = (products) => {
	return {
		type: RECEIVE_ITEMS,
		products: products.data,
	}
};

const noMoreProducts = () => {
	return {
		type: NO_MORE_PRODUCTS,
		hasMore: false
	}
};

/*
 * Thunk action creators
 */

// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchItems(nextChunk) {

	// Thunk middleware knows how to handle functions.
	// It passes the dispatch method as an argument to the function,
	// thus making it able to dispatch actions itself.

	return (dispatch, getState) => {

		let { api } = getState();
		let params = {limit: api.per_page, skip: api.per_page * api.page_number};
		let endpoint = api.endpoint;

		dispatch(requestItems(api.endpoint,params));

		return axios.get(endpoint,{params})
			.then(response => {
				/* Parsing NDJSON to JSON */
				response.data = parseNDJSON(response.data);
				return response
			})
			.then(products => {
				// Update the ascii list with the results of the API call.
				dispatch(receiveChunkOfItems(products));

				if(products.data.length == 0 || products.data.length < api.per_page){ dispatch(noMoreProducts()); }
				// Load the next chunk, but without triggering the lock.
				if(nextChunk && !products.data.length == 0){ dispatch(fetchItems(false)) }
			})
			.catch((err) => {
				throw(new Error(err));
			})
	}
}


export function getPageOfProducts(pageNumber){
	return (dispatch,getState) => {
		let { products } = getState();
		(products.hasMore)
			? (dispatch(updatePageOfProducts(pageNumber)),dispatch(fetchItems(false)))
			: null;
	}
}

