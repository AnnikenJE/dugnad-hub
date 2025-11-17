
// Authentication with login and register user
// Login with google only works on iOS and not web

import { signInWithGoogle } from "@/api/authApi";
import { useAuthSession } from "@/providers/authctx";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const Authentication = () => {
  // State
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);

  // Hooks
  const { signIn, createUser } = useAuthSession();

  // Return
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
          style={[styles.button, { backgroundColor: "#814494ff" }]}
          onPress={() => {
            if (isSignedUp) {
              signIn(userEmail, password);
            } else {
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
          style={[styles.button, { backgroundColor: "#d42525ff" }]}
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

export default Authentication;

// Design
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
    borderColor: "#814494ff",
  },

  logoText: {
    color: "#0D0D0D",
    fontSize: 30,
    fontWeight: "bold",
  },

  button: {
    padding: 8,
    margin: 8,
    borderRadius: 8,
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
