import { authRoles } from 'app/auth';
import React from 'react';

const RankingConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/ranking',
			auth: authRoles.user,
			component: React.lazy(() => import('./Ranking'))
		}
	]
};

export default RankingConfig;
