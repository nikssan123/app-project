import React, { useState } from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Overlay from '../components/Explore/Overlay';
import Navigation from '../components/Explore/Navigation';
import Main from '../components/Explore/Main';
// import { StatusBar } from 'expo-status-bar';

const ExploreScreen = props => {
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
				<Navigation {...{ booksOverlayButton }} />
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

{
	/* <Main {...{ booksOverlayButton }} /> */
}

export default ExploreScreen;
