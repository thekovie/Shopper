import { View, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from 'expo-router';
import ListShoppingItem from "@/components/list/ListShoppingItem";
import { ListShoppingItemProps } from "@/constants/types";
import { ArrowLeft, ArrowDownUp } from "@/lib/icons"
import { router } from "expo-router";




export default function PurchasedItems() {
    const searchParams = useLocalSearchParams(); // Get the itemName from the params


  const sampleData: ListShoppingItemProps[] = [
    {
      itemName: 'iPhone 15 Pro Max Case Fully Loadedd',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: 'Great product!',
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
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: 'Check for discounts!',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken Nuggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: 'Limited stock available.',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken Nuggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: '',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken Nuggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: 'Recommended by many users.',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken Nuggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: 'Newly arrived!',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken Nuggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: '',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken Nuggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: '',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken Nuggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: '',
      isMarkedAsPurchased: false
    },
    {
      itemName: 'Chiken Nuggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets',
      itemNotes: '',
      isMarkedAsPurchased: false
    }
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
           {searchParams.category}
          </Text> 
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
            
          {sampleData.map(({itemName, itemPrice, itemPriority, itemPlatform, itemCategory, itemNotes, isMarkedAsPurchased}, index) => (
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
          ))}     
        </ScrollView>


      </View>
  );
}


