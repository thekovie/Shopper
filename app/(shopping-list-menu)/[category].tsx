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

export default function PurchasedItems() {
    const searchParams = useLocalSearchParams(); // Get the itemName from the params
    const { category_name, category_id } = searchParams;

    const categoryId = Array.isArray(category_id) ? category_id[0] : category_id;
    const categoryName = Array.isArray(category_name) ? category_name[0] : category_name;

    const [shoppingItems, setShoppingItems] = useState<ShoppingItemRow[] | null>(null);

    useEffect(() => {
      fetchShoppingItems(categoryId).then((data) => {
        if(data){
          console.log(data);
          setShoppingItems(data);
        }else{
          console.log("No data found");
        }
      })
    }, [])


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
            {category_name}
            </Text> 
          </View>

          <TouchableOpacity onPress={() => console.log("HEllo")}>
            <ModifyCategory
              categoryId={categoryId}
              category={categoryName}
              triggerContent={
                <Settings className="text-lonestar-400 mr-[10]" size={24}/>
              }
            />


            
          </TouchableOpacity>

        </View>

        <ScrollView className='flex flex-col overflow-hidden px-[10] py-[20] mb-[24]'>   
            <View className="flex flex-row items-center justify-between mb-[10]">
                <View className="flex flex-row ">
                    <Text className="text-sm text-lonestar-700">
                        Sorted by{' '}
                    </Text>  
                    <Text className="text-sm text-lonestar-700 underline">
                        low to high price
                    </Text>  
                     
                </View>
                
                <ArrowDownUp size={16} className="text-lonestar-600" />
            </View>
            
          {shoppingItems?.map((shoppingItem, index) => (
              <View key={index} className='mb-[20]'>
                  <ListShoppingItem 
                      product_title={shoppingItem.product_title} 
                      price={shoppingItem.price!} 
                      priority={`High`} 
                      shopping_platform={shoppingItem.shopping_platform} 
                      category_id={shoppingItem.category_id} 
                      notes={shoppingItem.notes} 
                      is_purchased={shoppingItem.is_purchased}
                      user_id={shoppingItem.user_id}
                      category_name={categoryName}
                  />
              </View>
          ))}     
        </ScrollView>


      </View>
  );
}


