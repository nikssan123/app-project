import React, { createContext, useReducer, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'SIGNIN':
			return { ...state, isLoggedIn: true, user: action.payload };
		case 'LOGOUT':
			return { ...state, isLoggedIn: false, use: null };
		default:
			return state;
	}
};

const AuthProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(reducer, {
		user: null,
		isLoggedIn: false,
		onboarding: true
	});

	const tryLocalSignin = async () => {
		try {
			const user = await AsyncStorage.getItem('user');
			if (user) dispatch({ type: 'SIGNIN', payload: user });
		} catch (e) {
			console.log(e);
		}
	};

	const signin = (email, password) => {
		AsyncStorage.setItem('user', email);
		dispatch({ type: 'SIGNIN', payload: { email } });
	};

	const logout = () => {
		dispatch({ type: 'LOGOUT' });
		AsyncStorage.removeItem('user');
	};

	const contextValue = useMemo(() => ({ state, tryLocalSignin, signin, logout }), [
		state,
		tryLocalSignin,
		signin,
		logout
	]);

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
