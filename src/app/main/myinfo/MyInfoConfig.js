import { authRoles } from 'app/auth';
import MyInfo from './MyInfo';

const MyInfoConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
            path: '/myinfo',
			auth: authRoles.user,
			component: MyInfo
		}
	]
};

export default MyInfoConfig;
