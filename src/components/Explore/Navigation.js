import React from 'react';
import { Dimensions } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Main from './Main';
import Details from './Details/Details';
import Search from './Search/Search';

const Stack = createSharedElementStackNavigator();

// const { height } = Dimensions.get('window');

const Navigation = ({ booksOverlayButton }) => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				cardStyle: { backgroundColor: '#251f41' },
				gestureEnabled: false,
				// gestureDirection: 'horizontal',
				// animationEnabled: true,
				// animationTypeForReplace: 'push',
				cardStyleInterpolator: ({ current: { progress } }) => ({
					cardStyle: {
						opacity: progress
					}
				})
			}}
			mode="modal"
		>
			<Stack.Screen name="Main" component={Main} initialParams={booksOverlayButton} />
			<Stack.Screen
				name="Details"
				component={Details}
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
