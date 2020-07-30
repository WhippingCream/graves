import axios from 'axios';
import camilleRiotAuthService from 'app/services/camilleRiotAuthService';
import * as UserActions from './user.actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({ id, password }) {
	return dispatch =>
		camilleRiotAuthService
			.signInWithIdAndPassword(id, password)
			.then(user => {
				axios.get('/api/user/getGroupList').then(response => {
					if (response.status !== 200) {
						return;
					}

					dispatch({
						type: UserActions.SET_GROUP_LIST,
						payload: response
					});
				});

				return dispatch({
					type: LOGIN_SUCCESS,
					payload: user
				});
			})
			.catch(error => {
				return dispatch({
					type: LOGIN_ERROR,
					payload: error
				});
			});
}
