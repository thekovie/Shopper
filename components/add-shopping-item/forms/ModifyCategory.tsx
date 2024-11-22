import React from 'react';
// Forms
import z from 'zod';
import {
    Controller,
    FormProvider,
    SubmitErrorHandler,
    useForm,
  } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/components/ui/alert-dialog';
  import { Input } from '@/components/ui/input';
  import { Button } from '@/components/ui/button';
  import { Text } from '@/components/ui/text';
  import { addCategorySchema, AddCategorySchema, modifyCategorySchema, ModifyCategorySchema } from '@/utils/forms/add-product-link';
    import { ItemCategoryRow } from '@/constants/types';
import { Label } from '@rn-primitives/select';
import { modifyCategory } from '@/utils/methods/modify-category-name';
import { router } from 'expo-router';
import { deleteCategory } from '@/utils/methods/delete-category';
import { View, TouchableOpacity } from 'react-native';
import { X } from '@/lib/icons'

  interface Props {
    category: string;
    categoryId: string;
    triggerContent?: React.ReactNode; // Add a prop for dynamic trigger content
    }

function ModifyCategory({category, categoryId, triggerContent}: Props) {
    const [open, setOpen] = React.useState(false);

    const form = useForm<ModifyCategorySchema>({
        resolver: zodResolver(modifyCategorySchema),
        defaultValues: {
          category: category,
        },
    });



    async function onSubmit(values: z.infer<typeof addCategorySchema>) {
        console.log(values)
        //onAddCategory(values.category);

        const res = await modifyCategory(values.category, categoryId);

        if(res){
            console.log("Modify category success");
            if(router.canGoBack()){
                router.replace('/(tabs)/shopping-list'); 
            }
        }
        setOpen(false);
    }

    const onError: SubmitErrorHandler<AddCategorySchema> = (
      errors,
      e
    ) => {
      console.log(JSON.stringify(errors));
    };



    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {triggerContent || (
                    <Text className="text-lonestar-700 text-xs mb-[10] underline">here</Text>
                )}
                
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white'>
                <AlertDialogHeader className='flex flex-row'>
                    <View>
                        <View className='flex flex-row items-center justify-between'>
                            <Text className='text-lonestar-600 text-lg' fontVariant='Bold'>Modify Category</Text>
                            <TouchableOpacity onPress={() => {
                                setOpen(false);
                            }}>
                                <View className="flex flex-row-reverse items-center">
                                    <X className="text-lonestar-400" size={20} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                        <Text className='text-lonestar-700 text-xs' fontVariant='Medium'>You can modify your category name or delete the category. Deleting a category won't delete the items associated with it.</Text>
                    </View>

                   
              

                </AlertDialogHeader>
                <FormProvider {...form}>
                <Label className={"w-full text-left text-lonestar-950"}>
                    Category Name
                </Label>
                <Controller
                    control={form.control}
                    name="category"
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => {
                        return (
                        <Input
                            placeholder="Enter a category name!"
                            onBlur={onBlur}
                            value={value}
                            className="mb-[10 bg-white border-[#e4e4e7] !text-lonestar-600"
                            onChangeText={onChange}
                        />
                        
                        );
                    }}
                />

                </FormProvider>
                <AlertDialogFooter>
                <Button className='bg-white' variant={'outline'} onPress={async () => {
                    const res = await deleteCategory(categoryId);

                    if(res){
                        if(router.canGoBack()){
                            router.replace('/(tabs)/shopping-list'); 
                        }
                    }

                    setOpen(false);
                }}>
                    <Text className='text-lonestar-600 text-sm '>Delete Category</Text>
                </Button>
                <Button onPress={form.handleSubmit(onSubmit, onError)}>
                    <Text className='text-[#ffffff]'>Update Information</Text>
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ModifyCategory;