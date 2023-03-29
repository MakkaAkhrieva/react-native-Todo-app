import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { THEME } from "../theme";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppTextBold } from "../components/ui/AppTextBold";

export const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const removeHandler = () => {
    onRemove(todo.id);
  };

  const modalHandler = () => {
    setModalVisible(true);
  };

  const cancelModalHandler = () => {
    setModalVisible(false);
  };

  const saveHandler = (title) => {
    onSave(todo.id, title);
    setModalVisible(false);
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
        <Button title="Edit" onPress={modalHandler} />
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button color={THEME.GREY_COLOR} title="Back" onPress={goBack} />
        </View>
        <View style={styles.button}>
          <Button
            title="Remove"
            color={THEME.DANGER_COLOR}
            onPress={removeHandler}
          />
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
    width: "40%",
  },
  title: {
    fontSize: 20,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
});
