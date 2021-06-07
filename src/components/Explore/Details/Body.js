import React, { useState, useCallback, useRef } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
	Image,
	Pressable
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Section from '../Section';

const { width } = Dimensions.get('window');

const Body = ({ item, similarItems, loaded, err, type, readLessPress }) => {
	// const scrollRef = useRef(null);
	// const bottomSheet = useRef(null);

	const [ textShown, setTextShown ] = useState(false);
	const [ lengthMore, setLengthMore ] = useState(false); //to show the "Read more & Less Line"

	const toggleNumberOfLines = () => {
		setTextShown(!textShown);
		if (textShown) readLessPress();
	};

	const onTextLayout = useCallback(({ nativeEvent }) => {
		setLengthMore(nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
	}, []);

	let sector1 = '';
	if (type === 'books') {
		sector1 = 'Pages:';
	} else {
		sector1 = 'Length:';
	}

	const ratingText = () => {
		if (item.rating) {
			return <Entypo name="star" size={16} color="white" />;
		} else {
			return 'No reviews';
		}
	};

	return (
		<React.Fragment>
			{loaded ? err.length > 0 ? (
				<Text
					style={{
						fontSize: 18,
						color: 'red',
						fontFamily: 'Montserrat',
						marginTop: 100,
						width,
						textAlign: 'center'
					}}
				>
					{err}
				</Text>
			) : (
				<React.Fragment>
					<View style={{ width, paddingHorizontal: 25, marginTop: 10 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text
								style={{
									color: 'white',
									fontSize: 30,
									fontFamily: 'Montserrat'
								}}
							>
								Information
							</Text>

							<MaterialCommunityIcons
								name="information-variant"
								style={{ marginLeft: 5, marginTop: 5 }}
								size={30}
								color="white"
							/>
						</View>
						<View style={styles.statusBar}>
							<View style={styles.statusBarSection}>
								<Text style={styles.statusBarTextHeader}>{sector1}</Text>
								<Text style={styles.statusBarHeaderTextContent}>{item.size}</Text>
							</View>
							<View
								style={[
									styles.statusBarSection,
									{
										borderRightColor: 'black',
										borderRightWidth: 2,
										borderLeftColor: 'black',
										borderLeftWidth: 2
									}
								]}
							>
								<Text style={styles.statusBarTextHeader}>Reviews:</Text>
								<Text style={styles.statusBarHeaderTextContent}>
									{item.rating ? `${item.rating}/5 ` : null}
									{ratingText()}
									{/* {item.rating}/5 <Entypo name="star" size={16} color="white" /> */}
								</Text>
							</View>
							<View style={styles.statusBarSection}>
								<Text style={styles.statusBarTextHeader}>Status:</Text>
								<Text style={styles.statusBarHeaderTextContent}>Wishlist</Text>
							</View>
						</View>
						<View style={{ marginVertical: 20, marginRight: 10 }}>
							<Text
								ellipsizeMode="tail"
								numberOfLines={textShown ? undefined : 4}
								style={{ fontSize: 18, color: 'white' }}
								onTextLayout={onTextLayout}
								style={styles.description}
							>
								{item.description && item.description.length > 0 ? (
									`${item.description}`
								) : (
									'No description'
								)}
							</Text>
							{lengthMore ? (
								<Text
									onPress={toggleNumberOfLines}
									style={{
										lineHeight: 21,
										marginTop: 10,
										color: 'white',
										fontSize: 20,
										opacity: 0.8
									}}
								>
									{textShown ? 'Read less' : 'Read more...'}
								</Text>
							) : null}
						</View>
						<Section
							header1={`Similar ${type[0].toUpperCase()}${type.substring(1)}`}
							data={similarItems}
							type={type}
							style={{ width: width * 0.88 }}
						/>
						<View style={styles.communityContainer}>
							<Text style={styles.text}>
								Join like-minded people in the subvortex!
							</Text>
							<Pressable>
								<Text style={styles.text}>Join</Text>
							</Pressable>
						</View>
					</View>
					<View style={{ width, height: 500, marginTop: 25 }}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text
								style={{
									marginLeft: 25,
									color: 'white',
									fontSize: 30,
									fontFamily: 'Montserrat'
								}}
							>
								Reviews
							</Text>
							<MaterialIcons
								style={{ marginLeft: 5, marginTop: 5 }}
								name="rate-review"
								size={30}
								color="white"
							/>
						</View>
					</View>
				</React.Fragment>
			) : (
				<ActivityIndicator size="large" style={{ marginTop: 100 }} color="white" />
			)}
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	statusBar: {
		marginTop: 20,
		flexDirection: 'row',
		width: width * 0.9,
		height: 70,
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: 18,
		backgroundColor: '#332b59',
		// borderWidth: 0.4,
		// borderColor: 'black',
		shadowOffset: {
			height: 5,
			width: 2
		},
		elevation: 5,
		shadowColor: 'black'
	},
	statusBarSection: {
		height: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	statusBarTextHeader: {
		fontSize: 18,
		color: 'white',
		fontFamily: 'MontserratBold'
	},
	statusBarHeaderTextContent: {
		fontSize: 16,
		color: 'white',
		fontFamily: 'Montserrat',
		marginTop: 2
	},
	description: {
		fontFamily: 'Montserrat',
		color: 'white',
		fontSize: 18
	},
	communityContainer: {
		// height: 50,
		width: width * 0.87,
		padding: 10,
		backgroundColor: '#332b59',
		borderRadius: 10,
		flexDirection: 'row',
		overflow: 'hidden',
		justifyContent: 'space-evenly'
	},
	text: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Montserrat'
	}
});

export default Body;
