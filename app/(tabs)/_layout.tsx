import { Home, User } from "@/lib/icons";
import { Tabs } from "expo-router";
import { Text } from "@/components/ui/text";
import TabBar from "@/components/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitle(props) {
          return (
            <Text fontVariant={"Bold"} className={"text-2xl text-lonestar-600"}>
              {props.children}
            </Text>
          );
        },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="add-item"
        options={{
          title: "Add Item",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="shopping-list"
        options={{
          title: "Shopping List",
        }}
      />
      <Tabs.Screen
        name="user-menu"
        options={{
          title: "Hello, {{name}}",
        }}
      />
    </Tabs>
  );
}
