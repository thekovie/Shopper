import React from "react";
import { View, StatusBar, Platform, ScrollView } from "react-native";
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
      <View style={{ height: "50%" }} className={"bg-black"}></View>
      <ScrollView className={"mt-10 h-full bg-white px-8"}>
        <Text className={"text-2xl text-lonestar-600"} fontVariant={"Bold"}>
          And, that's it!
        </Text>
        <Text className={"mt-4 text-base text-lonestar-700"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
        <View className={"mt-10 flex-row justify-end"}>
          <Button
            onPress={() => {
              if(router.canGoBack()) {
                router.back();
              }
            }}
            className={"mb-10 mr-2 bg-white border border-lonestar-600"}
          >
            <Text className={"text-lonestar-600"}>Previous</Text>
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
      </ScrollView>
    </View>
  );
};

export default LastPage;
