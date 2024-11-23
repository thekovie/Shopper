import { Stack } from "expo-router";
import * as React from "react";
import { Text } from "@/components/ui/text";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LoadingProvider } from "@/components/Providers/LoaderSpinnerContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import ReactQueryProvider from "@/components/Providers/ReactQueryProvider";
export default function ShoppingListMenuLayout() {
  return (
    <ReactQueryProvider>
      <SafeAreaProvider>
        <LoadingProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
            <Stack.Screen
              name="purchased-items"
              options={
                {
                  headerShown: false,
                }
              }
            />
            <Stack.Screen
              name="recent-finds"
              options={
                {
                  headerShown: false,
                }
              }
            />
            <Stack.Screen
              name="[category]"
              options={
                {
                  headerShown: false,
                }
              }
            />
            <Stack.Screen
              name="priority/[priority]"
              options={
                {
                  headerShown: false,
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

