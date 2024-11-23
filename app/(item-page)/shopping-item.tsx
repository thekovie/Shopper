import { View, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { useCallback, useState } from "react";
import { Platform } from "react-native";
import { Text } from "@/components/ui/text";
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import ListShoppingItem from "@/components/list/ListShoppingItem";
import { ExtendedShoppingItemInsert, ListShoppingItemProps, ShoppingItemRow } from "@/constants/types";
import { ArrowLeft, ArrowDownUp } from "@/lib/icons"
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import MarkedAsPurchased from "@/components/modify-shopping-item/MarkedAsPurchased";
import { getShoppingItemInfo } from "@/utils/methods/get-shopping-item-info";




export default function ShoppingItemPage() {
  const { itemId, itemCategoryName, isMarkedAsPurchased } = useLocalSearchParams();
  const singleItemId = Array.isArray(itemId) ? itemId[0] : itemId;

  const [isPurchased, setIsPurchased] = useState(isMarkedAsPurchased === 'true' ? true : false);
  const [shoppingItem, setShoppingItem] = useState<ExtendedShoppingItemInsert | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useFocusEffect(
    useCallback(() => {
      const fetchShoppingItem = async () => {
        const res = await getShoppingItemInfo(singleItemId);

        if(res){
          console.log(res);
          setShoppingItem(res);
        }
        setIsLoading(false);
      }

      fetchShoppingItem();

    }, [])
  )

  if(isLoading){
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-lonestar-950">Loading...</Text>
      </View>
    );
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

        {isPurchased && 
          <View className="mx-[10] mb-[20]">
            <MarkedAsPurchased />
          </View>
        }

        <View className="flex flex-col border border-[#f0f0f0] rounded-md p-[15] mx-[10] mb-[20]">
          <Text className="text-lonestar-700 text-xl mb-[20]" fontVariant="Bold">{shoppingItem?.product_title}</Text>

          <View className="flex flex-col mb-[20]">
            <Text className="text-lonestar-800 text-xs mb-[3]" fontVariant="Bold">Category</Text>
            <Text className="text-lonestar-950 text-xs" fontVariant="Regular">{shoppingItem?.category_name || `N/A`}</Text>
          </View>

          <View className="flex flex-col mb-[20]">
            <Text className="text-lonestar-800 text-xs mb-[3]" fontVariant="Bold">Priority</Text>
            <Text className="text-lonestar-950 text-xs" fontVariant="Regular">{shoppingItem?.priority || `N/A`}</Text>
          </View>

          <View className="flex flex-col mb-[20]">
            <Text className="text-lonestar-800 text-xs mb-[3]" fontVariant="Bold">Price</Text>
            <Text className="text-lonestar-950 text-xs" fontVariant="Regular">{shoppingItem?.price}</Text>
          </View>

          <View className="flex flex-col mb-[20]">
            <Text className="text-lonestar-800 text-xs mb-[3]" fontVariant="Bold">Shopping Platform</Text>
            <Text className="text-lonestar-950 text-xs" fontVariant="Regular">{shoppingItem?.shopping_platform}</Text>
          </View>

          <View className="flex flex-col mb-[20]">
            <Text className="text-lonestar-800 text-xs mb-[3]" fontVariant="Bold">Notes</Text>
            <Text className="text-lonestar-950 text-xs" fontVariant="Regular">
              {shoppingItem?.notes && shoppingItem?.notes.length > 0 ? shoppingItem?.notes : 'No notes available'}
            </Text>
          </View>

          <Button  variant={'outline'} className="bg-white">
            <Text className='text-lonestar-600 text-sm text-center'>
              Product Link
            </Text>
          </Button>
        </View>

        <Button  className="bg-lonestar-500 mb-[8] mx-[18]" onPress={() => {
          setIsPurchased(!isPurchased);
        }}>
          <Text className='text-white text-sm text-center'>
            {isPurchased ? 'Mark as Unpurchased' : 'Mark as Purchased'}
          </Text>
        </Button>

        <Button  variant={'outline'} className="bg-white mx-[18]" onPress={() => {
          router.push({
            //@ts-ignore
            pathname: "/(item-page)/modify-item",
            params: {
              itemId: itemId,
              itemCategoryName: itemCategoryName
          }
          });
        }}>
          <Text className='text-lonestar-600 text-sm text-center h-full'>
            Modify Item
          </Text>
        </Button>

   


      

      </View>
  );
}


