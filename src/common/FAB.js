import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const FAB = ({ containerStyles, innerComponent, onPress, disabled }) => {
	return (
		<TouchableOpacity
			disabled={disabled}
			activeOpacity={0.8}
			onPress={onPress}
			style={[ styles.container, containerStyles ]}
		>
			{innerComponent}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 50,
		height: 50,
		backgroundColor: 'red',
		borderRadius: 50,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		left: null,
		right: 15,
		bottom: 20,
		zIndex: 999,
		shadowOffset: {
			height: 5,
			width: 2
		},
		elevation: 5,
		shadowColor: 'black'
	}
});

export default FAB;
