import { useState } from "react";
import { View, ScrollView } from "react-native";
import { InputSearch } from "@/components/ui/input-search";
import ListShoppingItem from '@/components/list/ListShoppingItem';
import { Text } from "@/components/ui/text";
import { ListShoppingItemProps, RecentFindsProps } from "@/constants/types";

export default function Tab() {

  const [searchInput, setSearchInput] = useState('');

  const sampleItemsData: ListShoppingItemProps[] = [
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets'
    },
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets'
    },
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets'
    },
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & GadgetsAWDAWDAWDAWDAWD ABWVDHGAWDVGHAW AHGJWDGHAWDGHAWD  HGAWDGHAWDGH'
    },
  ];

  const samepleResultsData: ListShoppingItemProps[] = [
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets'
    },
    {
        itemName: 'iPhone 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets'
    },
    {
        itemName: 'Hotdog 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & Gadgets'
    },
    {
        itemName: 'Strawberry 15 Pro Max Case Fully Loaded',
        itemPrice: 700,
        itemPriority: 'Priority',
        itemPlatform: 'Shopee',
        itemCategory: 'Mobiles & GadgetsAWDAWDAWDAWDAWD ABWVDHGAWDVGHAW AHGJWDGHAWDGHAWD  HGAWDGHAWDGH'
    },
    {
      itemName: 'Chiken NUggets',
      itemPrice: 700,
      itemPriority: 'Priority',
      itemPlatform: 'Shopee',
      itemCategory: 'Mobiles & Gadgets'
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
      {sampleItemsData.map(({itemName, itemPrice, itemPriority, itemPlatform, itemCategory}, index) => (
        <View key={index} className='mb-[20]'>
            <ListShoppingItem itemName={itemName} itemPrice={itemPrice} itemPriority={itemPriority} itemPlatform={itemPlatform} itemCategory={itemCategory} />
        </View>
      ))}    
    </View>}

    {searchInput.length > 0 && samepleResultsData
      .filter(({ itemName }) =>
        itemName.toLowerCase().includes(searchInput.toLowerCase())
      )
      .map(({ itemName, itemPrice, itemPriority, itemPlatform, itemCategory }, index) => (
        <View key={index} className='mb-[20]'>
          <ListShoppingItem
            itemName={itemName}
            itemPrice={itemPrice}
            itemPriority={itemPriority}
            itemPlatform={itemPlatform}
            itemCategory={itemCategory}
          />
        </View>
    ))}



   </View>
  );
}

