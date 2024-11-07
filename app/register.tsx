import { View, StatusBar, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Platform } from "react-native";
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
        className={"mb-2 text-center text-4xl text-lonestar-500"}
      >
        Create an account
      </Text>
      <Text
        className={"text-md mb-2 text-center font-medium text-lonestar-500"}
      >
        We're almost there!
      </Text>
      <Text nativeID={"name"} className={"mt-4 w-full text-left text-lonestar-950 text-xs font-medium"}>
        Display Name
      </Text>
      <Input
        placeholder={"Display Name"}
        className={"mb-2 w-full bg-white placeholder:text-lonestar-300 border-[#e4e4e7]"}
        onChangeText={(text) => {
          setText(text);
        }}
      />
      <Text nativeID={"email"} className={"mt-4 w-full text-left text-lonestar-950 text-xs font-medium"}>
        Email
      </Text>
      <Input
        placeholder={"yourname@example.com"}
        className={"mb-2 w-full bg-white placeholder:text-lonestar-300 border-[#e4e4e7]"}
        onChangeText={(text) => {
          setText(text);
        }}
      />
      <Text nativeID={"password"} className={"mt-4 w-full text-left text-lonestar-950 text-xs font-medium"}>
        Password
      </Text>
      <Input
        placeholder={"Password"}
        secureTextEntry={true}
        className={"mb-2 w-full bg-white placeholder:text-lonestar-300 border-[#e4e4e7]"}
      />
      <Text nativeID={"confirm-password"} className={"mt-4 w-full text-left text-lonestar-950 text-xs font-medium"}>
        Confirm Password
      </Text>
      <Input
        placeholder={"Confirm Password"}
        secureTextEntry={true}
        className={"mb-10 w-full bg-white placeholder:text-lonestar-300 border-[#e4e4e7]"}
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
        className={"mb-10 w-full text-lonestar-500 bg-white"}
      >
        <Text className="text-lonestar-600">Reset</Text>
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
          className={"w-full text-lonestar-500 bg-white h-fit "}
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
