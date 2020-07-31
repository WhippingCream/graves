import * as Actions from '../actions';

const initialState = {
	data: null
};

const championInfoReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.RETRIEVE_CHAMPION_INFO: {
			return {
				...state,
				...action.data.data
			};
		}
		default: {
			return state;
		}
	}
};

export default championInfoReducer;
