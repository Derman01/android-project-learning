import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button, Modal
} from 'react-native';
import { useState } from 'react';

export default function App() {

  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onTextChanged = (text: string) => {
    setText(text);
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} onChangeText={onTextChanged}/>
      <Button title={'Open'}
              onPress={() => setModalVisible(true)}/>

      <Modal animationType="slide"
             transparent={true}
             visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{text}</Text>
            <Button title={'Close'}
                    onPress={() => setModalVisible(false)}/>
          </View>
        </View>
      </Modal>
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
