import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
	useAnimatedScrollHandler
} from 'react-native-reanimated';
import Contants from 'expo-constants';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

import FAB from '../../../common/FAB';
import Header from './Header';
import Menu from './Menu';
import Body from './Body';

const { width, height } = Dimensions.get('window');

const MAX_HEADER_HEIGHT = height * 0.45;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Details = ({ route, navigation }) => {
	const { item, type } = route.params;
	const cancelTokenSource = axios.CancelToken.source();

	const GOOGLE_API_KEY = Contants.manifest.extra.GOOGLE_BOOK_API_KEY;

	const verticalScroll = useRef(null);

	const [ err, setErr ] = useState('');
	const [ foundItem, setFoundItem ] = useState({});
	const [ similarItems, setSimilarItems ] = useState([]);
	const [ loaded, setLoaded ] = useState(false);
	const [ changeTextSize, setChangeTextSize ] = useState(false);

	// const x = useSharedValue(0);
	const y = useSharedValue(0);

	const fetchItem = async () => {
		try {
			if (type === 'books') {
				const uri = encodeURI(
					`https://www.googleapis.com/books/v1/volumes?q=intitle:${item.title}+inauthor:${item.info}&maxResults=1&printType=books&key=${GOOGLE_API_KEY}`
				);
				const response = await axios.get(uri, {
					cancelToken: cancelTokenSource.token
				});

				if (response.data.items.length > 0) {
					const { volumeInfo } = response.data.items[0];
					setFoundItem({
						// title: volumeInfo.title,
						// info: volumeInfo.authors[0],
						description: volumeInfo.description,
						rating: volumeInfo.averageRating,
						size: volumeInfo.pageCount
					});
				} else {
					setErr('Something went wrong!');
				}
			}
		} catch (e) {
			setErr('Something went wrong!');
		}
	};

	const fetchSimiliarItems = async () => {
		try {
			if (type === 'books') {
				const uri = encodeURI(
					`https://www.goodreads.com/book/auto_complete?format=json&q=${item.info}`
				);
				const response = await axios.get(uri, {
					cancelToken: cancelTokenSource.token
				});

				if (response.data.length > 0) {
					const newItems = response.data.map(item => ({
						image: item.imageUrl.replace(/_..../, '_SY275_'),
						info: item.author.name,
						id: item.bookId,
						title: item.title
					}));
					setSimilarItems(newItems);
				} else {
					setErr('Something went wrong!');
				}
			}
		} catch (e) {
			setErr('Something went wrong!');
		}
	};

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: e => {
			console.log(y.value);
			y.value = e.contentOffset.y;
		}
	});

	useEffect(() => {
		(async () => {
			await fetchItem();
			await fetchSimiliarItems();
			setLoaded(true);
		})();

		// fetch info for the user status -> request to custom back end
		return () => {
			cancelTokenSource.cancel();
		};
	}, []);

	const navBar = useAnimatedStyle(() => {
		const opacity = interpolate(
			y.value,
			[ 0, MAX_HEADER_HEIGHT * 0.3 ],
			[ 0, 1 ],
			Extrapolate.CLAMP
		);
		return {
			opacity: withTiming(opacity, { duration: 100 }),
			transform: [ { translateY: y.value } ]
		};
	});

	const closeButtonStyles = useAnimatedStyle(() => {
		return {
			top: interpolate(y.value, [ 0, MAX_HEADER_HEIGHT / 2 ], [ 15, 20 ], Extrapolate.CLAMP)
		};
	});

	const mainStyles = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(
					y.value,
					[ 0, MAX_HEADER_HEIGHT / 2 * 0.5 ],
					// [ 0, -MAX_HEADER_HEIGHT + (MAX_HEADER_HEIGHT + 50) ],
					[ 0, -140 ],
					Extrapolate.CLAMP
				)
			}
		]
	}));

	const handleMenuReviewPress = () => {
		if (verticalScroll.current) {
			verticalScroll.current.scrollTo({
				y: 750,
				animated: true
			});
		}
	};
	const handleMenuInfoPress = () => {
		if (verticalScroll.current) {
			verticalScroll.current.scrollTo({
				y: 100,
				animated: true
			});
		}
	};

	const scrollToTop = () => {
		if (verticalScroll.current) {
			verticalScroll.current.scrollTo({
				y: 100,
				animated: true
			});
		}
	};

	const onTextLayout = useCallback(({ nativeEvent }) => {
		setChangeTextSize(nativeEvent.lines.length > 3 ? true : false);
	}, []);

	return (
		<React.Fragment>
			<FAB
				containerStyles={{ backgroundColor: '#7568b6' }}
				onPress={() => console.log('pressed')}
				innerComponent={<AntDesign name="plus" size={24} color="white" />}
			/>
			<AnimatedTouchableOpacity
				style={[ styles.closeButton, closeButtonStyles ]}
				onPress={() => {
					navigation.goBack();
				}}
			>
				<AntDesign name="close" size={24} color="white" />
			</AnimatedTouchableOpacity>
			<Animated.ScrollView
				onScroll={scrollHandler}
				showsVerticalScrollIndicator={false}
				overScrollMode="never"
				bounces={false}
				ref={verticalScroll}
			>
				<Animated.View style={[ styles.navBar, navBar ]}>
					<Image
						source={{ uri: item.image }}
						style={{ ...StyleSheet.absoluteFill, width, height: height * 0.5 }}
						resizeMode="cover"
						resizeMethod="scale"
						blurRadius={5}
					/>
					<Text
						onTextLayout={onTextLayout}
						style={[
							styles.navTitle,
							{ width, paddingHorizontal: 70, fontSize: changeTextSize ? 18 : 22 }
						]}
					>
						{item.title}
					</Text>
				</Animated.View>

				<Header item={item} y={y} MAX_HEADER_HEIGHT={MAX_HEADER_HEIGHT} />

				{/* Body */}

				<Menu
					y={y}
					// x={x}
					handleMenuReviewPress={handleMenuReviewPress}
					handleMenuInfoPress={handleMenuInfoPress}
					MAX_HEADER_HEIGHT={MAX_HEADER_HEIGHT}
				/>
				<Animated.View style={[ styles.main, mainStyles ]}>
					<Body
						item={foundItem}
						similarItems={similarItems}
						loaded={loaded}
						err={err}
						type={type}
						readLessPress={scrollToTop}
					/>
					{/* </Animated.ScrollView> */}
				</Animated.View>
			</Animated.ScrollView>
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	navBar: {
		height: 100,
		width,
		position: 'absolute',
		zIndex: 1,
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center'
	},

	closeButton: {
		position: 'absolute',
		right: 5,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10,
		width: 60,
		height: 60,
		shadowOffset: {
			height: 5,
			width: 5
		},
		shadowColor: 'black',
		elevation: 5
	},

	navTitle: {
		textAlign: 'center',
		color: 'white',
		// opacity: 0.8,
		marginTop: 5,
		// fontSize: 22,
		fontFamily: 'Montserrat'
	},
	main: {
		// height: 2000,
		zIndex: 0
	}
});

export default React.memo(Details);
