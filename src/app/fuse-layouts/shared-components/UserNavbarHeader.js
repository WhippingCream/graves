import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as authActions from 'app/auth/store/actions';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		'&.user': {
			'& .username, & .email': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		}
	},
	avatar: {
		width: 72,
		height: 72,
		position: 'absolute',
		top: 72,
		padding: 8,
		background: theme.palette.background.default,
		boxSizing: 'content-box',
		left: '50%',
		transform: 'translateX(-50%)',
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		'& > img': {
			borderRadius: '50%'
		}
	}
}));

function UserNavbarHeader(props) {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);

	const classes = useStyles();

	const [groupListMenu, setGroupListMenu] = useState(null);

	const onGroupListClick = event => {
		setGroupListMenu(event.currentTarget);
	};

	const onGroupListClose = () => {
		setGroupListMenu(null);
	};

	const onChangeGroup = groupId => {
		dispatch(authActions.changeGroup(groupId));
		onGroupListClose();
	};

	return (
		<AppBar
			position="static"
			color="primary"
			elevation={0}
			classes={{ root: classes.root }}
			className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
		>
			<Button onClick={onGroupListClick}>
				<Typography className="username text-20 whitespace-no-wrap" color="inherit">
					{user.data.displayName}
				</Typography>

				<Icon className="text-16 hidden sm:flex" variant="action">
					keyboard_arrow_down
				</Icon>
			</Button>

			<Popover
				open={Boolean(groupListMenu)}
				anchorEl={groupListMenu}
				onClose={onGroupListClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				{user.groupList.map(elem => (
					<MenuItem key={elem.groupId} onClick={() => onChangeGroup(elem.groupId)} role="button">
						<ListItemIcon className="min-w-40">
							<Icon>account_circle</Icon>
						</ListItemIcon>
						<ListItemText primary={elem.groupName} />
					</MenuItem>
				))}
				<Divider />
				<MenuItem>
					<ListItemIcon className="min-w-40">
						<Icon>add_box</Icon>
					</ListItemIcon>
					<ListItemText primary="Create Group" />
				</MenuItem>
				<MenuItem
					onClick={() => {
						dispatch(authActions.logoutUser());
						onGroupListClose();
					}}
				>
					<ListItemIcon className="min-w-40">
						<Icon>exit_to_app</Icon>
					</ListItemIcon>
					<ListItemText primary="Logout" />
				</MenuItem>
			</Popover>

			<Avatar
				className={clsx(classes.avatar, 'avatar')}
				alt="user photo"
				src={user.data.photoURL && user.data.photoURL !== '' ? user.data.photoURL : 'assets/images/avatars/profile.jpg'}
			/>
		</AppBar>
	);
}

export default UserNavbarHeader;
