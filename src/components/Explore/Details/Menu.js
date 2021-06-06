import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, {
	useAnimatedStyle,
	interpolate,
	Extrapolate,
	withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const Menu = ({ y, x, handleMenuReviewPress, handleMenuInfoPress, MAX_HEADER_HEIGHT }) => {
	const menuStyles = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(
					y.value,
					[ 0, MAX_HEADER_HEIGHT / 2 * 0.35 ],
					[ 0, -MAX_HEADER_HEIGHT + 100 ],
					Extrapolate.CLAMP
				)
			},
			{
				translateY: y.value
			}
		],
		borderBottomColor: `rgba(79, 67, 140, ${interpolate(
			y.value,
			[ 0, MAX_HEADER_HEIGHT ],
			[ 0, 1 ],
			Extrapolate.CLAMP
		)})`
	}));

	const indicatorStyles = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: interpolate(y.value, [ 100, 750 ], [ 15, 76 ], Extrapolate.CLAMP)
			}
		],
		width: withTiming(interpolate(y.value, [ 100, 750 ], [ 50, 81 ], Extrapolate.CLAMP), {
			duration: 100
		})
	}));
	return (
		<Animated.View
			style={[
				{
					borderBottomWidth: 1,
					height: 50,
					width,
					zIndex: 100
				},
				menuStyles
			]}
		>
			<View
				style={{
					width,
					justifyContent: 'center',
					backgroundColor: '#2a2540',
					height: '100%'
				}}
			>
				<View
					style={{
						width: width * 0.45,
						alignSelf: 'center',
						justifyContent: 'center'
					}}
				>
					<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
						<Pressable onPress={handleMenuInfoPress}>
							<Text style={styles.menuItem}>Info</Text>
						</Pressable>
						<Pressable onPress={handleMenuReviewPress}>
							<Text style={styles.menuItem}>Reviews</Text>
						</Pressable>
					</View>

					<Animated.View
						style={[
							{
								height: 2,
								backgroundColor: '#8449fc',
								width: 50,
								marginTop: 2
							},
							indicatorStyles
						]}
					/>
				</View>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	menuItem: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Montserrat'
	}
});

export default Menu;
