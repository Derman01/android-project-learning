import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CalcScreen } from './components/CalcScreen';

type TOperator = '*' | '/' | '-' | '+';

const Calculator = () => {
	const [displayValue, setDisplayValue] = useState<string>('0');
	const [operator, setOperator] = useState<TOperator | null>();
	const [firstValue, setFirstValue] = useState<number | null>(null);
	const [secondValue, setSecondValue] = useState<number | null>(null);

	const handleNumberPress = (number: number) => {
		if (displayValue === '0' || operator) {
			setDisplayValue(number.toString());
			setOperator(null);
		} else {
			setDisplayValue(displayValue + number.toString());
		}
	};

	const handleOperatorPress = (selectedOperator: TOperator) => {
		if (operator === null) {
			return;
		}

		if (!firstValue) {
			setFirstValue(parseFloat(displayValue));
			setDisplayValue('0');
		} else {
			const currentValue = parseFloat(displayValue);
			const result = performOperation(firstValue, currentValue, operator as TOperator);
			setFirstValue(result);
			setDisplayValue(result.toString());
			setOperator(selectedOperator);
			setSecondValue(currentValue);
		}
	};

	const handleEqualsPress = () => {
		if (operator && secondValue) {
			const currentValue = parseFloat(displayValue);
			const result = performOperation(firstValue as number, currentValue, operator);
			setFirstValue(result);
			setDisplayValue(result.toString());
			setOperator(null);
			setSecondValue(null);
		}
	};

	const performOperation = (firstValue: number, secondValue: number, operator: TOperator) => {
		switch (operator) {
			case '+':
				return firstValue + secondValue;
			case '-':
				return firstValue - secondValue;
			case '*':
				return firstValue * secondValue;
			case '/':
				return firstValue / secondValue;
			default:
				return secondValue;
		}
	};

	const handleClearPress = () => {
		setDisplayValue('0');
		setOperator(null);
		setFirstValue(null);
		setSecondValue(null);
	};

	return <CalcScreen/>;

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.display}>{displayValue}</Text>
				<View style={styles.row}>
					<TouchableOpacity
						style={styles.button}
					>
						<Text style={styles.buttonText}>AC</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
					>
						<Text style={styles.buttonText}>+/-</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.button}
						onPress={() => handleOperatorPress('/')}
					>
						<Text style={styles.buttonText}>%</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.button}
					>
						<Text style={styles.buttonText}>÷</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleNumberPress(7)}
					>
						<Text style={styles.buttonText}>7</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleNumberPress(8)}
					>
						<Text style={styles.buttonText}>8</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleNumberPress(9)}
					>
						<Text style={styles.buttonText}>9</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleOperatorPress('*')}
					>
						<Text style={styles.buttonText}>×</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleNumberPress(4)}
					>
						<Text style={styles.buttonText}>4</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleNumberPress(5)}
					>
						<Text style={styles.buttonText}>5</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleNumberPress(6)}
					>
						<Text style={styles.buttonText}>6</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleOperatorPress('-')}
					>
						<Text style={styles.buttonText}>-</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.row}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleNumberPress(1)}
					>
						<Text style={styles.buttonText}>1</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleNumberPress(2)}
					>
						<Text style={styles.buttonText}>2</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleNumberPress(3)}
					>
						<Text style={styles.buttonText}>3</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleOperatorPress('+')}
					>
						<Text style={styles.buttonText}>+</Text>
					</TouchableOpacity>
				</View>


				<View style={styles.row}>
					<TouchableOpacity
						style={[styles.button, styles.zeroButton]}
						onPress={() => handleNumberPress(0)}
					>
						<Text style={styles.buttonText}>0</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
					>
						<Text style={styles.buttonText}>,</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
					>
						<Text style={styles.buttonText}>=</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: 'black',
		padding: 15,
		width: '100%',
		display: 'flex',
	},
	display: {
		fontSize: 48,
		marginBottom: 24,
		paddingRight: 10,
		paddingLeft: 10,
		textAlign: 'right',
		color: 'white',
	},
	row: {
		flexDirection: 'row',
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#E0E0E0',
		borderRadius: 32,
		height: 80,
		width: 80,
		margin: 10,
		padding: 30,
	},
	buttonText: {
		fontWeight: 'bold',
		fontSize: 32,
	},
	zeroButton: {
		flex: 2,
	},
	clearButton: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FF7043',
		borderRadius: 4,
		margin: 8,
		height: 64,
	},
	clearButtonText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#FFFFFF',
	},
	grid: {}
});

export default Calculator;
