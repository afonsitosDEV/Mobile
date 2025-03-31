import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';  // Importa useFocusEffect

const Tab = createMaterialTopTabNavigator();

const TaskScreen = ({ status, navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  // Carregar tarefas no AsyncStorage quando a aba for focada
  useFocusEffect(
    React.useCallback(() => {
      loadTasks();
    }, [status])
  );

  const loadTasks = async () => {
    const data = await AsyncStorage.getItem('tasks');
    if (data) {
      const allTasks = JSON.parse(data);
      const filteredTasks = allTasks.filter(task => task.status === status);
      setTasks(filteredTasks);
    }
  };

  const saveTasks = async (newTasks) => {
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    loadTasks();  // Carregar novamente após salvar
  };

  const addTask = async () => {
    if (taskName.trim() === '') return;
    const allTasks = JSON.parse(await AsyncStorage.getItem('tasks')) || [];
    const newTask = { id: Date.now().toString(), name: taskName, status: 'Em Andamento' };
    const updatedTasks = [...allTasks, newTask];
    await saveTasks(updatedTasks);
    setTaskName('');  // Limpar campo de entrada
    navigation.navigate("Em Andamento");  // Navegar para a aba de "Em Andamento"
  };

  const editTask = async (task) => {
    Alert.prompt('Editar tarefa', 'Digite o novo nome da tarefa:', [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Salvar',
        onPress: async (newName) => {
          if (!newName) return;
          const allTasks = JSON.parse(await AsyncStorage.getItem('tasks')) || [];
          const updatedTasks = allTasks.map(t => (t.id === task.id ? { ...t, name: newName } : t));
          await saveTasks(updatedTasks);
        }
      }
    ]);
  };

  const completeTask = async (task) => {
    const allTasks = JSON.parse(await AsyncStorage.getItem('tasks')) || [];
    const updatedTasks = allTasks.map(t => (t.id === task.id ? { ...t, status: "Concluída" } : t));
    await saveTasks(updatedTasks);
    navigation.navigate("Concluídas");  // Navegar para a aba de "Concluídas"
  };

  const deleteTask = async (task) => {
    const allTasks = JSON.parse(await AsyncStorage.getItem('tasks')) || [];
    const updatedTasks = allTasks.filter(t => t.id !== task.id);
    await saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      {status === "Nova" && (
        <>
          <TextInput style={styles.input} placeholder="Nova tarefa" value={taskName} onChangeText={setTaskName} />
          <Button title="Adicionar" onPress={addTask} />
        </>
      )}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.name}</Text>
            <View style={styles.buttonContainer}>
              {status === "Em Andamento" && (
                <>
                  <TouchableOpacity onPress={() => editTask(item)}>
                    <Text style={styles.editButton}>✏️ Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => completeTask(item)}>
                    <Text style={styles.completeButton}>✔️ Concluir</Text>
                  </TouchableOpacity>
                </>
              )}
              {status === "Concluída" && (
                <TouchableOpacity onPress={() => deleteTask(item)}>
                  <Text style={styles.deleteButton}>❌ Excluir</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Novas">
          {(props) => <TaskScreen status="Nova" {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Em Andamento">
          {(props) => <TaskScreen status="Em Andamento" {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Concluídas">
          {(props) => <TaskScreen status="Concluída" {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  taskItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
  buttonContainer: { flexDirection: 'row', gap: 10 },
  editButton: { color: 'blue', fontWeight: 'bold', marginRight: 10 },
  completeButton: { color: 'green', fontWeight: 'bold', marginRight: 10 },
  deleteButton: { color: 'red', fontWeight: 'bold' }
});

export default App;
