import { combineReducers } from 'redux'
import { REQUEST_ITEMS,RECEIVE_ITEMS,REQUEST_NEW_PAGE,NO_MORE_PRODUCTS } from './actions';

const initialState = {
	api:{
		page_number: 1,
		per_page: 30,
		endpoint:'/api/products',
		isFetching: false,
		sorting_options: ['id','price','size'],
		sortingBy: 1
	},
	products : {
		ascii: [],
		hasMore: true
	}
};

const api = (state = initialState.api, action) => {
	switch (action.type) {
		case REQUEST_ITEMS:
			return Object.assign({}, state,
				{ isFetching: true }
			);
		case RECEIVE_ITEMS:
			return Object.assign({}, state,
				{ isFetching: false}
			);
		case REQUEST_NEW_PAGE:
			return Object.assign({}, state,
				{ isFetching: true, page_number: action.page }
			);
		default:
			return state
	}
};

const products = (state = initialState.products, action) => {
	switch (action.type) {
		case REQUEST_ITEMS:
			return Object.assign({}, state,
				{ isFetching: true }
			);
		case RECEIVE_ITEMS:
			return Object.assign({}, state,
				{ ascii: state.ascii.concat(action.products) }
			);
		case NO_MORE_PRODUCTS:
			return Object.assign({}, state,
				{ hasMore: action.hasMore }
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
