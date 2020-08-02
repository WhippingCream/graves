export function getKDAColor(kda) {
	switch (true) {
		case kda >= 5:
			return '#E29205';
		case kda >= 4:
			return '#1F8ECD';
		case kda >= 3:
			return '#2DAF7F';
		default:
			return '#9999AF';
	}
}

export function getWinRateColor(winRate) {
	switch (true) {
		case winRate >= 60:
			return '#D16971';
		default:
			return '#9999AF';
	}
}
