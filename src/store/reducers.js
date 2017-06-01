import { combineReducers } from 'redux'
import { GET_SLIDE_DATA } from './actions';

const initialState = {
	slides:{}
};

function slides(state = initialState.slides, action) {
	switch (action.type) {
		case GET_SLIDE_DATA:
			return Object.assign({}, state,
				{ title: action.payload }
			);
		default:
			return state
	}
}

const pdfReportApp = combineReducers({
	slides
});

export default pdfReportApp;

