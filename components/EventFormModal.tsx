// Modal for making events (dugnad)

import * as eventApi from "@/api/eventApi";
import * as Styles from "@/styles/componentStyle";
import { EventData } from "@/types/event";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { Image, Modal, Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import ImageSelectionModal from "./ImageSelectionModal";

// Props ----------------------------------
export type EventModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  confirmEventAdded: VoidFunction;
};

// ----------------------------------
export default function EventFormModal({
  isVisible,
  setIsVisible,
  confirmEventAdded,
}: EventModalProps) {
  // State
  const [eventTitle, setEventTitle] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isChoosingImage, setIsChoosingImage] = useState(false);

  // Return ----------------------------------
  return (
    <Modal visible={isVisible} animationType="slide">
      <Modal visible={isChoosingImage}>
        <ImageSelectionModal
          closeModal={() => setIsChoosingImage(false)}
          setImage={(image) => setImage(image)}
        />
      </Modal>
      <View style={Styles.Styles.centerContainer}>
        <Text>yo</Text>
        <Pressable onPress={() => setIsVisible(false)}>
          <Text>Avbryt</Text>
        </Pressable>
        {/* Add image */}
        <Pressable
        style= {style.image}
        onPress={() => setIsChoosingImage(true)}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ resizeMode: "cover", width: "100%", height: 300 }}
            />
          ) : (
            <FontAwesome name="camera" size={24} color="black" />
          )}
        </Pressable>

        <TextInput
          value={eventTitle}
          placeholder="Tittel"
          onChangeText={setEventTitle}
          style={Styles.Styles.textField}
        ></TextInput>
        <Pressable
          onPress={async () => {
            if (image) {
              const newEvent: EventData = {
                id: eventTitle, // TODO: KAN IKKE SE SLIK UT
                title: eventTitle,
                imageUri: image,
              };

              await eventApi.createEvent(newEvent);
              setIsVisible(false);
              setEventTitle("");
            }
          }}
        >
          <Text>Legg til dugnad</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

// Style ----------------------------------
const style = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
        justifyContent: "center",
        alignItems: "center"
    }
})