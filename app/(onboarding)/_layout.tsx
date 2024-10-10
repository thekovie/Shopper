import { Stack } from "expo-router";
import * as React from "react";
import { Text } from "@/components/ui/text";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoadingProvider } from "@/components/Providers/LoaderSpinnerContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import ReactQueryProvider from "@/components/Providers/ReactQueryProvider";
export default function Onboardinglayout() {
  return (
    <ReactQueryProvider>
      <SafeAreaProvider>
        <LoadingProvider>
          <StatusBar />
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen
                name="index"
                options={
                  {
                    // headerShown: false,
                  }
                }
              />
            </Stack>
          </GestureHandlerRootView>
        </LoadingProvider>
      </SafeAreaProvider>
    </ReactQueryProvider>
  );
}

function toOptions(name: string) {
  return name
    .split("-")
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    })
    .join(" ");
}
