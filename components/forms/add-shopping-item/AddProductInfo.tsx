import { View, ScrollView } from "react-native";
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
  AddProductInformationSchema,
  addProductInformationSchema
} from '@/utils/forms/add-product-link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from "expo-router";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea";


function cancelAddItem() {
  console.log('cancelled!');
}


export default function AddProductInfo() {

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
    //   pathname: "/(tabs)/",
    // });
  }

  const onError: SubmitErrorHandler<AddProductInformationSchema> = (
    errors,
    e
  ) => {
    console.log(JSON.stringify(errors));
  };



  return (
    <View className="flex flex-col p-[6] h-full mb-[20]">
      
        <View className="">
          <FormProvider {...form}>

              <View className="flex flex-col">
                <Label nativeID="product-link" className="text-lonestar-950 text-xs font-medium mb-[10]">
                  Product Title
                </Label>
                <Controller
                control={form.control}
                name="productName"
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => {
                    return (
                    <Input
                        placeholder="Enter your product name"
                        onBlur={onBlur}
                        value={value}
                        className="mb-[20]"
                        onChangeText={onChange}
                    />
                    
                    );
                }}
                />
              </View>

              <View className="flex flex-col">
                <Label nativeID="product-link" className="text-lonestar-950 text-xs font-medium mb-[10]">
                  Product Link
                </Label>
                <Controller
                control={form.control}
                name="productLink"
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => {
                    return (
                    <Input
                        placeholder="https://example.com/product-id"
                        onBlur={onBlur}
                        value={value}
                        className="mb-[20]"
                        onChangeText={onChange}
                    />
                    
                    );
                }}
                />
              </View>

              <View className="flex flex-col">
                <Label nativeID="product-link" className="text-lonestar-950 text-xs font-medium mb-[10]">
                  Shopping Platform
                </Label>
                <Controller
                control={form.control}
                name="shoppingPlatform"
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => {
                    return (
                    <Input
                        placeholder="Enter shopping platform (ex. Shopee, Lazada)"
                        onBlur={onBlur}
                        value={value}
                        className="mb-[20]"
                        onChangeText={onChange}
                    />
                    
                    );
                }}
                />
              </View>

              <View className="flex flex-col">
                <Label nativeID="product-link" className="text-lonestar-950 text-xs font-medium mb-[5]">
                  Price
                </Label>
                <Text className="text-lonestar-700 text-xs mb-[10]">As price fluctuates, we will automatically round up the price.</Text>
                <Controller
                control={form.control}
                name="price"
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => {
                    return (
                    <Input
                        placeholder="Enter amount (e.g., 10, 100, 110, 120)"
                        onBlur={onBlur}
                        keyboardType="numeric"
                        className="mb-[20]"
                        onChangeText={(text) => {
                          const numericValue = parseFloat(text);
                          onChange(isNaN(numericValue) ? 0 : numericValue);
                        }}
                    />
                    
                    );
                }}
                />
              </View>

              <View className="flex flex-col">
                <Label nativeID="product-link" className="text-lonestar-950 text-xs font-medium mb-[5]">
                  Category
                </Label>
                <Text className="text-lonestar-700 text-xs mb-[10]">Want to add your own category? Click here. (TODO: SHOULD BE UNDERLINE)</Text>
                <Controller
                control={form.control}
                name="category"
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => {
                    return (
                      <Select 
                        onValueChange={(selectedValue) => {
                          onChange(selectedValue);
                        }}
                        className="mb-[10]"
                      >
                      <SelectTrigger className='w-full'>
                        <SelectValue
                          className='text-foreground text-sm native:text-lg'
                          placeholder='Select a category'
                        />
                      </SelectTrigger>
                      <SelectContent className='w-[250px]'>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          <SelectItem label='Apple' value='apple'>
                            Apple
                          </SelectItem>
                          <SelectItem label='Banana' value='banana'>
                            Banana
                          </SelectItem>
                          <SelectItem label='Blueberry' value='blueberry'>
                            Blueberry
                          </SelectItem>
                          <SelectItem label='Grapes' value='grapes'>
                            Grapes
                          </SelectItem>
                          <SelectItem label='Pineapple' value='pineapple'>
                            Pineapple
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    
                    );
                }}
                />
              </View>

              <View className="flex flex-col">
                <Label nativeID="product-link" className="text-lonestar-950 text-xs font-medium mb-[5]">
                  Priority Level
                </Label>
                <Text className="text-lonestar-700 text-xs mb-[10]">Want to add your own category? Click here. (TODO: SHOULD BE UNDERLINE)</Text>
                <Controller
                control={form.control}
                name="priority"
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => {
                    return (
                      <Select 
                        onValueChange={(selectedValue) => {
                          onChange(selectedValue);
                        }}
                        className="mb-[10]"
                      >
                      <SelectTrigger className='w-full'>
                        <SelectValue
                          className='text-foreground text-sm native:text-lg'
                          placeholder='Select a priority'
                        />
                      </SelectTrigger>
                      <SelectContent className='w-[250px]'>
                        <SelectGroup>
                          <SelectLabel>Priorities</SelectLabel>
                          <SelectItem label='Apple' value='apple'>
                            Apple
                          </SelectItem>
                          <SelectItem label='Banana' value='banana'>
                            Banana
                          </SelectItem>
                          <SelectItem label='Blueberry' value='blueberry'>
                            Blueberry
                          </SelectItem>
                          <SelectItem label='Grapes' value='grapes'>
                            Grapes
                          </SelectItem>
                          <SelectItem label='Pineapple' value='pineapple'>
                            Pineapple
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    
                    );
                }}
                />
              </View>

              <View className="flex flex-col">
                <Label nativeID="product-link" className="text-lonestar-950 text-xs font-medium mb-[10]">
                  Notes
                </Label>
                <Controller
                control={form.control}
                name="notes"
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => {
                    return (
                    <Textarea
                        placeholder="Enter shopping platform (ex. Shopee, Lazada)"
                        onBlur={onBlur}
                        value={value}
                        className="mb-[20]"
                        onChangeText={onChange}
                    />
                    
                    );
                }}
                />
              </View>
              

              <View className="flex flex-col">
                <Button onPress={form.handleSubmit(onSubmit, onError)} className="mb-[8]">
                    <Text>Submit</Text>
                </Button>

                <Button variant={'outline'} onPress={cancelAddItem}>
                    <Text className="text-lonestar-600 text-sm" fontVariant="Medium">Back</Text>
                </Button>
              </View>      
          </FormProvider>
        </View>
    </View>
  );
}


