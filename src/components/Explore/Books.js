import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import BooksSvg from '../../../assets/Images/Books';

const { width } = Dimensions.get('window');

const Books = props => {
	return (
		<View>
			<BooksSvg width={width * 0.8} height={width * 0.58} />
			<Text style={styles.title}>Books</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		color: 'white',
		fontStyle: 'italic',
		fontSize: 24,
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: 20
	}
});

export default Books;
