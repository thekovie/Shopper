import React, { useCallback, useState } from "react";
import { Touchable, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Plus, Shapes } from "@/lib/icons";
import { router, useFocusEffect } from "expo-router";
import { Pressable } from "react-native";
import { addCategory } from "@/utils/methods/add-category";
import { ItemCategoryRow } from "@/constants/types";
import AddCategory from "@/components/add-shopping-item/forms/AddCategory";
import { fetchSession } from "@/utils/methods/fetch-session";

interface Props{
  refreshCategories: () => void; // Add this prop
}

function AddCategories({ refreshCategories }: Props) {
  const [categories, setCategories] = useState<ItemCategoryRow[] | null>(null);
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

  const handleAddCategory = async (newCategory: string) => {
    const res = await addCategory(newCategory, userId);
    if (res) {
      console.log("Category added successfully");
      refreshCategories();
    } else {
      console.log("Error adding category");
    }
  };

  return (
    // <Pressable
    //   className="mb-[12] flex flex-row items-center justify-between rounded-xl border border-dashed border-lonestar-700 px-[15] py-[20]"
    //   onPress={() => router.push("/(tabs)/add-item")}
    // >
    //   <Shapes className="mr-[8] text-lonestar-600" size={64} />
    //   <View className="flex flex-1 flex-col">
    //     <Text className="text-lg text-lonestar-600" fontVariant="SemiBold">
    //       You have no categories yet!
    //     </Text>
    //     <Text className="text-xs text-lonestar-950">
    //       Let's add and arrange our categories to spend wisely! Click me to add
    //       a category.
    //     </Text>
    //   </View>
    // </Pressable>
    <AddCategory
      onAddCategory={handleAddCategory}
      triggerContent={
        <TouchableOpacity className="mb-[12] flex flex-row items-center justify-between rounded-xl border border-dashed border-lonestar-700 px-[15] py-[20]">
          <Shapes className="mr-[8] text-lonestar-600" size={64} />
          <View className="flex flex-1 flex-col">
            <Text className="text-lg text-lonestar-600" fontVariant="SemiBold">
              You have no categories yet!
            </Text>
            <Text className="text-xs text-lonestar-950">
              Let's add and arrange our categories to spend wisely! Click me to
              add a category.
            </Text>
          </View>
        </TouchableOpacity>
      }
    />
  );
}

export default AddCategories;
