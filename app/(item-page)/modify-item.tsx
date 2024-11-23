import { useState, useEffect, useCallback } from "react";
import { View, StatusBar, ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { Platform } from "react-native";
import { Text } from "@/components/ui/text";
import ModifyProductInfo from "@/components/modify-shopping-item/forms/ModifyProductInfo";
import CancelChangesPage from "@/components/add-shopping-item/CancelChanges";
import { ArrowLeft } from "@/lib/icons"
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { fetchSession } from "@/utils/methods/fetch-session";
import { fetchCategories } from "@/utils/methods/fetch-categories";
import { ExtendedShoppingItemInsert, ItemCategoryRow, ShoppingItemRow } from "@/constants/types";
import { getShoppingItemInfo } from "@/utils/methods/get-shopping-item-info";


function cancelAddItem() {
  console.log('cancelled!');
}


export default function ModifyItem() {
  const { itemId, itemCategoryName } = useLocalSearchParams();
  const singleItemId = Array.isArray(itemId) ? itemId[0] : itemId;
  const singleItemCategoryName = Array.isArray(itemCategoryName) ? itemCategoryName[0] : itemCategoryName;
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDiscardChangesDialogOpen, setDiscardChangesDialogOpen] = useState(false);
  const [categories, setCategories] = useState<ItemCategoryRow[] | null>(null);
  const [shoppingItem, setShoppingItem] = useState<ExtendedShoppingItemInsert | null>(null);
  

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
      return () => BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    }, [])
  );
 

  // Fetch session user's information
  useFocusEffect(
    useCallback(() => {
      fetchSession().then(async (session) => {
        setIsLoading(true);
        console.log("Hello")
        if(!session){
          console.log("NO SESSION");
        }else{
          setUserId(session.user.id);
          const categoriesData = await fetchCategories(session.user.id);
          
          if(categoriesData){
            setCategories(categoriesData);

            // fetch shopping item
            const shoppingItemInfo = await getShoppingItemInfo(singleItemId);
            if(shoppingItemInfo){
              console.log(shoppingItemInfo);
              setShoppingItem(shoppingItemInfo);
            }

          }else{
            console.log("No categories found");
          }
        }
      }).finally(() => {
        setIsLoading(false);
      })
    }, [])
  );

  

  if(isLoading){
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
      <ScrollView className="flex flex-col p-[20]"
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1
          }}
      >
        {/* <CancelChangesPage /> */}

        <View className="flex flex-row mb-[4] items-center">
          <CancelChangesPage
            toggleDialog={(status) => {
              setDiscardChangesDialogOpen(status);
            }}
            isDialogOpen={isDiscardChangesDialogOpen}
            trigger={
                <TouchableOpacity>
                    <ArrowLeft className="text-lonestar-400 mr-[10]" size={24}/>
                </TouchableOpacity>
            }
          />

          <Text 
            className=" text-lonestar-500 text-xl"
            fontVariant="Bold"
          >
           Modify Item
          </Text> 
        </View>

        <ModifyProductInfo
          userId={userId}
          itemId={singleItemId}
          shoppingItem={shoppingItem}
          onChangeCategory={updateStateCategories}
          categories={categories}
          currentCategoryName={singleItemCategoryName}
        />

      </ScrollView>
  );
}


