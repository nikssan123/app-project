import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ChangeAuth = ({ handlePress, action }) => {
	return (
		<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 8 }}>
			{action === 'signin' ? (
				<Text style={styles.signupButton}>Don't Have an Account yet?</Text>
			) : (
				<Text style={styles.signupButton}>Already Have an Account?</Text>
			)}

			<TouchableOpacity
				touchSoundDisabled={true}
				// onPress={() => navigation.navigate('Signup')}
				onPress={handlePress}
				style={{ marginLeft: 5 }}
			>
				{action === 'signin' ? (
					<Text style={styles.blueSpan}>Sign Up</Text>
				) : (
					<Text style={styles.blueSpan}>Sign In</Text>
				)}
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	signupButton: {
		fontSize: 18,
		color: 'white',
		justifyContent: 'center'
		// marginBottom: 50
	},
	blueSpan: {
		fontSize: 18,
		color: '#00cffd'
	}
});

export default ChangeAuth;
