import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const ProfileScreen = props => {
	const bottomSheet = useRef(null);
	return (
		<View style={styles.container}>
			<Text style={{ color: 'white' }}>ProfileScreen</Text>
			<TouchableOpacity
				onPress={() => {
					bottomSheet.current.expand();
				}}
			>
				<Text style={{ fontSize: 24, color: 'white' }}>Expand</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					bottomSheet.current.close();
				}}
			>
				<Text style={{ fontSize: 24, color: 'white' }}>Close</Text>
			</TouchableOpacity>
			<BottomSheet
				ref={bottomSheet}
				index={-1}
				snapPoints={[ -1, '50%' ]}
				onChange={e => {
					if (e === 0) bottomSheet.current.close();
				}}
			>
				<View style={styles.contentContainer}>
					<Text>Awesome 🎉</Text>
				</View>
			</BottomSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#251f41'
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center'
	}
});

export default ProfileScreen;
