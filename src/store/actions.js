import axios from 'axios';
import { parseNDJSON } from '../utils';

/*
 * action types
 */
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const REQUEST_NEW_PAGE = 'REQUEST_NEW_PAGE';
export const NO_MORE_PRODUCTS = 'NO_MORE_PRODUCTS';

/*
 * action creators
 */

const requestProducts = () => {
	return {
		type: REQUEST_PRODUCTS,
		isFetching: true,
		isBusy: true
	}
};

const requestProductsSilently = () => {
	return {
		type: REQUEST_PRODUCTS,
		isFetching: false,
		isBusy: true
	}
};

const receiveProducts = (products) => {
	return {
		type: RECEIVE_PRODUCTS,
		isFetching: false,
		isBusy: false,
		products: products.data,
	}
};

export function updatePageNumber(){
	return {
		type: REQUEST_NEW_PAGE
	}
}

const noMoreProducts = () => {
	return {
		type: NO_MORE_PRODUCTS,
		hasMore: false
	}
};

/*
 * Thunk action creators
 */

export function fetchProducts(silently) {

	return (dispatch, getState) => {
		let { api } = getState();
		if(api.hasMore){
			let params = {
				limit: api.per_page,
				skip: api.per_page * (api.page_number + 1),
				sort: api.sorting_options[api.sortingBy]
			};
			let endpoint = api.endpoint;

			dispatch(requestProducts())

			return axios.get(endpoint,{params})
				.then(response => {
					/* Parsing NDJSON to JSON */
					response.data = parseNDJSON(response.data);
					return response
				})
				.then(products => {
					// Update the ascii list with the results of the API call.
					dispatch(receiveProducts(products));

					if(!silently){
						// Update the page number.
						dispatch(updatePageNumber(api.page_number + 1));
					}

					// Silently Loading the next chunk.
					if(!products.data.length >= (api.per_page*api.page_number)){
						dispatch(fetchProducts(true));
					}
				})
				.catch((err) => {
					throw(new Error(err));
				})
		}else {
			return null
		}
	}
}

export function getNewPageOfProducts(){
	return (dispatch,getState) => {
		dispatch(updatePageNumber());
		dispatch(fetchProducts(true));
	}
}

export function fetchNewPageOfProducts(pageNumber){
	return (dispatch) => {
		dispatch(fetchProducts(false))
	}
}
