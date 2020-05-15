import * as Actions from '../actions';

const initialState = {
	data: [],
	searchText: ''
};

const rankingReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_RANKING: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.SET_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		default: {
			return state;
		}
	}
};

export default rankingReducer;
