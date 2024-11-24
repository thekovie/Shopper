import { useCallback, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { InputSearch } from "@/components/ui/input-search";
import ListShoppingItem from '@/components/list/ListShoppingItem';
import { Text } from "@/components/ui/text";
import { ExtendedShoppingItemInsert, ListShoppingItemProps, RecentFindsProps } from "@/constants/types";
import { supabase } from "@/lib/supabase";
import { getRecentShoppingItems } from "@/utils/methods/fetch-recent-shopping-items";
import { Session } from "@supabase/supabase-js";
import { fetchSession } from "@/utils/methods/fetch-session";
import { useFocusEffect } from "expo-router";
import _ from 'lodash';

export default function Tab() {

  const [searchInput, setSearchInput] = useState('');
  const [recentShoppingItems, setRecentShoppingItems] = useState<ExtendedShoppingItemInsert[] | null>(null);
  const [shoppingItemsResults, setShoppingItemsResults] = useState<ExtendedShoppingItemInsert[] | null>(null);
  const [session, setSession] = useState<Session | null>(null)
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setSearchInput('');
      fetchSession().then(async (session) => {
        setIsLoading(true);
        if(!session){
          console.log("NO SESSION");
        }else{
          setUserId(session.user.id);
          const res = await getRecentShoppingItems(session.user.id, 4);
          if(res){
            setRecentShoppingItems(res);
          }
        }

      })
      .finally(() => setIsLoading(false));
    }, [])
  );

  const fetchSearchResults = useCallback(
    _.throttle(async (searchInput: string) => {
      if (searchInput.length > 0) {
        const { data, error } = await supabase
        .from("shopping_items")
        .select(`*, item_categories(category_name)`)
        .eq("user_id", userId)
        .ilike("product_title", `%${searchInput}%`) 
        .order("created_at", { ascending: false }); 

        if(error){
          console.error("Error fetching search results:", error.message);
        }

        if(data){
          setShoppingItemsResults(
            data.map((item) => ({
                ...item,
                category_name: item.item_categories?.category_name || "Unknown Category",
            })) as ExtendedShoppingItemInsert[]
          );
        }
      }
    }, 750), []
  )

  const handleSearchInput = (searchInput: string) => {
    setSearchInput(searchInput);

    if(searchInput.length > 0){
      fetchSearchResults(searchInput);
    }else{
      setShoppingItemsResults([]);
    }
    
  }

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
   <View className="flex flex-col w-full px-[30] py-[20]">
    <InputSearch
      placeholder="Search for your shopping item"
      className="text-lonestar-500 border-[#e4e4e7] mb-[10]"
      onChangeText={handleSearchInput}

    />
    {searchInput.length < 1 ? (
      <Text className="text-lonestar-600 text-sm mb-[10]" fontVariant="SemiBold">
        Recent Finds 
      </Text>
    ): (
      <Text className="text-lonestar-600 text-sm mb-[10]" fontVariant="SemiBold">
        Results for {searchInput}
      </Text>
    )}
    

    {searchInput.length < 1 &&  
    <View className='flex flex-col overflow-hidden'>
      {recentShoppingItems?.map((shoppingItem, index) => (
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
    </View>}

    {searchInput.length > 0 &&  
    <View className='flex flex-col overflow-hidden'>
      {shoppingItemsResults?.map((shoppingItem, index) => (
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
    </View>}




   </View>
  );
}

