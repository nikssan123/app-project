import React, { useState, useEffect } from 'react';
import { useAssets } from 'expo-asset';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { AuthProvider } from '../context/AuthContext';

import Navigation from './Navigation';
import AuthResolver from './AuthResolver';

const AppLoader = () => {
	const [ ready, setReady ] = useState(false);

	// const [ assets ] = useAssets([
	// 	require('../../assets/Images/Onboarding/1.js'),
	// 	require('../../assets/Images/Onboarding/2.svg'),
	// 	require('../../assets/Images/Onboarding/3.svg')
	// ]);

	const loadFonts = async () => {
		await Font.loadAsync({
			// Load a font `Montserrat` from a static resource
			Montserrat: require('../../assets/Fonts/Montserrat-Regular.ttf')
		});

		setReady(true);
	};

	useEffect(() => {
		loadFonts();
	}, []);

	if (!ready) {
		return <AppLoading />;
	}

	return (
		<AuthProvider>
			<AuthResolver>
				<Navigation />
			</AuthResolver>
		</AuthProvider>
	);
};

export default AppLoader;
