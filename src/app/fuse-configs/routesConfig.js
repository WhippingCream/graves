import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import authRoleExamplesConfigs from 'app/main/auth/authRoleExamplesConfigs';
import MyInfoConfig from 'app/main/MyInfo/MyInfoConfig';
import RankingConfig from 'app/main/ranking/RankingConfig';
import LoginPageConfig from 'app/main/login/LoginPageConfig';

const routeConfigs = [...authRoleExamplesConfigs, LoginPageConfig, MyInfoConfig, RankingConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/login" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
