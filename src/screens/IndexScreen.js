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
  const { state, addGroceries, deleteGroceries, getGroceries } =
    useContext(Context);

  useEffect(() => {
    getGroceries();

    const listener = navigation.addListener("focus", () => {
      getGroceries();
    });

    return () => {
      listener.remove();
    };
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
    <View style={styles.container}>
      {/* <Button title="Add a new Note" onPress={addNotes} /> */}
      <FlatList
        data={state}
        keyExtractor={(Groceries) => Groceries.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.view}>
                <Text style={styles.text}>
                  {item.title} : {item.content}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    deleteGroceries(item.id);
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
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 10,
    borderRadius: 4,
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
