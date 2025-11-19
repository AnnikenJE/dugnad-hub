// Modal for making events (dugnad)

// Imports ----------------------------------
import * as eventApi from "@/api/eventApi";
import { useAuthSession } from "@/providers/authctx";
import { Colors } from "@/styles/colors";
import * as Styles from "@/styles/componentStyle";
import { EventData } from "@/types/event";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import uuid from "react-native-uuid";
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
  const { user, userNameSession } = useAuthSession();
  const [eventTitle, setEventTitle] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isChoosingImage, setIsChoosingImage] = useState(false);
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState("");
  const [adress, setAdress] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Return ----------------------------------
  return (
    <Modal visible={isVisible} animationType="slide">
      {/* Camera modal */}
      <Modal visible={isChoosingImage}>
        <ImageSelectionModal
          closeModal={() => setIsChoosingImage(false)}
          setImage={(image) => setImage(image)}
        />
      </Modal>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={Styles.Styles.centerContainer}>
          <Text style={style.header}>Legg til ny dugnad</Text>
          {/* Add image */}
          <Pressable
            style={style.image}
            onPress={() => setIsChoosingImage(true)}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ resizeMode: "cover", width: "100%", height: 300 }}
              />
            ) : (
              <FontAwesome name="camera" size={24} color="black" />
            )}
          </Pressable>
          {/* Input fields */}
          <View style={{ margin: 8 }}>
            <View>
              <Text>Tittel</Text>
              <TextInput
                value={eventTitle}
                placeholder="Tittel"
                onChangeText={setEventTitle}
                style={[Styles.Styles.textField, { width: 300 }]}
              ></TextInput>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text>Kategori</Text>
                <TextInput
                  style={[Styles.Styles.textField, { width: 150 }]}
                  value={category}
                  onChangeText={setCategory}
                  placeholder="Opprydding"
                ></TextInput>
              </View>
              <View>
                <Text>Antall plasser</Text>
                <TextInput
                  style={Styles.Styles.textField}
                  value={maxParticipants}
                  onChangeText={setMaxParticipants}
                  placeholder="10"
                  keyboardType="numeric"
                ></TextInput>
              </View>
            </View>
            <View>
              <Text>Beskrivelse</Text>
              <TextInput
                style={Styles.Styles.textField}
                value={description}
                onChangeText={setDescription}
                placeholder="Dugnaden går ut på.."
              ></TextInput>
            </View>
            <View>
              <Text>Oppgaver</Text>
              <TextInput
                style={Styles.Styles.textField}
                value={tasks}
                onChangeText={setTasks}
                placeholder="Måke snø, plukke søppel.."
              ></TextInput>
            </View>
            <View>
              <Text>Adressse</Text>
              <TextInput
                style={Styles.Styles.textField}
                value={adress}
                onChangeText={setAdress}
                placeholder="Adresse adresse 22"
              ></TextInput>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text>Dato</Text>
                <TextInput
                  style={[Styles.Styles.textField, { width: 100 }]}
                  value={date}
                  onChangeText={setDate}
                  placeholder="22.02.26"
                ></TextInput>
              </View>
              <View>
                <Text>Tidspunkt</Text>
                <TextInput
                  style={[Styles.Styles.textField, { width: 100 }]}
                  value={time}
                  onChangeText={setTime}
                  placeholder="10:00-14:00"
                ></TextInput>
              </View>
            </View>
            {isLoading ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Pressable
                  style={[
                    Styles.Styles.button,
                    { backgroundColor: Colors.gray },
                  ]}
                  onPress={() => setIsVisible(false)}
                >
                  <Text style={{ color: "white" }}>Avbryt</Text>
                </Pressable>
                <Pressable
                  style={[
                    Styles.Styles.button,
                    { backgroundColor: Colors.mainColor },
                  ]}
                  onPress={async () => {
                    if (
                      eventTitle === "" ||
                      description === "" ||
                      tasks === "" ||
                      adress === "" ||
                      category === "" ||
                      date === "" ||
                      time === "" ||
                      maxParticipants === "" ||
                      !image
                    ) {
                      Alert.alert(
                        "Kan ikke opprette dugnad",
                        "Alle felter må være fult ut for at dugnaden skal bli opprettet.",
                        [{ text: "ok" }]
                      );
                      return;
                    }

                    if (image) {
                      setIsLoading(true);
                      const newEvent: EventData = {
                        // Source: https://www.npmjs.com/package/react-native-uuid
                        id: uuid.v4(),
                        authorId: user?.uid || "Something went wrong.",
                        authorName: userNameSession || "Something went wrong.",
                        title: eventTitle,
                        imageUri: image,
                        description: description,
                        tasks: tasks,
                        adress: adress,
                        category: category,
                        date: date,
                        time: time,
                        maxParticipants: parseInt(maxParticipants),
                        participants: [user?.uid || "Something went wrong."],
                      };

                      await eventApi.createEvent(newEvent);

                      setIsLoading(false);
                      setIsVisible(false);
                      setEventTitle("");
                      setAdress("");
                      setImage(null);
                      setDescription("");
                      setTasks("");
                      setAdress("");
                      setCategory("");
                      setDate("");
                      setTime("");
                      setMaxParticipants("");
                      confirmEventAdded()
                    }
                  }}
                >
                  <Text style={{ color: "white" }}>Legg til dugnad</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

// Style ----------------------------------
const style = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.gray,
    borderRadius: 8,
    borderWidth: 3,
  },
  header: {
    fontWeight: "bold",
    color: Colors.mainColor,
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
});
