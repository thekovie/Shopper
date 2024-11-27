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

  const updateStateCategories = (newCategory: ItemCategoryRow) => {
    setCategories((prevCategories) => [...(prevCategories || []), newCategory]);
  }


  const fetchAndSetCategories = async () => {
    setIsLoading(true);
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

    setIsLoading(false);
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

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text className="text-lonestar-950">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex flex-1 flex-col p-[20]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="mb-[4] flex flex-row items-center justify-between">
        <Text className="text-xl text-lonestar-500" fontVariant="Bold">
          Shopper!
        </Text>
        <TouchableOpacity
                    className="flex flex-col items-center justify-center"
                    onPress={() => router.push({
                      pathname: '/price-updates',
                      params: {
                        user_id: session?.user.id,
                      }
                    })}>
          <Bell className="text-lonestar-400" size={24} />
        </TouchableOpacity>
        
      </View>

      {session && <Push session={session} />}
      <View className="flex-1 p-[10]">
        {/* Shopping Card Info */}
        <View className="mb-[16] flex flex-row items-center justify-between rounded-[20] bg-lonestar-700 px-[15] py-[20]">
          <View className="flex flex-1 flex-col">
            <Text className="text-4xl text-lonestar-50" fontVariant="Bold">
              {itemCount}
            </Text>
            <Text className="text-lonestar-50">
              Items in your list. Keep hauling!
            </Text>
          </View>
          <ShoppingBag className="text-lonestar-50" size={64} />
        </View>

        {/* Category List */}
        <View className="flex flex-col">
          <View
            className={`flex flex-row flex-wrap items-start ${categories && categories.length > 4 ? "justify-start" : "justify-center"} mb-[8] w-full`}
          >
            {/* Priority List */}

            {categories && categories.length === 0 && (
              <View className="mb-5 flex w-full flex-row items-center justify-center">
                <View className="w-1/4">
                  <TouchableOpacity
                    className="flex flex-col items-center justify-center"
                    onPress={() => {
                      const PRIORITY_ROUTE =
                        `/priority/Low?userId=${session?.user.id}` as Href;
                      router.push(PRIORITY_ROUTE);
                    }}
                  >
                    <View className="flex h-[44] w-[44] flex-col items-center justify-center rounded-2xl bg-lonestar-100">
                      <Star className="h-[20] w-[20] text-lonestar-950" />
                    </View>
                    <Text
                      className="max-w-[64] break-words text-center text-xs text-lonestar-950"
                      numberOfLines={2}
                    >
                      Low Priority
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="w-1/4">
                  <TouchableOpacity
                    className="flex flex-col items-center justify-center"
                    onPress={() => {
                      const PRIORITY_ROUTE =
                        `/priority/Mid?userId=${session?.user.id}` as Href;
                      router.push(PRIORITY_ROUTE);
                    }}
                  >
                    <View className="flex h-[44] w-[44] flex-col items-center justify-center rounded-2xl bg-lonestar-100">
                      <Star className="h-[20] w-[20] text-lonestar-950" />
                    </View>
                    <Text
                      className="max-w-[64] break-words text-center text-xs text-lonestar-950"
                      numberOfLines={2}
                    >
                      Mid Priority
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="w-1/4">
                  <TouchableOpacity
                    className="flex flex-col items-center justify-center"
                    onPress={() => {
                      const PRIORITY_ROUTE =
                        `/priority/High?userId=${session?.user.id}` as Href;
                      router.push(PRIORITY_ROUTE);
                    }}
                  >
                    <View className="flex h-[44] w-[44] flex-col items-center justify-center rounded-2xl bg-lonestar-100">
                      <Star className="h-[20] w-[20] text-lonestar-950" />
                    </View>
                    <Text
                      className="max-w-[64] break-words text-center text-xs text-lonestar-950"
                      numberOfLines={2}
                    >
                      High Priority
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {categories && categories.length > 0 && (
              <View className="w-1/4">
                <AlertDialog
                  open={isPriorityOpen}
                  onOpenChange={setIsPriorityOpen}
                >
                  <AlertDialogTrigger asChild>
                    <TouchableOpacity className="flex flex-col items-center justify-center">
                      <View className="flex h-[44] w-[44] flex-col items-center justify-center rounded-2xl bg-lonestar-100">
                        <Star className="h-[20] w-[20] text-lonestar-950" />
                      </View>
                      <Text
                        className="max-w-[64] break-words text-center text-xs text-lonestar-950"
                        numberOfLines={2}
                      >
                        Priority Lists
                      </Text>
                    </TouchableOpacity>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <Text
                        className="text-xl text-lonestar-600"
                        fontVariant="Bold"
                      >
                        Priority Lists
                      </Text>
                      <Text
                        className="text-xs text-lonestar-700"
                        fontVariant="Medium"
                      >
                        You may find your shopping items here based on priority.
                      </Text>
                    </AlertDialogHeader>

                    <View
                      className={`flex w-full flex-row flex-wrap items-start justify-start`}
                    >
                      {PRIORITIES.map((priority, index) => (
                        <TouchableOpacity
                          key={index}
                          className="mb-[16] flex w-1/3 flex-col items-center justify-center"
                          onPress={() => {
                            const PRIORITY_ROUTE =
                              `/priority/${priority}?userId=${session?.user.id}` as Href;
                            router.push(PRIORITY_ROUTE);
                            setIsPriorityOpen(false);
                          }}
                        >
                          <View className="flex h-[44] w-[44] flex-col items-center justify-center rounded-2xl bg-lonestar-100">
                            <Star className="h-[20] w-[20] text-lonestar-950" />
                          </View>
                          <Text
                            className="max-w-[64] break-words text-center text-xs text-lonestar-950"
                            numberOfLines={2}
                          >
                            {priority}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    <AlertDialogFooter>
                      <Button onPress={() => setIsPriorityOpen(false)}>
                        <Text className="text-white">Close</Text>
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </View>
            )}

            {/* Categories */}
            {categories?.slice(0, 6).map((category, index) => (
              <TouchableOpacity
                key={index}
                className="mt-[24] flex w-1/4 flex-col items-center justify-center"
                onPress={() =>
                  router.push(
                    `/(shopping-list-menu)?category_name=${encodeURIComponent(
                      category.category_name,
                    )}&category_id=${encodeURIComponent(category.id)}`,
                  )
                }
              >
                <View className="flex h-[44] w-[44] flex-col items-center justify-center rounded-2xl bg-lonestar-100">
                  <Bolt className="h-[20] w-[20] text-lonestar-950" />
                </View>
                <Text
                  className="max-w-[64] break-words text-center text-xs text-lonestar-950"
                  numberOfLines={2}
                >
                  {category.category_name}
                </Text>
              </TouchableOpacity>
            ))}

            {categories && categories.length > 6 && (
              <View className="w-1/4">
                <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogTrigger asChild>
                    <TouchableOpacity className="flex flex-col items-center justify-center">
                      <View className="flex h-[44] w-[44] flex-col items-center justify-center rounded-2xl bg-lonestar-100">
                        <Ellipsis className="h-[20] w-[20] text-lonestar-950" />
                      </View>
                      <Text
                        className="max-w-[64] break-words text-center text-xs text-lonestar-950"
                        numberOfLines={2}
                      >
                        Others
                      </Text>
                    </TouchableOpacity>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                      <Text
                        className="text-xl text-lonestar-600"
                        fontVariant="Bold"
                      >
                        Other Categories
                      </Text>
                      <Text
                        className="text-xs text-lonestar-700"
                        fontVariant="Medium"
                      >
                        You've created quite a lot of categories! You may find
                        the remaining categories here.
                      </Text>
                    </AlertDialogHeader>

                    <View
                      className={`flex w-full flex-row flex-wrap items-start justify-start`}
                    >
                      {categories
                        ?.slice(6, categories.length)
                        .map((category, index) => (
                          <TouchableOpacity
                            key={index}
                            className="mb-[16] flex w-1/4 flex-col items-center justify-center"
                            onPress={() => {
                              router.push(
                                `/(shopping-list-menu)?category_name=${encodeURIComponent(
                                  category.category_name,
                                )}&category_id=${encodeURIComponent(category.id)}`,
                              );
                              setOpen(false);
                            }}
                          >
                            <View className="flex h-[44] w-[44] flex-col items-center justify-center rounded-2xl bg-lonestar-100">
                              <Star className="h-[20] w-[20] text-lonestar-950" />
                            </View>
                            <Text
                              className="max-w-[64] break-words text-center text-xs text-lonestar-950"
                              numberOfLines={2}
                            >
                              {category.category_name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                    </View>
                    <AlertDialogFooter>
                      <Button onPress={() => setOpen(false)}>
                        <Text className="text-white">Close</Text>
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </View>
            )}
          </View>
        </View>

        {/* Add Categories Card*/}
        {categories && categories.length == 0 && 
          <AddCategories refreshCategories={fetchAndSetCategories} />
        }

        {/* Add Shopping Item Card */}
        <AddShoppingItem />

        {/* Recent Finds */}
        <RecentFinds shoppingItems={recentShoppingItems} />
      </View>
    </ScrollView>
  );
}
