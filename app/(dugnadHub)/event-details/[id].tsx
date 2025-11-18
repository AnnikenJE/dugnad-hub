import * as Style from "@/styles/componentStyle";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function eventDetails() {
  return (
    <View style={Style.Styles.centerContainer}>
      <Pressable onPress={() => router.back()}>
        <Text>Gå tilbake</Text>
      </Pressable>
    </View>
  );
}
