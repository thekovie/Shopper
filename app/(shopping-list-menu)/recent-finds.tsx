import { View, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { Text } from "@/components/ui/text";
import ListShoppingItem from "@/components/list/ListShoppingItem";
import { ExtendedShoppingItemInsert, ListShoppingItemProps } from "@/constants/types";
import { ArrowLeft } from "@/lib/icons"
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getFewDaysAgoShoppingItems, getRecentShoppingItems, getTodayShoppingItems, getYesterdayShoppingItems } from "@/utils/methods/fetch-recent-shopping-items";
import { differenceInDays, format, isToday, isYesterday, parseISO, startOfDay, subDays } from "date-fns";




export default function RecentFinds() {
  const searchParams = useLocalSearchParams(); // Get the itemName from the params
  const { user_id } = searchParams;
  const userId = Array.isArray(user_id) ? user_id[0] : user_id;
  const [recentShoppingItems, setRecentShoppingItems] = useState<ExtendedShoppingItemInsert[] | null>(null);
  const [todayItems, setTodayItems] = useState<ExtendedShoppingItemInsert[] | null>(null);
  const [yesterdayItems, setYesterdayItems] = useState<ExtendedShoppingItemInsert[] | null>(null);
  const [fewDaysAgoItems, setFewDaysAgoItems] = useState<ExtendedShoppingItemInsert[] | null>(null);

  const [isLoading, setIsLoading] = useState(true);


  useFocusEffect(
    useCallback(() => {
      const fetchRecentShoppingItems = async () => {

        const todayRes = await getTodayShoppingItems(userId, 3);
        const yesterdayRes = await getYesterdayShoppingItems(userId, 3);
        const fewDaysAgoRes = await getFewDaysAgoShoppingItems(userId, 7);



        if(todayRes || yesterdayRes || fewDaysAgoRes){
          //console.log(res);
          //setRecentShoppingItems(res);

          //const filteredTodayItems = res.filter((item) => isToday(parseISO(item.created_at!))).slice(0, 3);
          console.log(todayRes);
          setTodayItems(todayRes);

          //const filteredYesterdayItems = res.filter((item) => isYesterday(parseISO(item.created_at!))).slice(0, 3);
          console.log(yesterdayRes);
          setYesterdayItems(yesterdayRes);

          // const filteredFewDaysAgoItems = res.filter((item) => {
          //   const date = parseISO(item.created_at!);
          //   return !isToday(date) && !isYesterday(date) && differenceInDays(new Date(), date) > 2; 
          // }).slice(0, 7);
          console.log(fewDaysAgoRes);
          setFewDaysAgoItems(fewDaysAgoRes);


        }
        setIsLoading(false);
      }

      fetchRecentShoppingItems();

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

        <View className="flex flex-row mb-[4] items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft className="text-lonestar-400 mr-[10]" size={24}/>
          </TouchableOpacity>
          <Text 
            className=" text-lonestar-500 text-xl"
            fontVariant="Bold"
          >
           Recent Finds
          </Text> 
        </View>

        

        <ScrollView className='flex flex-col overflow-hidden px-[10] py-[20] mb-[24]'>      
         {todayItems && todayItems.length > 0 &&
            <Text className="text-lonestar-600 text-xs mb-[10]" fontVariant="SemiBold">
              Today
            </Text>
          }

          {todayItems?.map((shoppingItem, index) => (
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
  

          {yesterdayItems && yesterdayItems.length > 0 && 
            <Text className="text-lonestar-600 text-xs mb-[10]" fontVariant="SemiBold">
              Yesterday
            </Text>  
          }

          {yesterdayItems?.map((shoppingItem, index) => (
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
   

          {fewDaysAgoItems && fewDaysAgoItems.length > 0 && 
            <Text className="text-lonestar-600 text-xs mb-[10]" fontVariant="SemiBold">
              Few days or weeks ago
            </Text> 
          } 

          {fewDaysAgoItems?.map((shoppingItem, index) => (
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


