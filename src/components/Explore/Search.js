import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import Wonder from '../../../assets/Images/Wonder';

import SearchBar from '../SearchBar';

const { width, height } = Dimensions.get('window');

const Search = props => {
	const inputRef = useRef(null);
	const [ searchTerm, setSearchTerm ] = useState('');

	useEffect(() => {
		// console.log(inputRef);
		if (inputRef) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<View>
			<SharedElement id="search">
				<View
					style={{
						width: width * 0.8,
						backgroundColor: '#4f438c',
						marginTop: 10,
						padding: 5,
						flexDirection: 'row',
						alignItems: 'center',
						alignSelf: 'center',
						borderRadius: 20
					}}
				>
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
				</View>
			</SharedElement>

			<Wonder width={width} height={height / 2} />
		</View>
	);
};

const styles = StyleSheet.create({});

export default Search;
