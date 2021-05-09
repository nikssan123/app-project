import React from 'react';
import { View, Text } from 'react-native';
import { useAssets } from 'expo-asset';
import AppLoading from 'expo-app-loading';

import Navigation from './Navigation';

const FunctionName = () => {
	// const [ assets ] = useAssets([
	// 	require('../../assets/Images/Onboarding/1.js'),
	// 	require('../../assets/Images/Onboarding/2.svg'),
	// 	require('../../assets/Images/Onboarding/3.svg')
	// ]);

	const assets = true;

	if (!assets) {
		return <AppLoading />;
	}

	return <Navigation />;
};

export default FunctionName;
