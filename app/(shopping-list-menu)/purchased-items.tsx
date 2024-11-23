import { View, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { Text } from "@/components/ui/text";
import ListShoppingItem from "@/components/list/ListShoppingItem";
import { ListShoppingItemProps } from "@/constants/types";
import { ArrowLeft } from "@/lib/icons"
import { router } from "expo-router";




export default function PurchasedItems() {
  const sampleData: ListShoppingItemProps[] = [
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets',
        itemNotes: 'I’m not really sure if im in to this but there is AI so why not?',
        isMarkedAsPurchased: false
    },
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets',
        itemNotes: 'Wow iphone good stuff',
        isMarkedAsPurchased: false
    },
    {
        itemName: 'Hotdog 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets',
        itemNotes: '',
        isMarkedAsPurchased: false
    },
    {
        itemName: 'Strawberry 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & GadgetsAWDAWDAWDAWDAWD ABWVDHGAWDVGHAW AHGJWDGHAWDGHAWD  HGAWDGHAWDGH',
        itemNotes: 'Limited stock available.',
        isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken NUggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: '',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken NUggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: '',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken NUggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: 'Chiken Nuggies',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken NUggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: 'Great product!',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken NUggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: 'Chiken Nuggets product!',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken NUggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: 'Great product!',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken NUggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: 'Check for discounts!',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken NUggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: '',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken NUggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: 'Recommended by many users.',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken NUggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: 'Recommended by many users.',
      isMarkedAsPurchased: false
    },
  ];

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
          {/* {sampleData.map(({itemName, itemPrice, itemPriority, itemPlatform, itemCategory, itemNotes, isMarkedAsPurchased}, index) => (
              <View key={index} className='mb-[20]'>
                  <ListShoppingItem 
                      itemName={itemName} 
                      itemPrice={itemPrice} 
                      itemPriority={itemPriority} 
                      itemPlatform={itemPlatform} 
                      itemCategory={itemCategory} 
                      itemNotes={itemNotes} 
                      isMarkedAsPurchased={isMarkedAsPurchased}
                  />
              </View>
          ))}      */}
        </ScrollView>

      </View>
  );
}


