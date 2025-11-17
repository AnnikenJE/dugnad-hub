// If something goes wrong with pat

import { Colors } from "@/styles/colors";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function PageNotFoundScreen() {
  return (
    <View style={styles.mainContainer}>
      <Text> Siden ble ikke funnet :( </Text>
      <Link href="/" style={{textDecorationLine: "underline" , color: Colors.mainColor}}> 
        <Text>Klikk her for å gå tilbake.</Text>
      </Link>
    </View>
  );
}

// Design
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
