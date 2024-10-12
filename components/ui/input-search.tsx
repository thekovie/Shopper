import * as React from "react";
import { TextInput, View, TouchableOpacity, useColorScheme } from "react-native";
import { Text } from "./text";
import { cn } from "@/lib/utils";
import { Search } from "@/lib/icons";

const InputSearch = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, placeholderClassName, ...props }, ref) => {
  
  const scheme = useColorScheme(); // Detect system theme

  return (
    <View className="flex flex-row">
        <TextInput
          ref={ref}
          className={cn(
            "native:h-12 native:text-lg native:leading-[1.25] h-10 rounded-t-md rounded-b-md rounded-left-md rounded-r-none border-t border-b border-l border-input bg-background px-3 pr-4 text-base text-foreground file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground web:flex web:w-full web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm",
            props.editable === false && "opacity-50 web:cursor-not-allowed",
            className
          )}
          placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
          {...props}
          style={[
            { fontFamily: "DMSansRegular", fontSize: 14, flex: 1 },
            scheme === "dark" && {
              backgroundColor: "#ffffff",
            },
          ]}
        />
        <TouchableOpacity className="flex items-center justify-center p-[8] native:h-12 h-10 border border-[#D3D3D3] rounded-l-none rounded-t-md rounded-b-md rounded-r-md ">
            <Search size={20} color="#A2A3A3" className="" style={{ transform: [{ rotate: '360deg' }] }}/>
        </TouchableOpacity>
    </View>
  );
});

InputSearch.displayName = "Input";

export { InputSearch };
