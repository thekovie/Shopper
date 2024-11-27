import {
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { Platform } from "react-native";
import { Text } from "@/components/ui/text";
import { X } from "@/lib/icons";
// Forms
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import {
  addProductInformationSchema,
  AddProductInformationSchema,
} from "@/utils/forms/add-product-link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AddProductInfo from "@/components/add-shopping-item/forms/AddProductInfo";
import CancelChangesPage from "@/components/add-shopping-item/CancelChanges";

// Supabase
import { supabase } from "@/lib/supabase";
import { ItemCategoryRow } from "@/constants/types";
import { fetchSession } from "@/utils/methods/fetch-session";
import { fetchCategories } from "@/utils/methods/fetch-categories";
import { set } from "date-fns";

export default function AddProductItem() {
  const [isDiscardChangesDialogOpen, setDiscardChangesDialogOpen] =
    useState(false);
  const [userId, setUserId] = useState<string>("");
  const [categories, setCategories] = useState<ItemCategoryRow[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const scrapeSuccessMessage =
    "Make sure to review and fill up the remaining fields.";

  function updateStateCategories(newCategory: ItemCategoryRow) {
    setCategories((prevCategories) => [...(prevCategories || []), newCategory]);
  }

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        setDiscardChangesDialogOpen(true); // Open the dialog when back button is pressed
        return true; // Prevent default back navigation
      };

      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      // Cleanup the event listener when component unmounts
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    }, []),
  );

  // Fetch session user's information
  useFocusEffect(
    useCallback(() => {
      fetchSession().then(async (session) => {
        setIsLoading(true);
        console.log("Hello");
        if (!session) {
          console.log("NO SESSION");
        } else {
          setUserId(session.user.id);
          const categoriesData = await fetchCategories(session.user.id);

          if (categoriesData) {
            setCategories(categoriesData);
          } else {
            console.log("No categories found");
          }
        }
        setIsLoading(false);
      });
    }, []),
  );

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-lonestar-950">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex flex-col p-[20]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
      }}
    >
      <CancelChangesPage
        toggleDialog={setDiscardChangesDialogOpen}
        isDialogOpen={isDiscardChangesDialogOpen}
        trigger={
          <TouchableOpacity>
            <View className="n mb-[4] flex flex-row-reverse items-center">
              <X className="text-lonestar-400" size={24} />
            </View>
          </TouchableOpacity>
        }
      />

      <View className="flex flex-col p-[6]">
        <Text className="mb-[6] text-xl text-lonestar-500" fontVariant="Bold">
          Add Shopping Item
        </Text>

        <Text
          className="mb-[20] max-w-[95%] text-base text-lonestar-700"
          fontVariant="Regular"
        >
          {scrapeSuccessMessage}
        </Text>

        <View>
          <AddProductInfo
            userId={userId}
            categories={categories}
            onChangeCategory={updateStateCategories}
          />
        </View>
      </View>
    </ScrollView>
  );
}
