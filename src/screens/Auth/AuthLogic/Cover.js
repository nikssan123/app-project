import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

const Cover = ({
	handleSigninStateChange,
	handleSignupStateChange,
	mainCoverStyles,
	signInStyles,
	signUpStyles
}) => {
	return (
		<Animated.View style={[ styles.container, mainCoverStyles ]}>
			<View
				style={{
					position: 'absolute',
					justifyContent: 'center',
					alignItems: 'center',
					top: 50
				}}
			>
				<Image
					style={{ width: 80, height: 80 }}
					// source={require('../../../assets/icon.png')}
					source={require('../../../../assets/icon.png')}
				/>
				<Text style={{ fontSize: 30, fontWeight: '700', color: 'white' }}>App Name</Text>
			</View>
			<TapGestureHandler onHandlerStateChange={handleSigninStateChange}>
				<Animated.View
					style={[
						{
							// flex: 1
							...styles.button,
							backgroundColor: '#00cffd'
						},
						signInStyles
					]}
				>
					{/* <LinearGradient
                        style={{
                            height: 50,
                            paddingHorizontal: 40,
                            marginHorizontal: 20,
                            marginVertical: 20,
                            borderRadius: 25,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'stretch'
                        }}
                        colors={[ '#00cffd', '#ff6fb0' ]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                    > */}
					<Text style={{ color: 'white', fontSize: 20 }}>Sign In</Text>
					{/* </LinearGradient> */}
				</Animated.View>
			</TapGestureHandler>
			<TapGestureHandler onHandlerStateChange={handleSignupStateChange}>
				<Animated.View
					style={[
						{
							// flex: 1
							...styles.button,
							backgroundColor: '#ff6fb0'
						},
						signUpStyles
					]}
				>
					{/* <LinearGradient
                        style={{
                            height: 50,
                            paddingHorizontal: 40,
                            marginHorizontal: 20,
                            marginVertical: 20,
                            borderRadius: 25,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'stretch'
                        }}
                        colors={[ '#00cffd', '#ff6fb0' ]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                    > */}
					<Text style={{ color: 'white', fontSize: 20 }}>Sign Up</Text>
					{/* </LinearGradient> */}
				</Animated.View>
			</TapGestureHandler>
			<TouchableOpacity>
				<Text style={{ color: 'white', opacity: 0.7, fontSize: 20 }}>Forgot password?</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFill,
		backgroundColor: '#251f41',
		flex: 1,
		// zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		height: 50,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
		marginHorizontal: 20,
		marginVertical: 10
	}
});

export default Cover;
