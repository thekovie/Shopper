import { Alert, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoadingContext } from "@/components/Providers/LoaderSpinnerContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Session } from "@supabase/supabase-js";
import {
  signInAccountSchema,
  SignInAccountSchema,
} from "@/utils/forms/user-credentials";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";

export default function Index() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      // If a session exists, check if the user exists
      if (session) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          router.replace({
            pathname: "/(tabs)/",
          });
        }
      }

      setLoading(false);
    };

    initializeSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // if(session){
      //   router.push({
      //     pathname: "/(tabs)/"
      //   })
      // }
    });
    setLoading(false);
  }, []);

  const form = useForm<SignInAccountSchema>({
    resolver: zodResolver(signInAccountSchema),
    mode: "onChange", // Validate while typing
    reValidateMode: "onBlur", // Re-validate when field loses focus
  });

  async function onSubmit(values: z.infer<typeof signInAccountSchema>) {
    const { data: userData, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      Alert.alert(error.message);
      console.log(error.message);
    } else {
      if (userData.session) {
        // Alert.alert("Successfully logged in! " + userData.user.id);
        const { data: userProfile, error } = await supabase
          .from("profiles")
          .select("has_onboarded")
          .eq("id", userData.user.id)
          .single();

        if (error) {
          console.error("Error fetching onboarding status:", error.message);
        } else {
          console.log("Data: " + userProfile.has_onboarded);
          form.reset();
          if (userProfile.has_onboarded) {
            router.push({
              pathname: "/(tabs)/",
            });
          } else {
            router.push({
              pathname: "/(onboarding)/",
            });
          }
        }
      }
    }
  }

  const onError: SubmitErrorHandler<SignInAccountSchema> = (errors, e) => {
    console.log(JSON.stringify(errors));
  };

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
        <Text
          className={
            "mt-[10] w-full text-left text-xs font-medium text-lonestar-950"
          }
        >
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
                  className={
                    "mb-2 w-full border-[#e4e4e7] bg-white text-lonestar-600 placeholder:text-lonestar-300"
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {error && (
                  <Text className="text-xs text-red-500">{error.message}</Text>
                )}
              </View>
            );
          }}
        />

        <Text
          className={
            "mt-[10] w-full text-left text-xs font-medium text-lonestar-950"
          }
        >
          Password
        </Text>
        <Controller
          control={form.control}
          name="password"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => {
            return (
              <View>
                <Input
                  placeholder={"Password"}
                  secureTextEntry={true}
                  className={
                    "mb-2 w-full border-[#e4e4e7] bg-white text-lonestar-600 placeholder:text-lonestar-300"
                  }
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                {error && (
                  <Text className="text-xs text-red-500">{error.message}</Text>
                )}
              </View>
            );
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
            router.push({
              pathname: "/register",
            });
          }}
          className={
            "w-full border border-lonestar-600 bg-white text-lonestar-500"
          }
        >
          <Text className={"text-lonestar-600"}>Create an account</Text>
        </Button>
      </View>
    </View>
  );
}
