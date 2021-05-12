import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeedScreen = props => {
	return (
		<View style={styles.container}>
			<Text style={{ color: 'white' }}>FeedScreen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#251f41'
	}
});

export default FeedScreen;
