import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { useState, useEffect } from 'react'
import { Platform } from "react-native";
import { Bell, Brush, Pill, ShoppingBag, Star, TabletSmartphone, MoreHorizontal } from "@/lib/icons";
import { Text } from "@/components/ui/text";
import { Joystick } from "lucide-react-native";
import AddShoppingItem from "@/components/homepage/AddShoppingItem";
import RecentFinds from "@/components/homepage/RecentFinds";
import { Session } from '@supabase/supabase-js'
import { supabase } from "@/lib/supabase";
import { ListShoppingItemProps, RecentFindsProps } from "@/constants/types";



export default function Tab() {
  const [session, setSession] = useState<Session | null>(null)

  const numberOfItems = 700;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

  const categoriesOne = [
    { label: "Priority List", Icon: Star },
    { label: "Mobile", Icon: TabletSmartphone },
    { label: "Health", Icon: Pill },
    { label: "Beauty", Icon: Brush },
  ];

  const categoriesTwo = [
    { label: "Beauty", Icon: Brush },
    { label: "Mobile", Icon: TabletSmartphone },
    { label: "Gaming", Icon: Joystick },
    { label: "Others", Icon: MoreHorizontal },
  ]

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
            {numberOfItems}
          </Text>
          <Text className="text-lonestar-50">Items in your list. Keep hauling!</Text>
        </View>
        <ShoppingBag className="text-lonestar-50" size={64} />
      </View>

      {/* Category List */}
      <View className="flex flex-col mb-[12]">
        <View className="flex flex-row items-start justify-evenly w-full mb-[8]">  
          {categoriesOne.map(({label, Icon}, index) => (
            <View key={index} className="flex flex-col items-center justify-center w-[64]">
              <View className="h-[44] w-[44] bg-lonestar-100 rounded-2xl flex flex-col items-center justify-center">
                <Icon className="text-lonestar-950 w-[20] h-[20]" />
              </View>
              <Text className="max-w-[64] text-center break-words">{label}</Text>
            </View>
          ))}     
        </View>

        <View className="flex flex-row items-start justify-evenly w-full">  
          {categoriesTwo.map(({label, Icon}, index) => (
            <View key={index} className="flex flex-col items-center justify-center w-[64]">
              <View className="h-[44] w-[44] bg-lonestar-100 rounded-2xl flex flex-col items-center justify-center">
                <Icon className="text-lonestar-950 w-[20] h-[20]" />
              </View>
              <Text className="max-w-[64] text-center break-words">{label}</Text>
            </View>
          ))}     
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

