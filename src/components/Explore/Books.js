import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';

import BooksSvg from '../../../assets/Images/Books';
import Section from './Section';

import { books } from '../../seed';

const { width } = Dimensions.get('window');

const Books = props => {
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ alignItems: 'center' }}
		>
			<BooksSvg width={width * 0.8} height={width * 0.58} />
			<Text style={styles.title}>Find a New World to Dive In</Text>
			<Section header1="Top Books for this Month" data={books} />
			<Section header1="Reading" data={books} />
			<Section header1="Wishlist" data={books} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	title: {
		color: 'white',
		fontStyle: 'italic',
		fontSize: 24,
		alignSelf: 'center',
		textAlign: 'center',
		marginTop: 25
	}
});

export default Books;
