import React, { useContext, useLayoutEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Context } from "../context/NoteContext";
import { AntDesign } from "@expo/vector-icons";

const ShowScreen = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Edit", { id: route.params.id })}
        >
          <AntDesign name="edit" size={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const { state } = useContext(Context);
  const id = route.params.id;
  const Groceries = state.find((Groceries) => Groceries.id === id);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Item Name:</Text>
      <Text style={styles.items}>{Groceries.title}</Text>
      <Text style={styles.text}>Quantity:</Text>
      <Text style={styles.items}>{Groceries.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 5,
    borderBottomWidth: 2,
  },
  items: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default ShowScreen;
