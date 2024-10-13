import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { ListShoppingItemProps } from '@/constants/types';
import { router } from 'expo-router';



function ListShoppingItem(props: ListShoppingItemProps) {
    return (
        <TouchableOpacity className="flex flex-row justify-between items-start" onPress={() => {
            router.push({
                pathname: '/(item-page)/shopping-item',
                params: {
                    itemName: props.itemName,
                    itemPrice: props.itemPrice,
                    itemPriority: props.itemPriority,
                    itemPlatform: props.itemPlatform,
                    itemCategory: props.itemCategory,
                    itemNotes: props.itemNotes,
                    isMarkedAsPurchased: props.isMarkedAsPurchased ? 'true' : 'false',
                }
            });
        }}>
            <View className='max-w-[75%]'>
                <Text className="text-lonestar-950 text-sm" 
                        fontVariant='Medium' 
                        numberOfLines={1} 
                        ellipsizeMode='tail'
                >
                    {props.itemName}
                </Text>
                <Text className="text-lonestar-600 text-xs" fontVariant='Light' numberOfLines={1} ellipsizeMode='tail'>
                    {props.itemPriority} • {props.itemPlatform} • {props.itemCategory}
                </Text>
            </View>
            <Text className='text-lonestar-950 text-sm' fontVariant='Medium'>PHP ~{props.itemPrice}</Text>
        </TouchableOpacity>
    );
}

export default ListShoppingItem;