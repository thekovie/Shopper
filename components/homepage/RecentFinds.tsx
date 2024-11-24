import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text'
import ListShoppingItem from '@/components/list/ListShoppingItem';
import { ExtendedShoppingItemInsert } from '@/constants/types';


interface Props{
    shoppingItems: ExtendedShoppingItemInsert[] | null;
}

function RecentFinds({ shoppingItems }: Props) {
    
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
                
            {shoppingItems?.map((shoppingItem, index) => (
              <View key={index} className='mb-[20]'>
                  <ListShoppingItem 
                      id={shoppingItem.id}
                      product_title={shoppingItem.product_title} 
                      price={shoppingItem.price!} 
                      priority={shoppingItem.priority} 
                      shopping_platform={shoppingItem.shopping_platform} 
                      category_id={shoppingItem.category_id} 
                      notes={shoppingItem.notes} 
                      is_purchased={shoppingItem.is_purchased}
                      user_id={shoppingItem.user_id}
                      category_name={shoppingItem.category_name}
                  />
              </View>
            ))}    
            </View>

        </View>
    );
}

export default RecentFinds;