import { useState, useEffect } from "react";
import { View, StatusBar, ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { router } from "expo-router";
import { Platform } from "react-native";
import { Text } from "@/components/ui/text";
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
import ModifyProductInfo from "@/components/modify-shopping-item/forms/ModifyProductInfo";
import CancelChangesPage from "@/components/add-shopping-item/CancelChanges";
import { ArrowLeft } from "@/lib/icons"


function cancelAddItem() {
  console.log('cancelled!');
}


export default function Index() {
  const [isDiscardChangesDialogOpen, setDiscardChangesDialogOpen] = useState(false);

  const scrapeSuccessMessage = "Success! Make sure to review and fill up the remaining fields.";
  const scrapeErrorMessage = "Oh no! We weren’t able to pre-fill for you. Please fill-up the following fields.";

  const form = useForm<AddProductInformationSchema>({
    resolver: zodResolver(addProductInformationSchema),
    defaultValues: {
      productLink: "",
    },
  });

  function onSubmit(values: z.infer<typeof addProductInformationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    // router.push({
    //   pathname: "/(tabs)add-item-fillup",
    // });
  }

  const onError: SubmitErrorHandler<AddProductInformationSchema> = (
    errors,
    e
  ) => {
    console.log(JSON.stringify(errors));
  };

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


