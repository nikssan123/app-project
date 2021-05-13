import React, { useState, useContext } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	ScrollView,
	Image,
	Dimensions,
	TouchableOpacity,
	Platform,
	ActivityIndicator
	// TouchableOpacity
} from 'react-native';
import { State } from 'react-native-gesture-handler';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	Easing
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

import { AuthContext } from '../../../context/AuthContext';

import Cover from './Cover';
import Side from './Side';
import SocialMediaButtons from './SocialMediaButtons';
import ChangeAuth from './ChangeAuth';

// onPress -> activate animation -> show loading -> hide Title and make logo larger and translate it to the center

const { height, width } = Dimensions.get('window');

const behaviour = Platform.OS === 'ios' ? 'paddding' : null;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Auth = ({ navigation }) => {
	const { signin } = useContext(AuthContext);

	const [ action, setAction ] = useState('signin');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ showPassword, setShowPassword ] = useState(true);

	const buttonOpacity = useSharedValue(1);
	// const showPassword = useSharedValue(true);
	const titleOpacity = useSharedValue(1);

	const handleSubmit = () => {
		// if (action === 'signin') {
		// 	// signin
		// } else if (action === 'signup') {
		// 	// signup
		// }
		titleOpacity.value = 0;
		setLoading(true);

		setTimeout(() => {
			// navigation.navigate('Home');
			titleOpacity.value = 1;
			setLoading(false);
			signin(email, password);
		}, 3000);
	};

	const handleActionText = () => {
		if (action === 'signin') return <Text style={styles.buttonText}>Login</Text>;
		else if (action === 'signup') return <Text style={styles.buttonText}>Register</Text>;
	};

	const handleSigninStateChange = ({ nativeEvent }) => {
		const state = nativeEvent.state;
		if (state === State.END) {
			buttonOpacity.value = 0;
			setAction('signin');
		}
	};

	const handleSignupStateChange = ({ nativeEvent }) => {
		const state = nativeEvent.state;
		if (state === State.END) {
			buttonOpacity.value = 0;
			setAction('signup');
		}
	};

	const showPasswordHandler = () => {
		setShowPassword(() => !showPassword);
	};

	const headerStyles = useAnimatedStyle(() => {
		const borderBottomRightRadius = interpolate(
			buttonOpacity.value,
			[ 1, 0 ],
			[ 0, 70 ],
			Extrapolate.CLAMP
		);

		return {
			borderBottomRightRadius: withTiming(borderBottomRightRadius, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			})
		};
	});

	const footerStyles = useAnimatedStyle(() => {
		const borderTopLeftRadius = interpolate(
			buttonOpacity.value,
			[ 1, 0 ],
			[ 0, 70 ],
			Extrapolate.CLAMP
		);

		return {
			borderTopLeftRadius: withTiming(borderTopLeftRadius, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			})
		};
	});

	const mainBorderStyles = useAnimatedStyle(() => {
		const borderTopLeftRadius = interpolate(
			buttonOpacity.value,
			[ 1, 0 ],
			[ 0, 70 ],
			Extrapolate.CLAMP
		);

		const borderBottomRightRadius = interpolate(
			buttonOpacity.value,
			[ 1, 0 ],
			[ 0, 70 ],
			Extrapolate.CLAMP
		);

		return {
			borderTopLeftRadius: withTiming(borderTopLeftRadius, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			}),
			borderBottomRightRadius: withTiming(borderBottomRightRadius, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			})
		};
	});

	const signInStyles = useAnimatedStyle(() => {
		const translateX = interpolate(
			buttonOpacity.value,
			[ 0, 1 ],
			[ -200, 0 ],
			Extrapolate.CLAMP
		);

		return {
			opacity: withTiming(buttonOpacity.value, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			}),
			transform: [
				{
					translateX: withTiming(translateX, {
						duration: 1000,
						easing: Easing.inOut(Easing.ease)
					})
				}
			]
		};
	});

	const signUpStyles = useAnimatedStyle(() => {
		const translateX = interpolate(
			buttonOpacity.value,
			[ 0, 1 ],
			[ -200, 0 ],
			Extrapolate.CLAMP
		);

		return {
			opacity: withTiming(buttonOpacity.value, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			}),
			transform: [
				{
					translateX: withTiming(translateX, {
						duration: 1000,
						easing: Easing.inOut(Easing.ease)
					})
				}
			]
		};
	});

	const mainCoverStyles = useAnimatedStyle(() => {
		const opacity = interpolate(buttonOpacity.value, [ 0, 1 ], [ 0, 1 ], Extrapolate.CLAMP);
		const zIndex = interpolate(buttonOpacity.value, [ 0, 1 ], [ 0, 1 ], Extrapolate.CLAMP);

		return {
			opacity: withTiming(opacity, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			}),
			zIndex
		};
	});

	const opacityStyles = useAnimatedStyle(() => {
		const opacity = interpolate(buttonOpacity.value, [ 0, 1 ], [ 1, 0 ], Extrapolate.CLAMP);
		return {
			opacity: withTiming(opacity, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			})
		};
	});

	const animatedTitle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(titleOpacity.value, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			})
		};
	});

	const animatedLogo = useAnimatedStyle(() => {
		const translateX = interpolate(titleOpacity.value, [ 1, 0 ], [ 0, 60 ], Extrapolate.CLAMP);
		const scale = interpolate(titleOpacity.value, [ 1, 0 ], [ 1, 1.6 ], Extrapolate.CLAMP);

		return {
			transform: [
				{
					translateX: withTiming(translateX, {
						duration: 1000,
						easing: Easing.inOut(Easing.ease)
					})
				},
				{
					scale: withTiming(scale, {
						duration: 1000,
						easing: Easing.inOut(Easing.ease)
					})
				}
			]
		};
	});

	const closeButtonStyles = useAnimatedStyle(() => {
		const translateX = interpolate(
			buttonOpacity.value,
			[ 0, 1 ],
			[ -(width / 2 - 35), 0 ],
			Extrapolate.CLAMP
		);
		const rotate = interpolate(buttonOpacity.value, [ 0, 1 ], [ 360, 180 ], Extrapolate.CLAMP);
		const opacity = interpolate(buttonOpacity.value, [ 0, 1 ], [ 1, 0 ], Extrapolate.CLAMP);

		return {
			opacity: withTiming(opacity, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			}),
			transform: [
				{
					translateX: withTiming(translateX, {
						duration: 1000,
						easing: Easing.inOut(Easing.ease)
					})
				},
				{
					rotate: withTiming(`${rotate}deg`, {
						duration: 1000,
						easing: Easing.inOut(Easing.ease)
					})
				}
			]
		};
	});

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
					<Side container={styles.header} animatedStyles={headerStyles} />

					<Animated.View style={[ styles.main, mainBorderStyles ]}>
						<AnimatedTouchableOpacity
							onPress={() => (buttonOpacity.value = 1)}
							style={[
								styles.closeButton,
								closeButtonStyles,
								{ borderColor: '#1f1840', borderWidth: 0.4, zIndex: 10 }
							]}
						>
							<Text style={{ color: 'white', padding: 18 }}>X</Text>
						</AnimatedTouchableOpacity>
						{/* Animate based on this view -> tapgesturehandler -> animated the borders - slide effect */}
						<Cover
							handleSigninStateChange={handleSigninStateChange}
							handleSignupStateChange={handleSignupStateChange}
							signInStyles={signInStyles}
							signUpStyles={signUpStyles}
							mainCoverStyles={mainCoverStyles}
						/>
						<Animated.View
							style={[ { flex: 1, justifyContent: 'space-between' }, opacityStyles ]}
						>
							<View style={styles.titleGroup}>
								<Animated.Image
									style={[ styles.logo, animatedLogo ]}
									source={require('../../../../assets/icon.png')}
								/>
								{action === 'signin' ? (
									<Animated.Text style={[ styles.title, animatedTitle ]}>
										Sign In
									</Animated.Text>
								) : (
									<Animated.Text style={[ styles.title, animatedTitle ]}>
										Sign Up
									</Animated.Text>
								)}
							</View>

							{/* <Text style={styles.subtitle}>Welcome Back</Text> */}
							<View style={styles.inputGroup}>
								<View style={styles.input}>
									<MaterialIcons
										style={styles.icon}
										name="email"
										size={24}
										color="#251f41"
									/>
									<TextInput
										style={{
											fontSize: 20,
											flex: 2,
											paddingLeft: 15
										}}
										// adaptKeyboard
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
										color="#251f41"
									/>

									<TextInput
										style={{
											fontSize: 20,
											flex: 2,
											paddingLeft: 15
										}}
										adaptKeyboard
										autoCapitalize="none"
										autoCorrect={false}
										placeholder="Password"
										secureTextEntry={showPassword}
										// autoFocus
										value={password}
										onChangeText={e => setPassword(e)}
									/>
									<TouchableOpacity onPress={showPasswordHandler}>
										<MaterialIcons
											name="remove-red-eye"
											size={24}
											color="#251f41"
										/>
									</TouchableOpacity>
								</View>
							</View>
							<LinearGradient
								style={styles.button}
								colors={[ '#00cffd', '#ff6fb0' ]}
								start={{ x: 0, y: 1 }}
								end={{ x: 1, y: 1 }}
							>
								<TouchableOpacity disabled={loading} onPress={handleSubmit}>
									{loading ? (
										<ActivityIndicator
											style={styles.buttonText}
											color="white"
										/>
									) : (
										handleActionText()
									)}
								</TouchableOpacity>
							</LinearGradient>

							{/* Change this to Already have an account? Sign In */}
							<ChangeAuth
								handlePress={() =>
									setAction(() => {
										if (action === 'signin') {
											setAction('signup');
										} else if (action === 'signup') {
											setAction('signin');
										}
									})}
								action={action}
							/>
						</Animated.View>
						<SocialMediaButtons
							googlePressHandler={() => console.log('signed in with google')}
							fbPressHandler={() => console.log('signed in with fb')}
						/>
					</Animated.View>
					<Side container={styles.footer} animatedStyles={footerStyles} />
				</LinearGradient>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		height
	},
	closeButton: {
		height: 45,
		width: 45,
		justifyContent: 'center',
		alignItems: 'center',
		...StyleSheet.absoluteFill,
		left: null,
		top: -20,
		backgroundColor: '#251f41',
		borderRadius: 25,
		shadowOffset: {
			width: 15,
			height: 15
		},
		shadowColor: 'white',
		shadowOpacity: 0.7,
		elevation: 5
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
		marginBottom: 10,
		marginTop: 10
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
		flex: 1,
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
		alignItems: 'center',
		marginTop: 20
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

	footer: {
		flex: 0.15
	}
});

export default Auth;
