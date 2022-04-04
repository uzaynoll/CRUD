import React, { useContext, useLayoutEffect, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/NoteContext";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
const IndexScreen = ({ navigation }) => {
  const { state, addNotes, deleteNotes, getNotes } = useContext(Context);

  useEffect (() => {
    getNotes();

    const listener = navigation.addListener('focus', () => {
      getNotes();
    } );

    return ( () => {
      listener.remove();
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
          <EvilIcons name="plus" size={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      {/* <Button title="Add a new Note" onPress={addNotes} /> */}
      <FlatList
        data={state}
        keyExtractor={(Note) => Note.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.view}>
                <Text style={styles.text}>
                  {item.title}-{item.id}{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    deleteNotes(item.id);
                  }}
                >
                  <Entypo name="trash" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  icon: {
    fontSize: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default IndexScreen;
