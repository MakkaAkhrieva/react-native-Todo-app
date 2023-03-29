import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { THEME } from "../theme";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { AppCard } from "../components/ui/AppCard";
import { EditModal } from "../components/EditModal";
import { AppTextBold } from "../components/ui/AppTextBold";
import { AppButton } from "../components/ui/AppButton";

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
        <AppButton onPress={modalHandler}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton color={THEME.GREY_COLOR} onPress={goBack}>
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
