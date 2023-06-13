import {
	Button,
	StyleSheet,
	View
} from 'react-native';
import { TextInput, Text } from '@react-native-material/core';
import { useState } from 'react';

interface IValues<T = number | string | null> {
	a: T;
	b: T;
	c: T;
}

export default function App() {
	const [values, setValues] = useState<IValues>({
		a: null,
		b: null,
		c: null
	});
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [answerText, setAnswerText] = useState<string>('');

	const onChange = (key: string) => (value: string) => {
		setValues(values => ({
			...values,
			[key]: value
		}));
	};

	const checkNumbers = (): Promise<IValues<number>> => {
		return new Promise((resolve, reject) => {
			const result: { [key: string]: number } = {};
			Object.entries((values)).forEach(([key, value]) => {
				if (!value) {
					reject(`Пустое значение ${key}`);
				}
				const numberValue = Number(value);
				if (Number.isNaN(numberValue)) {
					reject(`Значение ${key} должно быть числом`);
				}
				result[key] = numberValue;
			});
			setErrorMessage('');
			// @ts-ignore
			resolve(result);
		});
	};

	const getResult = (result: IValues<number>) => {
		const {a, b, c} = result;

		const D = b * b - 4 * a * c;

		if (a === 0) {
			if (b === 0) {
				if (c === 0) {
					setAnswerText('При любых x уравнение является верным');
				} else {
					setAnswerText('Уравнение неверно');
				}
			} else {
				setAnswerText(`Уравнение линейное \n:Ответ: x = ${-c / b}`);
			}
		} else if (D < 0) {
			setAnswerText('Дискриминант меньше нуля \nОтвет: Корней нет');
		} else if (D === 0) {
			const x = (-b + Math.sqrt(D)) / (2 * a);
			setAnswerText(`Дискриминант равен нулю \nОтвет: x =${x}`);
		} else {
			const x1 = (-b + Math.sqrt(D)) / (2 * a);
			const x2 = (-b - Math.sqrt(D)) / (2 * a);
			setAnswerText(`Дискриминант больше нуля \nОтвет: x1 = ${x1}, x2 = ${x2}`);
		}
	};

	const onSend = () => {
		checkNumbers().then((result: IValues) => {
			// @ts-ignore
			getResult(result);
		}).catch(message => {
			setErrorMessage(message);
			setAnswerText('');
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View>
					<Text>{'ax^2 + bx + c = 0'}</Text>
					{
						errorMessage && <Text style={styles.error}>{errorMessage}</Text>
					}
					<View style={styles.row}>
						<TextInput keyboardType={'numbers-and-punctuation'} placeholder={'a'}
								   onChangeText={onChange('a')}/>
						<TextInput keyboardType={'numbers-and-punctuation'} placeholder={'b'}
								   onChangeText={onChange('b')}/>
						<TextInput keyboardType={'numbers-and-punctuation'} placeholder={'c'}
								   onChangeText={onChange('c')}/>
					</View>
					<Button title={'Ответ'} onPress={onSend}/>
					{
						answerText &&
                        <Text>{answerText}</Text>
					}
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		backgroundColor: '#fff',
	},
	content: {
		flex: 1,
		paddingTop: 50,
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	row: {
		display: 'flex',
		gap: 10,
	},
	error: {
		color: 'red',
	}
});
