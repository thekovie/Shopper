import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { ListShoppingItemProps } from '@/constants/types';



function ListShoppingItem(props: ListShoppingItemProps) {
    return (
        <View className="flex flex-row justify-between items-start bg-lonestar-50">
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
        </View>
    );
}

export default ListShoppingItem;