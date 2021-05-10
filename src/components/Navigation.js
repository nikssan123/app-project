import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Onboarding from '../screens/Auth/Onboarding/Onboarding';
import SigninScreen from '../screens/Auth/SigninScreen';
import SignupScreen from '../screens/Auth/SignupScreen';

import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import FeedScreen from '../screens/Feed';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const isLogged = false;
const onboarding = true;

export default () => {
	// console.log("hi")
	return (
		<NavigationContainer>
			{isLogged ? (
				<Tab.Navigator>
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
					<Stack.Screen
						name="Signup"
						component={SignupScreen}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};
