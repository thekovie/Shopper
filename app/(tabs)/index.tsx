import { View, StyleSheet, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react'
import { Platform } from "react-native";
import { Bell, Bolt, Pill, ShoppingBag, Star, TabletSmartphone, MoreHorizontal, Ellipsis } from "@/lib/icons";
import { Text } from "@/components/ui/text";
import { Joystick } from "lucide-react-native";
import AddShoppingItem from "@/components/homepage/AddShoppingItem";
import RecentFinds from "@/components/homepage/RecentFinds";
import { Session } from '@supabase/supabase-js'
import { supabase } from "@/lib/supabase";
import { ItemCategoryRow, ListShoppingItemProps, RecentFindsProps } from "@/constants/types";
import { fetchCategories } from "@/utils/methods/fetch-categories";
import { Href, router, useFocusEffect } from "expo-router";
import { useCallback } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from "@/components/ui/button";
import { PRIORITIES } from "@/lib/constants";
import { fetchTotalItems } from "@/utils/methods/fetch-shopping-item-count";



export default function Tab() {
  const [session, setSession] = useState<Session | null>(null)
  const [categories, setCategories] = useState<ItemCategoryRow[] | null>(null);
  const [open, setOpen] = useState(false);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const numberOfItems = 700;

  const fetchAndSetCategories = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const categoriesData = await fetchCategories(session.user.id);
      setCategories(categoriesData || []);

      const totalItemCount = await fetchTotalItems(session.user.id);
      setItemCount(totalItemCount || 0);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session)
      if(session){
        fetchAndSetCategories();
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if(session){
        fetchAndSetCategories();
      }
    })
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log("Screen Focused!");
      fetchAndSetCategories();
    }, [session])
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
    }
]



  return (
   <ScrollView className="flex flex-1 flex-col p-[20]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
   >
     <View className="flex flex-row justify-between items-center mb-[4]">
      <Text 
        className=" text-lonestar-500 text-xl"
        fontVariant="Bold"
      >
        Shopper!
      </Text>
      <Bell className="text-lonestar-400" size={24} />
     </View>


     <View className="p-[10] flex-1">

      {/* Shopping Card Info */}
      <View className="flex flex-row bg-lonestar-700 justify-between items-center py-[20] px-[15] rounded-[20] mb-[16]">
        <View className="flex flex-col flex-1">
          <Text 
              className="text-lonestar-50 text-4xl"
              fontVariant="Bold"
          >
            {itemCount}
          </Text>
          <Text className="text-lonestar-50">Items in your list. Keep hauling!</Text>
        </View>
        <ShoppingBag className="text-lonestar-50" size={64} />
      </View>

      {/* Category List */}
      <View className="flex flex-col">
        <View className={`flex flex-row flex-wrap items-start ${categories && categories.length > 4 ? 'justify-start' : 'justify-center'} w-full mb-[8]`}>  
        
          {/* Priority List */}
          <View className="w-1/4">
              <AlertDialog open={isPriorityOpen} onOpenChange={setIsPriorityOpen}>
                <AlertDialogTrigger asChild >
                  <TouchableOpacity className="flex flex-col items-center justify-center">
                    <View className="h-[44] w-[44] bg-lonestar-100 rounded-2xl flex flex-col items-center justify-center">
                      <Star className="text-lonestar-950 w-[20] h-[20]" />
                    </View>
                    <Text className="max-w-[64] text-xs text-center break-words text-lonestar-950"
                          numberOfLines={2}
                    >
                      Priority Lists
                    </Text>
                  </TouchableOpacity>  
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-white'>
                    <AlertDialogHeader>
                      <Text className='text-lonestar-600 text-xl' fontVariant='Bold'>Priority Lists</Text>
                      <Text className='text-lonestar-700 text-xs' fontVariant='Medium'>You may find your shopping items here based on priority.</Text>
                    </AlertDialogHeader>

                    <View className={`flex flex-row flex-wrap items-start justify-start w-full`}>
                      {PRIORITIES.map((priority, index) => (
                        <TouchableOpacity key={index} className="flex flex-col items-center justify-center w-1/3 mb-[16]"
                          onPress={() => {
                              const PRIORITY_ROUTE = `/priority/${priority}?userId=${session?.user.id}` as Href;
                              router.push(PRIORITY_ROUTE);
                              setIsPriorityOpen(false);
                          }}
                        >
                          <View className="h-[44] w-[44] bg-lonestar-100 rounded-2xl flex flex-col items-center justify-center">
                            <Star className="text-lonestar-950 w-[20] h-[20]" />
                          </View>
                          <Text className="max-w-[64] text-xs text-center break-words text-lonestar-950"
                                numberOfLines={2}
                          >
                            {priority}
                          </Text>
                        </TouchableOpacity>
                      ))}  
                    </View>
                    <AlertDialogFooter>
                      <Button onPress={() => setIsPriorityOpen(false)}>
                        <Text className='text-white'>Close</Text>
                      </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </View>
          
          
          
          {/* Categories */}
          {categories?.slice(0, 6).map((category, index) => (
            <TouchableOpacity key={index} className="flex flex-col items-center justify-center w-1/4 mt-[24]"
              onPress={() => 
                router.push(
                  `/(shopping-list-menu)?category_name=${encodeURIComponent(
                    category.category_name
                  )}&category_id=${encodeURIComponent(category.id)}`
              )}
            >
              <View className="h-[44] w-[44] bg-lonestar-100 rounded-2xl flex flex-col items-center justify-center">
                <Bolt className="text-lonestar-950 w-[20] h-[20]" />
              </View>
              <Text className="max-w-[64] text-xs text-center break-words text-lonestar-950"
                    numberOfLines={2}
              >
                {category.category_name}
              </Text>
            </TouchableOpacity>
          ))}     

          {categories && categories.length > 6 && (
            <View className="w-1/4">
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild >
                  <TouchableOpacity className="flex flex-col items-center justify-center">
                    <View className="h-[44] w-[44] bg-lonestar-100 rounded-2xl flex flex-col items-center justify-center">
                      <Ellipsis className="text-lonestar-950 w-[20] h-[20]" />
                    </View>
                    <Text className="max-w-[64] text-xs text-center break-words text-lonestar-950"
                          numberOfLines={2}
                    >
                      Others
                    </Text>
                  </TouchableOpacity>  
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-white'>
                    <AlertDialogHeader>
                      <Text className='text-lonestar-600 text-xl' fontVariant='Bold'>Other Categories</Text>
                      <Text className='text-lonestar-700 text-xs' fontVariant='Medium'>You've created quite a lot of categories! You may find the remaining categories here.</Text>
                    </AlertDialogHeader>

                    <View className={`flex flex-row flex-wrap items-start justify-start w-full`}>
                      {categories?.slice(6, categories.length).map((category, index) => (
                        <TouchableOpacity key={index} className="flex flex-col items-center justify-center w-1/4 mb-[16]"
                          onPress={() => {
                            router.push(
                              `/(shopping-list-menu)?category_name=${encodeURIComponent(
                                category.category_name
                              )}&category_id=${encodeURIComponent(category.id)}`
                            );
                            setOpen(false);
                          }}
                        >
                          <View className="h-[44] w-[44] bg-lonestar-100 rounded-2xl flex flex-col items-center justify-center">
                            <Star className="text-lonestar-950 w-[20] h-[20]" />
                          </View>
                          <Text className="max-w-[64] text-xs text-center break-words text-lonestar-950"
                                numberOfLines={2}
                          >
                            {category.category_name}
                          </Text>
                        </TouchableOpacity>
                      ))}  
                    </View>
                    <AlertDialogFooter>
                      <Button onPress={() => setOpen(false)}>
                        <Text className='text-white'>Close</Text>
                      </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </View>  
           
          )}
        </View>
      </View>

      {/* Add Shopping Item Card */}
      <AddShoppingItem />

      {/* Recent Finds */}
      <RecentFinds data={sampleItemsData} />



     </View>
   </ScrollView>
  );
}

