import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	interpolate,
	Extrapolate,
	withTiming,
	withDelay
} from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';

import Books from './Books';
import Movies from './Movies';

const { width, height } = Dimensions.get('window');

// const TAB_BAR_HEIGHT = 60;

const Main = ({ route, navigation }) => {
	const { value } = route.params;
	const [ showBooks, setShowBooks ] = useState(value);
	const loaded = useSharedValue(false);
	const press = useSharedValue(value);

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
		<Animated.View style={[ { backgroundColor: '#251f41', flex: 1 } ]}>
			<View
				style={{
					marginTop: 10,
					alignSelf: 'center',
					flexDirection: 'row',
					alignItems: 'center',
					width: width * 0.8,
					justifyContent: 'space-evenly'
				}}
			>
				<TouchableOpacity
					style={{
						width: width * 0.2,
						alignItems: 'center'
						// borderColor: 'red',
						// borderWidth: 2
						// paddingRight: 10
					}}
					onPress={pressHandler}
				>
					{showBooks ? (
						<MaterialIcons name="movie" size={22} color="white" />
					) : (
						<Feather name="book" size={22} color="white" />
					)}
					{/* <Text style={{ color: 'white', alignSelf: 'center' }}>Switch</Text> */}
				</TouchableOpacity>
				{/* Shared Element */}
				<SharedElement id="search">
					{/* Mimic search bar not with Input */}
					{/* <SearchBar
						containerStyles={{
							borderRadius: 20,
							paddingHorizontal: 15,
							width: width * 0.7,
							marginTop: null
						}}
						searchValue={searchTerm}
						setSearchValue={setSearchTerm}
						onFocus={() => navigation.push('Search')}
						// showKeyboard
					/> */}
					<Pressable
						style={[
							{
								borderRadius: 20,
								paddingHorizontal: 15,
								width: width * 0.7
							},
							styles.searchBar
						]}
						onPress={() => navigation.push('Search')}
					>
						<AntDesign name="search1" size={22} color="white" />
						<Text style={{ color: 'white', fontSize: 16, marginLeft: 5 }}>Search</Text>
					</Pressable>
				</SharedElement>
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
	},
	searchBar: {
		// width: width * 0.8,
		backgroundColor: '#4f438c',
		// marginTop: 10,
		// padding: 5,
		paddingVertical: 7,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center'
	}
});

export default Main;
