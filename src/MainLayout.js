import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";
import { ScreenContext } from "./context/screen/screenContext";

export const MainLayout = () => {
  const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext);
  const { changeScreen, todoId } = useContext(ScreenContext);

  /*   const removeTodo = (id) => {
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
  }; */

  const goBackHandler = () => {
    changeScreen(null);
  };

  const openTodoHandler = (id) => {
    console.log(id);
    changeScreen(id);
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
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
});
