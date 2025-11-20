// If something goes wrong with pat

// Imports ----------------------------------
import { Colors } from "@/styles/colors";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// ----------------------------------
export default function PageNotFoundScreen() {
  // Return ----------------------------------
  return (
    <View style={styles.mainContainer}>
      <Text style={{ color: "red" }}> Siden ble ikke funnet :( </Text>
      <Link
        href="/"
        style={{ textDecorationLine: "underline", color: Colors.mainColor }}
      >
        <Text>Klikk her for å gå tilbake.</Text>
      </Link>
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
