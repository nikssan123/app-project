import React, { useMemo } from 'react';
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

const CustomBackdrop = ({ animatedIndex, style }) => {
	// animated variables
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(animatedIndex.value, [ 0, 1 ], [ 0, 0.5 ], Extrapolate.CLAMP)
	}));

	// styles
	const containerStyle = useMemo(
		() => [
			style,
			{
				backgroundColor: 'black'
			},
			containerAnimatedStyle
		],
		[ style, containerAnimatedStyle ]
	);

	return <Animated.View style={containerStyle} />;
};

export default CustomBackdrop;
