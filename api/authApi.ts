import { auth } from "@/firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from "firebase/auth";


export async function signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Current user signed in: ", userCredential)
        })
        .catch(
            (error) => console.log("User could not sign in.", error)
        )
}

export async function  signOut() {
    await auth.signOut();
}

export async function createUser(email: string, password: string) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(
            auth, email, password
        );

        return userCredentials.user;
    } catch (error) {
        console.error("Could not create user.", error)
        return null
    }
}

export async function setUserDisplayName(user: User, name: string) {
    try{
        await updateProfile(user, {
            displayName: name,
        });
    } catch (error) {
        console.error("Could not update user display name.", error);
    }
}