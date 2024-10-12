import { useState } from 'react';
import { View, ScrollView, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Star, ChevronRight, Shapes, History, Plus } from "@/lib/icons"
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

// Forms
// Forms
import z from 'zod';
import {
    Controller,
    FormProvider,
    SubmitErrorHandler,
    useForm,
  } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCategorySchema, AddCategorySchema } from '@/utils/forms/add-product-link';

export default function Tab() {

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([
    "Mobile & Accessories",
    "Gaming",
    "Healthy and Beauty",
    "Fashion",
    "Kitchen",
    "Home & Living",
    "Sports & Outdoor",
    "Automotive",
    "Others",
  ]);

  const form = useForm<AddCategorySchema>({
      resolver: zodResolver(addCategorySchema),
      defaultValues: {
        category: "",
      },
  });

  const handleAddCategory = (newCategory: string) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  function onSubmit(values: z.infer<typeof addCategorySchema>) {
    handleAddCategory(values.category);
    setOpen(false);
  }

  const onError: SubmitErrorHandler<AddCategorySchema> = (
    errors,
    e
  ) => {
    console.log(JSON.stringify(errors));
  };


  const priorities = [
    { label: "High Priority", Icon: Star },
    { label: "Mid Priority", Icon: Star },
    { label: "Low Priority / Wants", Icon: Star },
    { label: "Custom Priority", Icon: Star },
  ]


  return (
    <ScrollView className="flex flex-col w-full px-[30] py-[20]">
      <View className="rounded-[10] border border-[#f0f0f0] p-[15] mb-[10]">
        <View className="flex flex-row items-center mb-[20]">
          <Star size={16} className="text-lonestar-600 mr-[5]"/>
          <Text className="text-lonestar-600" fontVariant="SemiBold">Priorities</Text>
        </View>

        {/* Priorities */}
        <View className="flex flex-col">
        {priorities.map(({label}, index) => (
          <TouchableOpacity key={index} className="flex flex-row justify-between items-center mb-[20]"
            onPress={() => router.push(`/(shopping-list-menu)/${encodeURIComponent(label)}`)}
          >
            <Text className="text-lonestar-950 text-xs" fontVariant="Medium">
              {label}
            </Text>
            <ChevronRight size={16} className="text-lonestar-950"/>
          </TouchableOpacity>
        ))}
          
        </View>
      </View>

      {/* Categories */}
      <View className="rounded-[10] border border-[#f0f0f0] p-[15] mb-[10]">
        <View className="flex flex-row items-center justify-between mb-[20]">
          <View className="flex flex-row items-center">
            <Shapes size={16} className="text-lonestar-600 mr-[5]"/>
            <Text className="text-lonestar-600" fontVariant="SemiBold">Categories</Text>
          </View>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
            <TouchableOpacity className="flex flex-row items-center">
              <Plus size={12} className="text-lonestar-600"/>
              <Text className="text-xs text-lonestar-600">
                Add
              </Text>
            </TouchableOpacity>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white'>
              <AlertDialogHeader>
                <Text className='text-lonestar-600 text-lg' fontVariant='Bold'
                  onPress={() => {
                    setOpen(false);
                  }}
                >
                  Add a Category
                </Text>
                <Text className='text-lonestar-700 text-xs' fontVariant='Medium'>
                  By creating categories, you can label your products and adjust your priorities.
                </Text>
              </AlertDialogHeader>

              <FormProvider {...form}>
                <Controller
                  control={form.control}
                  name="category"
                  render={({field: { onChange, onBlur, value }, fieldState: { error }}) => {
                    return (
                      <Input
                        placeholder="Enter a good category name!"
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                      />
                    );
                  }}
                />
                <AlertDialogFooter>
                  <Button className='bg-white' variant={'outline'} onPress={() => {
                      setOpen(false);
                  }}>
                      <Text className='text-lonestar-600 text-sm'>Cancel</Text>
                  </Button>
                  <Button onPress={form.handleSubmit(onSubmit, onError)}>
                      <Text className='text-[#ffffff]'>Add Category</Text>
                  </Button>
                </AlertDialogFooter>

              </FormProvider>
              
              
            </AlertDialogContent>
          </AlertDialog>
        </View>
        
        <View className="flex flex-col">
            {categories.map((category, index) => (
              <TouchableOpacity key={index} className="flex flex-row justify-between items-center mb-[20]"
                onPress={() => router.push(`/(shopping-list-menu)/${encodeURIComponent(category)}`)}
              >
                <Text className="text-lonestar-950 text-xs" fontVariant="Medium">
                  { category }
                </Text>
                <ChevronRight size={16} className="text-lonestar-950"/>
              </TouchableOpacity>
            ))}     
        </View>
      </View>

      {/* History */}
      <View className="rounded-[10] border border-[#f0f0f0] p-[15] mb-[24]">
        <View className="flex flex-row items-center mb-[20]">
          <History size={16} className="text-lonestar-600 mr-[5]"/>
          <Text className="text-lonestar-600" fontVariant="SemiBold">History</Text>
        </View>
        <View className="flex flex-col">
          <View className="flex flex-row justify-between items-center mb-[20]">
            <Text className="text-lonestar-950 text-xs" fontVariant="Medium">
              Check out your recent finds
            </Text>
            <ChevronRight size={16} className="text-lonestar-950"/>
          </View>

          <TouchableOpacity className="flex flex-row justify-between items-center mb-[20]" 
            onPress={() => {
              router.push("/(shopping-list-menu)/purchased-items")
            }}
          >
            <Text 
                className="text-lonestar-950 text-xs" 
                fontVariant="Medium"
            >
              Marked as purchased
            </Text>
            <ChevronRight size={16} className="text-lonestar-950"/>
          </TouchableOpacity>


        </View>
      </View>
      
      
    </ScrollView>
  );
}


