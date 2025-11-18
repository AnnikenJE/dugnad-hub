import { useAuthSession } from "@/providers/authctx";
import { Colors } from "@/styles/colors";
import { Stack } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

// ----------------------------------
export default function ProfileTab() {
  const { signOut } = useAuthSession();

  // Return ----------------------------------
  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              style={{ paddingRight: 16 }}
              onPress={() => {
                signOut();
              }}
            >
              <Text
                style={{
                  color: Colors.mainColor,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                Logg ut
              </Text>
            </Pressable>
          ),
        }}
      />
      <Text>Profil</Text>
      <Text>Mine påmeldte dugnader</Text>
    </View>
  );
}

// Style ----------------------------------
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
