import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SocialMediaButtons = ({ googlePressHandler, fbPressHandler }) => {
	return (
		<View style={styles.socialMediaGroup}>
			<Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>Sign In With:</Text>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					marginTop: 10
				}}
			>
				<TouchableOpacity onPress={googlePressHandler}>
					<FontAwesome5 name="google" size={50} color="white" />
					{/* <SocialIcon type="google" /> */}
				</TouchableOpacity>
				<TouchableOpacity style={{ marginLeft: 25 }} onPress={fbPressHandler}>
					<FontAwesome5 name="facebook" size={50} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	socialMediaGroup: {
		// flex: 0.4,
		marginTop: 40,
		zIndex: 10
	}
});

export default SocialMediaButtons;
