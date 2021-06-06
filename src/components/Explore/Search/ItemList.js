import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import Wonder from '../../../../assets/Images/Wonder';

const ItemList = ({ err, data, onPress, width, height }) => {
	return (
		<React.Fragment>
			{data.length > 0 ? (
				<FlatList
					data={data}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<Pressable style={styles.listItem} onPress={() => onPress(item)}>
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
					{err.length > 0 ? (
						<Text style={{ fontSize: 18, color: 'red', fontFamily: 'Montserrat' }}>
							{err}
						</Text>
					) : null}
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
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
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

export default ItemList;
