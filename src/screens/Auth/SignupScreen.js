import React from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import Animated, {
	Easing,
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const SignupScreen = props => {
	const buttonOpacity = useSharedValue(1);

	const onStateChange = ({ nativeEvent }) => {
		const state = nativeEvent.state;
		if (state === State.END) {
			buttonOpacity.value = 0;
		}
	};

	const closeStateChange = ({ nativeEvent }) => {
		const state = nativeEvent.state;
		if (state === State.END) {
			buttonOpacity.value = 1;
		}
	};

	const buttonStyles = useAnimatedStyle(() => {
		const buttonY = interpolate(buttonOpacity.value, [ 0, 1 ], [ 100, 0 ], Extrapolate.CLAMP);
		return {
			opacity: withTiming(buttonOpacity.value, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			}),
			transform: [
				{
					translateY: withTiming(buttonY, {
						duration: 1000,
						easing: Easing.inOut(Easing.ease)
					})
				}
			]
		};
	});

	const fbButtonStyles = useAnimatedStyle(() => {
		const buttonY = interpolate(buttonOpacity.value, [ 0, 1 ], [ 100, 0 ], Extrapolate.CLAMP);
		return {
			opacity: withTiming(buttonOpacity.value, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			}),
			transform: [
				{
					translateY: withTiming(buttonY, {
						duration: 1000,
						easing: Easing.inOut(Easing.ease)
					})
				}
			]
		};
	});

	const bgStyles = useAnimatedStyle(() => {
		const bgY = interpolate(
			buttonOpacity.value,
			[ 0, 1 ],
			[ -height / 3 - 50, 0 ],
			Extrapolate.CLAMP
		);
		return {
			transform: [
				{
					translateY: withTiming(bgY, {
						duration: 1000,
						easing: Easing.inOut(Easing.ease)
					})
				}
			]
		};
	});

	const inputStyles = useAnimatedStyle(() => {
		const zIndex = interpolate(buttonOpacity.value, [ 0, 1 ], [ 1, -1 ], Extrapolate.CLAMP);

		const textInputY = interpolate(
			buttonOpacity.value,
			[ 0, 1 ],
			[ 0, 100 ],
			Extrapolate.CLAMP
		);

		const opacity = interpolate(buttonOpacity.value, [ 0, 1 ], [ 1, 0 ], Extrapolate.CLAMP);

		return {
			opacity,
			zIndex,
			transform: [
				{
					translateY: withTiming(textInputY, {
						duration: 1000,
						easing: Easing.inOut(Easing.ease)
					})
				}
			]
		};
	});

	const closeButtonStyles = useAnimatedStyle(() => {
		const rotateCross = interpolate(
			buttonOpacity.value,
			[ 0, 1 ],
			[ 180, 360 ],
			Extrapolate.CLAMP
		);
		return {
			transform: [
				{
					rotate: withTiming(`${rotateCross}deg`, {
						duration: 1000,
						easing: Easing.inOut(Easing.ease)
					})
				}
			]
		};
	});

	return (
		<View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'flex-end' }}>
			<Animated.View style={[ { ...StyleSheet.absoluteFill }, bgStyles ]}>
				<Svg height={height + 50} width={width}>
					<ClipPath id="clip">
						<Circle r={height + 50} cx={width / 2} />
					</ClipPath>
					<Image
						width={width}
						height={height + 50}
						href={require('../../../assets/Images/bg.jpg')}
						preserveAspectRatio="xMidYMid slice"
						clipPath="url(#clip)"
					/>
				</Svg>
			</Animated.View>
			<View style={{ height: height / 3 }}>
				<TapGestureHandler onHandlerStateChange={onStateChange}>
					<Animated.View style={[ styles.button, buttonStyles ]}>
						<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sign In</Text>
					</Animated.View>
				</TapGestureHandler>
				<TapGestureHandler onHandlerStateChange={onStateChange}>
					<Animated.View
						style={[ { ...styles.button, backgroundColor: '#2e71dc' }, fbButtonStyles ]}
					>
						<Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
							Sign In with Facebook
						</Text>
					</Animated.View>
				</TapGestureHandler>
				<Animated.View
					style={[
						{
							height: height / 3,
							...StyleSheet.absoluteFill,
							top: null,
							justifyContent: 'center'
						},
						inputStyles
					]}
				>
					<TapGestureHandler onHandlerStateChange={closeStateChange}>
						<Animated.View style={styles.closeButton}>
							<Animated.Text style={[ { fontSize: 15 }, closeButtonStyles ]}>
								X
							</Animated.Text>
						</Animated.View>
					</TapGestureHandler>
					<TextInput
						style={styles.textInput}
						placeholder="Email"
						placeholderTextColor="black"
					/>
					<TextInput
						style={styles.textInput}
						placeholder="Password"
						placeholderTextColor="black"
					/>
					<Animated.View style={styles.button}>
						<Text style={{ fontSize: 20, fontWeight: 'bold' }}> Sign In </Text>
					</Animated.View>
				</Animated.View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'white',
		height: 70,
		marginHorizontal: 20,
		borderRadius: 35,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 5,
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowColor: 'black',
		shadowOpacity: 0.2,
		elevation: 5
	},
	closeButton: {
		height: 40,
		width: 40,
		backgroundColor: 'white',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: -20,
		left: width / 2 - 20,
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowColor: 'black',
		shadowOpacity: 0.2,
		elevation: 5
	},
	textInput: {
		height: 50,
		padding: 15,
		borderRadius: 25,
		borderWidth: 0.5,
		marginHorizontal: 20,
		marginLeft: 10,
		marginVertical: 5,
		borderColor: 'rgba(0, 0, 0, 0.2)'
	}
});

export default SignupScreen;
