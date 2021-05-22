import React from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const ITEM_WIDTH = 150;

// const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ListItem = ({ item, x, index }) => {
	const navigation = useNavigation();
	// [ 0, ITEM_WIDTH * index, ITEM_WIDTH * (index + 1), ITEM_WIDTH * (index + 2) ],
	const style = useAnimatedStyle(() => {
		const scale = interpolate(
			x.value,
			[ 0, ITEM_WIDTH * index, ITEM_WIDTH * (index + 2) ],
			[ 1, 1, 0 ],
			Extrapolate.CLAMP
		);

		// const transformZ = interpolate(
		// 	x.value,
		// 	[ 0, ITEM_WIDTH * index, ITEM_WIDTH * (index + 2) ],
		// 	[ 0, 0, -45 ],
		// 	Extrapolate.CLAMP
		// );

		const perspective = interpolate(
			x.value,
			[ 0, ITEM_WIDTH * index, ITEM_WIDTH * (index + 2) ],
			[ 1200, 1200, 600 ],
			Extrapolate.CLAMP
		);

		// const translateX = interpolate(
		// 	x.value,
		// 	[ 0, ITEM_WIDTH * index, ITEM_WIDTH * (index + 2) ],
		// 	[ 0, 0, -60 ],
		// 	Extrapolate.CLAMP
		// );
		const rotateY = interpolate(
			x.value,
			[ 0, ITEM_WIDTH * index, ITEM_WIDTH * (index + 2) ],
			[ 0, 0, 180 ],
			Extrapolate.CLAMP
		);

		return {
			// transform: [ { scale } ]
			// rotateZ: `${transformZ}deg` }
			transform: [
				{ scale },
				{ perspective },
				// { translateX },
				{ rotateY: `${rotateY}deg` }
			]
		};
	});

	return (
		<Animated.View style={[ styles.container, style ]}>
			<TouchableWithoutFeedback onPress={() => navigation.navigate('Details', { item })}>
				<SharedElement id={`${item.id}.image`}>
					<Image
						style={{
							width: 120,
							height: 175,
							borderRadius: 15
						}}
						source={{ uri: item.image }}
						resizeMode="cover"
					/>
				</SharedElement>
			</TouchableWithoutFeedback>
			<SharedElement id={`${item.id}.author`}>
				<Text style={styles.title}>{item.author}</Text>
			</SharedElement>
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
