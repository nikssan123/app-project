import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
	View,
	Text,
	TouchableWithoutFeedback,
	StyleSheet,
	KeyboardAvoidingView,
	ScrollView
} from 'react-native';

import Animated, {
	useDerivedValue,
	useAnimatedStyle,
	interpolate,
	Extrapolate,
	withTiming,
	withSpring,
	Easing,
	interpolateColor
} from 'react-native-reanimated';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

// Filled the icons -> download them into svg ..

const TabBar = ({ state, descriptors, navigation }) => {
	return (
		// <KeyboardAvoidingView>
		// <ScrollView>
		<View collapsable={false} style={[ styles.container ]}>
			{state.routes.map((route, index) => {
				{
					/* if (route.params.icon) { */
				}
				const icon = route.params.icon;
				{
					/* } */
				}
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined ? options.title : route.name;

				const isFocused = state.index === index;

				const focused = useDerivedValue(() => {
					return state.index === index;
				});

				const animatedStyles = useAnimatedStyle(() => {
					{
						/* const backgroundColor = focused.value ? 'rgb(66, 55, 115)' : 'transperant'; */
					}

					const backgroundColor = interpolateColor(
						focused.value,
						[ 0, 1 ],
						[ '#251f41', '#423773' ]
					);

					const opacity = interpolate(
						focused.value,
						[ 0, 1 ],
						[ 0.7, 1 ],
						Extrapolate.CLAMP
					);

					const flex = interpolate(
						focused.value,
						[ 0, 1 ],
						[ 0.8, 1 ],
						Extrapolate.CLAMP
					);

					return {
						backgroundColor: withTiming(backgroundColor, {
							duration: 600,
							easing: Easing.inOut(Easing.ease)
						}),
						opacity: withTiming(opacity, {
							duration: 400,
							easing: Easing.inOut(Easing.ease)
						}),
						flex: withSpring(flex)
					};
				});

				const textStyles = useAnimatedStyle(() => {
					const translateX = interpolate(
						focused.value,
						[ 0, 1 ],
						[ 25, 0 ],
						Extrapolate.CLAMP
					);

					return {
						transform: [
							{
								translateX: withSpring(translateX)
							}
						]
					};
				});

				{
					/* const iconStyles = useAnimatedStyle(() => {
					const translateX = interpolate(
						focused.value,
						[ 0, 1 ],
						[ 0, -5 ],
						Extrapolate.CLAMP
					);

					return {
						transform: [
							{
								translateX: withSpring(translateX)
							}
						]
					};
				}); */
				}

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key
					});
				};

				return (
					<TouchableWithoutFeedback
						key={index}
						accessibilityRole="button"
						accessibilityStates={isFocused ? [ 'selected' ] : []}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
					>
						<Animated.View style={[ styles.buttonContainer, animatedStyles ]}>
							<FontAwesome
								// style={[ iconStyles ]}
								name={icon}
								size={28}
								color="white"
							/>
							{isFocused ? (
								<Animated.Text
									style={[
										{
											color: 'white',
											fontSize: 18,
											marginLeft: 10,
											fontFamily: 'Montserrat'
										},
										textStyles
									]}
								>
									{label}
								</Animated.Text>
							) : null}
						</Animated.View>
					</TouchableWithoutFeedback>
				);
			})}
		</View>
		// 	</ScrollView>
		// </KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#251f41',
		height: 70,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopWidth: 0.3,
		borderColor: '#423773',
		// borderColor: 'rgba(255, 255, 255, 0.5)',
		// borderTopLeftRadius: 20,
		// borderTopRightRadius: 20,
		shadowOffset: {
			height: 5,
			width: 0
		},
		shadowColor: '#423773',
		shadowRadius: 10,
		elevation: 5
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 8,
		borderRadius: 30,
		height: 35
	}
});

export default TabBar;
