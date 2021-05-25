import React, { useState, useRef, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TextInput,
	Pressable,
	ActivityIndicator,
	Keyboard
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

import Wonder from '../../../assets/Images/Wonder';

import DismissKeyboard from '../../common/DissmisKeyboard';

const { width, height } = Dimensions.get('window');

const Search = ({ navigation }) => {
	const inputRef = useRef(null);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ loaded, setLoaded ] = useState(true);
	const [ isKeyboardVisible, setKeyboardVisible ] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			setKeyboardVisible(true);
		});
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardVisible(false);
		});

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	useEffect(() => {
		// console.log(inputRef);
		if (inputRef) {
			inputRef.current.focus();
		}
	}, []);

	useEffect(
		() => {
			if (searchTerm.length > 0) {
				fetchData();
			}
		},
		[ searchTerm ]
	);

	const donePressHandler = () => {
		if (isKeyboardVisible) {
			Keyboard.dismiss();
		} else {
			navigation.push('Main');
		}
	};

	const fetchData = async () => {
		setLoaded(false);
		const response = await axios.get(
			`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
		);

		let books;
		if (response.data.items) {
			books = response.data.items.slice(0, 20);
		}

		console.log(books[0]);

		setLoaded(true);
	};

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.searchContainer}>
				<SharedElement id="search">
					<View style={styles.textContainer}>
						<AntDesign name="search1" size={22} color="white" />

						<TextInput
							autoCapitalize="none"
							autoCorrect={false}
							style={{
								flex: 1,
								marginLeft: 5,
								color: 'white',
								fontSize: 16
							}}
							placeholder="Search"
							placeholderTextColor="white"
							value={searchTerm}
							onChangeText={e => setSearchTerm(e)}
							ref={inputRef}
						/>
						{searchTerm.length > 0 ? (
							<Pressable
								onPress={() => {
									setSearchTerm('');
								}}
							>
								<AntDesign name="close" size={22} color="white" />
							</Pressable>
						) : null}
					</View>
				</SharedElement>
				{loaded ? (
					<Pressable onPress={donePressHandler}>
						<Text style={{ color: 'white', fontSize: 16, marginLeft: 7 }}>
							{isKeyboardVisible ? 'Done' : 'Back'}
						</Text>
					</Pressable>
				) : (
					<ActivityIndicator size="small" color="white" style={{ marginLeft: 7 }} />
				)}
			</View>

			{/* </SharedElement> */}
			{/* <Pressable onPress={() => navigation.goBack()}>
				<Text style={{ color: 'white', fontSize: 16, marginLeft: 5 }}>Done</Text>
			</Pressable> */}
			{/* Done Button to Go Back - Or display Loader if a axios request is sended */}
			<View
				style={{
					flex: 1,
					// justifyContent: 'center'
					alignItems: 'center',
					marginTop: 15
				}}
			>
				<Wonder width={width * 0.7} height={height / 3} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	searchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 15,
		marginLeft: 15
	},
	textContainer: {
		width: width * 0.8,
		backgroundColor: '#4f438c',

		padding: 5,
		paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: 20
	}
});

export default Search;
