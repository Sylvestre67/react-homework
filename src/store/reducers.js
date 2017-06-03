import { combineReducers } from 'redux'
import { REQUEST_PRODUCTS,RECEIVE_PRODUCTS,REQUEST_NEW_PAGE,NO_MORE_PRODUCTS } from './actions';

const initialState = {
	api:{
		page_number: 0,
		per_page: 30,
		endpoint:'/api/products',
		isBusy: false,
		hasMore: true,
		sorting_options: ['id','price','size'],
		sortingBy: 1
	},
	products : {
		ascii: []
	}
};

const api = (state = initialState.api, action) => {
	switch (action.type) {
		case REQUEST_PRODUCTS:
			return Object.assign({}, state,
				{ isBusy: true }
			);
		case RECEIVE_PRODUCTS:
			return Object.assign({}, state,
				{
					isBusy: false,
					hasMore: !(action.products.length === 0 || action.products.length < state.per_page)
				}
			);
		case REQUEST_NEW_PAGE:
			return Object.assign({}, state,
				{ page_number: state.page_number + 1}
			);
		default:
			return state
	}
};

const products = (state = initialState.products, action) => {
	switch (action.type) {
		case RECEIVE_PRODUCTS:
			return Object.assign({}, state,
				{ ascii: state.ascii.concat(action.products) }
			);
		default:
			return state
	}
};

const asciiDiscountStoreApp = combineReducers({
	products,
	api
});

export default asciiDiscountStoreApp;
