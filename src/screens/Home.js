import React, { useContext, useState, useRef } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	StyleSheet,
	ScrollView,
	Dimensions,
	TextInput
} from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	useAnimatedScrollHandler,
	interpolate,
	withTiming,
	Extrapolate
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import SearchBar from '../components/SearchBar';

import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const HomeScreen = props => {
	const { logout } = useContext(AuthContext);

	const scrollRef = useRef();

	const [ search, setSearch ] = useState('');

	const x = useSharedValue(0);
	const y = useSharedValue(0);
	// 0 - down, 1 - up
	const direction = useSharedValue(true);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: e => {
			x.value = e.contentOffset.x;
		}
	});

	const verticalScrollHandler = useAnimatedScrollHandler({
		onScroll: e => {
			const currentOffset = e.contentOffset.y;
			// direction.value = > y.value ? 0 : 1;
			const dif = currentOffset - y.value;
			if (Math.abs(dif) > 3) {
				if (dif < 0) {
					direction.value = true;
				} else {
					direction.value = false;
				}
			}

			y.value = e.contentOffset.y;
		}
	});

	const navMenuStyles = useAnimatedStyle(() => {
		//let opacity = interpolate(direction.value, [ 0, 1 ], [ 0, 1 ], Extrapolate.CLAMP);
		//let height = interpolate(direction.value, [ 0, 1 ], [ 0, 30 ], Extrapolate.CLAMP);

		let height = direction.value ? 30 : 0;
		let opacity = direction.value ? 1 : 0;
		if (y.value <= 1) {
			height = 30;
			opacity = 1;
		}

		return {
			// transform: [ { translateY: withTiming(translateY, { duration: 400 }) } ],
			height: withTiming(height, { duration: 500 }),
			opacity: withTiming(opacity, { duration: 500 })
		};
	});

	const indicatorStyles = useAnimatedStyle(() => {
		const translateX = interpolate(x.value, [ 0, width ], [ -38, 30 ], Extrapolate.CLAMP);
		const newWidth = interpolate(
			x.value,
			[ 0, width ],
			[ width * 0.14, width * 0.16 ],
			Extrapolate.CLAMP
		);
		let opacity = direction.value ? 1 : 0;
		if (y.value <= 1) {
			opacity = 1;
		}
		return {
			transform: [
				{
					translateX
				}
			],
			opacity: withTiming(opacity, { duration: 200 }),
			width: withTiming(newWidth, { duration: 200 })
		};
	});

	const horizontalScroll = () => {
		let scrollTo;
		if (x.value <= width / 2) {
			scrollTo = width;
		} else {
			scrollTo = 0;
		}

		if (scrollRef.current) {
			scrollRef.current.scrollTo({
				x: scrollTo,
				animated: true
			});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				{/* search bar */}
				<SearchBar
					searchValue={search}
					setSearchValue={setSearch}
				/>
				{/* <View style={styles.searchBar}>
					<AntDesign name="search1" size={22} color="white" />
					<TextInput
						autoCapitalize="none"
						autoCorrect={false}
						style={{
							flex: 1,
							marginLeft: 5,
							color: 'white',
							fontSize: 16
						}}
						placeholder="Search"
						placeholderTextColor="white"
						value={search}
						onChangeText={e => setSearch(e)}
					/>
					{search.length > 0 ? (
						<TouchableOpacity onPress={() => setSearch('')}>
							<AntDesign name="close" size={22} color="white" />
						</TouchableOpacity>
					) : null}
				</View> */}

				<Animated.View style={[ styles.topNav, navMenuStyles ]}>
					{/* <View style={styles.topNav}> */}
					<TouchableWithoutFeedback onPress={horizontalScroll}>
						<Text style={styles.navItem}>Home</Text>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={horizontalScroll}>
						<Text style={styles.navItem}>Reviews</Text>
					</TouchableWithoutFeedback>
					{/* </View> */}
				</Animated.View>
				<Animated.View
					style={[
						{
							height: 2,
							backgroundColor: '#8449fc'
						},
						indicatorStyles
					]}
				/>
			</View>
			<Animated.ScrollView
				horizontal
				snapToInterval={width}
				bounces={false}
				showsHorizontalScrollIndicator={false}
				decelerationRate="fast"
				overScrollMode="never"
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				ref={scrollRef}
			>
				<Animated.ScrollView
					onScroll={verticalScrollHandler}
					bounces={false}
					overScrollMode="never"
					showsVerticalScrollIndicator
					indicatorStyle={styles.indicator}
					scrollEventThrottle={16}
				>
					<View style={styles.screen1}>
						<TouchableOpacity onPress={logout}>
							<Text style={{ color: 'white' }}>Logout</Text>
						</TouchableOpacity>
					</View>
				</Animated.ScrollView>
				<View style={styles.screen2}>
					<Text>Screen 2</Text>
				</View>
			</Animated.ScrollView>
			<StatusBar backgroundColor="#332b59" style="light" />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#251f41'
	},
	indicator: {
		backgroundColor: 'white'
	},
	screen1: {
		width,
		height: 2000
	},
	screen2: {
		width
	},
	header: {
		width,
		padding: 10,
		paddingTop: 0,
		alignItems: 'center',
		backgroundColor: '#332b59'
	},
	topNav: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		width: width * 0.4,
		marginTop: 10
	},
	searchBar: {
		width: width * 0.8,
		backgroundColor: '#4f438c',
		marginTop: 10,
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center'
	},
	navItem: {
		color: 'white',
		fontSize: 16
	}
});

export default HomeScreen;
