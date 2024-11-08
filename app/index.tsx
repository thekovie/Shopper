import { Alert, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoadingContext } from "@/components/Providers/LoaderSpinnerContext";
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Session } from '@supabase/supabase-js'
import { signInAccountSchema, SignInAccountSchema } from "@/utils/forms/user-credentials";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  useForm,
} from 'react-hook-form';
import { set } from "date-fns";

export default function Index() {
  const { setLoading, setText } = useLoadingContext();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if(session){
        router.push({
          pathname: "/(tabs)/"
        })
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if(session){
        router.push({
          pathname: "/(tabs)/"
        })
      }
    })
    setLoading(false);
  }, [])



  const form = useForm<SignInAccountSchema>({
    resolver: zodResolver(signInAccountSchema),
    mode: "onChange", // Validate while typing
    reValidateMode: "onBlur", // Re-validate when field loses focus
  });

  async function onSubmit(values: z.infer<typeof signInAccountSchema>) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if(error){
      Alert.alert(error.message);
      console.log(error.message);
    }else{
      Alert.alert("Successfully logged in!");
      router.push({
        pathname: "/(tabs)/",
      });
    }
  }

  const onError: SubmitErrorHandler<SignInAccountSchema> = (
    errors,
    e
  ) => {
    console.log(JSON.stringify(errors));
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setSession(session);
      if(session){
        router.push({
          pathname: "/(tabs)/"
        })
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if(session){
        router.push({
          pathname: "/(tabs)/"
        })
      }
      
    })
  }, [])


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
      className={"px-10"}
    >
      <Text
        fontVariant={"Bold"}
        className={"mb-2 text-center text-4xl text-lonestar-500"}
      >
        Shopper!
      </Text>
      <Text
        className={"text-md mb-2 text-center font-medium text-lonestar-500"}
      >
        Want something? List them down now!
      </Text>
      <FormProvider {...form}>
        <Text className={"mt-[10] w-full text-left text-lonestar-950 text-xs font-medium"}>
         Email
        </Text>
        <Controller
          control={form.control}
          name="email"
          render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
          }) => {
              return (
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
              
              
              );
          }}
        /> 

        <Text className={"mt-[10] w-full text-left text-lonestar-950 text-xs font-medium"}>
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

      <Button
        onPress={form.handleSubmit(onSubmit, onError)}
        className={"my-[35] w-full text-lonestar-500"}
      >
        <Text>Log in to your account</Text>
      </Button>

      </FormProvider>

     

      <View className={"flex-col"}>
        <Text
          className={"text-md mb-2 text-left font-medium text-lonestar-500"}
        >
          Don't have an account? Make one now!
        </Text>
        <Button
          onPress={() => {
            router.replace({
              pathname: "/register",
            });
          }}
          className={"w-full text-lonestar-500 bg-white border border-lonestar-600"}
        >
          <Text className={"text-lonestar-600"}>Create an account</Text>
        </Button>
      </View>
    </View>
  );
}
