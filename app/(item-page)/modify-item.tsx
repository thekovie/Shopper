import { useState, useEffect } from "react";
import { View, StatusBar, ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { Platform } from "react-native";
import { Text } from "@/components/ui/text";
import ModifyProductInfo from "@/components/modify-shopping-item/forms/ModifyProductInfo";
import CancelChangesPage from "@/components/add-shopping-item/CancelChanges";
import { ArrowLeft } from "@/lib/icons"


function cancelAddItem() {
  console.log('cancelled!');
}


export default function Index() {
  const [isDiscardChangesDialogOpen, setDiscardChangesDialogOpen] = useState(false);


  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        setDiscardChangesDialogOpen(true); // Open the dialog when back button is pressed
        return true; // Prevent default back navigation
      },
    );

    // Cleanup the event listener when component unmounts
    return () => backHandler.remove();
  }, []);

  



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
            toggleDialog={setDiscardChangesDialogOpen}
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

        <ModifyProductInfo />

      </ScrollView>
  );
}


