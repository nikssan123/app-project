import React, { useState, useRef, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TextInput,
	Pressable,
	ActivityIndicator,
	Keyboard,
	FlatList,
	Image
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

import Wonder from '../../../assets/Images/Wonder';

const { width, height } = Dimensions.get('window');

const Search = ({ navigation }) => {
	const inputRef = useRef(null);
	const [ data, setData ] = useState([]);
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
		if (inputRef) {
			inputRef.current.focus();
		}
	}, []);

	useEffect(
		() => {
			if (searchTerm.length > 0) {
				fetchData();
			}
			if (searchTerm.length === 0) {
				setData([]);
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
		try {
			const response = await axios.get(
				// `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerm}&printType=books&key=AIzaSyCyUjU2Px-6qYFTOtwrqQv9SBCBfa_7yWg`
				`https://www.goodreads.com/book/auto_complete?format=json&q=${searchTerm}`
			);

			const newData = response.data.map(book => ({
				...book,
				imageUrl: book.imageUrl.replace(/_..../, '_SY275_')
			}));

			setData(newData);
		} catch (e) {
			console.log(e);
		}

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

			{data.length > 0 ? (
				<FlatList
					data={data}
					keyExtractor={item => item.bookId}
					renderItem={({ item }) => (
						<Pressable
							style={{
								borderRadius: 15,
								height: 225,
								marginTop: 10,
								padding: 10,
								flexDirection: 'row',
								backgroundColor: '#2a2540',
								// borderColor: 'red',
								// borderWidth: 2,
								shadowOffset: {
									height: 5,
									width: 5
								},
								elevation: 5,
								shadowOpacity: 0.5
							}}
							onPress={() =>
								navigation.navigate('Details', {
									item: {
										id: item.bookId,
										author: item.author.name,
										image: item.imageUrl,
										title: item.title
									}
								})}
						>
							<SharedElement id={`${item.bookId}.image`}>
								<Image
									source={{ uri: item.imageUrl }}
									style={{ height: 200, width: 140, borderRadius: 15 }}
									resizeMode="cover"
								/>
							</SharedElement>
							<View style={{ flex: 1, marginLeft: 10 }}>
								<Text
									style={{
										fontSize: 18,
										color: 'white',
										flexWrap: 'wrap',
										fontFamily: 'Montserrat'
									}}
								>
									{item.title}
								</Text>
								<Text
									style={{
										fontSize: 14,
										color: 'white',
										flexWrap: 'wrap',
										flex: 1,
										marginTop: 10,
										opacity: 0.8
									}}
								>
									{item.author.name}
								</Text>
							</View>
						</Pressable>
					)}
				/>
			) : (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						marginTop: 15
					}}
				>
					<Wonder width={width * 0.7} height={height / 3} />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	searchContainer: {
		width,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 15,
		// marginHorizontal: 15,
		paddingBottom: 15,
		borderBottomColor: 'rgba(79, 67, 140, 0.4)',
		borderBottomWidth: 2
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
