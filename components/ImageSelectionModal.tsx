import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRef } from "react";
import { Button, Text, View, TouchableOpacity } from "react-native";
import * as Styles from "@/styles/componentStyle";

// Props ----------------------------------
type ImageSelectionModalProps = {
  closeModal: VoidFunction;
  setImage: (image: string) => void;
};

// ----------------------------------
export default function ImageSelectionModal({
  closeModal,
  setImage,
}: ImageSelectionModalProps) {
  // States
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return;
  }

  if (!permission.granted) {
    return (
      <View style={Styles.Styles.centerContainer}>
        <Text>DugnadHub trenger tillatelse til å bruke kameraet.</Text>
        <Button onPress={requestPermission} title="Aksepter" />
      </View>
    );
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
        setImage(result.assets[0].uri);
        closeModal();
    }
  }

  async function captureImage(){
    if(cameraRef.current){
        const image = await cameraRef.current.takePictureAsync();
        if(image){
            setImage(image.uri)
            closeModal();
        }
    }
  }

// Return ----------------------------------
  return (
    <View style={Styles.Styles.centerContainer}>
      <CameraView style={{ flex: 1}}facing="back" ref={cameraRef} />
      <View >
        <TouchableOpacity onPress={() => closeModal()}>
          <Text>Avbryt</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => captureImage()}>
          <Text > Ta bilde</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => pickImage()}>
          <Text >Velg bilde</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}
