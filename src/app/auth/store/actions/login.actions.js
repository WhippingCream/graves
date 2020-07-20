import camilleRiotAuthService from 'app/services/camilleRiotAuthService';
import * as UserActions from './user.actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({ id, password }) {
	return dispatch =>
		camilleRiotAuthService
			.signInWithIdAndPassword(id, password)
			.then(user => {
				dispatch(UserActions.setUserData(user));

				return dispatch({
					type: LOGIN_SUCCESS
				});
			})
			.catch(error => {
				return dispatch({
					type: LOGIN_ERROR,
					payload: error
				});
			});
}
