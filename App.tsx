import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import { useState } from 'react';

export default function App() {

  const [textInput, setTextInput] = useState('');
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} onChangeText={setTextInput}/>
      <Button title={'Отобразить'}
              onPress={() => setText(textInput)}/>
      <Text>{text || ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12
  },
  textInput: {
    borderBottomWidth: 1,
    width: '100%',
    textAlign: 'center',
    marginBottom: 12
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
