import React, { useState } from 'react';

import {
	View,
	Text,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	ScrollView,
	Image,
	Dimensions,
	Platform
	// TouchableOpacity
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// onPress -> activate animation -> show loading -> hide Title and make logo larger and translate it to the center

const { height, width } = Dimensions.get('window');

const behaviour = Platform.OS === 'ios' ? 'paddding' : null;

const SigninScreen = ({ navigation }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={behaviour}>
			<ScrollView>
				<LinearGradient
					style={styles.container}
					colors={[ '#00cffd', '#ff6fb0' ]}
					// colors={[ '#BFEAF5', '#FFE4D9' ]}
					start={{ x: 0, y: 1 }}
					end={{ x: 1, y: 1 }}
				>
					<View style={styles.header}>
						<View style={styles.filler} />
						{/* <View style={[ styles.fillerContent, { borderBottomRightRadius: 70 } ]} /> */}
						<LinearGradient
							style={{ flex: 1, borderBottomRightRadius: 70 }}
							colors={[ '#00cffd', '#ff6fb0' ]}
							start={{ x: 0, y: 1 }}
							end={{ x: 1, y: 1 }}
						/>
					</View>
					<View style={styles.main}>
						{/* Animate based on this view -> tapgesturehandler -> animated the borders - slide effect */}
						{/* <View
							style={{
								...StyleSheet.absoluteFill,
								backgroundColor: 'white',
								flex: 1,
								zIndex: 10
							}}
						>
							<Text>test</Text>
						</View> */}
						<View style={styles.titleGroup}>
							<Image
								style={styles.logo}
								source={require('../../../assets/icon.png')}
							/>
							<Text style={styles.title}>Sign In</Text>
						</View>

						{/* <Text style={styles.subtitle}>Welcome Back</Text> */}
						<View style={styles.inputGroup}>
							<View style={styles.input}>
								<MaterialIcons
									style={styles.icon}
									name="email"
									size={24}
									color="black"
								/>
								<TextInput
									style={{
										fontSize: 20,
										flex: 1
									}}
									adaptKeyboard
									autoCapitalize="none"
									autoCorrect={false}
									placeholder="Email"
									// autoFocus
									value={email}
									onChangeText={e => setEmail(e)}
								/>
							</View>
							<View style={styles.input}>
								<MaterialIcons
									style={styles.icon}
									name="vpn-key"
									size={24}
									color="black"
								/>
								<TextInput
									style={{
										fontSize: 20,
										flex: 1
									}}
									adaptKeyboard
									autoCapitalize="none"
									autoCorrect={false}
									placeholder="Password"
									// autoFocus
									value={password}
									onChangeText={e => setPassword(e)}
								/>
							</View>
						</View>
						<LinearGradient
							style={styles.button}
							colors={[ '#00cffd', '#ff6fb0' ]}
							start={{ x: 0, y: 1 }}
							end={{ x: 1, y: 1 }}
						>
							<TouchableOpacity>
								<Text style={styles.buttonText}>Login</Text>
							</TouchableOpacity>
						</LinearGradient>

						<View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 8 }}>
							<Text style={styles.signupButton}>Don't Have an Account yet?</Text>
							<TouchableOpacity
								touchSoundDisabled={true}
								onPress={() => navigation.navigate('Signup')}
								style={{ marginLeft: 5 }}
							>
								<Text style={styles.blueSpan}>Sign Up</Text>
							</TouchableOpacity>
						</View>
						{/* <TouchableOpacity style={{ marginLeft: 5 }}>
							<Text style={styles.blueSpan}>Forgot Password?</Text>
						</TouchableOpacity> */}
						<View style={styles.socialMediaGroup}>
							<Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>
								Login with:
							</Text>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'center',
									marginTop: 10
								}}
							>
								<TouchableOpacity>
									<FontAwesome5 name="google" size={50} color="white" />
								</TouchableOpacity>
								<TouchableOpacity style={{ marginLeft: 20 }}>
									<FontAwesome5 name="facebook" size={50} color="white" />
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={styles.footer}>
						<View style={styles.filler} />
						<LinearGradient
							style={{ flex: 1, borderTopLeftRadius: 70 }}
							colors={[ '#00cffd', '#ff6fb0' ]}
							start={{ x: 0, y: 1 }}
							end={{ x: 1, y: 1 }}
						/>
					</View>
				</LinearGradient>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		height
	},
	header: {
		flex: 0.15
	},
	main: {
		flex: 0.7,
		backgroundColor: '#251f41',
		borderBottomRightRadius: 70,
		borderTopLeftRadius: 70,
		padding: 40
	},
	titleGroup: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20
	},
	title: {
		alignSelf: 'center',
		fontSize: 30,
		fontWeight: '700',
		color: 'white',
		opacity: 0.7
	},
	subtitle: {
		alignSelf: 'center',
		fontSize: 22,
		color: 'white',
		marginTop: 10,
		marginBottom: 20
	},
	logo: {
		width: 50,
		height: 50,
		marginHorizontal: 10
	},
	inputGroup: {
		flex: 0.6,
		marginTop: 10,
		justifyContent: 'space-evenly'
	},
	icon: {
		flex: 0.2
	},
	input: {
		backgroundColor: '#8449fc',
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 13,
		color: 'white',
		flexDirection: 'row',
		alignItems: 'center'
	},
	button: {
		paddingVertical: 10,
		backgroundColor: '#8449fc',
		borderRadius: 20,
		marginTop: 20
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 20,
		color: 'white',
		fontWeight: '700'
	},
	signupButton: {
		fontSize: 18,
		color: 'white',
		justifyContent: 'center'
		// marginBottom: 50
	},
	blueSpan: {
		fontSize: 18,
		color: '#00cffd'
	},
	socialMediaGroup: {
		flex: 0.4,
		marginTop: 40
		// position: 'absolute',
		// bottom: 30,
		// transform: [ { translateX: width / 2 - 50 } ]
	},
	footer: {
		flex: 0.15
	},
	filler: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: '#251f41'
	}
});

export default SigninScreen;
