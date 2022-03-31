import React, { useContext } from "react";
import { Text, View, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import { Context } from "../context/NoteContext";
import { Entypo } from '@expo/vector-icons';

const IndexScreen = () => {
  const { state, addNotes, deleteNotes } = useContext(Context);

  return (
    <View>
      <Button title="Add a new Note" onPress={addNotes} />
      <FlatList
        data={state}
        keyExtractor={(Note) => Note.id}
        renderItem={({ item }) => {
          return (
            <View style= {styles.view}>
              <Text style={styles.text}>{item.title}-{item.id} </Text>
              <TouchableOpacity onPress={() =>{deleteNotes(item.id)}}>
                <Entypo name="trash" style = {styles.icon}/>
              </TouchableOpacity>
              
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderBottomWidth: 2,
    borderBottomColor: 'gray'
  },
  icon: {
    fontSize: 20
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default IndexScreen;
