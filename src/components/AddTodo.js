import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
} from "react-native";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Todo can't be null");
    }
  };
  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue(text)}
        value={value}
        placeholder="Enter message"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
      />
      <Ionicons.Button
        name="add-circle-outline"
        onPress={pressHandler}
        size={24}
        color="black"
      >
        Add
      </Ionicons.Button>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    width: "70%",
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "#3949ab",
  },
});
