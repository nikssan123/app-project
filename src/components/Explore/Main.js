import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	interpolate,
	Extrapolate,
	withTiming,
	withDelay
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import SearchBar from '../SearchBar';
import Books from './Books';
import Movies from './Movies';

const { width, height } = Dimensions.get('window');

// const TAB_BAR_HEIGHT = 60;

const Main = ({ booksOverlayButton }) => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ showBooks, setShowBooks ] = useState(booksOverlayButton.value);
	const loaded = useSharedValue(false);
	const press = useSharedValue(booksOverlayButton.value);

	useEffect(() => {
		loaded.value = true;
	}, []);

	const pressHandler = () => {
		press.value = !press.value;
		setShowBooks(!showBooks);
	};

	const containerStyles = useAnimatedStyle(() => {
		// const borderRadius = interpolate(loaded.value, [ 0, 1 ], [ width, 0 ], Extrapolate.CLAMP);
		const flex = interpolate(loaded.value, [ 0, 1 ], [ 0, 1 ], Extrapolate.CLAMP);
		const translateY = interpolate(
			loaded.value,
			[ 0, 1 ],
			[ height / 2 - 60, 0 ],
			Extrapolate.CLAMP
		);

		return {
			flex: withTiming(flex, { duration: 500 }),
			transform: [
				{
					translateY: withTiming(translateY, { duration: 500 })
				}
			]
		};
	});

	const booksZIndex = useAnimatedStyle(() => {
		const zIndex = interpolate(press.value, [ 0, 1 ], [ -1, 1 ], Extrapolate.CLAMP);
		const opacity = interpolate(press.value, [ 0, 1 ], [ 0, 1 ], Extrapolate.CLAMP);
		const scale = interpolate(press.value, [ 0, 1 ], [ 0.2, 1 ], Extrapolate.CLAMP);

		return {
			zIndex: withDelay(500, withTiming(zIndex, { duration: 200 })),
			opacity: withTiming(opacity, { duration: 800 }),
			transform: [
				{
					scale: withTiming(scale, { duration: 800 })
				}
			]
		};
	});

	const moviesZIndex = useAnimatedStyle(() => {
		const zIndex = interpolate(press.value, [ 0, 1 ], [ 1, -1 ], Extrapolate.CLAMP);
		const opacity = interpolate(press.value, [ 0, 1 ], [ 1, 0 ], Extrapolate.CLAMP);
		const scale = interpolate(press.value, [ 0, 1 ], [ 1, 0.2 ], Extrapolate.CLAMP);

		return {
			zIndex: withDelay(500, withTiming(zIndex, { duration: 200 })),
			opacity: withTiming(opacity, { duration: 800 }),
			transform: [
				{
					scale: withTiming(scale, { duration: 800 })
				}
			]
		};
	});

	return (
		<Animated.View style={[ containerStyles ]}>
			<View
				style={{
					marginTop: 10,
					alignSelf: 'center',
					flexDirection: 'row',
					alignItems: 'center',
					width: width * 0.9,
					justifyContent: 'space-evenly'
				}}
			>
				<TouchableOpacity
					// style={{
					// 	position: 'absolute',
					// 	right: 0,
					// 	top: height / 2 - TAB_BAR_HEIGHT,
					// 	zIndex: 10
					// }}
					onPress={pressHandler}
				>
					{showBooks ? (
						<MaterialIcons name="movie" size={22} color="white" />
					) : (
						<Feather name="book" size={22} color="white" />
					)}
					{/* <Text style={{ color: 'white', alignSelf: 'center' }}>Switch</Text> */}
				</TouchableOpacity>
				<SearchBar
					containerStyles={{
						borderRadius: 20,
						paddingHorizontal: 15,
						width: width * 0.7,
						marginTop: null
					}}
					searchValue={searchTerm}
					setSearchValue={setSearchTerm}
				/>
			</View>

			<Animated.View
				style={[
					{ ...StyleSheet.absoluteFill, top: 60 },
					styles.innerContainer,
					moviesZIndex
				]}
			>
				<Movies />
			</Animated.View>
			<Animated.View
				style={[
					{ ...StyleSheet.absoluteFill, top: 60 },
					styles.innerContainer,
					booksZIndex
					// translateBooksStyles
				]}
			>
				<Books />
			</Animated.View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	innerContainer: {
		alignItems: 'center'
	}
});

export default Main;
