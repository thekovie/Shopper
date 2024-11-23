import { View, StatusBar, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Platform, Alert } from "react-native";
import { Input } from "@/components/ui/input";
import { useLoadingContext } from "@/components/Providers/LoaderSpinnerContext";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  useForm,
} from 'react-hook-form';
import { createAccountSchema, CreateAccountSchema } from "@/utils/forms/user-credentials";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


export default function Index() {


  const form = useForm<CreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
    mode: "onChange", // Validate while typing
    reValidateMode: "onBlur", // Re-validate when field loses focus
  });

  const { reset } = form;

  const { setLoading, setText } = useLoadingContext();

  async function onSubmit(values: z.infer<typeof createAccountSchema>) {


    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          display_name: values.displayName,
        }
      }
    })

    if (error){
      console.log(error.message)
      Alert.alert(error.message)
    }else{
      Alert.alert("Successfully created your account!");
      router.push({
        pathname: "/(onboarding)/",
      });
    }

    
  }

  const onError: SubmitErrorHandler<CreateAccountSchema> = (
    errors,
    e
  ) => {
    console.log(JSON.stringify(errors));
  };


  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        justifyContent: "center",  
      }}
    >
    <ScrollView
      style={{
           
      }}
      className={"px-10 mt-[20]"}
    >
      <Text
        fontVariant={"Bold"}
        className={"mb-2 text-center text-4xl text-lonestar-500 w-full"}
      >
        Create an account
      </Text>
      <Text
        className={"text-md mb-2 text-center font-medium text-lonestar-500"}
      >
        We're almost there!
      </Text>

      <FormProvider {...form}>
        <Text nativeID={"name"} className={"mt-[10] w-full text-left text-lonestar-950 text-xs font-medium"}>
          Display Name
        </Text>
        <Controller
              control={form.control}
              name="displayName"
              render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
              }) => {
                  return (
                    <View>
                      <Input
                        placeholder={"Display Name"}
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                        className={"mb-2 w-full bg-white text-lonestar-600 placeholder:text-lonestar-300 border-[#e4e4e7]"}
                      />
                      {error && <Text className="text-red-500 text-xs">{error.message}</Text>}
                    </View>
                 
                  
                  );
              }}
        /> 
        <Text nativeID={"email"} className={"mt-[10] w-full text-left text-lonestar-950 text-xs font-medium"}>
          Email
        </Text>
        <Controller
              control={form.control}
              name="email"
              render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
              }) => {
                return(
                  <View>
                     <Input
                      placeholder={"yourname@example.com"}
                      className={"mb-2 w-full bg-white text-lonestar-600 placeholder:text-lonestar-300 border-[#e4e4e7]"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    {error && <Text className="text-red-500 text-xs">{error.message}</Text>}
                  </View>
                 
                )
              }}
        />
        <Text nativeID={"password"} className={"mt-[10] w-full text-left text-lonestar-950 text-xs font-medium"}>
          Password
        </Text>
        <Controller
              control={form.control}
              name="password"
              render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
              }) => {
                return(
                  <View>
                    <Input
                        placeholder={"Password"}
                        secureTextEntry={true}
                        className={"mb-2 w-full bg-white text-lonestar-600 placeholder:text-lonestar-300 border-[#e4e4e7]"}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                    {error && <Text className="text-red-500 text-xs">{error.message}</Text>}
                  </View>
                  
                )
              }}
        />

        <Text nativeID={"confirm-password"} className={"mt-[10] w-full text-left text-lonestar-950 text-xs font-medium"}>
          Confirm Password
        </Text>
        <Controller
              control={form.control}
              name="confirmPassword"
              render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
              }) => {
                return(
                  <View>
                    <Input
                        placeholder={"Confirm Password"}
                        secureTextEntry={true}
                        className={"mb-2 w-full bg-white text-lonestar-600 placeholder:text-lonestar-300 border-[#e4e4e7]"}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                    {error && <Text className="text-red-500 text-xs">{error.message}</Text>}
                  </View>
                  
                )
              }}
        />

        <Button
          onPress={form.handleSubmit(onSubmit, onError)}
          className={"mb-2 w-full text-lonestar-500 mt-[30]"}
        >
          <Text>Sign-up now!</Text>
        </Button>
        <Button
          onPress={() => {
            reset();
          }}
          className={"mb-10 w-full text-lonestar-500 bg-white border border-lonestar-500"}
        >
          <Text className="text-lonestar-600">Reset</Text>
        </Button>
      </FormProvider>


      <View className={"flex-col"}>
        <Text
          className={"text-md mb-2 text-left font-medium text-lonestar-500"}
        >
          You already have an account?
        </Text>
        <Button
          onPress={() => {
            if(router.canGoBack()){
              router.back();
            }else{
              router.replace({
                pathname: "/",
              });
            }
          }}
          className={"w-full text-lonestar-500 bg-white h-fit border border-lonestar-500"}
        >
          <Text className="text-lonestar-600">Sign-in instead</Text>
        </Button>
      </View>

      <View
        className={"flex-row items-center justify-center"}
        style={{ marginTop: 50 }}
      >
        <Text
          className={"mb-2 text-left text-sm text-lonestar-500"}
          fontVariant={"Bold"}
        >
          Shopper
        </Text>
        <Text
          className={"mb-2 text-left text-sm text-lonestar-500"}
          fontVariant={"Regular"}
        >
          , let's go haul!
        </Text>
      </View>
    </ScrollView>
    </View>
    
  );
}
