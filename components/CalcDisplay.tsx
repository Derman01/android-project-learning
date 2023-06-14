import { StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';

interface CalcDisplayProps {
	value: string;
}

export const CalcDisplay: FC<CalcDisplayProps> = (props) => {
	const {value} = props;

	return (
		<View style={[styles.container]}>
			<Text style={[styles.display]}>{value}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		paddingLeft: 10,
		paddingRight: 10,
		marginBottom: 40
	},
	display: {
		color: 'white',
		marginRight: 10,
		marginLeft: 10,
		paddingLeft: 10,
		paddingRight: 10,
		textAlign: 'right',
		fontSize: 50,
	}
});