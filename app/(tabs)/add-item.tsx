import { View, StatusBar } from "react-native";
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
  AddProductLinkSchema,
  addProductLinkSchema,
} from '@/utils/forms/add-product-link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from "expo-router";


function cancelAddItem() {
  router.back();
}


export default function Tab() {

  const form = useForm<AddProductLinkSchema>({
    resolver: zodResolver(addProductLinkSchema),
    defaultValues: {
      productLink: "",
    },
  });

  function onSubmit(values: z.infer<typeof addProductLinkSchema>) {
    // TODO: Do something with the form values.
    console.log(values)
    router.push({
      pathname: "/(add-shopping-item)/"
    },);
  }

  const onError: SubmitErrorHandler<AddProductLinkSchema> = (
    errors,
    e
  ) => {
    console.log(JSON.stringify(errors));
  };



  return (
    <View className="flex flex-1 flex-col p-[20]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
        Let us try to pre-fill the form for you, please provide the product link to get started!
      </Text>

      <View>
        <Label nativeID="product-link" className="text-lonestar-950 text-xs font-medium mb-[10]">
          Product Link
        </Label>

        <View className="">
          <FormProvider {...form}>
              <Controller
              control={form.control}
              name="productLink"
              render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
              }) => {
                  return (
                  <Input
                      placeholder="https://example.com/product-idddd"
                      onBlur={onBlur}
                      value={value}
                      className="mb-[20]"
                      onChangeText={onChange}
                  />
                  
                  );
              }}
              />

              <View className="flex flex-col">
                <Button onPress={form.handleSubmit(onSubmit, onError)} className="mb-[8]">
                    <Text>Continue</Text>
                </Button>

                <Button variant={'outline'} onPress={cancelAddItem}>
                    <Text className="text-lonestar-600 text-sm" fontVariant="Medium">Cancel</Text>
                </Button>
              </View>      
          </FormProvider>
        </View>
      </View>

    </View>

    
    
   </View>
  );
}


