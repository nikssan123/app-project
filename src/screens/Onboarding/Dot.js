import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const Dot = ({ index, currentIndex }) => {
	const animatedStyles = useAnimatedStyle(() => {
		const opacity = interpolate(
			currentIndex.value,
			[ index - 1, index, index + 1 ],
			[ 0.4, 1, 0.4 ],
			Extrapolate.CLAMP
		);
		const width = interpolate(
			currentIndex.value,
			[ index - 1, index, index + 1 ],
			[ 10, 15, 10 ],
			Extrapolate.CLAMP
		);
		return { opacity, width };
	});
	return <Animated.View style={[ styles.dot, animatedStyles ]} />;
};

const styles = StyleSheet.create({
	dot: {
		height: 8,
		borderRadius: 4,
		marginHorizontal: 6,
		marginTop: 10,
		// backgroundColor: '#2CB9B0'
		backgroundColor: '#8449fc'
	}
});

export default Dot;
