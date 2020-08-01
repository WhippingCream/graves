import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import * as authActions from 'app/auth/store/actions';
import React from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		'& .logo-icon': {
			width: 24,
			height: 24,
			transition: theme.transitions.create(['width', 'height'], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		},
		'& .logo-text': {
			transition: theme.transitions.create('opacity', {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		}
	}
}));

function Logo() {
	const dispatch = useDispatch();
	const classes = useStyles();

	const onLogoutClick = () => {
		dispatch(authActions.logoutUser());
	};

	return (
		<div className={clsx(classes.root, 'flex items-center')}>
			<img className="logo-icon" src="assets/images/logos/logo.png" alt="logo" />
			<Typography className="text-16 mx-12 font-light logo-text" color="inherit">
				Graves
			</Typography>
			<div className="flex items-center py-4 px-8 rounded">
				<Button onClick={onLogoutClick}>
					<Typography className="text-10" color="inherit">
						Logout
					</Typography>
				</Button>
			</div>
		</div>
	);
}

export default Logo;
