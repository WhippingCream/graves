import history from '@history';
import _ from '@lodash';
import * as FuseActions from 'app/store/actions/fuse';

export const SET_TOKEN_DATA = '[USER] SET TOKEN DATA';
export const SET_USER_DATA = '[USER] SET DATA';
export const SET_GROUP_LIST = '[USER] SET GROUP LIST';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';

export function setGroupList(groupList) {
	return dispatch => {
		history.location.state = {
			redirectUrl: 'myinfo'
		};

		dispatch({
			type: SET_GROUP_LIST,
			payload: groupList
		});
	};
}

export function setUserData(user) {
	return dispatch => {
		history.location.state = {
			redirectUrl: 'myinfo'
		};

		// 임시 코드 (by ZeroBoom)
		user.role = ['admin'];
		user.reprGroupId = user.groupList[0].groupId;

		dispatch({
			type: SET_USER_DATA,
			payload: user
		});
	};
}

export function updateUserSettings(settings) {
	return (dispatch, getState) => {
		const oldUser = getState().auth.user;
		const user = _.merge({}, oldUser, { data: { settings } });

		updateUserData(user, dispatch);

		return dispatch(setUserData(user));
	};
}

export function updateUserShortcuts(shortcuts) {
	return (dispatch, getState) => {
		const { user } = getState().auth;
		const newUser = {
			...user,
			data: {
				...user.data,
				shortcuts
			}
		};

		updateUserData(newUser, dispatch);

		return dispatch(setUserData(newUser));
	};
}
export function removeUserData() {
	return {
		type: REMOVE_USER_DATA
	};
}

export function logoutUser() {
	return (dispatch, getState) => {
		const { user } = getState().auth;

		if (!user.role || user.role.length === 0) {
			// is guest
			return null;
		}

		history.push({
			pathname: '/'
		});

		switch (user.from) {
			case 'firebase':
				break;
			case 'auth0':
				break;
			default:
				break;
		}

		dispatch(FuseActions.setInitialSettings());

		return dispatch({
			type: USER_LOGGED_OUT
		});
	};
}

function updateUserData(user, dispatch) {
	if (!user.role || user.role.length === 0) {
		// is guest
		return;
	}

	switch (user.from) {
		case 'firebase': {
			break;
		}
		case 'auth0': {
			break;
		}
		default: {
			break;
		}
	}
}
