import React, { useContext, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Dimensions,
	TextInput,
	KeyboardAvoidingView
} from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	useAnimatedScrollHandler,
	interpolate,
	withTiming
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const HomeScreen = props => {
	const { logout } = useContext(AuthContext);

	const x = useSharedValue(0);
	const y = useSharedValue(0);
	// 0 - down, 1 - up
	const direction = useSharedValue(1);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: e => {
			x.value = e.contentOffset.x;
		}
	});

	const verticalScrollHandler = useAnimatedScrollHandler({
		onScroll: e => {
			direction.value = e.contentOffset.y > y.value ? 0 : 1;
			y.value = e.contentOffset.y;
		}
	});

	const navMenuStyles = useAnimatedStyle(() => {
		// const translateY = interpolate(direction.value, [ 0, 1 ], [ -30, 0 ]);
		const opacity = interpolate(direction.value, [ 0, 1 ], [ 0, 1 ]);
		const height = interpolate(direction.value, [ 0, 1 ], [ 0, 30 ]);

		return {
			// transform: [ { translateY: withTiming(translateY, { duration: 400 }) } ],
			height: withTiming(height, { duration: 200 }),
			opacity: withTiming(opacity, { duration: 200 })
		};
	});

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				{/* search bar */}
				<TextInput style={styles.searchBar} />
				<Animated.View style={[ styles.topNav, navMenuStyles ]}>
					<Text style={[ styles.navItem ]}>Home</Text>
					<Text style={styles.navItem}>Reviews</Text>
				</Animated.View>
			</View>
			<Animated.ScrollView
				horizontal
				snapToInterval={width}
				bounces={false}
				showsHorizontalScrollIndicator={false}
				decelerationRate="fast"
				overScrollMode="never"
				onScroll={scrollHandler}
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
		// flex: 1
		width: width * 0.4,
		marginTop: 10
	},
	searchBar: {
		width: width * 0.8,
		backgroundColor: '#4f438c',
		marginTop: 10
	},
	navItem: {
		color: 'white',
		fontSize: 16
	}
});

export default HomeScreen;
