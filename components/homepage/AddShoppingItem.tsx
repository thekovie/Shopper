import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text'
import { Plus } from '@/lib/icons'

function AddShoppingItem(props: any) {
    return (
        <View className="flex flex-row bg-lonestar-50 justify-between items-center py-[20] px-[15] rounded-xl mb-[12]">
            <Plus className="text-lonestar-600 mr-[8]" size={64} />
            <View className="flex flex-col flex-1">
            <Text 
                className="text-lonestar-600 text-lg"
                fontVariant="SemiBold"
            >
                Add shopping items!
            </Text>
            <Text className="text-lonestar-950 text-xs">Let's add and arrange our shopping items to spend wiselyss!</Text>
            </View>
        </View>
    );
}

export default AddShoppingItem;