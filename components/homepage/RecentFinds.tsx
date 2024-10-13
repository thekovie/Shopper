import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text'
import ListShoppingItem from '@/components/list/ListShoppingItem';
import { RecentFindsProps } from '@/constants/types';



function RecentFinds({ data }: RecentFindsProps) {
    
    return (
        <View className="flex flex-col bg-lonestar-50 py-[20] px-[15] rounded-xl mb-[24]">
            <View className='flex flex-row justify-between w-full mb-[8]'>
                <View className='flex flex-col'>
                    <Text className='text-lonestar-600 text-base' fontVariant='SemiBold'>Recent Finds</Text>
                    <Text className='text-lonestar-900 text-xs'>Check out your recent interests below!</Text>
                </View>
                <Text className='text-lonestar-600 text-xs'>View All</Text>
            </View>

            <View className='flex flex-col overflow-hidden'>
                
                {data.map(({itemName, itemPrice, itemPriority, itemPlatform, itemCategory, itemNotes}, index) => (
                    <View key={index} className='mb-[20]'>
                        <ListShoppingItem itemName={itemName} itemPrice={itemPrice} itemPriority={itemPriority} itemPlatform={itemPlatform} itemCategory={itemCategory} itemNotes={itemNotes} />
                    </View>
                ))}     
            </View>

        </View>
    );
}

export default RecentFinds;