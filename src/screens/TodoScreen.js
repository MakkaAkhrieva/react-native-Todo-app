import React, { useState, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { THEME } from "../theme";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppTextBold } from "../components/ui/AppTextBold";
import { AppButton } from "../components/ui/AppButton";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";

export const TodoScreen = () => {
  const { todos, updateTodo, removeTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);

  const [modalVisible, setModalVisible] = useState(false);

  const todo = todos.find((t) => t.id === todoId);

  const removeHandler = () => {
    removeTodo(todo.id);
  };

  const modalHandler = () => {
    setModalVisible(true);
  };

  const cancelModalHandler = () => {
    setModalVisible(false);
  };

  const saveHandler = async (title) => {
    await updateTodo(todo.id, title);
    setModalVisible(false);
  };

  const goBackHandler = () => {
    changeScreen(null);
  };
  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modalVisible}
        onCancel={cancelModalHandler}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={modalHandler}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton color={THEME.GREY_COLOR} onPress={goBackHandler}>
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton color={THEME.DANGER_COLOR} onPress={removeHandler}>
            <FontAwesome name="remove" size={20} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: Dimensions.get("window").width / 3,
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
});
