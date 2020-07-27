import * as Actions from '../actions';

const initialState = {
	role: [], // guest
	data: {
		displayName: '',
		photoURL: 'assets/images/avatars/Ahri.jpeg'
	}
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SET_USER_DATA: {
			const { groupName } = action.payload.groupList.result.find(elem => elem.groupId === action.payload.reprGroupId);
			return {
				...initialState,
				...action.payload,
				data: {
					...initialState.data,
					displayName: groupName
				}
			};
		}
		case Actions.REMOVE_USER_DATA: {
			return {
				...initialState
			};
		}
		case Actions.USER_LOGGED_OUT: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};

export default user;
