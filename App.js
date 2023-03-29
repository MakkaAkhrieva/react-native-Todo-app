import { StyleSheet, View, Alert } from "react-native";
import { Navbar } from "./src/components/Navbar";
import React, { useState } from "react";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App() {
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React Native" },
    /*     { id: "2", title: "Learn React " },
    { id: "3", title: "Learn GraphQl" },
    { id: "4", title: "Learn Nest.js" }, */
  ]);

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
