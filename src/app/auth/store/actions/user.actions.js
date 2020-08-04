import history from '@history';
import _ from '@lodash';
import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as FuseActions from 'app/store/actions/fuse';
import CamilleRiotAuthService from 'app/services/camilleRiotAuthService';

export const SET_TOKEN_DATA = '[USER] SET TOKEN DATA';
export const RETRIEVE_GROUP_LIST = '[USER] RETRIEVE GROUP LIST';
export const SET_GROUP_LIST = '[USER] SET GROUP LIST';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';

export function retrieveGroupList() {
	const createCamilleAxios = require('app/utility/camilleAxios').default;
	const request = createCamilleAxios().get('/api/user/getGroupList');

	return dispatch =>
		request
			.then(response => {
				const noGroup = response.data.length === 0;
				if (noGroup) {
					dispatch(logoutUser());
					dispatch(
						FuseActions.openDialog({
							children: (
								<>
									<DialogTitle id="alert-dialog-title">에러 발생!</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">
											이 계정이 포함되어 있는 그룹이 없습니다. <br />
											그룹에 등록되어 있는 계정이어야 합니다. <br />
											그룹 관리자에게 문의하세요.
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={() => dispatch(FuseActions.closeDialog())} color="primary" autoFocus>
											확인
										</Button>
									</DialogActions>
								</>
							)
						})
					);
					return;
				}

				history.location.state = {
					redirectUrl: 'myinfo'
				};

				dispatch({
					type: RETRIEVE_GROUP_LIST,
					payload: response.data
				});
			})
			.catch(e => {
				console.error(e);
				history.location.state = {
					redirectUrl: 'login'
				};
			});
}

export function updateUserSettings(settings) {
	return (dispatch, getState) => {
		const oldUser = getState().auth.user;
		const user = _.merge({}, oldUser, { data: { settings } });

		updateUserData(user, dispatch);

		// return dispatch(setUserData(user));
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

		// return dispatch(setUserData(newUser));
	};
}
export function removeUserData() {
	return {
		type: REMOVE_USER_DATA
	};
}

export function logoutUser() {
	return (dispatch, getState) => {
		CamilleRiotAuthService.logout();

		history.push({
			pathname: '/'
		});

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
