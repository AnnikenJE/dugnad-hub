//
//
// Authentication connection to firebase

// Imports ----------------------------------
import { auth } from "@/firebaseConfig";
import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { Alert } from "react-native";

// Functions ----------------------------------
// Email sign in
export async function signIn(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log("Current user signed in: ", userCredential);
      }
    );
  } catch (error) {
    console.error("User could not sign in.", error);
    Alert.alert(
      "Ugyldig innlogging",
      "Brukernavn eller passord stemmer ikke.",
      [{ text: "OK" }]
    );
  }
}

// Sign out
export async function signOut() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Could not log out.", error);
  }
}

// Create a new user with email
export async function createUser(email: string, password: string) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredentials.user;
  } catch (error) {
    console.error("Could not create user.", error);
    return null;
  }
}

// Set user name
export async function setUserDisplayName(user: User, name: string) {
  try {
    await updateProfile(user, {
      displayName: name,
    });
  } catch (error) {
    console.error("Could not update user display name.", error);
  }
}

// Sign in with google
export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      const user = GoogleSignin.getCurrentUser();
      if (user) {
        const googleCredential = GoogleAuthProvider.credential(user.idToken);
        const userCrednetial = await signInWithCredential(
          auth,
          googleCredential
        );
        console.log("User signed in with google", userCrednetial.user.email);
        console.log(
          "User signed in with google",
          userCrednetial.user.displayName
        );
      }
    }
  } catch (error) {
    console.error("Error signing in with google", error);
  }
};
