import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/NoteContext";
import NoteForm from "../components/NoteForm";

const EditScreen = ({ route, navigation }) => {
  const { state, editGroceries } = useContext(Context);
  const id = route.params.id;
  const Groceries = state.find((Groceries) => Groceries.id === id);
  return (
    <NoteForm
      initialValues={{ title: Groceries.title, content: Groceries.content }}
      onSubmit={(title, content) => {
        editGroceries(id, title, content, () => navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
