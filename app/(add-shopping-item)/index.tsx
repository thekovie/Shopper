import { View, StatusBar, ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { useState, useEffect } from "react";
import { Platform } from "react-native";
import { Text } from "@/components/ui/text";
import { X } from "@/lib/icons";
// Forms
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  useForm,
} from 'react-hook-form';
import {
    addProductInformationSchema,
    AddProductInformationSchema
} from '@/utils/forms/add-product-link';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AddProductInfo from "@/components/add-shopping-item/forms/AddProductInfo";
import CancelChangesPage from "@/components/add-shopping-item/CancelChanges";

// Supabase
import { supabase } from '@/lib/supabase';


function cancelAddItem() {
  console.log('cancelled!');
}


export default function Index() {
  const [isDiscardChangesDialogOpen, setDiscardChangesDialogOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");

  const scrapeSuccessMessage = "Success! Make sure to review and fill up the remaining fields.";

  
  const form = useForm<AddProductInformationSchema>({
    resolver: zodResolver(addProductInformationSchema),
    defaultValues: {
      productLink: "",
    },
  });

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


  // Fetch session user's information
  useEffect(() => {
    const fetchSession = async () => {
      try{
        const { data, error } = await supabase.auth.getSession()

        if(error){
          console.error("Error fetching session: " + error);
          return;
        }

        if (!data?.session?.user?.id) {
          console.error("User ID not found. Ensure the user is logged in.");
          return;
        }

        setUserId(data?.session?.user?.id || "");
  
    
      }catch(error){
        console.error("Error fetching session: " + error)
      }
    }

    fetchSession();
  }, [])


  return (
      <ScrollView className="flex flex-col p-[20]"
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1
          }}
      >
        <CancelChangesPage
          toggleDialog={setDiscardChangesDialogOpen}
          isDialogOpen={isDiscardChangesDialogOpen}
          trigger={
            <TouchableOpacity>
                <View className="flex flex-row-reverse n items-center mb-[4]">
                    <X className="text-lonestar-400" size={24} />
                </View>
            </TouchableOpacity>
          }
        />
          

        <View className="flex flex-col p-[6]">
          <Text 
            className=" text-lonestar-500 mb-[6] text-xl"
            fontVariant="Bold"
          >
            Add Shopping Item
          </Text>

          <Text className="text-lonestar-700 text-base max-w-[95%] mb-[20]" fontVariant="Regular">
            {scrapeSuccessMessage}
          </Text>

          <View>
            <AddProductInfo userId={userId} />
            
          </View>

        </View>

      </ScrollView>
  );
}


