import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
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
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  console.log(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!",
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export default function Push({ session }: { session: Session }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const handleNotificationResponse = async (
    response: Notifications.NotificationResponse,
    session: Session,
  ) => {
    const { screen } = response.notification.request.content.data;

    if (screen) {
      console.log("Navigating to index page first");
      await router.push({
        pathname: "/",
      });

      // Adding a short delay to ensure the index page is loaded
      // setTimeout(() => {
      //   console.log("Navigating to screen:", screen);
      //   router.push({
      //     pathname: screen,
      //     params: { user_id: session?.user.id },
      //   });
      // }, 1000);
    }

    // Dismiss the notification
    await Notifications.dismissNotificationAsync(
      response.notification.request.identifier,
    );
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(async (token) => {
        setExpoPushToken(token ?? "");
        const { data, error } = await supabase
          .from("profiles")
          .update({ expo_push_token: token })
          .eq("id", session.user?.id)
          .select();

        if (error) {
          console.error("Error updating profile:", error.message);
        }

        const lastNotificationResponse =
          await Notifications.getLastNotificationResponseAsync();
        if (lastNotificationResponse) {
          handleNotificationResponse(lastNotificationResponse, session);
        }
      })
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("RESPONSE FROM PUSH COMPONENT: " + response);
        handleNotificationResponse(response, session);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return <></>;
}
