import { useAuthSession } from "@/providers/authctx";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfileTab() {
  const { signOut } = useAuthSession();

  return (
    <View style={styles.mainContainer}>
      <Text>Profil</Text>
      <Text>Mine påmeldte dugnader</Text>
      <Pressable
        onPress={() => {
          signOut();
        }}
      >
        <Text>Logg ut</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
