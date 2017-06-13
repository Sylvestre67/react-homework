import axios from 'axios';
import { parseNDJSON } from '../utils';

/*
 * action types
 */
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export const SORT_PRODUCTS = 'SORT_PRODUCTS';
export const UPDATE_PRODUTS_DISPLAYED = 'UPDATE_PRODUTS_DISPLAYED';
export const UPDATE_SORT_INDEX = 'UPDATE_SORT_INDEX';


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

const updateSortIndex = (sortIndex) => {
	return {
		type: UPDATE_SORT_INDEX,
		sortingBy: sortIndex,
	}
};


const sortProducts = (products) => {
	return {
		type: SORT_PRODUCTS,
		isFetching: false,
		isBusy: false,
		products: products.data,
	}
};

export function updateProductsDisplayed(){
	return {
		type: UPDATE_PRODUTS_DISPLAYED

	}
}

/*
 * Thunk action creators
 */

export function fetchProducts() {

	return (dispatch, getState) => {

		dispatch(updateProductsDisplayed());

		let { api } = getState();
		let params = {
			limit: api.per_page,
			skip: api.products_displayed,
			sort: api.sorting_options[api.sortingBy]
		};
		let endpoint = api.endpoint;

		dispatch(requestProducts());

		return axios.get(endpoint,{params})
			.then(response => {
				/* Parsing NDJSON to JSON */
				response.data = parseNDJSON(response.data);
				return response
			})
			.then(products => {
				// Update the ascii list with the results of the API call.
				dispatch(receiveProducts(products));

				// Silently Loading the next chunk.
				if(api.hasMore
					&& api.products_displayed <= (api.ascii.length + products.data.length)){
					dispatch(preFetchProducts());
				}
			})
			.catch((err) => {
				throw(new Error(err));
			})

	}
}

export function preFetchProducts() {

	return (dispatch, getState) => {
		let { api } = getState();

		let params = {
			limit: api.per_page,
			skip: (api.products_displayed + api.per_page),
			sort: api.sorting_options[api.sortingBy]
		};
		let endpoint = api.endpoint;

		dispatch(requestProductsSilently);

		return axios.get(endpoint,{params})
			.then(response => {
				/* Parsing NDJSON to JSON */
				response.data = parseNDJSON(response.data);
				return response
			})
			.then(products => {
				// Update the ascii list with the results of the API call.
				dispatch(receiveProducts(products));
			})
			.catch((err) => {
				throw(new Error(err));
			})
	}
}

export function getMoreProducts(){
	return (dispatch, getState) => {
		let { api } = getState();
		if(api.hasMore){
			dispatch(fetchProducts());
		}
		else{
			if(api.products_displayed <= api.ascii.length){
				dispatch(updateProductsDisplayed());
			}
		}
	}
}

export function fetchSortProducts(sortIndex) {

	return (dispatch, getState) => {
		let { api } = getState();

		dispatch(updateSortIndex(sortIndex));

		let params = {
			limit: api.per_page,
			skip: (api.products_displayed + api.per_page),
			sort: api.sorting_options[sortIndex]
		};
		let endpoint = api.endpoint;

		dispatch(requestProducts());

		return axios.get(endpoint,{params})
			.then(response => {
				/* Parsing NDJSON to JSON */
				response.data = parseNDJSON(response.data);
				return response
			})
			.then(products => {
				// Update the ascii list with the results of the API call.
				dispatch(sortProducts(products));
			})
			.catch((err) => {
				throw(new Error(err));
			})
	}
}
