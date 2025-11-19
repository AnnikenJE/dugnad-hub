// Authentication with login and register user
// Login with google only works on iOS and not web

// Imports ----------------------------------
import { signInWithGoogle } from "@/api/authApi";
import { useAuthSession } from "@/providers/authctx";
import { Colors } from "@/styles/colors";
import { Styles } from "@/styles/componentStyle";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// ----------------------------------
const Authentication = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);

  const { signIn, createUser } = useAuthSession();

  // Return ----------------------------------
  return (
    <View style={styles.mainContainer}>
      {/* Dugnadhub Logo */}
      <View style={styles.logo}>
        <Text style={styles.logoText}>DugnadHub</Text>
      </View>
      {/* Login title */}
      <Text style={{ fontWeight: "bold", padding: 8 }}>
        {isSignedUp ? "Logg in" : "Opprett bruker"}
      </Text>
      {/* Login or register user*/}
      <View>
        {/* Email */}
        <View>
          <Text>Epost</Text>
          <TextInput
            style={styles.textField}
            value={userEmail}
            onChangeText={setUserEmail}
            placeholder="E-post"
            keyboardType="email-address"
          ></TextInput>
        </View>
        {/* Username */}
        {!isSignedUp && (
          <View>
            <Text>Brukernavn</Text>
            <TextInput
              style={styles.textField}
              value={userName}
              onChangeText={setUserName}
              placeholder="Brukernavn"
            ></TextInput>
          </View>
        )}
        {/* Password */}
        <View>
          <Text>Passord</Text>
          <TextInput
            style={styles.textField}
            value={password}
            onChangeText={setPassword}
            placeholder="Passord"
            secureTextEntry
          ></TextInput>
        </View>
        {/* Login or register user button */}
        <Pressable
          style={[Styles.button, { backgroundColor: Colors.mainColor }]}
          onPress={() => {
            // Check if user wants to sign up or log in.
            if (isSignedUp) {
              signIn(userEmail, password);
            } else {
              if (userEmail === "" || password === "" || userName === "") {
                // Source: https://reactnative.dev/docs/alert
                Alert.alert(
                  "Kunne ikke lage bruker",
                  "Vennligst fyll ut alle feltene.",
                  [{ text: "Ok" }]
                );
                return;
              }
              createUser(userEmail, password, userName);
            }
          }}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            {isSignedUp ? "Logg inn" : "Registrer bruker"}
          </Text>
        </Pressable>

        {/* Log in with google */}
        <Pressable
          style={[Styles.button, { backgroundColor: Colors.googleRed }]}
          onPress={async () => {
            await signInWithGoogle();
          }}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            Logg inn med google
          </Text>
        </Pressable>

        {/* Swap between login ang register button */}
        <Pressable
          onPress={() => {
            setIsSignedUp(!isSignedUp);
          }}
        >
          <Text
            style={{
              textDecorationLine: "underline",
              textAlign: "center",
              margin: 8,
            }}
          >
            {isSignedUp ? "Registrer bruker" : "Har du allerede en bruker?"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
// ----------------------------------
export default Authentication;

// Style ----------------------------------
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    margin: 8,
    padding: 20,
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderColor: Colors.mainColor,
  },

  logoText: {
    color: "#0D0D0D",
    fontSize: 30,
    fontWeight: "bold",
  },



  textField: {
    padding: 8,
    margin: 8,
    borderColor: "lightgray",
    borderWidth: 2,
    borderRadius: 8,
    width: 200,
  },
});
