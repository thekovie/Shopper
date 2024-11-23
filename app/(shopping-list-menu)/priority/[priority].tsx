import { View, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from 'expo-router';
import ListShoppingItem from "@/components/list/ListShoppingItem";
import { ListShoppingItemProps, ShoppingItemRow } from "@/constants/types";
import { ArrowLeft, ArrowDownUp, Settings } from "@/lib/icons"
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { fetchShoppingItems } from "@/utils/methods/fetch-shopping-items";
import ModifyCategory from "@/components/add-shopping-item/forms/ModifyCategory";

export default function Priority() {
    const searchParams = useLocalSearchParams(); // Get the itemName from the params
    const { priority } = searchParams;



  return (
      <View className="flex flex-col p-[20]"
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1
          }}
      >

        <View className="flex flex-row mb-[4] items-center justify-between">
          <View className="flex flex-row">
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft className="text-lonestar-400 mr-[10]" size={24}/>
            </TouchableOpacity>
            <Text 
              className=" text-lonestar-500 text-xl"
              fontVariant="Bold"
            >
            {priority}
            </Text> 
          </View>
          <Text className="text-lonestar-600">AAAA</Text>


        </View>
      </View>
  );
}


