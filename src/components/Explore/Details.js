import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, Pressable } from 'react-native';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Details = ({ route, navigation }) => {
	const { item } = route.params;

	const loaded = useSharedValue(false);

	useEffect(() => {
		loaded.value = true;
	}, []);

	const titleStyles = useAnimatedStyle(() => ({
		opacity: withTiming(interpolate(loaded.value, [ 0, 1 ], [ 0, 1 ], Extrapolate.CLAMP), {
			duration: 800
		})
	}));

	return (
		<ScrollView>
			<View style={styles.header}>
				<Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
					<AntDesign name="close" size={24} color="white" />
				</Pressable>
				<Image
					source={{ uri: item.image }}
					style={{ ...StyleSheet.absoluteFill, width, height: height * 0.5 }}
					resizeMode="cover"
					resizeMethod="scale"
					blurRadius={2}
				/>
				<SharedElement id={`${item.id}.image`}>
					<Image
						source={{ uri: item.image }}
						style={{
							width: 120,
							height: 175,
							borderRadius: 15
						}}
						resizeMode="cover"
					/>
				</SharedElement>
				<Animated.Text style={[ styles.title, titleStyles ]}>{item.title}</Animated.Text>
				<SharedElement id={`${item.id}.author`}>
					<Text style={styles.author}>{item.author}</Text>
				</SharedElement>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	header: {
		height: height * 0.5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	closeButton: {
		position: 'absolute',
		right: 5,
		top: 5,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10,
		width: 60,
		height: 60
	},
	title: {
		textAlign: 'center',
		color: 'white',
		// opacity: 0.7,
		fontSize: 26,
		marginTop: 10,
		fontFamily: 'Montserrat'
	},
	author: {
		textAlign: 'center',
		color: 'white',
		// opacity: 0.7,
		fontSize: 20,
		fontFamily: 'Montserrat'
	}
});

export default Details;
