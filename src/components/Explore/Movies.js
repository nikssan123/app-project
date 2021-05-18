import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MoviesSvg from '../../../assets/Images/Movies';

const { width } = Dimensions.get('window');

const Movies = props => {
	return (
		<View>
			<MoviesSvg width={width * 0.8} height={width * 0.6} />
			<Text style={styles.title}>Explore New Movies</Text>
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

export default Movies;
