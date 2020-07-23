import * as Actions from '../actions';

const initialState = {
	scoreInfo: {}
};

const myInfoReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_MYINFO: {
			return {
				...state,
				scoreInfo: action.payload
			};
		}
		default: {
			return state;
		}
	}
};

export default myInfoReducer;
