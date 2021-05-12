import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = props => {
	return (
		<View style={styles.container}>
			<Text style={{ color: 'white' }}>ProfileScreen</Text>
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

export default ProfileScreen;
