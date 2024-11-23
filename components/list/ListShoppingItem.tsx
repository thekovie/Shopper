import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { ExtendedShoppingItemInsert } from '@/constants/types';
import { router } from 'expo-router';



function ListShoppingItem(props: ExtendedShoppingItemInsert) {
    return (
        <TouchableOpacity className="flex flex-row justify-between items-start" onPress={() => {
            router.push({
                pathname: '/(item-page)/shopping-item',
                params: {
                    itemName: props.product_title,
                    itemPrice: props.price,
                    itemPriority: props.priority,
                    itemPlatform: props.shopping_platform,
                    itemCategory: props.category_id,
                    itemNotes: props.notes,
                    isMarkedAsPurchased: props.is_purchased ? 'true' : 'false',
                }
            });
        }}>
            <View className='max-w-[75%]'>
                <Text className="text-lonestar-950 text-sm" 
                        fontVariant='Medium' 
                        numberOfLines={1} 
                        ellipsizeMode='tail'
                >
                    {props.product_title}
                </Text>
                <Text className="text-lonestar-600 text-xs" fontVariant='Light' numberOfLines={1} ellipsizeMode='tail'>
                    {props.priority} • {props.shopping_platform} • {props.category_name}
                </Text>
            </View>
            <Text className='text-lonestar-950 text-sm' fontVariant='Medium'>PHP ~{props.price}</Text>
        </TouchableOpacity>
    );
}

export default ListShoppingItem;