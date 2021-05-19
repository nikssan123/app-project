import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Main from './Main';
import Details from './Details';
import Search from './Search';

const Stack = createSharedElementStackNavigator();

const iosTransitionSpec = {
	animation: 'spring',
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: true,
		restDisplacementThreshold: 10,
		restSpeedThreshold: 10
	}
};

const Navigation = ({ booksOverlayButton }) => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				cardStyle: { backgroundColor: '#251f41' },
				gestureEnabled: true,
				gestureDirection: 'horizontal',
				animationEnabled: true,
				cardStyleInterpolator: ({ current: { progress } }) => ({
					cardStyle: {
						opacity: progress
					}
				}),
				transitionSpec: {
					open: iosTransitionSpec,
					close: iosTransitionSpec
				}
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
							animation: 'fade',
							resize: 'clip'
						}
					];
				}}
			/>
			<Stack.Screen name="Search" component={Search} />
		</Stack.Navigator>
	);
};

export default Navigation;
