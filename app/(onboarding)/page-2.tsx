import React from "react";
import { View, StatusBar, Platform, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Image } from "react-native";

const Page2 = () => {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        justifyContent: "space-between",
      }}
      className={""}
    >
      <View style={{ height: "50%" }}>
        <Image
          source={require("@/assets/images/onboarding-imgs/2.png")}
          className={"h-full w-full"}
        />
      </View>
      <ScrollView className={"mt-10 h-full bg-white px-8"}>
        <Text className={"text-2xl text-lonestar-600"} fontVariant={"Bold"}>
          Get Organized, Your Way
        </Text>
        <Text className={"mt-4 text-base text-lonestar-700"}>
          Categorize your items as “Needs” or “Wants,” sort by price, create
          custom categories to arrange your shopping items to match your
          priorities.
        </Text>
        <View className={"mt-10 flex-row justify-end"}>
          <Button
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              }
            }}
            className={
              "mb-10 mr-2 border border-lonestar-600 bg-white text-lonestar-500"
            }
          >
            <Text className={"text-lonestar-600"}>Previous</Text>
          </Button>
          <Button
            onPress={() => {
              router.push({
                pathname: "/final-page",
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

export default Page2;
