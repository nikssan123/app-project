import React, { useEffect, useCallback, useState } from 'react';
import { Text, StyleSheet, Image, Dimensions } from 'react-native';
import Animated, {
	useAnimatedStyle,
	interpolate,
	Extrapolate,
	withTiming,
	useSharedValue
} from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';

const { width, height } = Dimensions.get('window');

const Header = ({ item, y, MAX_HEADER_HEIGHT }) => {
	const loaded = useSharedValue(0);

	// const [ headerTextSize, setHeaderTextSize ] = useState(false);

	useEffect(() => {
		loaded.value = 1;
	}, []);

	// const onTextLayout = useCallback(({ nativeEvent }) => {
	// 	console.log(nativeEvent.lines.length >= 3);
	// 	setHeaderTextSize(nativeEvent.lines.length >= 3);
	// }, []);

	const headerStyles = useAnimatedStyle(() => ({
		opacity: interpolate(
			y.value,
			[ 0, MAX_HEADER_HEIGHT / 2 * 0.3 ],
			[ 1, 0 ],
			Extrapolate.CLAMP
		),
		transform: [
			{
				translateY: interpolate(
					y.value,
					[ 0, MAX_HEADER_HEIGHT / 3 ],
					// [ 0, -MAX_HEADER_HEIGHT / 1.4 ],
					[ 0, -MAX_HEADER_HEIGHT ],
					Extrapolate.CLAMP
				)
			}
		]
	}));

	const initialTitleStyles = useAnimatedStyle(() => ({
		opacity: withTiming(interpolate(loaded.value, [ 0, 1 ], [ 0, 1 ], Extrapolate.CLAMP), {
			duration: 800
		})
	}));

	const titleStyles = useAnimatedStyle(() => {
		const opacity = interpolate(
			y.value,
			[ 0, MAX_HEADER_HEIGHT * 0.2 ],
			[ 1, 0 ],
			Extrapolate.CLAMP
		);

		return {
			opacity
		};
	});

	return (
		<Animated.View style={[ styles.header, headerStyles ]}>
			<Image
				source={{ uri: item.image }}
				style={{ ...StyleSheet.absoluteFill, width, height: height * 0.45 }}
				resizeMode="cover"
				resizeMethod="scale"
				blurRadius={5}
			/>
			<Animated.View>
				<SharedElement id={`${item.id}.image`}>
					<Image
						source={{ uri: item.image }}
						style={[
							{
								width: 120,
								height: 175,
								borderRadius: 15
							}
						]}
						resizeMode="cover"
					/>
				</SharedElement>
			</Animated.View>
			<Animated.Text
				// onTextLayout={onTextLayout}
				style={[
					styles.title,
					initialTitleStyles,
					titleStyles
					// { fontSize: headerTextSize ? 18 : 24 }
				]}
			>
				{item.title}
			</Animated.Text>
			<SharedElement id={`${item.id}.author`}>
				<Text style={[ styles.author ]}>{item.info}</Text>
			</SharedElement>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	header: {
		height: height * 0.45,
		width,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 70,
		opacity: 0.2
	},
	title: {
		textAlign: 'center',
		color: 'white',
		// opacity: 0.7,
		fontSize: 24,
		marginTop: 10,
		fontWeight: '300'
		// fontFamily: 'Montserrat'
	},
	author: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
		marginTop: 7,
		fontFamily: 'Montserrat'
	}
});

export default Header;
