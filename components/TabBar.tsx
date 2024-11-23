import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Home, Search, PlusCircle, List, User } from "@/lib/icons";

export function TabBar({ state, descriptors, navigation }) {
  const icons = {
    index: (props) => <Home size={20} {...props} />,
    search: (props) => <Search size={20} {...props} />,
    "add-item": (props) => <PlusCircle size={20} {...props} />,
    "shopping-list": (props) => <List size={20} {...props} />,
    "user-menu": (props) => <User size={20} {...props} />,
  };

  return (
    <View
      className={`${
        Platform.OS === "ios" ? "mb-2 h-20" : "h-10 pt-2"
      } flex-row items-center border-t border-gray-100`}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
            className={"items-center justify-between"}
          >
            {icons[route.name]
              ? icons[route.name]({
                  className: isFocused
                    ? "text-lonestar-700"
                    : "text-lonestar-400",
                })
              : null}
            {/*<Text style={{ color: isFocused ? "#673ab7" : "#222" }}>*/}
            {/*  {label}*/}
            {/*</Text>*/}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default TabBar;
