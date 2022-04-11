import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Platform,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: false,
  }),
});

const NoteForm = ({ onSubmit, initialValues, navigation }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const [expoPushToken, setExpoPushToken] = useState("");
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    // Notifications.addNotificationResponseReceivedListener((notification) => {
    //   navigation.navigate("Index");
    // });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(() => {
        // navigation.navigate("Index");
      });
    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View>
      <Text style={styles.text}> Input the required item. </Text>
      <Text style={styles.text}> Item Name: </Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />
      <Text style={styles.text}> Enter Required Amount: </Text>
      <TextInput
        value={content}
        onChangeText={(text) => setContent(text)}
        style={styles.input}
        multiline={true}
      />
      <Button
        title="Save Item."
        onPress={async () => {
          onSubmit(title, content);
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
};

const sendPushNotification = async (expoPushToken) => {
  const message = {
    to: expoPushToken,
    sound: "default",
    body: "Item Created Successfully",
    android: {
      channelId: "push-notifs",
    },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
    return null;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("push-notifs", {
      name: "push-notifs",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#00000000",
      sound: true,
    });
  }
  return token;
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
});

export default NoteForm;
