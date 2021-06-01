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
import Constants from 'expo-constants';
import { SharedElement } from 'react-navigation-shared-element';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

import Wonder from '../../../assets/Images/Wonder';

const { width, height } = Dimensions.get('window');

const Search = ({ navigation, route }) => {
	const inputRef = useRef(null);
	const [ data, setData ] = useState([]);
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ loaded, setLoaded ] = useState(true);
	const [ isKeyboardVisible, setKeyboardVisible ] = useState(false);

	const MOVIES_API_KEY = Constants.manifest.extra.MOVIE_DB_API_KEY;

	const { type } = route.params;
	const url =
		type === 'books'
			? 'https://www.goodreads.com/book/auto_complete?format=json&q='
			: `
https://api.themoviedb.org/3/search/multi?api_key=${MOVIES_API_KEY}&page=1&query=`;

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
			const response = await axios.get(`${url}${searchTerm}`);

			let newData = [];
			if (type === 'books') {
				newData = response.data.map(book => ({
					id: book.bookId,
					title: book.title,
					info: book.author.name,
					imageUrl: book.imageUrl.replace(/_..../, '_SY275_')
				}));
			} else if (type === 'movies') {
				if (response.data.results) {
					newData = response.data.results.map(movie => ({
						id: movie.id,
						title: movie.media_type === 'movie' ? movie.title : movie.name,
						info:
							movie.media_type === 'movie'
								? movie.release_date
								: movie.first_air_date,
						imageUrl: `https://image.tmdb.org/t/p/original/${movie.poster_path}`
					}));
				}
			}

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
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<Pressable
							style={styles.listItem}
							onPress={() =>
								navigation.navigate('Details', {
									item: {
										id: item.id,
										info: item.info,
										image: item.imageUrl,
										title: item.title
									}
								})}
						>
							<SharedElement id={`${item.id}.image`}>
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
										fontSize: 16,
										color: 'white',
										flexWrap: 'wrap',
										flex: 1,
										marginTop: 10,
										opacity: 0.8
									}}
								>
									{item.info}
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
					<Text
						style={{
							fontSize: 26,
							color: 'white',
							textAlign: 'center',
							fontFamily: 'Montserrat',
							marginTop: 20
						}}
					>
						Explore New Worlds
					</Text>
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
	},
	listItem: {
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
	}
});

export default Search;
