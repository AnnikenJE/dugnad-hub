import { View, Text, StyleSheet } from "react-native"


export default function PageNotFoundScreen() {
    return(
        <View style={styles.mainContainer}>
        <Text> Siden ble ikke funnet :( </Text>
        </View>
    )
}

// Design
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});