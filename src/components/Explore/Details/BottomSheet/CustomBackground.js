import React, { useMemo } from 'react';
import Animated, {
	useAnimatedStyle,
	interpolate,
	Extrapolate,
	interpolateColor
} from 'react-native-reanimated';

const CustomBackground = ({ style, animatedIndex }) => {
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(animatedIndex.value, [ 0, 1 ], [ '#7568b6', '#948ac7' ])
	}));
	const containerStyle = useMemo(() => [ style, containerAnimatedStyle ], [
		style,

		containerAnimatedStyle
	]);
	//#endregion

	// render
	return (
		<Animated.View
			pointerEvents="none"
			style={[
				containerStyle,
				{
					borderTopLeftRadius: 18,
					borderTopRightRadius: 18
				}
			]}
		/>
	);
};

export default CustomBackground;
