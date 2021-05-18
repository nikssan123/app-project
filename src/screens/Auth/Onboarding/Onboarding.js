import React, { useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
	useSharedValue,
	useDerivedValue,
	useAnimatedScrollHandler,
	interpolateColor,
	useAnimatedStyle,
	interpolate,
	Extrapolate
} from 'react-native-reanimated';

import Slide from './Slide';
import Dot from './Dot';
import NextButton from './NextButton';

import slides from './slides';

const { width, height } = Dimensions.get('window');

const Onboarding = ({ navigation }) => {
	// ref to ScrollView
	const scroll = useRef(null);
	// Scroll Offset
	const x = useSharedValue(0);

	// Getting the scroll offset
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: e => {
			x.value = e.contentOffset.x;
		}
	});

	// calculating the currentIndex - current displayed slide: offset value * the width of the sldie
	const currentIndex = useDerivedValue(() => x.value / width);

	// the percentage for the next button circle progress
	const percentage = useDerivedValue(() => (currentIndex.value + 1) * (100 / slides.length));

	// interpolating the colors
	const backgroundColor = useDerivedValue(() =>
		interpolateColor(x.value, [ 0, width, width * 2 ], [ '#BFEAF5', '#BEECC4', '#FFE4D9' ])
	);

	// using dif animated styles for the backgrounds
	const bgStyles = useAnimatedStyle(() => ({ backgroundColor: backgroundColor.value }));
	const slider = useAnimatedStyle(() => ({ backgroundColor: backgroundColor.value }));

	// translating the footer content to match the header
	const footerStyle = useAnimatedStyle(() => ({
		transform: [ { translateX: -x.value } ]
	}));

	// boolean to check if it is the last sldie
	const last = useDerivedValue(() => Math.round(currentIndex.value) === slides.length - 1);

	const navigateToSignin = () => {
		navigation.navigate('Signin');
	};

	// onPress handler for the NextButton
	const onPress = () => {
		if (last.value) {
			navigateToSignin();
		} else {
			if (scroll.current) {
				scroll.current.scrollTo({
					x: width * (Math.round(currentIndex.value) + 1),
					animated: true
				});
			}
		}
	};

	return (
		<View style={styles.container}>
			<Animated.View style={[ styles.slider, slider ]}>
				<Animated.ScrollView
					horizontal
					snapToInterval={width}
					decelerationRate="fast"
					showsHorizontalScrollIndicator={false}
					onScroll={scrollHandler}
					bounces={false}
					scrollEventThrottle={16}
					overScrollMode="never"
					ref={scroll}
				>
					{slides.map((slide, index) => {
						const pictureStyle = useAnimatedStyle(() => {
							return {
								opacity: interpolate(
									x.value,
									[ (index - 0.5) * width, index * width, (index + 0.5) * width ],
									[ 0, 1, 0 ],
									Extrapolate.CLAMP
								),
								transform: [
									{
										scale: interpolate(
											x.value,
											[
												(index - 0.5) * width,
												index * width,
												(index + 0.5) * width
											],
											[ 0.7, 1, 0.7 ],
											Extrapolate.CLAMP
										)
									}
								]
							};
						});
						return (
							<Animated.View
								key={slide.id}
								style={[
									{
										width,
										justifyContent: 'flex-end',
										alignItems: 'center'
									},
									pictureStyle
								]}
							>
								<Image
									source={slide.image}
									style={{
										width: width * 0.8,
										height: height * 0.45
									}}
									resizeMode="contain"
								/>
							</Animated.View>
						);
					})}
				</Animated.ScrollView>
			</Animated.View>
			<View style={styles.footer}>
				<Animated.View style={[ StyleSheet.absoluteFillObject, bgStyles ]} />
				<View style={styles.footerContent}>
					<View style={styles.pagination}>
						{slides.map((_, index) => (
							<Dot key={index} currentIndex={currentIndex} index={index} />
						))}
					</View>
					<Animated.View style={[ styles.footerSlide, footerStyle ]}>
						{slides.map(slide => <Slide item={slide} key={slide.id} />)}
					</Animated.View>
					<View style={styles.nextBtn}>
						<NextButton percentage={percentage} onPress={onPress} last={last} />
					</View>
					<TouchableOpacity onPress={navigateToSignin} style={styles.skipBtn}>
						<Text style={styles.skipText}>Skip</Text>
					</TouchableOpacity>
				</View>
			</View>
			<StatusBar />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#251f41'
	},
	slider: {
		height: 0.48 * height,
		borderBottomRightRadius: 75
	},
	footer: {
		flex: 1
	},
	footerContent: {
		flex: 1,
		backgroundColor: '#251f41',
		borderTopLeftRadius: 75,
		color: 'white'
	},
	pagination: {
		...StyleSheet.absoluteFillObject,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 40
	},
	footerSlide: {
		width: width * slides.length,
		flex: 1,
		flexDirection: 'row'
	},
	nextBtn: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center'
		// marginBottom: 25
	},
	skipBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20
	},
	skipText: {
		fontSize: 18,
		color: 'white',
		opacity: 0.7
	}
});

export default Onboarding;
