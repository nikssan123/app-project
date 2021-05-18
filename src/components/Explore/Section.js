import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import ListItem from './ListItem';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const { width } = Dimensions.get('window');

const Section = ({ header1, data }) => {
	const x = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: e => {
			x.value = e.contentOffset.x;
		}
	});

	return (
		<View style={styles.container}>
			<View style={{ paddingHorizontal: 20 }}>
				<Text style={{ fontSize: 24, color: 'white', fontFamily: 'Montserrat' }}>
					{header1}
				</Text>
				<View style={styles.hr} />
			</View>
			<AnimatedFlatList
				onScroll={scrollHandler}
				horizontal
				showsHorizontalScrollIndicator={false}
				bounces={false}
				overScrollMode="never"
				data={data}
				keyExtractor={(_, index) => String(index)}
				renderItem={({ item, index }) => <ListItem x={x} item={item} index={index} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width,
		marginVertical: 20,
		backgroundColor: '#332b59',
		borderRadius: 10,
		// paddingHorizontal: 20,
		paddingVertical: 10,
		shadowOffset: {
			height: 5,
			width: 0
		},
		shadowRadius: 10,
		shadowOpacity: 0.8,
		elevation: 5
	},
	hr: {
		height: 2,
		// backgroundColor: '#251f41',
		backgroundColor: 'white',
		opacity: 0.7,
		flex: 1,
		marginVertical: 10
	}
});

export default Section;
