import {
  View,
  Button,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import Colors from '../constants/Colors';

interface todoType {
  id: string | number[];
  content: string;
  isCompleted: boolean;
}
const HomeScreen = ({navigation}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [edit, setEdit] = useState<todoType>({
    id: '',
    content: 'Todo 1',
    isCompleted: false,
  });
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<todoType[]>([
    {
      id: uuid.v4(),
      content: 'Todo 1',
      isCompleted: false,
    },
  ]);

  const addNewTodo = (newContent: string) => {
    setTodos(prev => [
      ...prev,
      {id: uuid.v4(), content: newContent, isCompleted: false},
    ]);
    setValue('');
  };

  const editTodo = (id: string | number[], content: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          content: content,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  const removeTodo = (id: string | number[]) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const changeCompleteStatusInTodo = (id: string | number[]) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  console.log(edit);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todo app</Text>

      <View style={styles.inputContainer}>
        <TextInput value={value} onChangeText={setValue} style={styles.input} placeholder='Type here' />
        <Button
          title="Add"
          color={Colors.confirm}
          onPress={() => addNewTodo(value)}></Button>
      </View>
      <FlatList
        style={{padding: 5}}
        data={todos}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => changeCompleteStatusInTodo(item.id)}>
            <Text
              style={{
                ...styles.item,
                textDecorationLine: item.isCompleted ? 'line-through' : 'none',
              }}>
              {item.content}
            </Text>
            <View style={styles.row}>
              <Button
                title="Edit"
                color={Colors.confirm}
                onPress={() => {
                  setModalVisible(true);
                  setEdit(item);
                }}></Button>
              <Button
                title="Delete"
                color={Colors.invalid}
                onPress={() => removeTodo(item.id)}></Button>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.dark,
            display: 'flex',
            justifyContent: "center",
            flexDirection: "column",
            paddingHorizontal: 10,
            gap: 10
          }}>
          <TextInput
            value={edit.content}
            onChangeText={e => {
              setEdit((prev: any) => ({...prev, content: e}));
            }}
            style={styles.input}
          />
          <Button
            title="Submit"
            color={Colors.confirm}
            onPress={() => {
              editTodo(edit.id, edit.content);
              setModalVisible(false);
            }}></Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    color: Colors.primary,
    padding: 10,
    fontSize: 25,
  },
  button: {
    fontFamily: 'Poppins-Regular',
    marginTop: 50,
  },
  item: {
    fontFamily: 'Poppins-Regular',
    color: Colors.light,
  },
  touchable: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 5,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.light2,
    flexShrink: 1,
    width: "100%",
    borderRadius: 6,
    height: 40,
    paddingLeft: 10
  },
});

export default HomeScreen;
