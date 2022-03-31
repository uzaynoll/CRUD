import React, { useContext } from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import { Context } from "../context/NoteContext";

const IndexScreen = () => {
  const { state, addNotes } = useContext(Context);

<<<<<<< HEAD
    return <View>
        <Text> Index Screen.</Text>
        <Button title='Add a new Note' onPress={addNotes} />
        <FlatList 
            data={state}
            keyExtractor={ (Note) => (Note.title)}
            renderItem = {({item}) => { return <Text>{item.title}</Text>}}
        />
=======
  return (
    <View>
      <Button title="Add a new Note" onPress={addNotes} />
      <FlatList
        data={state}
        keyExtractor={(Note) => Note.title}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.title}</Text>
            </View>
          );
        }}
      />
>>>>>>> production
    </View>
  );
};

const styles = StyleSheet.create({});

export default IndexScreen;
