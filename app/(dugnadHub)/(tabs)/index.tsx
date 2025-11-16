
import { Text, View, StyleSheet } from "react-native";

export default function HomeTab(){
    
    //const { userNameSession } = useAuthSession();

    return(
        <View style={styles.mainContainer}>
            <Text>Hjem</Text>
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