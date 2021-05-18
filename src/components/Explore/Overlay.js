import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	interpolate,
	withTiming,
	withDelay,
	Extrapolate
} from 'react-native-reanimated';

const TAB_BAR_HEIGHT = 60;

const { width, height } = Dimensions.get('window');

const Overlay = ({ onPress, booksOverlayButton, moviesOverlayButton }) => {
	// const booksOverlayButton = useSharedValue(false);
	// const moviesOverlayButton = useSharedValue(false);

	const bookPressHandler = () => {
		booksOverlayButton.value = !booksOverlayButton.value;
		setTimeout(() => {
			onPress();
		}, 800);
	};

	const moviePressHandler = () => {
		moviesOverlayButton.value = !moviesOverlayButton.value;
		setTimeout(() => {
			onPress();
		}, 800);
	};

	const booksOverlayStyles = useAnimatedStyle(() => {
		// const newHeight = interpolate(
		// 	booksOverlayButton.value,
		// 	[ 0, 1 ],
		// 	[ height / 2 - TAB_BAR_HEIGHT / 2, height ]
		// );

		const scale = interpolate(
			booksOverlayButton.value,
			[ 0, 1 ],
			[ 1, 0.2 ],
			Extrapolate.CLAMP
		);
		const opacity = interpolate(
			booksOverlayButton.value,
			[ 0, 1 ],
			[ 1, 0 ],
			Extrapolate.CLAMP
		);
		const translateY = interpolate(
			booksOverlayButton.value,
			[ 0, 1 ],
			[ 0, height / 2 - 2 * TAB_BAR_HEIGHT ],
			Extrapolate.CLAMP
		);
		const borderRadius = interpolate(
			booksOverlayButton.value,
			[ 0, 1 ],
			[ 0, height ],
			Extrapolate.CLAMP
		);

		return {
			// height: withTiming(newHeight, { duration: 1000 }),
			borderRadius: withTiming(borderRadius, { duration: 800 }),
			transform: [
				{
					scale: withDelay(500, withTiming(scale, { duration: 500 }))
				},
				{
					translateY: withTiming(translateY, { duration: 800 })
				}
			],
			opacity: withDelay(500, withTiming(opacity, { duration: 500 }))
		};
	});

	const moviesOverlayStyles = useAnimatedStyle(() => {
		// const newHeight = interpolate(
		// 	booksOverlayButton.value,
		// 	[ 0, 1 ],
		// 	[ height / 2 - TAB_BAR_HEIGHT / 2, height ]
		// );

		const scale = interpolate(
			moviesOverlayButton.value,
			[ 0, 1 ],
			[ 1, 0.2 ],
			Extrapolate.CLAMP
		);
		const opacity = interpolate(
			moviesOverlayButton.value,
			[ 0, 1 ],
			[ 1, 0 ],
			Extrapolate.CLAMP
		);
		const translateY = interpolate(
			moviesOverlayButton.value,
			[ 0, 1 ],
			[ 0, -(height / 2 - 2 * TAB_BAR_HEIGHT) ],
			Extrapolate.CLAMP
		);
		const borderRadius = interpolate(
			moviesOverlayButton.value,
			[ 0, 1 ],
			[ 0, height ],
			Extrapolate.CLAMP
		);

		return {
			// height: withTiming(newHeight, { duration: 1000 }),
			borderRadius: withTiming(borderRadius, { duration: 800 }),
			transform: [
				{
					scale: withDelay(500, withTiming(scale, { duration: 500 }))
				},
				{
					translateY: withTiming(translateY, { duration: 800 })
				}
			],
			opacity: withDelay(500, withTiming(opacity, { duration: 500 }))
		};
	});

	const removeBookOverlayStyles = useAnimatedStyle(() => {
		const translateY = interpolate(
			moviesOverlayButton.value,
			[ 0, 1 ],
			[ 0, -height ],
			Extrapolate.CLAMP
		);

		const opacity = interpolate(
			moviesOverlayButton.value,
			[ 0, 1 ],
			[ 1, 0 ],
			Extrapolate.CLAMP
		);
		return {
			transform: [
				{
					translateY: withTiming(translateY, { duration: 800 })
				}
			],
			opacity: withTiming(opacity, { duration: 800 })
		};
	});

	const removeMoviesOverlayStyles = useAnimatedStyle(() => {
		const translateY = interpolate(
			booksOverlayButton.value,
			[ 0, 1 ],
			[ 0, height ],
			Extrapolate.CLAMP
		);

		const opacity = interpolate(
			booksOverlayButton.value,
			[ 0, 1 ],
			[ 1, 0 ],
			Extrapolate.CLAMP
		);

		return {
			transform: [
				{
					translateY: withTiming(translateY, { duration: 800 })
				}
			],
			opacity: withTiming(opacity, { duration: 800 })
		};
	});

	const booksImageStyles = useAnimatedStyle(() => {
		const newHeight = interpolate(
			booksOverlayButton.value,
			[ 0, 1 ],
			[ height / 2 - TAB_BAR_HEIGHT / 2, height ]
		);

		return {
			height: withTiming(newHeight, { duration: 500 })
		};
	});

	const movieImageStyles = useAnimatedStyle(() => {
		const newHeight = interpolate(
			moviesOverlayButton.value,
			[ 0, 1 ],
			[ height / 2 - TAB_BAR_HEIGHT / 2, height ]
		);

		return {
			height: withTiming(newHeight, { duration: 500 })
		};
	});

	return (
		<View style={{ zIndex: 0 }}>
			<Animated.View
				style={[
					styles.container,
					{ backgroundColor: '#ff70b0' },
					booksOverlayStyles,
					removeBookOverlayStyles
				]}
			>
				<Animated.Image
					style={[ styles.image, booksImageStyles ]}
					source={require('../../../assets/Images/books.jpg')}
					resizeMode="cover"
				/>
				<View style={styles.overlay}>
					<View
						style={{
							...StyleSheet.absoluteFill,
							backgroundColor: 'black',
							opacity: 0.1
						}}
					/>
					<Text style={styles.title}>Books</Text>
					<Text style={styles.subtitle}>Find a Book to Read</Text>
					<TouchableWithoutFeedback onPress={bookPressHandler}>
						<View style={[ styles.button ]}>
							<View
								style={{
									...StyleSheet.absoluteFill,
									backgroundColor: '#00cffd',
									opacity: 0.9
								}}
							/>
							<Text style={styles.buttonText}>Explore Books</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</Animated.View>
			<Animated.View
				style={[
					styles.container,
					{ backgroundColor: '#00cffd' },
					moviesOverlayStyles,
					removeMoviesOverlayStyles
				]}
			>
				<Animated.Image
					style={[ styles.image, movieImageStyles ]}
					source={require('../../../assets/Images/movies.jpg')}
					resizeMode="cover"
				/>
				<View style={styles.overlay}>
					<View
						style={{
							...StyleSheet.absoluteFill,
							backgroundColor: 'black',
							opacity: 0.1
						}}
					/>
					<Text style={styles.title}>Movies</Text>
					<Text style={styles.subtitle}>Find a Movie to Watch</Text>
					<TouchableWithoutFeedback onPress={moviePressHandler}>
						<View style={[ styles.button ]}>
							<View
								style={{
									...StyleSheet.absoluteFill,
									backgroundColor: '#ff70b0',
									opacity: 0.9
								}}
							/>
							<Text style={styles.buttonText}>Explore Movies</Text>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width,
		height: height / 2 - TAB_BAR_HEIGHT / 2,

		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden'
	},
	overlay: {
		flex: 1,
		width,
		transform: [ { translateY: -20 } ],
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		width,
		height: height / 2 - TAB_BAR_HEIGHT / 2,
		position: 'absolute',
		opacity: 0.7
	},
	title: {
		color: '#fefefe',
		fontSize: 40,
		fontFamily: 'Montserrat',
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: -3, height: 2 },
		textShadowRadius: 10
	},
	subtitle: {
		fontSize: 26,
		color: '#fefefe',
		fontFamily: 'Montserrat',
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10
	},
	button: {
		marginTop: 10,
		paddingHorizontal: 40,
		paddingVertical: 10,
		borderRadius: 15,
		overflow: 'hidden'
	},
	buttonText: {
		color: '#fefefe',
		fontSize: 20,
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: 1, height: 0 },
		textShadowRadius: 10
	}
});

export default Overlay;
