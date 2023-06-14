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
		flex: 1,
		width: '100%',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 40
	},
	display: {
		color: 'white',
		fontSize: 50,
	}
});