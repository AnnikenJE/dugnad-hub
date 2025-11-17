// Events connection to firebase

import { db, getDownloadUrl } from "@/firebaseConfig";
import { EventData } from "@/types/event";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { uploadImage } from "./imageApi";

// Put event into firestore
// ----------------------------------
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
    console.log("New document written with id: ", docRef.id);
  } catch (error) {
    console.log("Could not create event in eventApi:", error);
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
    console.log("Cant get all events in eventApi: ", error);
    return [] as EventData[];
  }
}

// ikke brukt enda
// Get events from firestore by id
export async function getEventById(id: string) {
  try {
    const thisEvent = await getDoc(doc(db, "events", id));
    return {
      ...thisEvent.data(),
      id: thisEvent.id,
    } as EventData;
  } catch (error) {
    console.log("Could not get event by id in eventApi: ", error);
  }
}
