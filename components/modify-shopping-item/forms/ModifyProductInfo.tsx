import { useState, useEffect } from "react";
import { View, TouchableOpacity, BackHandler } from "react-native";
import { Text } from "@/components/ui/text";
// Forms
import { Label } from "@/components/ui/label";
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import {
  AddProductInformationSchema,
  addProductInformationSchema,
} from "@/utils/forms/add-product-link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AddCategory from "@/components/add-shopping-item/forms/AddCategory";
import { ItemCategoryRow } from "@/constants/types";

function deleteItem() {
  console.log("Deleted item");
  router.replace({ pathname: "/(tabs)/" });
}



export default function ModifyProductInfo() {
  const [categories, setCategories] = useState<ItemCategoryRow[] | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<AddProductInformationSchema>({
    resolver: zodResolver(addProductInformationSchema),
    defaultValues: {
      productLink: "",
    },
  });

  function onSubmit(values: z.infer<typeof addProductInformationSchema>) {
    // TODO: Do something with the form values and navigate to a certain page.
    console.log(values);
    router.back();
  }

  const onError: SubmitErrorHandler<AddProductInformationSchema> = (
    errors,
    e,
  ) => {
    console.log(JSON.stringify(errors));
  };

  const handleAddCategory = (newCategory: string) => {
    // Update the categories array with the new category

    // TODO: Fix type mismatch error
    setCategories((prevCategories) => [...prevCategories, newCategory]);
    console.log("New Category Added:", newCategory);
  };

  return (
    <View className="mb-[15%] flex flex-col p-[6]">
      <View className="">
        <FormProvider {...form}>
          <View className="flex flex-col">
            <Label
              nativeID="product-link"
              className="mb-[10] text-xs font-medium text-lonestar-950"
            >
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
            <Label
              nativeID="product-link"
              className="mb-[10] text-xs font-medium text-lonestar-950"
            >
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
            <Label
              nativeID="product-link"
              className="mb-[10] text-xs font-medium text-lonestar-950"
            >
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
            <Label
              nativeID="product-link"
              className="mb-[5] text-xs font-medium text-lonestar-950"
            >
              Price
            </Label>
            <Text className="mb-[10] text-xs text-lonestar-700">
              As price fluctuates, we will automatically round up the price.
            </Text>
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

          <View className="flex w-full flex-col">
            <Label
              nativeID="product-link"
              className="mb-[5] text-xs font-medium text-lonestar-950"
            >
              Category
            </Label>
            <View className="flex flex-row">
              <Text className="mb-[10] text-xs text-lonestar-700">
                Want to add your own category? Click{" "}
              </Text>
              <AddCategory
                categories={categories}
                onAddCategory={handleAddCategory}
              />
            </View>

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
                      onChange(selectedValue?.label);
                      console.log(selectedValue?.label);
                    }}
                    className="mb-[10] w-full"
                  >
                    <SelectTrigger>
                      <SelectValue
                        className="native:text-lg !text-sm text-foreground"
                        placeholder="Select a category"
                      />
                    </SelectTrigger>
                    <SelectContent className="w-[250]">
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categories.map((category, index) => (
                          <SelectItem
                            key={index}
                            label={category}
                            value={category}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
            />
          </View>

          <View className="flex flex-col">
            <Label
              nativeID="product-link"
              className="mb-[5] text-xs font-medium text-lonestar-950"
            >
              Priority Level
            </Label>
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
                      onChange(selectedValue?.value);
                    }}
                    className="mb-[10]"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        className="native:text-lg !text-sm text-foreground"
                        placeholder="Select a priority"
                      />
                    </SelectTrigger>
                    <SelectContent className="w-[250px]">
                      <SelectGroup>
                        <SelectLabel>Priorities</SelectLabel>
                        <SelectItem label="High" value="high">
                          Apple
                        </SelectItem>
                        <SelectItem label="Medium" value="medium">
                          Banana
                        </SelectItem>
                        <SelectItem label="Low" value="low">
                          Blueberry
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                );
              }}
            />
          </View>

          <View className="flex flex-col">
            <Label
              nativeID="product-link"
              className="mb-[10] text-xs font-medium text-lonestar-950"
            >
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
                    placeholder="Enter your notes or remarks here."
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
            <Button
              onPress={form.handleSubmit(onSubmit, onError)}
              className="mb-[8]"
            >
              <Text className="!text-sm">Update Product Information</Text>
            </Button>

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <TouchableOpacity>
                  <Button
                    variant={"outline"}
                    className="bg-white"
                    onPress={() => {
                      setOpen(true);
                    }}
                  >
                    <Text
                      className="!text-sm text-lonestar-600"
                      fontVariant="Medium"
                    >
                      Delete item
                    </Text>
                  </Button>
                </TouchableOpacity>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader className="">
                  <Text
                    className="text-lg text-lonestar-600"
                    fontVariant="Bold"
                  >
                    Are you sure?
                  </Text>
                  <Text
                    className="text-xs text-lonestar-700"
                    fontVariant="Medium"
                  >
                    This item will be {""}
                    <Text className="text-xs text-lonestar-700 underline" fontVariant="Medium">
                      permanently deleted
                    </Text> if you proceed.
                  </Text>

               
                  
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button
                    variant={"outline"}
                    className="bg-white"
                    onPress={() => {
                      setOpen(false);
                      deleteItem();
                    }}
                  >
                    <Text className="!text-sm text-lonestar-600">
                      Delete item
                    </Text>
                  </Button>
                  <Button onPress={() => setOpen(false)}>
                    <Text className="text-[#ffffff] !text-sm">Oops, bring me back</Text>
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </View>
        </FormProvider>
      </View>
    </View>
  );
}