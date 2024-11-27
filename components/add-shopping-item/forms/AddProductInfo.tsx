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

// Supabase
import { supabase } from "@/lib/supabase";

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
import { addCategory } from "@/utils/methods/add-category";
import { addShoppingItem } from "@/utils/methods/add-shopping-item";
import { set } from "date-fns";

interface Props {
  userId: string;
  categories: ItemCategoryRow[] | null;
  onChangeCategory: (newCategory: ItemCategoryRow) => void;
}

export default function AddProductInfo({
  userId,
  categories,
  onChangeCategory,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedCategoryLabel, setSelectedCategoryLabel] =
    useState<string>("");

  useEffect(() => {
    console.log("USER ID FROM ADDPRODUCTINFO COMPONENT: " + userId);
  }, []);

  const form = useForm<AddProductInformationSchema>({
    resolver: zodResolver(addProductInformationSchema),
    defaultValues: {
      productLink: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addProductInformationSchema>) {
    // TODO: Do something with the form values and navigate to a certain page.
    console.log(values);

    const res = await addShoppingItem(values, userId);

    if (res) {
      console.log("New Shopping Item Added:", res);
      router.push({
        pathname: "/(item-page)/shopping-item",
        params: {
          itemId: res.id,
          itemCategory: res.category_id,
          itemCategoryName: selectedCategoryLabel,
          isMarkedAsPurchased: res.is_purchased ? "true" : "false",
        },
      });
    } else {
      console.log("Error adding shopping item");
    }
  }

  const onError: SubmitErrorHandler<AddProductInformationSchema> = (
    errors,
    e,
  ) => {
    console.log(JSON.stringify(errors));
  };

  async function handleAddCategory(newCategory: string) {
    const res = await addCategory(newCategory, userId);

    if (res) {
      // Update the categories array with the new category
      onChangeCategory(res);
      console.log("New Category Added:", res);
    }
  }

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
                  <View className="mb-[20]">
                    <Input
                      placeholder="Enter your product name"
                      onBlur={onBlur}
                      value={value}
                      className="mb-1 bg-white border-[#e4e4e7] text-lonestar-600 placeholder:text-lonestar-300"
                      onChangeText={onChange}
                    />
                    {error && (
                      <Text className="text-xs text-red-500 ">
                        {error.message}
                      </Text>
                    )}
                  </View>
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
                  <View className="mb-[20]">
                    <Input
                      placeholder="https://example.com/product-id"
                      onBlur={onBlur}
                      value={value}
                      className="mb-1 bg-white border-[#e4e4e7] text-lonestar-600 placeholder:text-lonestar-300"
                      onChangeText={onChange}
                    />
                    {error && (
                      <Text className="text-xs text-red-500">
                        {error.message}
                      </Text>
                    )}
                  </View>
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
                  <View className="mb-[20]">
                    <Input
                      placeholder="eg. Shopee, Lazada, Temu, etc."
                      onBlur={onBlur}
                      value={value}
                      className="mb-1 bg-white border-[#e4e4e7] text-lonestar-600 placeholder:text-lonestar-300"
                      onChangeText={onChange}
                    />
                    {error && (
                      <Text className="text-xs text-red-500">
                        {error.message}
                      </Text>
                    )}
                  </View>
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
              The inputted price assumes the currency is in PHP.
            </Text>
            <Controller
              control={form.control}
              name="price"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => {
                return (
                  <View className="mb-[20]">
                    <Input
                      placeholder="Enter amount (e.g., 10, 100, 110, 120)"
                      onBlur={onBlur}
                      keyboardType="numeric"
                      className="mb-1 bg-white border-[#e4e4e7] text-lonestar-600 placeholder:text-lonestar-300"
                      onChangeText={(text) => {
                        const numericValue = parseFloat(text);
                        onChange(isNaN(numericValue) ? 0 : numericValue);
                      }}
                    />
                    {error && (
                      <Text className="text-xs text-red-500">
                        {error.message}
                      </Text>
                    )}
                  </View>
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
              <AddCategory onAddCategory={handleAddCategory} />
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
                      onChange(selectedValue?.value);
                      setSelectedCategoryLabel(selectedValue?.label || "");
                      console.log(selectedValue?.value);
                    }}
                    className="mb-[10] w-full "
                  >
                    <SelectTrigger className="bg-white border-[#e4e4e7]">
                      <SelectValue
                        className="text-sm text-lonestar-300"
                        placeholder="Select a category"
                      />
                    </SelectTrigger>
                    <SelectContent className="w-[250]">
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categories?.map((category, index) => (
                          <SelectItem
                            key={index}
                            label={category.category_name}
                            value={category.id}
                          >
                            {category.category_name}
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
                      onChange(selectedValue?.label);
                    }}
                    className="mb-[10]"
                  >
                    <SelectTrigger className="w-full bg-white border-[#e4e4e7]">
                      <SelectValue
                        className="text-sm text-lonestar-300"
                        placeholder="Select a priority"
                      />
                    </SelectTrigger>
                    <SelectContent className="w-[250px]">
                      <SelectGroup>
                        <SelectLabel>Priorities</SelectLabel>
                        <SelectItem label="High" value="High" />
                        <SelectItem label="Mid" value="Mid" />
                        <SelectItem label="Low" value="Low" />
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
                  <View className="mb-[20]">
                    <Textarea
                      placeholder="Enter your notes or remarks here."
                      onBlur={onBlur}
                      value={value}
                      className="mb-[20] !text-xs bg-white border-[#e4e4e7] text-lonestar-600 placeholder:text-lonestar-300"
                      onChangeText={onChange}
                    />
                    {error && (
                      <Text className="text-xs text-red-500">
                        {error.message}
                      </Text>
                    )}
                  </View>
                );
              }}
            />
          </View>

          <View className="flex flex-col">
            <Button
              onPress={form.handleSubmit(onSubmit, onError)}
              className="mb-[8]"
            >
              <Text>Submit</Text>
            </Button>

            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <TouchableOpacity>
                  <Button
                    onPress={() => {
                      setOpen(true);
                    }}
                    className={
                      "w-full border border-lonestar-600 bg-white text-lonestar-500"
                    }
                  >
                    <Text
                      className="text-sm text-lonestar-600"
                      fontVariant="Medium"
                    >
                      Back
                    </Text>
                  </Button>
                </TouchableOpacity>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
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
                    Your changes will be discarded if you proceed.
                  </Text>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <TouchableOpacity>
                    <Button
                      onPress={() => {
                        setOpen(false);
                        router.back();
                      }}
                      className={
                        "w-full border border-lonestar-600 bg-white text-lonestar-500"
                      }
                    >
                      <Text className="text-sm text-lonestar-600">
                        Discard changes
                      </Text>
                    </Button>
                  </TouchableOpacity>
                  
                  <Button onPress={() => setOpen(false)}>
                    <Text className="text-[#ffffff]">Oops, bring me back</Text>
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
