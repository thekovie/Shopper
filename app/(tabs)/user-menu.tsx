import { View, TouchableOpacity, Alert } from "react-native";
import { Text } from "@/components/ui/text";
import { ChevronRight, User2, HelpCircle, Bell, Smartphone } from "@/lib/icons";
import { router } from "expo-router";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function Tab() {
  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error.message);
      Alert.alert(error.message);
    } else {
      Alert.alert("Successfully logged out!");
      if (router.canDismiss()) {
        router.dismissAll();
      } else {
        router.replace({
          pathname: "/register",
        });
      }
    }
  }

  return (
    <View className="flex w-full flex-1 flex-col justify-between px-[30] py-[20]">
      <View>
        <Text
          className="mb-[10] text-xs text-lonestar-500"
          fontVariant="SemiBold"
        >
          User Menu
        </Text>
        <View className="mb-[30] rounded-[10] border border-[#f0f0f0] p-[15]">
          <TouchableOpacity
            className="mb-[20] flex flex-row items-center justify-between"
            onPress={() => router.push("/(user-settings)/profile-settings")}
          >
            <View className="flex flex-row">
              <User2 size={16} className="mr-[10] text-lonestar-950" />
              <Text className="text-xs text-lonestar-950" fontVariant="Medium">
                Profile
              </Text>
            </View>
            <ChevronRight size={16} className="text-lonestar-950" />
          </TouchableOpacity>

          <TouchableOpacity
            className="mb-[20] flex flex-row items-center justify-between"
            onPress={() => router.push("/(onboarding)/")}
          >
            <View className="flex flex-row">
              <HelpCircle size={16} className="mr-[10] text-lonestar-950" />
              <Text className="text-xs text-lonestar-950" fontVariant="Medium">
                Quick Guide
              </Text>
            </View>
            <ChevronRight size={16} className="text-lonestar-950" />
          </TouchableOpacity>

          <TouchableOpacity
            className="mb-[20] flex flex-row items-center justify-between"
            onPress={() => router.push("/(user-settings)/push-notifications")}
          >
            <View className="flex flex-row">
              <Bell size={16} className="mr-[10] text-lonestar-950" />
              <Text className="text-xs text-lonestar-950" fontVariant="Medium">
                Push Notifications
              </Text>
            </View>
            <ChevronRight size={16} className="text-lonestar-950" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-row items-center justify-between"
            onPress={() => router.push("/(user-settings)/app-settings")}
          >
            <View className="flex flex-row">
              <Smartphone size={16} className="mr-[10] text-lonestar-950" />
              <Text className="text-xs text-lonestar-950" fontVariant="Medium">
                App Settings
              </Text>
            </View>
            <ChevronRight size={16} className="text-lonestar-950" />
          </TouchableOpacity>
        </View>

        <View className="flex items-center">
          <Text className="text-xs text-lonestar-500" fontVariant="Regular">
            <Text className="text-xs text-lonestar-500" fontVariant="Bold">
              Shopper,{" "}
            </Text>
            let's go haul!
          </Text>
        </View>
      </View>

      <Button className="bg-[#c31612]" onPress={signOutUser}>
        <Text className="!text-sm text-white" fontVariant="Medium">
          Log-out of your account
        </Text>
      </Button>
    </View>
  );
}
