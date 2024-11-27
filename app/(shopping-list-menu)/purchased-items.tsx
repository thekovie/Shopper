import { View, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { Text } from "@/components/ui/text";
import ListShoppingItem from "@/components/list/ListShoppingItem";
import { ExtendedShoppingItemInsert, ListShoppingItemProps } from "@/constants/types";
import { ArrowLeft } from "@/lib/icons"
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { getPurchasedItems } from "@/utils/methods/fetch-purchased-items";




export default function PurchasedItems() {
  const searchParams = useLocalSearchParams(); // Get the itemName from the params
  const { user_id } = searchParams;
  const userId = Array.isArray(user_id) ? user_id[0] : user_id;

  const [shoppingItems, setShoppingItems] = useState<ExtendedShoppingItemInsert[] | null>(null);



  useFocusEffect(
    useCallback(() => {
      const fetchShoppingItems = async () => {
        const res = await getPurchasedItems(userId);

        if(res){
          console.log(res);
          setShoppingItems(res);
        }

      }

      fetchShoppingItems();
    }, [])
  );
  

  return (
      <View className="flex flex-col p-[20]"
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1
          }}
      >

        <View className="flex flex-row mb-[4] items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft className="text-lonestar-400 mr-[10]" size={24}/>
          </TouchableOpacity>
          <Text 
            className=" text-lonestar-500 text-xl"
            fontVariant="Bold"
          >
           Purchased
          </Text> 
        </View>

        <ScrollView className='flex flex-col overflow-hidden px-[10] py-[20] mb-[24]'>      
        {shoppingItems?.map((shoppingItem, index) => (
              <View key={index} className='mb-[20]'>
                  <ListShoppingItem 
                      id={shoppingItem.id}
                      product_title={shoppingItem.product_title} 
                      price={shoppingItem.price!} 
                      priority={shoppingItem.priority} 
                      shopping_platform={shoppingItem.shopping_platform} 
                      category_id={shoppingItem.category_id} 
                      notes={shoppingItem.notes} 
                      is_purchased={shoppingItem.is_purchased}
                      user_id={shoppingItem.user_id}
                      category_name={shoppingItem.category_name}
                  />
              </View>
          ))}     
        </ScrollView>

      </View>
  );
}


