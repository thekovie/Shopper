import { View, ScrollView, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { Star, ChevronRight, Shapes, History } from "@/lib/icons"
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Tab() {

  const categoriesOne = [
    { label: "Mobile & Accessories", Icon: Star },
    { label: "Gaming", Icon: Star },
    { label: "Healthy and Beauty", Icon: Star },
    { label: "Fashion", Icon: Star },
    { label: "Kitchen", Icon: Star },
    { label: "Home & Living", Icon: Star },
    { label: "Sports & Outdoor", Icon: Star },
    { label: "Automotive", Icon: Star },
    { label: "Others", Icon: Star },
  ];

  const priorities = [
    { label: "High Priority", Icon: Star },
    { label: "Mid Priority", Icon: Star },
    { label: "Low Priority / Wants", Icon: Star },
    { label: "Custom Priority", Icon: Star },
  ]


  return (
    <ScrollView className="flex flex-col w-full px-[30] py-[20]">
      <View className="rounded-[10] border border-[#f0f0f0] p-[15] mb-[10]">
        <View className="flex flex-row items-center mb-[20]">
          <Star size={16} className="text-lonestar-600 mr-[5]"/>
          <Text className="text-lonestar-600" fontVariant="SemiBold">Priorities</Text>
        </View>

        {/* Priorities */}
        <View className="flex flex-col">
        {priorities.map(({label}, index) => (
          <TouchableOpacity key={index} className="flex flex-row justify-between items-center mb-[20]"
            onPress={() => router.push(`/(shopping-list-menu)/${encodeURIComponent(label)}`)}
          >
            <Text className="text-lonestar-950 text-xs" fontVariant="Medium">
              {label}
            </Text>
            <ChevronRight size={16} className="text-lonestar-950"/>
          </TouchableOpacity>
        ))}
          
        </View>
      </View>

      {/* Categories */}
      <View className="rounded-[10] border border-[#f0f0f0] p-[15] mb-[10]">
        <View className="flex flex-row items-center mb-[20]">
          <Shapes size={16} className="text-lonestar-600 mr-[5]"/>
          <Text className="text-lonestar-600" fontVariant="SemiBold">Categories</Text>
        </View>
        <View className="flex flex-col">
            {categoriesOne.map(({label}, index) => (
              <TouchableOpacity key={index} className="flex flex-row justify-between items-center mb-[20]"
                onPress={() => router.push(`/(shopping-list-menu)/${encodeURIComponent(label)}`)}
              >
                <Text className="text-lonestar-950 text-xs" fontVariant="Medium">
                  { label }
                </Text>
                <ChevronRight size={16} className="text-lonestar-950"/>
              </TouchableOpacity>
            ))}     
        </View>
      </View>

      {/* History */}
      <View className="rounded-[10] border border-[#f0f0f0] p-[15] mb-[24]">
        <View className="flex flex-row items-center mb-[20]">
          <History size={16} className="text-lonestar-600 mr-[5]"/>
          <Text className="text-lonestar-600" fontVariant="SemiBold">History</Text>
        </View>
        <View className="flex flex-col">
          <View className="flex flex-row justify-between items-center mb-[20]">
            <Text className="text-lonestar-950 text-xs" fontVariant="Medium">
              Check out your recent finds
            </Text>
            <ChevronRight size={16} className="text-lonestar-950"/>
          </View>

          <TouchableOpacity className="flex flex-row justify-between items-center mb-[20]" 
            onPress={() => {
              router.push("/(shopping-list-menu)/purchased-items")
            }}
          >
            <Text 
                className="text-lonestar-950 text-xs" 
                fontVariant="Medium"
            >
              Marked as purchased
            </Text>
            <ChevronRight size={16} className="text-lonestar-950"/>
          </TouchableOpacity>


        </View>
      </View>
      
      
    </ScrollView>
  );
}


