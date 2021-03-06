import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import * as userActions from 'app/auth/store/actions';
import camilleRiotAuthService from 'app/services/camilleRiotAuthService';
import * as Actions from 'app/store/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Auth extends Component {
	state = {
		waitAuthCheck: true
	};

	componentDidMount() {
		return Promise.all([this.camilleRiotAuthCheck()]).then(() => {
			this.setState({ waitAuthCheck: false });
		});
	}

	camilleRiotAuthCheck = () =>
		new Promise(resolve => {
			camilleRiotAuthService.init(success => {
				if (!success) {
					resolve();
				}
			});

			if (camilleRiotAuthService.checkAuthenticated()) {
				this.props.retrieveGroupList();
				resolve();
				// camilleRiotAuthService.getUserData().then(tokenData => {
				// 	this.props.setUserDataCamilleRiotAuth(tokenData);
				// 	this.props.showMessage({ message: 'Logged in with CailleRiotAuth' });
				// });
			} else {
				resolve();
			}
		});

	render() {
		return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: userActions.logoutUser,
			retrieveGroupList: userActions.retrieveGroupList,
			showMessage: Actions.showMessage,
			hideMessage: Actions.hideMessage
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);
