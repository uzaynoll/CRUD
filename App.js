import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "./src/screens/IndexScreen";
import { Provider } from "./src/context/NoteContext";
import ShowScreen from "./src/screens/showScreen";
import CreateScreen from "./src/screens/createScreen";
import { EvilIcons } from "@expo/vector-icons";
import EditScreen from "./src/screens/EditScreen";
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen
          name="Index"
          component={IndexScreen}
          options={{
            title: "Groceries List",
          }}
        />
        <Stack.Screen
          name="Show"
          component={ShowScreen}
          options={{ title: "Groceries Detail" }}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{ title: "Create new Groceries List." }}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{ title: "Edit a List" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
