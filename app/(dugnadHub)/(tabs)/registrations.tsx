import { Text, View, StyleSheet } from "react-native";

export default function RegistrationsTab(){
    
    return(
        <View style={styles.mainContainer}>
            <Text>Mine dugnader</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});