import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Overlay from '../components/Explore/Overlay';
import Main from '../components/Explore/Main';
// import { StatusBar } from 'expo-status-bar';

const FeedScreen = props => {
	const [ show, setShow ] = useState(false);

	const booksOverlayButton = useSharedValue(false);
	const moviesOverlayButton = useSharedValue(false);
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: '#251f41'
			}}
		>
			{show ? (
				<Main {...{ booksOverlayButton }} />
			) : (
				<Overlay
					{...{ booksOverlayButton, moviesOverlayButton }}
					onPress={() => setShow(true)}
				/>
			)}

			{/* Remove the custom Status Bar with below line -> replace SafeAreaView with ordinary View */}
			{/* <StatusBar /> */}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default FeedScreen;
