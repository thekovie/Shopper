import React from "react";
import { View, StatusBar, Platform, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";

const Index = () => {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        justifyContent: "space-between",
      }}
      className={""}
    >
      <View style={{
        height: "50%"
      }} className={"h-3/5 bg-black"}></View>
      <ScrollView className={"mt-10 h-full bg-white px-8 overflow-auto"}>
        <Text className={"text-2xl text-lonestar-600"} fontVariant={"Bold"}>
          Before you get started,
        </Text>
        <Text className={"mt-4 text-base text-lonestar-700"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
        <View className={"mt-10 flex-row-reverse"}>
          <Button
            onPress={() => {
              router.push({
                pathname: "/page-2",
              });
            }}
            className={"mb-10 text-lonestar-500"}
          >
            <Text>Next</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
