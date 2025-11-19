// Events connection to firebase

import { db, getDownloadUrl } from "@/firebaseConfig";
import { EventData } from "@/types/event";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
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

// Get events from firestore by id
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


// Get events made by spesific user
export async function getEventsByUserId(userId: string){
  try{
    const querySnapshot = await getDocs(
    query(collection(db, "events"), where("authorId", "==", userId))
    );
    
    return querySnapshot.docs.map((doc) => {
      return{ ...doc.data(), id: doc.id} as EventData;
    })
  } catch (error){
    console.error("Could not get users events: ", error)
  }
}

// Add user to event
export async function updateUserToEvent(userId: string, eventId: string){
  try{

    // Source: https://firebase.google.com/docs/firestore/manage-data/add-data
    const eventRef = doc(db, "events", eventId);


  await updateDoc(eventRef, {
    participants: arrayUnion(userId)
  })
  } catch (error) {
    console.error("Could not add participant", error)
  }
}