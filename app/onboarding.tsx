import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoadingContext } from "@/components/Providers/LoaderSpinnerContext";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "@/lib/icons";
import { router } from "expo-router";
export default function Index() {
  const { setLoading, setText } = useLoadingContext();
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
      <Label nativeID={"email"} className={"w-full text-left"}>
        Email
      </Label>
      <Input
        placeholder={"yourname@example.com"}
        className={"mb-2 w-full"}
        onChangeText={(text) => {
          setText(text);
        }}
      />
      <Label nativeID={"password"} className={"mt-4 w-full text-left"}>
        Password
      </Label>
      <Input
        placeholder={"Password"}
        secureTextEntry={true}
        className={"mb-10 w-full"}
      />

      <Button
        onPress={() => {
          router.push({
            pathname: "/(tabs)/",
          });
        }}
        className={"mb-10 w-full text-lonestar-500"}
      >
        <Text>Log in to your account</Text>
      </Button>

      <View className={"flex-col"}>
        <Text
          className={"text-md mb-2 text-left font-medium text-lonestar-500"}
        >
          Don't have an account? Make one now!
        </Text>
        <Button
          variant={"outline"}
          onPress={() => {
            router.replace({
              pathname: "/register",
            });
          }}
          className={"w-full text-lonestar-500"}
        >
          <Text className={"text-lonestar-600"}>Create an account</Text>
        </Button>
      </View>
    </View>
  );
}
