import { EventData } from "@/types/event";
import { db } from "@/firebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore"


// Put event into firestore
export async function createEvent(event: EventData) {
    try{
        const docRef = await addDoc(collection(db, "events"), event);

        console.log("New document written with id: ", )

    } catch (error){
        console.log("Could not create event in eventApi:", error)
    }
}

// Get all events from firebase
export async function getAllEvents(){ 
    try{
        const result = await getDocs(collection(db, "events"));
        const events = result.docs.map(
            (doc) => (
                {
                    ...doc.data(),
                    id: doc.id,
                } as EventData
            )
        );
        return events;
    } catch (error) {
        console.log("Cant get all events in eventApi: ", error)
        return [] as EventData[];
    }
}

// ikke brukt enda
// Get events from firestore by id
export async function getEventById(id: string) {
    try {
        const thisEvent = await getDoc(doc(db, "events", id));
        return{
            ...thisEvent.data(),
            id: thisEvent.id,
        } as EventData;
    } catch (error) {
        console.log("Could not get event by id in eventApi: ", error)
    }
}