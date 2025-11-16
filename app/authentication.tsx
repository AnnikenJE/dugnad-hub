import { useAuthSession } from "@/providers/authctx";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

// TODO: Bytte filnavn til authentication senere?

const Authentication = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);

  const { signIn, createUser } = useAuthSession();

  return (
    <View style={styles.mainContainer}>
      {/* Dugnadhub Logo */}
      <View>
        <Text>DugnadHub</Text>
      </View>

      {/* Login or register user*/}
      <View>
        <Text> {isSignedUp ? "Logg in" : "Opprett bruker"}</Text>

        {/* Email */}
        <View>
          <Text>Epost</Text>
          <TextInput
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
            value={password}
            onChangeText={setPassword}
            placeholder="Passord"
          ></TextInput>
        </View>
        {/* Login or register user button */}
        <Pressable
          onPress={() => {
            if (isSignedUp) {
              signIn(userEmail, password);
            } else {
              createUser(userEmail, password, userName);
            }
          }}
        >
          <Text> {isSignedUp ? "Log inn" : "Registrer bruker"}</Text>
        </Pressable>

        {/* Swap between login ang register button */}
        <Pressable
          onPress={() => {
            setIsSignedUp(!isSignedUp);
          }}
        >
          <Text>
            {isSignedUp ? "Registrer bruker" : "Har du allerede en bruker?"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
