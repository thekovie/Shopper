import { View, Text, StyleSheet } from "react-native";
import AddProductLink from "@/components/forms/add-shopping-item/AddProductLink";

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>Add an item!</Text>
      <AddProductLink />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
