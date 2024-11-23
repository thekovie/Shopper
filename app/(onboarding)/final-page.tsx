import React from "react";
import { View, StatusBar, Platform, ScrollView, Alert } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Session } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const LastPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if(session){
        setUserId(session.user.id);
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if(session){
        setUserId(session.user.id);
      }
    })
  }, [])

  async function updateUserHasOnboarded() {
    const { error } = await supabase
      .from('profiles')
      .update({ has_onboarded: true })
      .eq('id', userId)

    if(error){
      Alert.alert("An error occurred in the onboarding process. Please try again later.");
    }else{
      router.replace({
        pathname: "/(tabs)/",
      });
    }
    
  }


  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        justifyContent: "space-between",
      }}
      className={""}
    >
      <View style={{ height: "50%" }} className={"bg-black"}></View>
      <ScrollView className={"mt-10 h-full bg-white px-8"}>
        <Text className={"text-2xl text-lonestar-600"} fontVariant={"Bold"}>
          And, that's it!
        </Text>
        <Text className={"mt-4 text-base text-lonestar-700"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
        <View className={"mt-10 flex-row justify-end"}>
          <Button
            onPress={() => {
              if(router.canGoBack()) {
                router.back();
              }
            }}
            className={"mb-10 mr-2 bg-white border border-lonestar-600"}
          >
            <Text className={"text-lonestar-600"}>Previous</Text>
          </Button>
          <Button
            onPress={updateUserHasOnboarded}
            className={"mb-10 text-lonestar-500"}
          >
            <Text>Let's go haul! ✨</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default LastPage;
