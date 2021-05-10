import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const Side = ({ container, animatedStyles }) => {
	return (
		<View style={container}>
			<View style={styles.filler} />
			<Animated.View
				style={[
					{
						flex: 1,
						overflow: 'hidden'
					},
					animatedStyles
				]}
			>
				<LinearGradient
					style={{ flex: 1 }}
					colors={[ '#00cffd', '#ff6fb0' ]}
					start={{ x: 0, y: 1 }}
					end={{ x: 1, y: 1 }}
				/>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	filler: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: '#251f41'
	}
});

export default Side;
