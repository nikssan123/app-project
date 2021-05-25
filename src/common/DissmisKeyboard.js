import React from 'react';
import { Pressable, Keyboard } from 'react-native';

const DismissKeyboard = ({ children }) => {
	return (
		<Pressable
			style={{ borderColor: 'red', borderWidth: 2 }}
			onPress={() => Keyboard.dismiss()}
		>
			{children}
		</Pressable>
	);
};

export default DismissKeyboard;
