// Imports ----------------------------------
import * as eventApi from "@/api/eventApi";
import { db } from "@/firebaseConfig";
import { EventData } from "@/types/event";
import { UserData } from "@/types/user";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
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
    // Source: https://firebase.google.com/docs/firestore/manage-data/add-data
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
export async function removeEventFromFavourites(
  userId: string,
  eventId: string
) {
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

// Get favourite by userId
export async function getFavouritesByUserId(userId: string) {
  try {
    const thisUser = await getDoc(doc(db, "users", userId));
    return {
      ...thisUser.data(),
    } as UserData;
  } catch (error) {
    console.error("Could not get favourite by user id from firebase: ", error);
    return null;
  }
}

// Get all favourites
export async function getAllUserFavourites(userId: string) {
  try {
    const allEvents: EventData[] = await eventApi.getAllEvents();
    const allFavourites = await getFavouritesByUserId(userId)


    const userFavourites = allEvents.filter((event) => {
        return (allFavourites?.favourites ?? []).includes(event.id)
    });
    return userFavourites;
  } catch (error) {
    console.error("Could not get favourites from firebase: ", error);
    return [];
  }
}
