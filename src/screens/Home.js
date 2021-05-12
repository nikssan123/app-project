import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { AuthContext } from '../context/AuthContext';

const HomeScreen = props => {
	const { logout } = useContext(AuthContext);
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={logout}>
				<Text style={{ color: 'white' }}>Logout</Text>
			</TouchableOpacity>
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

export default HomeScreen;
