import { Animated, StyleSheet, View } from 'react-native';
import { CalcDisplay } from './CalcDisplay';
import { useState } from 'react';
import { CalcButton } from './CalcButton';
import Value = Animated.Value;

type TypeOperator = '+' | '-' | '/' | '*';

export const CalcScreen = () => {
	const [displayValue, setDisplayValue] = useState('0');
	const [firstNumber, setFirstNumber] = useState<number>(0);
	const [secondNumber, setSecondNumber] = useState<number | null>(null);
	const [result, setResult] = useState<number | null>(null);
	const [operator, setOperator] = useState<TypeOperator | null>();

	const handleNumberPress = (number: number) => () => {
		const module = displayValue === '-0' ? -1 : 1;
		const floatIndex = displayValue.split('').indexOf('.');
		const countFloat = displayValue.length - floatIndex;

		const currentNumber = operator ? (
			secondNumber === null ? secondNumber : result
		) : firstNumber;
		const setValue = operator ? (
			secondNumber === null ? setSecondNumber : setResult
		) : setFirstNumber;

		const numberPlus = floatIndex !== -1 && currentNumber !== null ? number / (10 * countFloat) : number;

		const value = ((currentNumber || 0) * (floatIndex === -1 ? 10 : 1) + numberPlus) * module;
		setDisplayValue(value.toString().slice(0, 9));
		setValue(value);
	};

	const clearDisplay = () => {
		setDisplayValue('0');
		setFirstNumber(0);
		setSecondNumber(null);
		setResult(null);
		setOperator(null);
	};

	const handleModulePress = () => {
		if (firstNumber === 0) {
			const isMinus = displayValue === '-0';
			if (isMinus) {
				setDisplayValue(displayValue.slice(1));
			} else {
				setDisplayValue('-0');
			}
		} else {
			if (secondNumber) {
				if (result !== null) {
					setResult(value => value as number * -1);
				} else {
					setSecondNumber(value => value as number * -1);
				}
			} else {
				setFirstNumber(value => value as number * -1);
			}
			const isMinus = displayValue[0] === '-';
			setDisplayValue(value => (isMinus ? value.slice(1) : '-' + value).slice(0, 9));
		}
	};

	const handleProcentPress = () => {
		if (!operator || secondNumber === null) {
			const value = firstNumber / 100;
			setFirstNumber(value);
			setDisplayValue(value.toString().slice(0, 9));
		} else {
			const value = Number(displayValue) / 100;
			setDisplayValue(value.toString().slice(0, 9));
			if (result !== null) {
				setResult(res => res as number / 100);
			} else {
				setSecondNumber(res => res as number / 100);
			}
		}
	};

	const handleOperatorPress = (operator: TypeOperator) => () => {
		if (operator && secondNumber !== null) {
			calcResult();
		}
		setOperator(operator);
		setSecondNumber(null);
	};

	const calcResult = () => {
		const second = secondNumber === null ? firstNumber : secondNumber;
		setSecondNumber(second);
		if (!operator) {
			return;
		}
		const process = {
			'*': (a: number, b: number) => a * b,
			'/': (a: number, b: number) => a / b,
			'+': (a: number, b: number) => a + b,
			'-': (a: number, b: number) => a - b,
		};

		let value = process[operator](result || firstNumber, second) as number;
		if (Number.isNaN(value) || value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY) {
			setDisplayValue('Ошибка');
		} else {
			value = Math.round(value * 10e6) / 10e6;
			setFirstNumber(value);
			setResult(value);
			setDisplayValue(value.toString().slice(0, 9));
		}
	};

	const handlerFloatPress = () => {
		if (displayValue.split('').find((a) => a === '.')) {
			return;
		}
		setDisplayValue(value => value + '.');
	};

	return (
		<View style={[styles.container]}>
			<View style={[styles.center]}>
				<CalcDisplay value={displayValue}/>
				<View style={[styles.buttonRow]}>
					<CalcButton title={'AC'} color={'black'} onPress={clearDisplay} backgroundColor={'#9b9b9b'}/>
					<CalcButton title={'+/-'} color={'black'} onPress={handleModulePress} backgroundColor={'#9b9b9b'}/>
					<CalcButton title={'%'} color={'black'} onPress={handleProcentPress} backgroundColor={'#9b9b9b'}/>
					<CalcButton title={'/'} backgroundColor={'#ed8f30'} onPress={handleOperatorPress('/')}/>
				</View>
				<View style={[styles.buttonRow]}>
					<CalcButton title={'7'} onPress={handleNumberPress(7)}/>
					<CalcButton title={'8'} onPress={handleNumberPress(8)}/>
					<CalcButton title={'9'} onPress={handleNumberPress(9)}/>
					<CalcButton title={'x'} backgroundColor={'#ed8f30'} onPress={handleOperatorPress('*')}/>
				</View>
				<View style={[styles.buttonRow]}>
					<CalcButton title={'4'} onPress={handleNumberPress(4)}/>
					<CalcButton title={'5'} onPress={handleNumberPress(5)}/>
					<CalcButton title={'6'} onPress={handleNumberPress(6)}/>
					<CalcButton title={'-'} backgroundColor={'#ed8f30'} onPress={handleOperatorPress('-')}/>
				</View>
				<View style={[styles.buttonRow]}>
					<CalcButton title={'1'} onPress={handleNumberPress(1)}/>
					<CalcButton title={'2'} onPress={handleNumberPress(2)}/>
					<CalcButton title={'3'} onPress={handleNumberPress(3)}/>
					<CalcButton title={'+'} backgroundColor={'#ed8f30'} onPress={handleOperatorPress('+')}/>
				</View>
				<View style={[styles.buttonRow]}>
					<CalcButton title={'0'} onPress={handleNumberPress(0)} style={{flex: 2}}/>
					<CalcButton title={','} onPress={handlerFloatPress}/>
					<CalcButton title={'='} onPress={calcResult} backgroundColor={'#ed8f30'}/>
				</View></View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		fontFamily: 'sans-serif',
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: 'black'
	},
	center: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	buttonRow: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center'
	},
});