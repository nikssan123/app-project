import React from 'react';
import { Dimensions } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Main from './Main';
import Details from './Details';
import Search from './Search';
// import { Extrapolate, interpolate, withTiming } from 'react-native-reanimated';

const Stack = createSharedElementStackNavigator();

const { height } = Dimensions.get('window');

const Navigation = ({ booksOverlayButton }) => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				cardStyle: { backgroundColor: '#251f41' },
				gestureEnabled: true,
				gestureDirection: 'horizontal',
				animationEnabled: true,
				animationTypeForReplace: 'push',
				cardStyleInterpolator: ({ current: { progress } }) => ({
					cardStyle: {
						opacity: progress
						// transform: [
						// 	{
						// 		translateY: progress.interpolate({
						// 			inputRange: [ 0, 1 ],
						// 			outputRange: [ height, 0 ]
						// 		})
						// 	}
						// ],
						// opacity: progress,
						// translateY: progress
					}
				})
			}}
			mode="modal"
		>
			<Stack.Screen name="Main" component={Main} initialParams={booksOverlayButton} />
			<Stack.Screen
				name="Details"
				component={Details}
				// options={{
				// 	cardStyleInterpolator: ({ current: { progress } }) => ({
				// 		cardStyle: {
				// 			opacity: progress
				// 			// transform: [
				// 			// 	{
				// 			// 		translateY: progress.interpolate({
				// 			// 			inputRange: [ 0, 1 ],
				// 			// 			outputRange: [ height, 0 ]
				// 			// 		})
				// 			// 	}
				// 			// ],
				// 			// opacity: progress,
				// 			// translateY: progress
				// 		}
				// 	})
				// }}
				sharedElementsConfig={route => {
					const { id } = route.params.item;
					return [
						{
							id: `${id}.image`,
							animation: 'move',
							resize: 'clip'
						},
						{
							id: `${id}.author`,
							animation: 'move',
							resize: 'clip'
						}
					];
				}}
			/>
			<Stack.Screen
				name="Search"
				component={Search}
				options={{
					gestureEnabled: false
				}}
				sharedElementsConfig={() => {
					return [
						{
							id: `search`,
							animation: 'fade'
						}
					];
				}}
			/>
		</Stack.Navigator>
	);
};

export default Navigation;
