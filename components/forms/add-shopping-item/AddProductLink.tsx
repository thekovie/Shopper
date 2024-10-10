import React from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import {
    TextInput as RNTextInput,
    StyleSheet,
    Text,
    TextInputProps,
    View,
    TextInput
} from 'react-native';
import {
    Controller,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
  } from 'react-hook-form';
import {
    AddProductLinkSchema,
    addProductLinkSchema,
} from '@/utils/forms/add-product-link';



function AddProductLink(props: any) {

    const form = useForm<AddProductLinkSchema>({
        resolver: zodResolver(addProductLinkSchema),
        defaultValues: {
          name: "John Doe",
        },
    });

    function onSubmit(values: z.infer<typeof addProductLinkSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

      const onError: SubmitErrorHandler<AddProductLinkSchema> = (
        errors,
        e
      ) => {
        console.log(JSON.stringify(errors));
      };



    return (
        <View>
            <Text>Sign Up Form</Text>
            <View>
                <FormProvider {...form}>
                    <Controller
                    control={form.control}
                    name="name"
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => {
                        return (
                        <Input
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                        />
                        
                        );
                    }}
                    />

                    <Button onPress={form.handleSubmit(onSubmit, onError)}>
                        <Text>Submit</Text>
                    </Button>
                        
                </FormProvider>
                </View>

 
        </View>
    );
}

export default AddProductLink;