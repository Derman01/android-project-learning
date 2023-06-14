import { FC } from 'react';
import { ColorValue, StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle, ViewProps } from 'react-native';

interface ICalcButtonProps {
	onPress?: () => void;
	backgroundColor?: ColorValue;
	color?: ColorValue;
	title: string;
	style?: StyleProp<ViewStyle>,
}

export const CalcButton: FC<ICalcButtonProps> = (props) => {
	const {onPress, backgroundColor, title, color} = props;

	return (
		<TouchableOpacity onPress={onPress} style={[styles.container, {
			backgroundColor
		}, props.style]}>
			<Text style={[styles.text, {color}]}>{title}</Text>
		</TouchableOpacity>
	);
};
// #2c2c2c

CalcButton.defaultProps = {
	backgroundColor: '#2c2c2c',
	color: '#fff'
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 80,
		maxWidth: 170,
		height: 80,
		borderRadius: 40,
		margin: 5
	},
	text: {
		fontSize: 30,
		fontWeight: 'bold'
	}
});