import React from 'react';
import { Touchable, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/ui/text'
import { Plus } from '@/lib/icons'
import { router } from 'expo-router';
import { Pressable } from 'react-native';

function AddShoppingItem(props: any) {
    return (
        <Pressable className="flex flex-row bg-lonestar-50 justify-between items-center py-[20] px-[15] rounded-xl mb-[12]"
            onPress={() => router.push('/(tabs)/add-item')}
        >
            <Plus className="text-lonestar-600 mr-[8]" size={64} />
            <View className="flex flex-col flex-1">
            <Text 
                className="text-lonestar-600 text-lg"
                fontVariant="SemiBold"
            >
                Add shopping items!
            </Text>
            <Text className="text-lonestar-950 text-xs">Let's add and arrange our shopping items to spend wisely!</Text>
            </View>
        </Pressable>
    );
}

export default AddShoppingItem;