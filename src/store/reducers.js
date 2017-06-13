import { combineReducers } from 'redux'
import { REQUEST_PRODUCTS,RECEIVE_PRODUCTS,UPDATE_PRODUTS_DISPLAYED,UPDATE_SORT_INDEX,SORT_PRODUCTS } from './actions';

const initialState = {
	api:{
		per_page: 30,
		products_displayed:0,
		endpoint:'/api/products',
		isBusy: false,
		hasMore: true,
		sorting_options: ['id','price','size'],
		sortingBy: 0,
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
				{   isBusy: false,
					hasMore: action.products.length >= state.per_page,
				    ascii: state.ascii.concat(action.products) }
			);
		case UPDATE_PRODUTS_DISPLAYED:
			return Object.assign({}, state,
				{   page_number: state.page_number + 1,
					products_displayed: state.products_displayed + state.per_page }
			);
		case UPDATE_SORT_INDEX:
			return Object.assign({}, state,
				{ sortingBy: action.sortingBy }
			);
		case SORT_PRODUCTS:
			return Object.assign({}, state,
				{ ascii: action.products }
			);
		default:
			return state
	}
};

const asciiDiscountStoreApp = combineReducers({
	api
});

export default asciiDiscountStoreApp;
