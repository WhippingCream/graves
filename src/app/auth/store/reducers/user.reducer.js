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
		case Actions.RETRIEVE_GROUP_LIST: {
			const groupList = action.payload;
			if (groupList.length === 0) return { ...initialState };

			const reprGroupId = groupList[0].groupId;
			const { groupName } = groupList.find(elem => elem.groupId === reprGroupId);
			return {
				...initialState,
				groupList,
				reprGroupId,
				role: ['admin'], // 임시코드 (by ZeroBoom)
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
