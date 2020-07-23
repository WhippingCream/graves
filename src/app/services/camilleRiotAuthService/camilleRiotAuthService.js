import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';

const CAMILLE_RIOT_TOKEN_KEY = 'camille_riot_token';
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
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');
			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
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

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.get('/api/auth/access-token', {
					data: {
						access_token: this.getAccessToken()
					}
				})
				.then(response => {
					if (response.data.user) {
						this.setSession(response.data.access_token);
						resolve(response.data.user);
					} else {
						this.logout();
						Promise.reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					this.logout();
					Promise.reject(new Error('Failed to login with token.'));
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem(CAMILLE_RIOT_TOKEN_KEY, access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem(CAMILLE_RIOT_TOKEN_KEY);
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthenticated = () => {
		if (!this.lock) {
			return false;
		}

		const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
		const isNotExpired = new Date().getTime() < expiresAt;
		if (isNotExpired) {
			return true;
		}

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
