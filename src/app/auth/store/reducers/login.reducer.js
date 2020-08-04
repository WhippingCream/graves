import * as Actions from '../actions';

const initialState = {
	success: false,
	isPending: false,
	error: {
		username: null,
		password: null
	}
};

const login = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOGIN_SUCCESS: {
			return {
				...initialState,
				success: true,
				isPending: false
			};
		}
		case Actions.LOGIN_ERROR: {
			return {
				success: false,
				isPending: false,
				error: action.payload
			};
		}
		case Actions.TRY_LOGIN: {
			return {
				...initialState,
				isPending: true
			};
		}
		default: {
			return state;
		}
	}
};

export default login;
