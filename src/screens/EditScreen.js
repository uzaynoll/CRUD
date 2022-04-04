import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/NoteContext";
import NoteForm from "../components/NoteForm";

const EditScreen = ({ route, navigation }) => {
  const { state, editNote } = useContext(Context);
  const id = route.params.id;
  const Note = state.find((Note) => Note.id === id);
  return (
    <NoteForm
      initialValues={{ title: Note.title, content: Note.content }}
      onSubmit={(title, content) => {
        editNote(id, title, content, () => navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
