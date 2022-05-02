import React, {useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, Platform, TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Tasks';

export default function App() {

  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  // adding tasks
  const handleAddTask = () =>{
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask("");
  }

  // deleting tasks
  const handleTaskCompletion = (index) =>{
    const newItems = [...taskItems];
    newItems.splice(index, 1);
    setTaskItems(newItems);
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>
          React Native Todo App
        </Text>
        {/* todo container */}
        <View style={styles.items}>
          {
            taskItems.map((item, index) =>{
              return (
                <TouchableOpacity key={index} onPress={() =>handleTaskCompletion()}>
                   <Task text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputTextWrapper}>
        <TextInput 
          value={task}
          onChangeText={text => setTask(text)}
          style={styles.input} 
          placeholder={'Write a task!'}
          />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey'
  },
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  items:{
    marginTop: 30
  },
  inputTextWrapper:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#c0c0c0'
  },
  addWrapper:{
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  }
});
