// Imports ----------------------------------
import { db } from "@/firebaseConfig";
import {
  arrayRemove,
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// Functions ----------------------------------
// Add user to event
export async function addEventToFavourites(
  userId: string,
  eventId: string,
  userName: string
) {
  try {
    // Source:

    const userRef = doc(db, "users", userId);
    await setDoc(
      userRef,
      {
        name: userName,
        favourites: arrayUnion(eventId),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Could not add to favourites", error);
  }
}

// Remove user from event
export async function removeUseFromEvent(userId: string, eventId: string) {
  try {
    // Source: https://firebase.google.com/docs/firestore/manage-data/add-data
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      favourites: arrayRemove(eventId),
    });
  } catch (error) {
    console.error("Could not remove favourite", error);
  }
}
