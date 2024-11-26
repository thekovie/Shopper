import React from "react";
import { View, StatusBar, Platform, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Image } from "react-native";

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
      <View
        style={{
          height: "50%",
        }}
      >
        <Image
          source={require("@/assets/images/onboarding-imgs/1.png")}
          className={"h-full w-full"}
        />
      </View>
      <ScrollView className={"mt-10 h-full overflow-auto bg-white px-8"}>
        <Text className={"text-2xl text-lonestar-600"} fontVariant={"Bold"}>
          Welcome to Shopper!
        </Text>
        <Text className={"mt-4 text-base text-lonestar-700"}>
          This platform helps you gather all your shopping needs in one place.
          Create, organize, and track your shopping lists with ease!
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
