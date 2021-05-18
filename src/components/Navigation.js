import React, { useContext } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthContext } from '../context/AuthContext';

import TabBar from './TabBar';

import Onboarding from '../screens/Auth/Onboarding/Onboarding';
import SigninScreen from '../screens/Auth/AuthLogic/Auth';

import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import ExploreScreen from '../screens/Explore';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const onboarding = true;

export default () => {
	const { state } = useContext(AuthContext);

	return (
		<NavigationContainer>
			{state.isLoggedIn ? (
				<Tab.Navigator
					tabBar={props => <TabBar {...props} />}
					// tabBarOptions={{ keyboardHidesTabBar: true }}
				>
					<Tab.Screen
						name="Home"
						component={HomeScreen}
						initialParams={{ icon: 'home' }}
					/>
					<Tab.Screen
						name="Explore"
						component={ExploreScreen}
						initialParams={{ icon: 'compass' }}
					/>
					<Tab.Screen
						name="Profile"
						component={ProfileScreen}
						initialParams={{ icon: 'user' }}
					/>
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
