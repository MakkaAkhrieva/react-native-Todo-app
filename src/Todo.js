import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export const Todo = ({ todo, onRemove }) => {
  const longPressHandler = () => {
    onRemove(todo.id);
  };

  const pressHandler = () => {
    console.log("pressed", todo.id);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={pressHandler}
      onLongPress={longPressHandler}
    >
      <View style={styles.todo}>
        <Text>{todo.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
  },
});
