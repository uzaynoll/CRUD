import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";

const NoteForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  return (
    <View>
      <Text style={styles.text}> Enter Title: </Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />
      <Text style={styles.text}> Note: </Text>
      <TextInput
        value={content}
        onChangeText={(text) => setContent(text)}
        style={styles.input}
      />
      <Button title="Save Note." onPress={() => onSubmit(title, content)} />
    </View>
  );
};

NoteForm.defaultProps = {
  initialValues: {
    title: "",
    content: "",
  },
};
const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 3,
    marginBottom: 15,
    padding: 5,
    margin: 7,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 7,
  },
  button: {
    marginTop: 20,
  },
});

export default NoteForm;
