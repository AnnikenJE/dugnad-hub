import { getStorageRef } from "@/firebaseConfig";
import { uploadBytesResumable } from "firebase/storage";

export async function uploadImage(uri: string) {
  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob();
  const image = uri.split("/").pop()?.split(".")[0] ?? "Ukjent bilde.";
  const uploadPath = `images/${image}`;
  const imageRef = await getStorageRef(uploadPath);

  try {
    await uploadBytesResumable(imageRef, blob);
    console.log("Image successfully uploaded to firebase.");
    return uploadPath;
  } catch (error) {
    console.error("Could not upload image to firebase from imageApi: ", error);
    return null;
  }
}
