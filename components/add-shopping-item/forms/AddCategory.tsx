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
  import { addCategorySchema, AddCategorySchema } from '@/utils/forms/add-product-link';

  interface Props {
    categories: string[];
    onAddCategory: (category: string) => void; // Function to add category
  }

function AddCategory({onAddCategory}: Props) {
    const [open, setOpen] = React.useState(false);

    const form = useForm<AddCategorySchema>({
        resolver: zodResolver(addCategorySchema),
        defaultValues: {
          category: "",
        },
    });

    function onSubmit(values: z.infer<typeof addCategorySchema>) {
        console.log(values)
        onAddCategory(values.category);
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
                <Text className="text-lonestar-700 text-xs mb-[10] underline">here</Text>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <Text className='text-lonestar-600 text-lg' fontVariant='Bold'>Add a Category</Text>
                <Text className='text-lonestar-700 text-xs' fontVariant='Medium'>By creating categories, you can label your products and adjust your priorities.</Text>
                </AlertDialogHeader>
                <FormProvider {...form}>
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
                            className="mb-[10]"
                            onChangeText={onChange}
                        />
                        
                        );
                    }}
                />

                </FormProvider>
                <AlertDialogFooter>
                <Button variant={'outline'} onPress={() => setOpen(false)}>
                    <Text className='text-lonestar-600 text-sm'>Cancel</Text>
                </Button>
                <Button onPress={form.handleSubmit(onSubmit, onError)}>
                    <Text className='text-[#ffffff]'>Add Category</Text>
                </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AddCategory;