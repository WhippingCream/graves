import axios from 'axios';
import camilleRiotAuthService from 'app/services/camilleRiotAuthService';

const createCamilleAxios = () => {
	const instance = axios.create();
	instance.defaults.headers.common.RiotTokenId = camilleRiotAuthService.getAccessToken();
	return instance;
};

export default createCamilleAxios;
