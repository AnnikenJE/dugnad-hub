//
//
// Events connection to firebase

// Imports ----------------------------------
import { db, getDownloadUrl } from "@/firebaseConfig";
import { EventData } from "@/types/event";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { uploadImage } from "./imageApi";

// Functions ----------------------------------
// Create event and put into firebase
export async function createEvent(event: EventData) {
  try {
    const image = await uploadImage(event.imageUri);

    if (!image) {
      console.error("Error when uploading image in create event in imageAPI.");
      return;
    }

    const imageDownloadUrl = await getDownloadUrl(image);

    const newEvent: EventData = {
      ...event,
      imageUri: imageDownloadUrl,
    };

    const docRef = await addDoc(collection(db, "events"), newEvent);
    console.log("New event is put into firebase, written with id: ", docRef.id);
  } catch (error) {
    console.error("Could not create event in eventApi:", error);
  }
}

// Get all events from firebase
export async function getAllEvents() {
  try {
    const result = await getDocs(collection(db, "events"));

    const events = result.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as EventData)
    );

    return events;
  } catch (error) {
    console.error("Cant get all events in eventApi: ", error);
    return [] as EventData[];
  }
}

// Get event from firestore by id
export async function getEventById(id: string) {
  try {
    const thisEvent = await getDoc(doc(db, "events", id));

    return {
      ...thisEvent.data(),
      id: thisEvent.id,
    } as EventData;
  } catch (error) {
    console.error("Could not get event by id in eventApi: ", error);
    return null;
  }
}

// Get events made by spesific user by userid
export async function getEventsByUserId(userId: string) {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "events"), where("authorId", "==", userId))
    );

    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as EventData;
    });
  } catch (error) {
    console.error("Could not get users events: ", error);
  }
}

// Add user to event
export async function addUserToEvent(userId: string, eventId: string) {
  try {
    const eventRef = doc(db, "events", eventId);

    await updateDoc(eventRef, {
      participants: arrayUnion(userId),
    });
  } catch (error) {
    console.error("Could not add participant", error);
  }
}

// Remove user from event
export async function removeUseFromEvent(userId: string, eventId: string) {
  try {
    const eventRef = doc(db, "events", eventId);

    await updateDoc(eventRef, {
      participants: arrayRemove(userId),
    });
  } catch (error) {
    console.error("Could not remove participant", error);
  }
}

// Search events by title
export async function getSearchedEvents(search: string) {
  try {
    const endTerm = search + "\uf8ff";
    console.log(search);
    const querySnapshot = await getDocs(
      query(
        collection(db, "events"),
        where("title", ">=", search),
        where("title", "<=", endTerm)
      )
    );
    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as EventData;
    });
  } catch (error) {
    console.error("Could not search for events: ", error);
    return [] as EventData[];
  }
}

// Show events that user is signed up for
export async function getEventsByParticipation(userId: string) {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, "events"),
        where("participants", "array-contains", userId)
      )
    );

    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as EventData;
    });
  } catch (error) {
    console.error("Could not get events by participation: ", error);
    return [];
  }
}
