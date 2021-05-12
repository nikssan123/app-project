import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthContext } from '../context/AuthContext';

import TabBar from './TabBar';

import Onboarding from '../screens/Auth/Onboarding/Onboarding';
import SigninScreen from '../screens/Auth/AuthLogic/Auth';

import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import FeedScreen from '../screens/Feed';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const onboarding = true;

export default () => {
	const { state } = useContext(AuthContext);
	return (
		<NavigationContainer>
			{state.isLoggedIn ? (
				<Tab.Navigator tabBar={props => <TabBar {...props} />}>
					<Tab.Screen name="Home" component={HomeScreen} />
					<Tab.Screen name="Feed" component={FeedScreen} />
					<Tab.Screen name="Profile" component={ProfileScreen} />
				</Tab.Navigator>
			) : (
				<Stack.Navigator>
					{onboarding ? (
						<Stack.Screen
							name="Onboarding"
							component={Onboarding}
							options={{ headerShown: false }}
						/>
					) : null}
					<Stack.Screen
						name="Signin"
						component={SigninScreen}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};
