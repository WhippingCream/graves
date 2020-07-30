import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';

const CAMILLE_RIOT_TOKEN_KEY = 'camille_riot_token';
const CAMILLE_RIOT_TOKEN_EXPIRES_AT = 'camille_riot_token_expires_at';
const qs = require('querystring');
/* eslint-disable camelcase */

class CamilleRiotAuthService extends FuseUtils.EventEmitter {
	init() {
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const accessToken = this.getAccessToken();

		if (!accessToken) {
			this.emit('onNoAccessToken');
			return;
		}

		if (this.isAuthTokenValid(accessToken)) {
			this.setSession(accessToken);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'accessToken expired');
		}
	};

	signInWithIdAndPassword = (id, password) => {
		return new Promise((resolve, reject) => {
			axios.post('/api/user/login', qs.stringify({ id, password })).then(response => {
				if (response.status === 200) {
					this.setSession(response.data.loginResult.token);
					resolve(response.data);
				} else {
					reject(response.data);
				}
			});
		});
	};

	// signInWithToken = () => {
	// 	return new Promise((resolve, reject) => {
	// 		axios
	// 			.get('/api/auth/access-token', {
	// 				data: {
	// 					access_token: this.getAccessToken()
	// 				}
	// 			})
	// 			.then(response => {
	// 				if (response.data.user) {
	// 					this.setSession(response.data.access_token);
	// 					resolve(response.data.user);
	// 				} else {
	// 					this.logout();
	// 					Promise.reject(new Error('Failed to login with token.'));
	// 				}
	// 			})
	// 			.catch(error => {
	// 				this.logout();
	// 				Promise.reject(new Error('Failed to login with token.'));
	// 			});
	// 	});
	// };

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = accessToken => {
		if (accessToken) {
			localStorage.setItem(CAMILLE_RIOT_TOKEN_KEY, accessToken);

			const expiresAt = new Date();
			expiresAt.setMinutes(expiresAt.getMinutes() + 1);
			localStorage.setItem(CAMILLE_RIOT_TOKEN_EXPIRES_AT, expiresAt.getTime());

			axios.defaults.headers.common.RiotTokenId = accessToken;
		} else {
			localStorage.removeItem(CAMILLE_RIOT_TOKEN_KEY);
			localStorage.removeItem(CAMILLE_RIOT_TOKEN_EXPIRES_AT);

			delete axios.defaults.headers.common.RiotTokenId;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthenticated = () => {
		const accessToken = this.getAccessToken();
		if (!accessToken) return false;

		const expiresAt = Number(localStorage.getItem(CAMILLE_RIOT_TOKEN_EXPIRES_AT));
		const isNotExpired = new Date().getTime() < expiresAt;
		if (isNotExpired) return true;

		this.logout();
		return false;
	};

	isAuthTokenValid = access_token => {
		return access_token;
		// if (!access_token) {
		// 	return false;
		// }
		// const decoded = jwtDecode(access_token);
		// const currentTime = Date.now() / 1000;
		// if (decoded.exp < currentTime) {
		// 	console.warn('access token expired');
		// 	return false;
		// }

		// return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem(CAMILLE_RIOT_TOKEN_KEY);
	};
}

const instance = new CamilleRiotAuthService();

export default instance;
