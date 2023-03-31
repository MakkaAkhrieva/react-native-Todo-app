import React, { useReducer, useContext } from "react";
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ScreenContext } from "../screen/screenContext";
import { Alert } from "react-native";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [
      { id: "1", title: "Learn React Native" },
      { id: "2", title: "Learn React " },
      { id: "3", title: "Learn GraphQl" },
      { id: "4", title: "Learn Nest.js" },
    ],
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (title) => dispatch({ type: ADD_TODO, title: title });

  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert("Delete element", `Are you sure to delete ${todo.title}`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          changeScreen(null);
          dispatch({ type: REMOVE_TODO, id: id });
        },
      },
    ]);
  };

  const updateTodo = (id, title) =>
    dispatch({ type: UPDATE_TODO, id: id, title: title });

  return (
    <TodoContext.Provider
      value={{ todos: state.todos, addTodo, removeTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
