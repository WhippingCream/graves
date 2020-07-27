import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function MyInfoHeader(props) {
	return (
		<div className="p-24 flex items-center">
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<Icon className="text-32">face</Icon>
			</FuseAnimate>
			<FuseAnimate animation="transition.slideLeftIn" delay={300}>
				<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
					My Info
				</Typography>
			</FuseAnimate>
		</div>
	);
}

export default MyInfoHeader;
