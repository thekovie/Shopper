import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { useLoadingContext } from "@/components/Providers/LoaderSpinnerContext";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "@/lib/icons";
import { router } from "expo-router";
export default function Index() {
  const { setLoading, setText } = useLoadingContext();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to Shopper!</Text>
      <Button
        onPress={() => {
          router.push({
            pathname: "/(tabs)/",
          });
        }}
      >
        <Text>Get Started</Text>
      </Button>
      <Button variant="outline">
        <Text className={"text-lonestar-600"}>Get Started</Text>
      </Button>
      <ChevronUp size={20} className={"text-primary"} />
    </View>
  );
}
