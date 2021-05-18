import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const ITEM_WIDTH = 150;

const ListItem = ({ item, x, index }) => {
	// [ 0, ITEM_WIDTH * index, ITEM_WIDTH * (index + 1), ITEM_WIDTH * (index + 2) ],
	const style = useAnimatedStyle(() => {
		const scale = interpolate(
			x.value,
			[ 0, ITEM_WIDTH * index, ITEM_WIDTH * (index + 2) ],
			[ 1, 1, 0 ],
			Extrapolate.CLAMP
		);

		const transformZ = interpolate(
			x.value,
			[ 0, ITEM_WIDTH * index, ITEM_WIDTH * (index + 2) ],
			[ 0, 0, -45 ],
			Extrapolate.CLAMP
		);

		return {
			// transform: [ { scale } ]
			transform: [ { rotateZ: `${transformZ}deg` }, { scale } ]
		};
	});

	return (
		<Animated.View style={[ styles.container, style ]}>
			<Image
				style={{
					width: 120,
					height: 175,
					borderRadius: 15
				}}
				source={{ uri: item.image }}
				resizeMode="cover"
			/>
			<Text style={styles.title}>{item.author}</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: ITEM_WIDTH,
		padding: 10,
		// marginRight: 10,
		alignItems: 'center'
	},
	title: {
		textAlign: 'center',
		color: 'white',
		opacity: 0.7,
		fontSize: 18,
		marginTop: 10,
		fontFamily: 'Montserrat'
	}
});

export default ListItem;
