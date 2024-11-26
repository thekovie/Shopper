import { Home, User } from "@/lib/icons";
import { Tabs, useFocusEffect } from "expo-router";
import { Text } from "@/components/ui/text";
import TabBar from "@/components/TabBar";
import { useCallback, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { fetchSession } from "@/utils/methods/fetch-session";

export default function TabLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useFocusEffect(
    useCallback(() => {
      fetchSession().then((session) => {
        setSession(session);
      });
    }, []),
  );

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
          title: "Hello, " + session?.user?.user_metadata?.display_name,
        }}
      />
    </Tabs>
  );
}
