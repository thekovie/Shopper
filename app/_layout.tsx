import "@/globals.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { NAV_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Text } from "@/components/ui/text";
import { LoadingProvider } from "@/components/Providers/LoaderSpinnerContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import ReactQueryProvider from "@/components/Providers/ReactQueryProvider";
const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [loaded, error] = useFonts({
    //add custom fonts here
    //example
    DMSansBlack: require("../assets/fonts/DMSans-Black.ttf"),
    DMSansBlackItalic: require("../assets/fonts/DMSans-BlackItalic.ttf"),
    DMSansBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMSansBoldItalic: require("../assets/fonts/DMSans-BoldItalic.ttf"),
    DMSansExtraBold: require("../assets/fonts/DMSans-ExtraBold.ttf"),
    DMSansExtraBoldItalic: require("../assets/fonts/DMSans-ExtraBoldItalic.ttf"),
    DMSansExtraLight: require("../assets/fonts/DMSans-ExtraLight.ttf"),
    DMSansExtraLightItalic: require("../assets/fonts/DMSans-ExtraLightItalic.ttf"),
    DMSansItalic: require("../assets/fonts/DMSans-Italic.ttf"),
    DMSansLight: require("../assets/fonts/DMSans-Light.ttf"),
    DMSansLightItalic: require("../assets/fonts/DMSans-LightItalic.ttf"),
    DMSansMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMSansMediumItalic: require("../assets/fonts/DMSans-MediumItalic.ttf"),
    DMSansRegular: require("../assets/fonts/DMSans-Regular.ttf"),
    DMSansSemiBold: require("../assets/fonts/DMSans-SemiBold.ttf"),
    DMSansSemiBoldItalic: require("../assets/fonts/DMSans-SemiBoldItalic.ttf"),
    DMSansThin: require("../assets/fonts/DMSans-Thin.ttf"),
    DMSansThinItalic: require("../assets/fonts/DMSans-ThinItalic.ttf"),
  });

  React.useEffect(() => {
    (async () => {
      if ((loaded || error) && isColorSchemeLoaded) {
        await SplashScreen.hideAsync();
      }
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        await setAndroidNavigationBar(colorScheme);
        await AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      await setAndroidNavigationBar(colorTheme);
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })();
  }, [loaded, isColorSchemeLoaded]);

  if (!isColorSchemeLoaded || !(loaded || error)) {
    return null;
  }

  return (
    <ReactQueryProvider>
      <ThemeProvider value={LIGHT_THEME}>
        <StatusBar style={"light"} />
        <SafeAreaProvider>
          <LoadingProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack
                screenOptions={{
                  headerBackTitle: "Back",
                  headerTitleAlign: "center",
                  headerTitle(props) {
                    return (
                      <Text className="text-lg font-semibold">
                        {toOptions(props.children)}
                      </Text>
                    );
                  },
                }}
              >
                <Stack.Screen
                  name="index"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="register"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(onboarding)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(add-shopping-item)"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>
              <LoadingSpinner />
              <PortalHost />
            </GestureHandlerRootView>
          </LoadingProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}

function toOptions(name: string) {
  return name
    .split("-")
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    })
    .join(" ");
}
