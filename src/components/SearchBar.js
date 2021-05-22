import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// const SearchBar = React.forwardRef(
// 	({ searchValue, setSearchValue, containerStyles, onFocus, showKeyboard, autoFocus }, ref) => {
// 		return (
// 			<View style={[ styles.searchBar, containerStyles ]}>
// 				<AntDesign name="search1" size={22} color="white" />
// 				<TextInput
// 					autoCapitalize="none"
// 					autoCorrect={false}
// 					style={{
// 						flex: 1,
// 						marginLeft: 5,
// 						color: 'white',
// 						fontSize: 16
// 					}}
// 					placeholder="Search"
// 					placeholderTextColor="white"
// 					value={searchValue}
// 					onChangeText={e => setSearchValue(e)}
// 					onFocus={onFocus}
// 					showSoftInputOnFocus={showKeyboard ? false : true}
// 					autoFocus={autoFocus}
// 					ref={ref}
// 				/>
// 				{searchValue.length > 0 ? (
// 					<TouchableOpacity onPress={() => setSearchValue('')}>
// 						<AntDesign name="close" size={22} color="white" />
// 					</TouchableOpacity>
// 				) : null}
// 			</View>
// 		);
// 	}
// );

const SearchBar = ({ searchValue, setSearchValue, containerStyles, autoFocus }) => {
	return (
		<View style={[ styles.searchBar, containerStyles ]}>
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
				value={searchValue}
				onChangeText={e => setSearchValue(e)}
				autoFocus={autoFocus}
				// ref={ref}
			/>
			{searchValue.length > 0 ? (
				<TouchableOpacity onPress={() => setSearchValue('')}>
					<AntDesign name="close" size={22} color="white" />
				</TouchableOpacity>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	searchBar: {
		width: width * 0.8,
		backgroundColor: '#4f438c',
		marginTop: 10,
		padding: 5,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center'
	}
});

export default SearchBar;
