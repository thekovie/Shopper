import {
    View,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableOpacity,
  } from "react-native";
  import { useState, useEffect } from "react";
  import { Platform } from "react-native";
  import {
    Bell,
    Bolt,
    Pill,
    ShoppingBag,
    Star,
    TabletSmartphone,
    MoreHorizontal,
    Ellipsis,
  } from "@/lib/icons";
  import { Text } from "@/components/ui/text";
  import { Joystick } from "lucide-react-native";
  import AddShoppingItem from "@/components/homepage/AddShoppingItem";
  import RecentFinds from "@/components/homepage/RecentFinds";
  import { Session } from "@supabase/supabase-js";
  import { supabase } from "@/lib/supabase";
  import {
    ExtendedShoppingItemInsert,
    ItemCategoryRow,
    ListShoppingItemProps,
    RecentFindsProps,
  } from "@/constants/types";
  import { fetchCategories } from "@/utils/methods/fetch-categories";
  import { Href, router, useFocusEffect } from "expo-router";
  import { useCallback } from "react";
  import Push from "@/components/expo-push-example/Push";
  
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "@/components/ui/button";
  import { PRIORITIES } from "@/lib/constants";
  import { fetchTotalItems } from "@/utils/methods/fetch-shopping-item-count";
  import { fetchShoppingItems } from "@/utils/methods/fetch-shopping-items";
  import { getRecentShoppingItems } from "@/utils/methods/fetch-recent-shopping-items";
  import AddCategories from "@/components/homepage/AddCategories";
  
  export default function Tab() {
    const [session, setSession] = useState<Session | null>(null);
    const [categories, setCategories] = useState<ItemCategoryRow[] | null>(null);
    const [recentShoppingItems, setRecentShoppingItems] = useState<
      ExtendedShoppingItemInsert[] | null
    >(null);
    const [open, setOpen] = useState(false);
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);
    const [itemCount, setItemCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
  
    const numberOfItems = 700;
  
    const fetchAndSetCategories = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const categoriesData = await fetchCategories(session.user.id);
        setCategories(categoriesData || []);
  
        const totalItemCount = await fetchTotalItems(session.user.id);
        setItemCount(totalItemCount || 0);
  
        // Fetch 4 most recent shopping items finds
        const res = await getRecentShoppingItems(session.user.id, 4);
        if (res) {
          setRecentShoppingItems(res);
        }
      }
    };
  
    useEffect(() => {
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        setSession(session);
        if (session) {
          fetchAndSetCategories();
        }
      });
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        if (session) {
          fetchAndSetCategories();
        }
      });
    }, []);
  
    useFocusEffect(
      useCallback(() => {
        console.log("Screen Focused!");
        fetchAndSetCategories();
      }, [session]),
    );
  
    return (
      <ScrollView
        className="flex flex-1 flex-col p-[20]"
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="mb-[4] flex flex-row items-center">
          <Text className="text-xl text-lonestar-500" fontVariant="Bold">
            Shopper!
          </Text>
          <TouchableOpacity
                      className="flex flex-col items-center justify-center"
                      onPress={() => {
                        const PRIORITY_ROUTE =
                          `/priority/Low?userId=${session?.user.id}` as Href;
                        router.push(PRIORITY_ROUTE);
          }}>
            <Bell className="text-lonestar-400" size={24} />
          </TouchableOpacity>

        </View>
      </ScrollView>
    )}
        