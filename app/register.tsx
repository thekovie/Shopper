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
        Create an account
      </Text>
      <Text
        className={"text-md mb-2 text-center font-medium text-lonestar-500"}
      >
        We're almost there!
      </Text>
      <Label nativeID={"name"} className={"w-full text-left"}>
        Display Name
      </Label>
      <Input
        placeholder={"Display Name"}
        className={"mb-2 w-full"}
        onChangeText={(text) => {
          setText(text);
        }}
      />
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
        className={"mb-2 w-full"}
      />
      <Label nativeID={"confirm-password"} className={"mt-4 w-full text-left"}>
        Confirm Password
      </Label>
      <Input
        placeholder={"Confirm Password"}
        secureTextEntry={true}
        className={"mb-10 w-full"}
      />

      <Button
        onPress={() => {
          router.replace({
            pathname: "/(onboarding)/",
          });
        }}
        className={"mb-2 w-full text-lonestar-500"}
      >
        <Text>Sign-up now!</Text>
      </Button>
      <Button
        variant={"outline"}
        onPress={() => {
          router.replace({
            pathname: "/",
          });
        }}
        className={"mb-10 w-full text-lonestar-500"}
      >
        <Text>Reset</Text>
      </Button>

      <View className={"flex-col"}>
        <Text
          className={"text-md mb-2 text-left font-medium text-lonestar-500"}
        >
          You already have an account?
        </Text>
        <Button
          variant={"outline"}
          onPress={() => {
            router.replace({
              pathname: "/",
            });
          }}
          className={"w-full text-lonestar-500"}
        >
          <Text>Sign-in instead</Text>
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
    </View>
  );
}
