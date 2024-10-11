import { View, StatusBar, ScrollView } from "react-native";
import { Platform } from "react-native";
import { X } from "@/lib/icons";
import { Text } from "@/components/ui/text";
// Forms
import { Label } from "@/components/ui/label";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from "expo-router";
import AddProductInfo from "@/components/forms/add-shopping-item/AddProductInfo";


function cancelAddItem() {
  console.log('cancelled!');
}


export default function Index() {

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



  return (
      <ScrollView className="flex flex-col p-[20]"
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1
          }}
      >
        <View className="flex flex-row-reverse justify-between items-center mb-[4]">
          <X className="text-lonestar-400" size={24} />
        </View>

        <View className="flex flex-col p-[6]">
          <Text 
            className=" text-lonestar-500 mb-[6]"
            style={{
              fontSize: 20
            }}
            fontVariant="Bold"
          >
            Add Shopping Item
          </Text>

          <Text className="text-lonestar-700 text-base max-w-[95%] mb-[20]" fontVariant="Regular">
            {scrapeSuccessMessage}
          </Text>

          <View>
            <AddProductInfo />
            
          </View>

        </View>

      </ScrollView>
  );
}


