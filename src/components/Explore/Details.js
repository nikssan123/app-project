import React, { useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	Dimensions,
	TouchableOpacity,
	Pressable,
	FlatList
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

	const navBar = useAnimatedStyle(() => {
		const opacity = interpolate(
			y.value,
			[ 0, MAX_HEADER_HEIGHT * 0.6 ],
			[ 0, 1 ],
			Extrapolate.CLAMP
		);
		const borderOpacity = interpolate(
			y.value,
			[ 0, MAX_HEADER_HEIGHT ],
			[ 0, 1 ],
			Extrapolate.CLAMP
		);
		return {
			opacity: withTiming(opacity, { duration: 100 }),
			transform: [ { translateY: y.value } ],
			borderBottomColor: `rgba(79, 67, 140, ${borderOpacity})`,
			borderBottomWidth: 1
		};
	});

	const menuStyles = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(
					y.value,
					[ 0, MAX_HEADER_HEIGHT ],
					[ 0, 100 ],
					Extrapolate.CLAMP
				)
			},
			{
				translateY: y.value
			}
		]
	}));

	const headerStyles = useAnimatedStyle(() => ({
		opacity: interpolate(y.value, [ 0, MAX_HEADER_HEIGHT - 80 ], [ 1, 0 ], Extrapolate.CLAMP),
		transform: [
			// {
			// 	translateY: y.value
			// },
			{
				translateY: interpolate(
					y.value,
					[ 0, MAX_HEADER_HEIGHT ],
					// [ 0, -MAX_HEADER_HEIGHT / 1.4 ],
					[ 0, -MAX_HEADER_HEIGHT ],
					Extrapolate.CLAMP
				)
			}
		]
	}));

	const titleStyles = useAnimatedStyle(() => {
		const opacity = interpolate(
			y.value,
			[ 0, MAX_HEADER_HEIGHT * 0.2 ],
			[ 1, 0 ],
			Extrapolate.CLAMP
		);

		return {
			opacity
		};
	});

	const closeButtonStyles = useAnimatedStyle(() => {
		return {
			top: interpolate(y.value, [ 0, MAX_HEADER_HEIGHT ], [ 15, 20 ], Extrapolate.CLAMP)
		};
	});

	const initialTitleStyles = useAnimatedStyle(() => ({
		opacity: withTiming(interpolate(loaded.value, [ 0, 1 ], [ 0, 1 ], Extrapolate.CLAMP), {
			duration: 800
		})
	}));

	const mainStyles = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(
					y.value,
					[ 0, MAX_HEADER_HEIGHT ],
					// [ 0, -MAX_HEADER_HEIGHT + (MAX_HEADER_HEIGHT + 50) ],
					[ 0, -MAX_HEADER_HEIGHT ],
					Extrapolate.CLAMP
				)
			},
			{
				translateY: y.value
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
				overScrollMode="never"
				bounces={false}
			>
				<Animated.View style={[ styles.navBar, navBar ]}>
					<Image
						source={{ uri: item.image }}
						style={{ ...StyleSheet.absoluteFill, width, height: height * 0.5 }}
						resizeMode="cover"
						resizeMethod="scale"
						blurRadius={5}
					/>
					<Text style={[ styles.author, { width, paddingHorizontal: 70 } ]}>
						{item.title}
					</Text>
				</Animated.View>
				<Animated.View style={[ styles.header, headerStyles ]}>
					<Image
						source={{ uri: item.image }}
						style={{ ...StyleSheet.absoluteFill, width, height: height * 0.5 }}
						resizeMode="cover"
						resizeMethod="scale"
						blurRadius={5}
					/>
					{/* style={imageStyles} */}
					{/* <Animated.View style={imageStyles}> */}
					<Animated.View>
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
					{/* <Animated.Text style={[ styles.title, initialTitleStyles, titleStyles ]}> */}
					<Animated.Text style={[ styles.title, initialTitleStyles, titleStyles ]}>
						{item.title}
					</Animated.Text>
					{/*  style={authorStyles} */}

					<SharedElement id={`${item.id}.author`}>
						<Text style={[ styles.author ]}>{item.info}</Text>
					</SharedElement>
				</Animated.View>

				{/* Body */}
				<Animated.View
					style={[
						{
							position: 'absolute',
							backgroundColor: 'red',
							height: 50,
							width
						},
						menuStyles
					]}
				/>
				<Animated.View style={[ styles.main, mainStyles ]}>
					<Animated.ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						bounces={false}
						overScrollMode="never"
						snapToInterval={width}
						pagingEnabled
						decelerationRate="fast"
						scrollEventThrottle={16}
					>
						<View style={{ width, borderColor: 'red', borderWidth: 2 }}>
							<Text>Info</Text>
						</View>
						<View style={{ width, borderColor: 'red', borderWidth: 2 }}>
							<Text>Reviews</Text>
						</View>
					</Animated.ScrollView>
				</Animated.View>
			</Animated.ScrollView>
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	navBar: {
		height: 100,
		width,
		position: 'absolute',
		zIndex: 1,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center'
	},
	header: {
		height: height * 0.5,
		width,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 70,
		opacity: 0.2
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
		height: 2000
	}
});

export default React.memo(Details);
