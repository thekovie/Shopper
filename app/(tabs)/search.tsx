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

export default function Tab() {

  const [searchInput, setSearchInput] = useState('');
  const [shoppingItems, setShoppingItems] = useState<ExtendedShoppingItemInsert[] | null>(null);
  const [session, setSession] = useState<Session | null>(null)
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchSession().then(async (session) => {
        if(!session){
          console.log("NO SESSION");
        }else{
          setUserId(session.user.id);
          const res = await getRecentShoppingItems(userId, 4);
          if(res){
            setShoppingItems(res);
          }
        }

      })
      .finally(() => setIsLoading(false));
    }, [])
   
  )

  const sampleItemsData: ListShoppingItemProps[] = [
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets',
        isMarkedAsPurchased: false
    },
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets',
        isMarkedAsPurchased: false
    },
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets',
        isMarkedAsPurchased: false
    },
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & GadgetsAWDAWDAWDAWDAWD ABWVDHGAWDVGHAW AHGJWDGHAWDGHAWD  HGAWDGHAWDGH',
        isMarkedAsPurchased: false
    },
  ];

  const samepleResultsData: ListShoppingItemProps[] = [
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets',
        isMarkedAsPurchased: false
    },
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets',
        isMarkedAsPurchased: false
    },
    {
        itemName: 'Hotdog 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets',
        isMarkedAsPurchased: false
    },
    {
        itemName: 'Strawberry 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & GadgetsAWDAWDAWDAWDAWD ABWVDHGAWDVGHAW AHGJWDGHAWDGHAWD  HGAWDGHAWDGH',
        isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken NUggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      isMarkedAsPurchased: false
    },
  ];

  return (
   <View className="flex flex-col w-full px-[30] py-[20]">
    <InputSearch
      placeholder="Search for your shopping item"
      className="text-lonestar-500 border-[#e4e4e7] mb-[10]"
      onChangeText={(text) => {
        setSearchInput(text);
      }}

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
    </View>}

    {searchInput.length > 0 && samepleResultsData
      .filter(({ itemName }) =>
        itemName.toLowerCase().includes(searchInput.toLowerCase())
      )
      .map(({ itemName, itemPrice, itemPriority, itemPlatform, itemCategory, isMarkedAsPurchased }, index) => (
        <View key={index} className='mb-[20]'>
          <ListShoppingItem
              itemName={itemName}
              itemPrice={itemPrice}
              itemPriority={itemPriority}
              itemPlatform={itemPlatform}
              itemCategory={itemCategory}
              isMarkedAsPurchased={isMarkedAsPurchased}
          />
        </View>
    ))}



   </View>
  );
}

