import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "./src/screens/IndexScreen";
import { Provider } from "./src/context/NoteContext";
import ShowScreen from "./src/screens/showScreen";
import CreateScreen from "./src/screens/createScreen";
import { EvilIcons } from '@expo/vector-icons';
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Index">
        <Stack.Screen
          name="Index"
          component={IndexScreen}
          options={{ 
            title: "Notes List !!!!" ,
          }}    
        />
        <Stack.Screen
          name="Show"
          component={ShowScreen}
          options={{ title: "Note Detail" }}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{ title: "Create a new Note." }}
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
