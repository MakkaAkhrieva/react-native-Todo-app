import { StyleSheet, View } from "react-native";
import { Navbar } from "./src/components/Navbar";
import React, { useState } from "react";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App() {
  const [todoId, setTodoId] = useState("2");
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React Native" },
    { id: "2", title: "Learn React " },
    { id: "3", title: "Learn GraphQl" },
    { id: "4", title: "Learn Nest.js" },
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
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const goBackHandler = () => {
    setTodoId(null);
  };

  const openTodoHandler = (id) => {
    console.log(id);
    setTodoId(id);
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
    content = <TodoScreen goBack={goBackHandler} todo={selectedTodo} />;
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
