import {
    View,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
  } from "react-native";
  import { useState, useEffect } from "react";
  import { Platform } from "react-native";
  import {
    ArrowLeft
  } from "@/lib/icons";
  import { Text } from "@/components/ui/text";
  import { Joystick } from "lucide-react-native";
  import AddShoppingItem from "@/components/homepage/AddShoppingItem";
  import RecentFinds from "@/components/homepage/RecentFinds";
  import { Session } from "@supabase/supabase-js";
  import { supabase } from "@/lib/supabase";
  import {
    ExtendedShoppingItemInsert,
    ItemCategoryRow,
    ListShoppingItemProps,
    PriceUpdate,
    RecentFindsProps,
  } from "@/constants/types";
  import { fetchCategories } from "@/utils/methods/fetch-categories";
  import { Href, router, useFocusEffect, useLocalSearchParams } from "expo-router";
  import { useCallback } from "react";
  import Push from "@/components/expo-push-example/Push";
  import ListShoppingItem from "@/components/list/ListShoppingItem";

import { getFewDaysAgoItemPriceUpdates, getItemPriceUpdates, getTodayItemPriceUpdates, getYesterdayItemPriceUpdates } from "@/utils/methods/fetch-item-price-updates";
  
  export default function Tab() {
    const searchParams = useLocalSearchParams(); // Get the itemName from the params
    const { user_id } = searchParams;
    const userId = Array.isArray(user_id) ? user_id[0] : user_id;
    const [isLoading, setIsLoading] = useState(true);

    const [todayItems, setTodayItems] = useState<PriceUpdate[] | null>(null);
    const [yesterdayItems, setYesterdayItems] = useState<PriceUpdate[] | null>(null);
    const [fewDaysAgoItems, setFewDaysAgoItems] = useState<PriceUpdate[] | null>(null);
  
 
  
  
    useFocusEffect(
        useCallback(() => {
          const fetchItemPriceUpdates = async () => {
    
            const todayRes = await getTodayItemPriceUpdates(userId, 3);
            const yesterdayRes = await getYesterdayItemPriceUpdates(userId, 3);
            const fewDaysAgoRes = await getFewDaysAgoItemPriceUpdates(userId, 7);
    
    
            if(todayRes){
                console.log("TODAY!")
                console.log(todayRes);
                setTodayItems(todayRes);
            }

            if(yesterdayRes){
                console.log(yesterdayRes);
                setYesterdayItems(yesterdayRes);
            }

            if(fewDaysAgoRes){
                console.log(fewDaysAgoRes);
                setFewDaysAgoItems(fewDaysAgoRes);
            }

            setIsLoading(false);
          }
    
          fetchItemPriceUpdates();
    
        }, [])
      )
  
    if (isLoading) {
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
      <ScrollView
        className="flex flex-1 flex-col p-[20]"
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
           Price Updates
          </Text> 
        </View>

        <ScrollView className='flex flex-col overflow-hidden px-[10] py-[20] mb-[24]'>      
         {todayItems && todayItems.length > 0 &&
            <Text className="text-lonestar-600 text-xs mb-[10]" fontVariant="SemiBold">
              Today
            </Text>
          }

          {todayItems?.map((priceUpdate, index) => (
              <View key={index} className='mb-[20]'>
                  <ListShoppingItem 
                      id={priceUpdate.shopping_items?.id}
                      product_title={priceUpdate.shopping_items?.product_title!} 
                      product_link={priceUpdate.shopping_items?.product_title!}
                      price={priceUpdate.shopping_items?.price!} 
                      priority={priceUpdate.shopping_items?.priority!} 
                      shopping_platform={priceUpdate.shopping_items?.shopping_platform!} 
                      category_id={priceUpdate.shopping_items?.item_categories?.id} 
                      notes={priceUpdate.shopping_items?.notes} 
                      is_purchased={priceUpdate.shopping_items?.is_purchased}
                      user_id={userId}
                      category_name={priceUpdate.shopping_items?.item_categories?.category_name || 'N/A'}
                  />
              </View>
          ))}     
  

          {yesterdayItems && yesterdayItems.length > 0 && 
            <Text className="text-lonestar-600 text-xs mb-[10]" fontVariant="SemiBold">
              Yesterday
            </Text>  
          }

          {yesterdayItems?.map((priceUpdate, index) => (
              <View key={index} className='mb-[20]'>
                  <ListShoppingItem 
                      id={priceUpdate.shopping_items?.id}
                      product_title={priceUpdate.shopping_items?.product_title!} 
                      product_link={priceUpdate.shopping_items?.product_title!}
                      price={priceUpdate.shopping_items?.price!} 
                      priority={priceUpdate.shopping_items?.priority!} 
                      shopping_platform={priceUpdate.shopping_items?.shopping_platform!} 
                      category_id={priceUpdate.shopping_items?.item_categories?.id} 
                      notes={priceUpdate.shopping_items?.notes} 
                      is_purchased={priceUpdate.shopping_items?.is_purchased}
                      user_id={userId}
                      category_name={priceUpdate.shopping_items?.item_categories?.category_name || 'N/A'}
                  />
              </View>
          ))}   
   

          {fewDaysAgoItems && fewDaysAgoItems.length > 0 && 
            <Text className="text-lonestar-600 text-xs mb-[10]" fontVariant="SemiBold">
              Few days or weeks ago
            </Text> 
          } 

          {fewDaysAgoItems?.map((priceUpdate, index) => (
              <View key={index} className='mb-[20]'>
                  <ListShoppingItem 
                      id={priceUpdate.shopping_items?.id}
                      product_title={priceUpdate.shopping_items?.product_title!} 
                      product_link={priceUpdate.shopping_items?.product_title!}
                      price={priceUpdate.shopping_items?.price!} 
                      priority={priceUpdate.shopping_items?.priority!} 
                      shopping_platform={priceUpdate.shopping_items?.shopping_platform!} 
                      category_id={priceUpdate.shopping_items?.item_categories?.id} 
                      notes={priceUpdate.shopping_items?.notes} 
                      is_purchased={priceUpdate.shopping_items?.is_purchased}
                      user_id={userId}
                      category_name={priceUpdate.shopping_items?.item_categories?.category_name || 'N/A'}
                  />
              </View>
          ))}   

        </ScrollView>




      </ScrollView>
    )}
        