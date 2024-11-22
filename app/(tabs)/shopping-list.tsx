import { useEffect, useState } from 'react';
import { View, ScrollView } from "react-native";
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
import z from 'zod';
import {
    Controller,
    FormProvider,
    SubmitErrorHandler,
    useForm,
  } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCategorySchema, AddCategorySchema } from '@/utils/forms/add-product-link';

// Supabase
import { supabase } from '@/lib/supabase';
import { fetchSession } from '@/utils/methods/fetch-session';
import { fetchCategories } from '@/utils/methods/fetch-categories';
import AddCategory from '@/components/add-shopping-item/forms/AddCategory';
import { addCategory } from '@/utils/methods/add-category';
import { ItemCategoryRow } from '@/constants/types';


export default function Tab() {

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [categories, setCategories] = useState<ItemCategoryRow[] | null>(null);

  useEffect(() => {
    fetchSession().then(async (session) => {
      if(!session){
        console.log("NO SESSION");
      }else{
        setUserId(session.user.id);
        const categoriesData = await fetchCategories(session.user.id);
        
        if(categoriesData){
          setCategories(categoriesData);
        }else{
          console.log("No categories found");
        }
      }


    })
  }, [refreshTrigger]);





  const form = useForm<AddCategorySchema>({
      resolver: zodResolver(addCategorySchema),
      defaultValues: {
        category: "",
      },
  });

  const handleAddCategory = async (newCategory: string) => {
    
    
    const res = await addCategory(newCategory, userId);
    if(res){
      console.log("Category added successfully");
      setCategories((prevCategories) => [...(prevCategories || []), res]);
    }else{
      console.log("Error adding category");
    }

    
  };

  function onSubmit(values: z.infer<typeof addCategorySchema>) {
    //handleAddCategory(values.category);
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
          <AddCategory
            onAddCategory={handleAddCategory} 
            triggerContent={
              <TouchableOpacity className="flex flex-row items-center">
                <Plus size={12} className="text-lonestar-600"/>
                <Text className="text-xs text-lonestar-600">
                  Add
                </Text>
              </TouchableOpacity>
            }
        
          />

        </View>
        
        <View className="flex flex-col">
            {categories?.map((category, index) => (
              <TouchableOpacity key={index} className="flex flex-row justify-between items-center mb-[20]"
                onPress={() => 
                  router.push(
                    `/(shopping-list-menu)?category_name=${encodeURIComponent(
                      category.category_name
                    )}&category_id=${encodeURIComponent(category.id)}`
                )}
              >
                <Text className="text-lonestar-950 text-xs" fontVariant="Medium">
                  { category.category_name }
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
          <TouchableOpacity className="flex flex-row justify-between items-center mb-[20]"
            onPress={() => {
              router.push("/(shopping-list-menu)/recent-finds")
            }}
          >
            <Text className="text-lonestar-950 text-xs" fontVariant="Medium">
              Check out your recent finds
            </Text>
            <ChevronRight size={16} className="text-lonestar-950"/>
          </TouchableOpacity>

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


