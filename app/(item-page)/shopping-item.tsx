import { View, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from 'expo-router';
import ListShoppingItem from "@/components/list/ListShoppingItem";
import { ListShoppingItemProps } from "@/constants/types";
import { ArrowLeft, ArrowDownUp } from "@/lib/icons"
import { router } from "expo-router";
import { Button } from "@/components/ui/button";




export default function ShoppingItemPage() {
  const { itemName, itemPrice, itemPriority, itemPlatform, itemCategory, itemNotes } = useLocalSearchParams();
  let isNotesEmpty = true;

  if(itemNotes){
    if(itemNotes.length > 0){
      isNotesEmpty = false;
    }
  }

  return (
      <View className="flex flex-col p-[20]"
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1
          }}
      >
         <View className="flex flex-row mb-[20] items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft className="text-lonestar-400 mr-[10]" size={24}/>
          </TouchableOpacity>
          <Text 
            className=" text-lonestar-500 text-xl"
            fontVariant="Bold"
          >
           Item Information
          </Text> 
        </View>

        <View className="flex flex-col border border-[#f0f0f0] rounded-md p-[15] mx-[10] mb-[20]">
          <Text className="text-lonestar-700 text-xl mb-[20]" fontVariant="Bold">{itemName}</Text>

          <View className="flex flex-col mb-[20]">
            <Text className="text-lonestar-800 text-xs mb-[3]" fontVariant="Bold">Category</Text>
            <Text className="text-lonestar-950 text-xs" fontVariant="Regular">{itemCategory}</Text>
          </View>

          <View className="flex flex-col mb-[20]">
            <Text className="text-lonestar-800 text-xs mb-[3]" fontVariant="Bold">Priority</Text>
            <Text className="text-lonestar-950 text-xs" fontVariant="Regular">{itemPriority}</Text>
          </View>

          <View className="flex flex-col mb-[20]">
            <Text className="text-lonestar-800 text-xs mb-[3]" fontVariant="Bold">Price</Text>
            <Text className="text-lonestar-950 text-xs" fontVariant="Regular">{itemPrice}</Text>
          </View>

          <View className="flex flex-col mb-[20]">
            <Text className="text-lonestar-800 text-xs mb-[3]" fontVariant="Bold">Shopping Platform</Text>
            <Text className="text-lonestar-950 text-xs" fontVariant="Regular">{itemPlatform}</Text>
          </View>

          <View className="flex flex-col mb-[20]">
            <Text className="text-lonestar-800 text-xs mb-[3]" fontVariant="Bold">Notes</Text>
            <Text className="text-lonestar-950 text-xs" fontVariant="Regular">
              {isNotesEmpty === false ? itemNotes : 'No notes available'}
            </Text>
          </View>

          <Button  variant={'outline'} className="bg-white">
            <Text className='text-lonestar-600 text-sm text-center'>
              Product Link
            </Text>
          </Button>
        </View>

        <Button  className="bg-lonestar-500 mb-[8] mx-[18]">
          <Text className='text-white text-sm text-center'>
            Mark as Purchased
          </Text>
        </Button>

        <Button  variant={'outline'} className="bg-white mx-[18]" onPress={() => {
          router.push({
            //@ts-ignore
            pathname: "/(item-page)/modify-item",
          });
        }}>
          <Text className='text-lonestar-600 text-sm text-center h-full'>
            Modify Item
          </Text>
        </Button>

   


      

      </View>
  );
}


