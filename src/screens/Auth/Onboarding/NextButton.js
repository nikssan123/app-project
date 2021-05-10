import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Animated, { interpolate, useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated';
import Svg, { G, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const size = 120;
const strokeWidth = 2;
const center = size / 2;
const radius = center - strokeWidth / 2;
const circumference = 2 * Math.PI * radius;

const FunctionName = ({ percentage, onPress, last }) => {
	const props = useAnimatedProps(() => {
		return {
			strokeDashoffset: circumference - circumference * percentage.value / 100
		};
	});

	const style = useAnimatedStyle(() => {
		const padding = interpolate(percentage.value, [ 0, 100 ], [ 18, 40 ]);
		return { padding };
	});

	return (
		<View style={styles.container}>
			<Svg width={size} height={size}>
				<G rotation="-90" origin={center}>
					<Circle
						stroke="#E6E7E8"
						cx={center}
						cy={center}
						r={radius}
						strokeWidth={strokeWidth}
					/>
					<AnimatedCircle
						animatedProps={props}
						stroke="#F4338F"
						cx={center}
						cy={center}
						r={radius}
						strokeWidth={strokeWidth}
						strokeDasharray={circumference}
					/>
				</G>
			</Svg>
			<AnimatedTouchableOpacity style={[ styles.button, style ]} onPress={onPress}>
				<AntDesign name="arrowright" size={32} color="#fff" />
			</AnimatedTouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		position: 'absolute',
		backgroundColor: '#F4338F',
		borderRadius: 100,
		padding: 18
	}
});

export default FunctionName;
