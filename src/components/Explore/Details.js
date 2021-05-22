import React, { useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	Dimensions,
	TouchableOpacity,
	Pressable
} from 'react-native';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	useAnimatedScrollHandler
} from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const MAX_HEADER_HEIGHT = height * 0.5;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Details = ({ route, navigation }) => {
	const { item } = route.params;

	const loaded = useSharedValue(false);
	const y = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: e => {
			y.value = e.contentOffset.y;
		}
	});

	useEffect(() => {
		loaded.value = true;
	}, []);

	const headerStyles = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: y.value
			},
			{
				translateY: interpolate(
					y.value,
					[ 0, MAX_HEADER_HEIGHT ],
					[ 0, -MAX_HEADER_HEIGHT / 1.4 ],
					Extrapolate.CLAMP
				)
			}
		]
	}));

	const imageStyles = useAnimatedStyle(() => ({
		opacity: interpolate(y.value, [ 0, MAX_HEADER_HEIGHT - 100 ], [ 1, 0 ], Extrapolate.CLAMP),
		transform: [
			{
				translateY: interpolate(
					y.value,
					[ 0, MAX_HEADER_HEIGHT ],
					[ 0, 60 ],
					Extrapolate.CLAMP
				)
			}
		]
	}));

	const titleStyles = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(
					y.value,
					[ 0, MAX_HEADER_HEIGHT ],
					[ 0, 60 ],
					Extrapolate.CLAMP
				)
			}
		]
	}));

	const authorStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						y.value,
						[ 0, MAX_HEADER_HEIGHT ],
						[ 0, 60 ],
						Extrapolate.CLAMP
					)
				}
			],
			opacity: interpolate(
				y.value,
				[ 0, MAX_HEADER_HEIGHT - 80 ],
				[ 1, 0 ],
				Extrapolate.CLAMP
			)
		};
	});

	const closeButtonStyles = useAnimatedStyle(() => {
		return {
			top: interpolate(y.value, [ 0, MAX_HEADER_HEIGHT ], [ 15, 25 ], Extrapolate.CLAMP)
		};
	});

	const initialTitleStyles = useAnimatedStyle(() => ({
		opacity: withTiming(interpolate(loaded.value, [ 0, 1 ], [ 0, 1 ], Extrapolate.CLAMP), {
			duration: 800
		})
	}));

	const mainStyles = useAnimatedStyle(() => ({
		marginTop: interpolate(
			y.value,
			[ 0, MAX_HEADER_HEIGHT ],
			[ 0, MAX_HEADER_HEIGHT + 10 ],
			Extrapolate.CLAMP
		),
		transform: [
			{
				translateY: interpolate(
					y.value,
					[ 0, MAX_HEADER_HEIGHT ],
					[ 0, -MAX_HEADER_HEIGHT / 1.4 + 10 ],
					Extrapolate.CLAMP
				)
			}
		]
	}));

	return (
		<React.Fragment>
			<AnimatedTouchableOpacity
				style={[ styles.closeButton, closeButtonStyles ]}
				onPress={() => {
					navigation.goBack();
				}}
			>
				<AntDesign name="close" size={24} color="white" />
			</AnimatedTouchableOpacity>
			<Animated.ScrollView
				onScroll={scrollHandler}
				showsVerticalScrollIndicator={false}
				// onLayout={e => {
				// 	scrollHeight.value = e.nativeEvent.layout.height;
				// }}
			>
				<Animated.View style={[ styles.header, headerStyles ]}>
					<Image
						source={{ uri: item.image }}
						style={{ ...StyleSheet.absoluteFill, width, height: height * 0.5 }}
						resizeMode="cover"
						resizeMethod="scale"
						blurRadius={2}
					/>
					{/* style={imageStyles} */}
					<Animated.View style={imageStyles}>
						<SharedElement id={`${item.id}.image`}>
							<Image
								source={{ uri: item.image }}
								style={[
									{
										width: 120,
										height: 175,
										borderRadius: 15
									}
								]}
								resizeMode="cover"
							/>
						</SharedElement>
					</Animated.View>
					<Animated.Text style={[ styles.title, initialTitleStyles, titleStyles ]}>
						{item.title}
					</Animated.Text>
					{/*  style={authorStyles} */}
					<Animated.View style={authorStyles}>
						<SharedElement id={`${item.id}.author`}>
							<Text style={[ styles.author ]}>{item.author}</Text>
						</SharedElement>
					</Animated.View>
				</Animated.View>
				<Animated.View style={[ styles.main, mainStyles ]}>
					<Text>Hi</Text>
					<Text>Hi</Text>
					<Text>Hi</Text>
				</Animated.View>
			</Animated.ScrollView>
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	header: {
		height: height * 0.5,
		width,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 70
	},
	closeButton: {
		position: 'absolute',
		right: 5,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10,
		width: 60,
		height: 60
	},
	title: {
		textAlign: 'center',
		color: 'white',
		// opacity: 0.7,
		fontSize: 24,
		marginTop: 10,
		fontWeight: '300'
		// fontFamily: 'Montserrat'
	},
	author: {
		textAlign: 'center',
		color: 'white',
		// opacity: 0.7,
		marginTop: 5,
		fontSize: 20,
		fontFamily: 'Montserrat'
	},
	main: {
		height: 2000,
		zIndex: -1
	}
});

export default React.memo(Details);
