import React from 'react';
import { useState, useEffect } from "react";
import { View, Platform, ScrollView, StatusBar, TouchableOpacity, BackHandler } from 'react-native';
import { Text } from '@/components/ui/text';
import CancelChangesPage from '@/components/add-shopping-item/CancelChanges';
import { ArrowLeft } from '@/lib/icons';

// Forms
import { Label } from "@/components/ui/label";
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import {
    ModifyProfileSettingsSchema,
    modifyProfileSettingsSchema
} from "@/utils/forms/user-credentials";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AddCategory from "@/components/add-shopping-item/forms/AddCategory";




function ProfileSettings() {
    const [isDiscardChangesDialogOpen, setDiscardChangesDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);

    const form = useForm<ModifyProfileSettingsSchema>({
        resolver: zodResolver(modifyProfileSettingsSchema),
        defaultValues: {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    });

    const { reset, watch, trigger, setValue, control } = form;

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    function onSubmit(values: z.infer<typeof modifyProfileSettingsSchema>) {
    // TODO: Do something with the form values and navigate to a certain page.

        
        console.log(values);
        if(password === values.confirmPassword){
            if(router.canGoBack()){
                console.log("Submitted.")
                setConfirmDialogOpen(false);
                router.back();
            }
        }else{
            console.log("Passwords do not match");
        }
        
        
    }

    const onError: SubmitErrorHandler<ModifyProfileSettingsSchema> = (
        errors,
        e,
    ) => {
        console.log(JSON.stringify(errors));
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          () => {
            setDiscardChangesDialogOpen(true); // Open the dialog when back button is pressed
            return true; // Prevent default back navigation
          },
        );
    
        // Cleanup the event listener when component unmounts
        return () => backHandler.remove();
      }, []);

    return (
        <ScrollView className="flex flex-col p-[20]"
                style={{
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                flex: 1
            }}
        >
            <View className="flex flex-row mb-[4] items-center">
                <CancelChangesPage
                    toggleDialog={setDiscardChangesDialogOpen}
                    isDialogOpen={isDiscardChangesDialogOpen}
                    trigger={
                        <TouchableOpacity>
                            <ArrowLeft className="text-lonestar-400 mr-[10]" size={24}/>
                        </TouchableOpacity>
                    }
                />

                <Text 
                    className=" text-lonestar-500 text-xl"
                    fontVariant="Bold"
                >
                    Your Profile
                </Text> 
            </View>

            <Text className='text-sm text-lonestar-700 my-[10]' fontVariant='Regular'>
                Here is your user information. You may update them if you want.
            </Text>

            <FormProvider {...form}>
                <View className="flex flex-col">
                    <Label
                    nativeID="product-link"
                    className="mb-[8] text-xs font-medium text-lonestar-950"
                    >
                        Display Name
                    </Label>
                    <Controller
                    control={form.control}
                    name="displayName"
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => {
                        return (
                        <Input
                            placeholder="John Doe"
                            onBlur={onBlur}
                            value={value}
                            className="mb-[8] bg-white border-[#e4e4e7] !text-lonestar-600"
                            onChangeText={onChange}
                        />
                        );
                    }}
                    />
                </View>

                <View className="flex flex-col">
                    <Label
                    nativeID="product-link"
                    className="mb-[8] text-xs font-medium text-lonestar-950"
                    >
                        Email
                    </Label>
                    <Controller
                    control={form.control}
                    name="email"
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => {
                        return (
                        <Input
                            placeholder="yourname@example.com"
                            onBlur={onBlur}
                            value={value}
                            className="mb-[8] bg-white border-[#e4e4e7] !text-lonestar-600"
                            onChangeText={onChange}
                        />
                        );
                    }}
                    />
                </View>

                <View className="flex flex-col">
                    <Label
                    nativeID="product-link"
                    className="mb-[8] text-xs font-medium text-lonestar-950"
                    >
                     Password
                    </Label>
                    <Controller
                    control={form.control}
                    name="password"
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => {
                        return (
                        <Input
                            placeholder="Enter your password"
                            onBlur={onBlur}
                            value={value}
                            className="mb-[8] bg-white border-[#e4e4e7] !text-lonestar-600"
                            onChangeText={(password) => {
                                onChange(password);
                                setValue("password", password); // Set the password field value
                            }}
                            secureTextEntry={true}
                        />
                        );
                    }}
                    />
                </View>

                <View className="flex flex-col mb-[35]">
                    <Label
                    nativeID="product-link"
                    className="mb-[8] text-xs font-medium text-lonestar-950"
                    >
                        Confirm Password
                    </Label>
                    <Controller
                    control={form.control}
                    name="confirmPassword"
                    render={({
                        field: { onChange, onBlur, value },
                        fieldState: { error },
                    }) => {
                        return (
                            <Input
                                placeholder="Re-enter your password"
                                onBlur={onBlur}
                                value={value}
                                className="bg-white border-[#e4e4e7] !text-lonestar-600"
                                onChangeText={onChange}
                                secureTextEntry={true}
                            /> 
                        );
                    }}
                    />
                    {password !== confirmPassword && confirmPassword.length > 0 && 
                        <Text className="text-lonestar-500 text-xs mt-[4]">
                            Passwords do not match!
                        </Text>
                    }
                </View>

                <AlertDialog open={isConfirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                    <AlertDialogTrigger asChild>
                        <TouchableOpacity>
                        <Button
                            className='bg-lonestar-500 mb-[8]'
                            onPress={() => {
                                setConfirmDialogOpen(true);
                            }}
                        >
                            <Text
                            className="text-sm text-white"
                            fontVariant="Medium"
                            >
                                Update
                            </Text>
                        </Button>
                        </TouchableOpacity>
                    </AlertDialogTrigger>
                    <AlertDialogContent className='bg-white'>
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
                            Your information will be updated once you proceed.
                        </Text>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <Button
                            variant={"outline"}
                            className='bg-white'
                            onPress={() => {
                            setConfirmDialogOpen(false);
                            }}
                        >
                            <Text className="!text-sm text-lonestar-600">
                                Bring me back
                            </Text>
                        </Button>
                        <Button onPress={form.handleSubmit(onSubmit, onError)}>
                            <Text className="text-[#ffffff] !text-sm">Proceed, update information</Text>
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <Button variant={'outline'} className='bg-white' onPress={() => {
                    reset();
                }}>
                    <Text className="text-lonestar-600 !text-sm" fontVariant="Medium">Reset</Text>
                </Button>

          



          

          
        </FormProvider>


        </ScrollView>
    
    );
}

export default ProfileSettings;