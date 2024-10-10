import React from "react";
import { View, StatusBar, Platform } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";

const LastPage = () => {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        justifyContent: "space-between",
      }}
      className={""}
    >
      <View className={"h-3/5 bg-black"}></View>
      <View className={"mt-10 h-full bg-white px-8"}>
        <Text className={"text-2xl text-lonestar-600"} fontVariant={"Bold"}>
          And, that's it!
        </Text>
        <Text className={"mt-4 text-lg text-lonestar-700"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
        <View className={"mt-10 flex-row justify-end"}>
          <Button
            onPress={() => {
              router.push({
                pathname: "/page-2",
              });
            }}
            className={"mb-10 mr-2 bg-white text-lonestar-500"}
            variant={"outline"}
          >
            <Text className={"text-lonestar-950"}>Previous</Text>
          </Button>
          <Button
            onPress={() => {
              router.replace({
                pathname: "/(tabs)/",
              });
            }}
            className={"mb-10 text-lonestar-500"}
          >
            <Text>Let's go haul! ✨</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LastPage;
