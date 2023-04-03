import React, { useReducer, useContext } from "react";
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ScreenContext } from "../screen/screenContext";
import { Alert } from "react-native";
import { Http } from "../../http";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async (title) => {
    clearError();
    try {
      const data = await Http.post(
        "https://rn-todo-app-14c70-default-rtdb.firebaseio.com/todos.json",
        { title }
      );
      dispatch({ type: ADD_TODO, title: title, id: data.name });
    } catch (error) {
      showError("Something went wrong");
      console.log(error);
    }
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get(
        "https://rn-todo-app-14c70-default-rtdb.firebaseio.com/todos.json"
      );
      console.log(" Fetch data", data);
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      console.log("todos", todos);
      dispatch({ type: FETCH_TODOS, todos });
    } catch (error) {
      showError("Something went wrong");
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert("Delete element", `Are you sure to delete ${todo.title}`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          changeScreen(null);
          await Http.delete(
            `https://rn-todo-app-14c70-default-rtdb.firebaseio.com/todos/${id}.json`
          );
          dispatch({ type: REMOVE_TODO, id: id });
        },
      },
    ]);
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(
        `https://rn-todo-app-14c70-default-rtdb.firebaseio.com/todos/${id}.json`,
        { title }
      );
      dispatch({ type: UPDATE_TODO, id: id, title: title });
    } catch (error) {
      showError("Something went wrong");
      console.log(error);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error: error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
