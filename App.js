import React from 'react';
import Navigation from './src/components/Navigation';
import AppLoading from './src/components/AppLoading';
import { StatusBar } from 'expo-status-bar';

const App = () => {
	//f return <AppLoading />;
	return (
		<AppLoading>
			<Navigation />
		</AppLoading>
	);
};

export default App;
