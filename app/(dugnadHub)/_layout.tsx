//
//
// Layout

// Imports ----------------------------------
import { useAuthSession } from "@/providers/authctx";
import { Redirect, Stack } from "expo-router";
import { Text, View } from "react-native";

// ----------------------------------
export default function AppLayout() {
  // Variables
  const { user, isLoading } = useAuthSession();

  // Check if user is loaded
  if (isLoading) {
    return (
      <View>
        <Text> Laster inn bruker.. </Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href={"/authentication"} />;
  }

  // Return ----------------------------------
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
