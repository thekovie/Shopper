import React from 'react';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { CheckCircle2 } from '@/lib/icons';

function MarkedAsPurchased() {
    return (
        <View className='border border-[#00C767] rounded-[6] p-[15] flex flex-row items-center'>
            <CheckCircle2 className='text-[#00C767] mr-[3]' size={16}/>
            <Text className='text-xs text-[#00C767]' fontVariant='Regular'>This item has been purchased already.</Text>
        </View>
    );
}

export default MarkedAsPurchased;