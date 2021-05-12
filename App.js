import React from 'react';
import Navigation from './src/components/Navigation';
import AppLoading from './src/components/AppLoading';

const App = () => {
	// return <AppLoading />;
	return (
		<AppLoading>
			<Navigation />
		</AppLoading>
	);
};

export default App;
