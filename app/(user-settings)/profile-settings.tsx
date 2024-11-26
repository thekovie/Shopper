import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import {
  View,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { Text } from "@/components/ui/text";
import CancelChangesPage from "@/components/add-shopping-item/CancelChanges";
import { ArrowLeft } from "@/lib/icons";

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
  modifyProfileSettingsSchema,
} from "@/utils/forms/user-credentials";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useFocusEffect } from "expo-router";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AddCategory from "@/components/add-shopping-item/forms/AddCategory";
import { fetchSession } from "@/utils/methods/fetch-session";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

function ProfileSettings() {
  const [isDiscardChangesDialogOpen, setDiscardChangesDialogOpen] =
    useState(false);
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchSession()
        .then(async (session) => {
          if (!session) {
            console.log("NO SESSION");
          } else {
            console.log("SESSION FOUND", session);
            setSession(session);
            form.reset({
              displayName: session.user.user_metadata.display_name || "",
              email: session.user.email || "",
              password: "",
              confirmPassword: "",
            });
          }
        })
        .finally(() => setIsLoading(false));
    }, []),
  );

  const form = useForm<ModifyProfileSettingsSchema>({
    resolver: zodResolver(modifyProfileSettingsSchema),
    defaultValues: {
      displayName: session?.user.user_metadata.display_name,
      email: session?.user.email,
      password: "",
      confirmPassword: "",
    },
  });

  const { reset, watch, trigger, setValue, control } = form;

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  async function onSubmit(values: z.infer<typeof modifyProfileSettingsSchema>) {
    // TODO: Do something with the form values and navigate to a certain page.

    console.log(values);
    if (
      values.displayName &&
      values.displayName !== session?.user.user_metadata.display_name
    ) {
      const { data, error } = await supabase.auth.updateUser({
        data: { display_name: values.displayName },
      });

      if (error) {
        console.error("Error updating display name:", error.message);
      } else {
        console.log("Display name updated:", data);
      }
    }

    if (values.email && values.email !== session?.user.email) {
      const { data, error } = await supabase.auth.updateUser({
        email: values.email,
      });

      if (error) {
        console.error("Error updating email:", error.message);
      } else {
        console.log("Email updated:", data);
      }
    }

    if (password && password === values.confirmPassword) {
      const { data, error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        console.error("Error updating password:", error.message);
      } else {
        console.log("Password updated:", data);
      }
    } else {
      console.log("Passwords do not match");
    }

    setConfirmDialogOpen(false);
    router.back();
  }

  const onError: SubmitErrorHandler<ModifyProfileSettingsSchema> = (
    errors,
    e,
  ) => {
    Alert.alert(JSON.stringify(errors));
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

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-lonestar-950">Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView
      className="flex flex-col p-[20]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
      }}
    >
      <View className="mb-[4] flex flex-row items-center">
        <CancelChangesPage
          toggleDialog={setDiscardChangesDialogOpen}
          isDialogOpen={isDiscardChangesDialogOpen}
          trigger={
            <TouchableOpacity>
              <ArrowLeft className="mr-[10] text-lonestar-400" size={24} />
            </TouchableOpacity>
          }
        />

        <Text className="text-xl text-lonestar-500" fontVariant="Bold">
          Your Profile
        </Text>
      </View>

      <Text className="my-[10] text-sm text-lonestar-700" fontVariant="Regular">
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
                  className="mb-[8] border-[#e4e4e7] bg-white !text-lonestar-600"
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
                  className="mb-[8] border-[#e4e4e7] bg-white !text-lonestar-600"
                  onChangeText={onChange}
                />
              );
            }}
          />
        </View>

        <View className="flex flex-col">
          <View className="mb-5 mt-10 flex flex-col">
            <Text className="mb-1 text-lg text-lonestar-500" fontVariant="Bold">
              Update Password
            </Text>
            <Text className="text-sm text-lonestar-800" fontVariant="Regular">
              Update your password if you want to.
            </Text>
          </View>

          <Label
            nativeID="product-link"
            className="mb-[8] text-xs font-medium text-lonestar-950"
          >
            New Password
          </Label>
          <Controller
            control={form.control}
            name="password"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => {
              return (
                <View className="mb-[20]">
                  <Input
                    placeholder="Enter your password"
                    onBlur={onBlur}
                    value={value}
                    className="mb-[8] border-[#e4e4e7] bg-white !text-lonestar-600"
                    onChangeText={(password) => {
                      onChange(password);
                      setValue("password", password); // Set the password field value
                    }}
                    secureTextEntry={true}
                  />
                  {error && (
                    <Text className="text-xs text-lonestar-500">
                      {error.message}
                    </Text>
                  )}
                </View>
              );
            }}
          />
        </View>

        <View className="mb-[35] flex flex-col">
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
                  className="border-[#e4e4e7] bg-white !text-lonestar-600"
                  onChangeText={onChange}
                  secureTextEntry={true}
                />
              );
            }}
          />
          {password && password !== confirmPassword && (
            <Text className="mt-[4] text-xs text-lonestar-500">
              Passwords do not match!
            </Text>
          )}
        </View>

        <AlertDialog
          open={isConfirmDialogOpen}
          onOpenChange={setConfirmDialogOpen}
        >
          <AlertDialogTrigger asChild>
            <TouchableOpacity>
              <Button
                className="mb-[8] bg-lonestar-500"
                onPress={() => {
                  if (!(password && password !== confirmPassword)) {
                    setConfirmDialogOpen(true);
                  }
                }}
              >
                <Text className="text-sm text-white" fontVariant="Medium">
                  Update
                </Text>
              </Button>
            </TouchableOpacity>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <Text className="text-lg text-lonestar-600" fontVariant="Bold">
                Are you sure?
              </Text>
              <Text className="text-xs text-lonestar-700" fontVariant="Medium">
                Your information will be updated once you proceed.
              </Text>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant={"outline"}
                className="bg-white"
                onPress={() => {
                  setConfirmDialogOpen(false);
                }}
              >
                <Text className="!text-sm text-lonestar-600">
                  Bring me back
                </Text>
              </Button>
              <Button onPress={form.handleSubmit(onSubmit, onError)}>
                <Text className="!text-sm text-[#ffffff]">
                  Proceed, update information
                </Text>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          variant={"outline"}
          className="bg-white"
          onPress={() => {
            reset();
          }}
        >
          <Text className="!text-sm text-lonestar-600" fontVariant="Medium">
            Reset
          </Text>
        </Button>
      </FormProvider>
    </ScrollView>
  );
}

export default ProfileSettings;
