// Modal for making events (dugnad)

import * as eventApi from "@/api/eventApi";
import * as Styles from "@/styles/componentStyle";
import { EventData } from "@/types/event";
import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

export type EventModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  confirmEventAdded: VoidFunction;
};

export default function EventFormModal({
  isVisible,
  setIsVisible,
  confirmEventAdded,
}: EventModalProps) {
  const [eventTitle, setEventTitle] = useState("");

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={Styles.Styles.mainContainer}>
        <Text>yo</Text>
        <Pressable onPress={() => setIsVisible(false)}>
          <Text>Gå ut av denne modalen knapp her</Text>
        </Pressable>

        <TextInput
          value={eventTitle}
          placeholder="Tittel"
          onChangeText={setEventTitle}
          style={Styles.Styles.textField}
        ></TextInput>
        <Pressable
          onPress={async () => {
            const newEvent: EventData = {
              id: eventTitle, // TODO: KAN IKKE SE SLIK UT
              title: eventTitle,
            };

            await eventApi.createEvent(newEvent);
            setIsVisible(false)
            setEventTitle("");
          }}
        >
          <Text>Legg til dugnad</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
