import { Home, User } from "@/lib/icons";
import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
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
          title: "User Menu",
        }}
      />
    </Tabs>
  );
}
