import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Slide = ({ item }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{item.title}</Text>
			<Text style={styles.description}>{item.description}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 44
	},
	title: {
		alignSelf: 'center',
		marginTop: 12,
		fontSize: 20,
		color: 'white'
	},
	description: {
		fontFamily: 'Montserrat',
		textAlign: 'center',
		lineHeight: 24,
		fontSize: 16,
		marginTop: 20,
		color: 'white'
	}
});

export default Slide;
