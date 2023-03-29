import { StyleSheet, View, Alert } from "react-native";
import { Navbar } from "./src/components/Navbar";
import React, { useState } from "react";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

async function loadApplication() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
}

export default function App() {
  const [todoId, setTodoId] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React Native" },
    /*     { id: "2", title: "Learn React " },
    { id: "3", title: "Learn GraphQl" },
    { id: "4", title: "Learn Nest.js" }, */
  ]);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={(err) => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  const addTodo = (title) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: title,
      },
    ]);
  };

  const removeTodo = (id) => {
    const selectedTodo = todos.find((todo) => todo.id === id);
    Alert.alert(
      "Delete element",
      `Are you sure to delete ${selectedTodo.title}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setTodoId(null);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
          },
        },
      ]
    );
  };

  const goBackHandler = () => {
    setTodoId(null);
  };

  const openTodoHandler = (id) => {
    console.log(id);
    setTodoId(id);
  };

  const updateTodo = (id, title) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      })
    );
  };

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={openTodoHandler}
    />
  );
  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id == todoId);
    content = (
      <TodoScreen
        goBack={goBackHandler}
        todo={selectedTodo}
        onRemove={removeTodo}
        onSave={updateTodo}
      />
    );
  }
  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
