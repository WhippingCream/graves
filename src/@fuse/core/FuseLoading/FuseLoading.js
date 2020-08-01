import { useTimeout } from '@fuse/hooks';
import { LinearProgress, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

function FuseLoading(props) {
	const [showLoading, setShowLoading] = useState(!props.delay);

	useTimeout(() => {
		setShowLoading(true);
	}, props.delay);

	if (!showLoading) {
		return null;
	}

	return (
		<div className="flex flex-1 flex-col items-center justify-center">
			{props.isShowingText ? (
				<Typography className="text-20 mb-16" color="textSecondary">
					Loading...
				</Typography>
			) : null}
			{props.isLinearProgress ? (
				<LinearProgress className="w-xs" color="primary" />
			) : (
				<CircularProgress className="w-xs" color="primary" />
			)}
		</div>
	);
}

FuseLoading.propTypes = {
	delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
	isShowingText: PropTypes.bool,
	isLinearProgress: PropTypes.bool
};

FuseLoading.defaultProps = {
	delay: false,
	isShowingText: true,
	isLinearProgress: true
};

export default FuseLoading;
