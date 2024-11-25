import React, { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import { Text } from "@/components/ui/text";
import ListShoppingItem from "@/components/list/ListShoppingItem";
import { ExtendedShoppingItemInsert } from "@/constants/types";
import { router, useFocusEffect } from "expo-router";
import { fetchSession } from "@/utils/methods/fetch-session";

interface Props {
  shoppingItems: ExtendedShoppingItemInsert[] | null;
}

function RecentFinds({ shoppingItems }: Props) {
  const [userId, setUserId] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      fetchSession().then((session) => {
        if (!session) {
          console.log("NO SESSION");
        } else {
          setUserId(session.user.id);
        }
      });
    }, []),
  );

  return (
    <View className="mb-[24] flex flex-col rounded-xl bg-lonestar-50 px-[15] py-[20]">
      <View className="mb-[8] flex w-full flex-row justify-between">
        <View className="flex flex-col">
          <Text className="text-base text-lonestar-600" fontVariant="SemiBold">
            Recent Finds
          </Text>
          <Text className="text-xs text-lonestar-900">
            Check out your recent interests below!
          </Text>
        </View>
        <Pressable
          onPress={() => {
            router.push({
              pathname: "/(shopping-list-menu)/recent-finds",
              params: {
                user_id: userId,
              },
            });
          }}
        >
          <Text className="text-xs text-lonestar-600">View All</Text>
        </Pressable>
      </View>

      <View className="flex flex-col overflow-hidden">
        {shoppingItems?.map((shoppingItem, index) => (
          <View key={index} className="mb-[20]">
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
