import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { ChevronRight, User2, HelpCircle, Bell, Smartphone } from "@/lib/icons";
import { router } from "expo-router";

export default function Tab() {
  return (
    <View className="flex flex-col w-full px-[30] py-[20]">
      <Text className="text-lonestar-500 text-xs mb-[10]" fontVariant="SemiBold">User Menu</Text>
      <View className="rounded-[10] border border-[#f0f0f0] p-[15] mb-[30]">

        <TouchableOpacity className="flex flex-row justify-between items-center mb-[20]"
          onPress={() => router.push("/")}
        >
          <View className="flex flex-row">
            <User2 size={16} className="text-lonestar-950 mr-[10]"/>
            <Text className="text-lonestar-950 text-xs" fontVariant="Medium">
              Profile
            </Text>
          </View>
          <ChevronRight size={16} className="text-lonestar-950"/>
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row justify-between items-center mb-[20]"
          onPress={() => router.push("/")}
        >
          <View className="flex flex-row">
            <HelpCircle size={16} className="text-lonestar-950 mr-[10]"/>
            <Text className="text-lonestar-950 text-xs" fontVariant="Medium">
              Quick Guide
            </Text>
          </View>
          <ChevronRight size={16} className="text-lonestar-950"/>
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row justify-between items-center mb-[20]"
          onPress={() => router.push("/")}
        >
          <View className="flex flex-row">
            <Bell size={16} className="text-lonestar-950 mr-[10]"/>
            <Text className="text-lonestar-950 text-xs" fontVariant="Medium">
              Push Notifications
            </Text>
          </View>
          <ChevronRight size={16} className="text-lonestar-950"/>
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row justify-between items-center"
          onPress={() => router.push("/")}
        >
          <View className="flex flex-row">
            <Smartphone size={16} className="text-lonestar-950 mr-[10]"/>
            <Text className="text-lonestar-950 text-xs" fontVariant="Medium">
              App Settings
            </Text>
          </View>
          <ChevronRight size={16} className="text-lonestar-950"/>
        </TouchableOpacity>
      </View>

      <View className="flex items-center">
        <Text className="text-lonestar-500 text-xs" fontVariant="Regular">
          <Text className="text-lonestar-500 text-xs" fontVariant="Bold">
            Shopper,{" "}
          </Text>
          let's go haul!
        </Text>
      </View>


    </View>
  );
}

