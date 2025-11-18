import { Colors } from "@/styles/colors";
import * as Styles from "@/styles/componentStyle";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

  async function captureImage() {
    if (cameraRef.current) {
      const image = await cameraRef.current.takePictureAsync();
      if (image) {
        setImage(image.uri);
        closeModal();
      }
    }
  }

  // Return ----------------------------------
  return (
    <View style={[Styles.Styles.centerContainer, { flex: 1 }]}>
      <Text style={{color: Colors.mainColor, fontWeight: "bold", fontSize: 24}}>Velg et bilde eller ta et nytt</Text>
      <CameraView
        style={style.camera}
        facing="back"
        ref={cameraRef}
      />
      <View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              Styles.Styles.button,
              { backgroundColor: Colors.mainColor },
            ]}
            onPress={() => captureImage()}
          >
            <Text style={style.text}>Ta bilde</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Styles.Styles.button,
              { backgroundColor: Colors.mainColor },
            ]}
            onPress={() => pickImage()}
          >
            <Text style={style.text}>Velg bilde</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[Styles.Styles.button, { backgroundColor: Colors.gray }]}
          onPress={() => closeModal()}
        >
          <Text style={style.text}>Avbryt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles ----------------------------------

const style = StyleSheet.create({
  camera: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    margin: 8,
    borderWidth: 3,
    borderColor: Colors.gray,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
