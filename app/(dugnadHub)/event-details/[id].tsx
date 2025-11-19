import * as eventApi from "@/api/eventApi";
import { useAuthSession } from "@/providers/authctx";
import { Colors } from "@/styles/colors";
import * as Style from "@/styles/componentStyle";
import { EventData } from "@/types/event";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthSession();

  const [event, setEvent] = useState<EventData | null>(null);
  const isParticipating = event?.participants.includes(user?.uid || "");

  async function getEventFromApi(id: string) {
    const event = await eventApi.getEventById(id);
    setEvent(event);
  }

  useEffect(() => {
    getEventFromApi(id);
  }, [id]);

  console.log(event?.imageUri);

  if (event === null) {
    return (
      <View style={Style.Styles.centerContainer}>
        <Text style={{ color: Colors.mainColor }}>Henter dugnad...</Text>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTintColor: Colors.mainColor,
          title: event.title,
          headerBackTitle: "Tilbake",
        }}
      />
      <Image style={style.image} source={{ uri: event.imageUri }} />
      <View style={style.textContainer}>
        <Text
          style={{
            color: Colors.mainColor,
            fontWeight: "bold",
            fontSize: 20,
            textDecorationLine: "underline",
          }}
        >
          {event.title}
        </Text>

        <View style={{ paddingBottom: 30 }}>
          <View style={{ padding: 30 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontWeight: "bold" }}>
                Dato: {event.date} Kl.{event.time}
              </Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text>{event.description}</Text>
            </View>

            <Text>Kategori: {event.category}</Text>

            <Text>Adresse: {event.adress}</Text>
            <Text>Opprettet av:{event.authorName}</Text>
            <Text>Oppgaver:{event.tasks}</Text>

            <Text>
              Plasser:{event.participants.length} / {event.maxParticipants}
            </Text>
          </View>

          {isParticipating ? (
            <Text>Påmeldt</Text>
          ) : (
            <Pressable
              style={[
                Style.Styles.button,
                { backgroundColor: Colors.mainColor },
              ]}
              onPress={() => {
                if (user?.uid) {
                  eventApi.updateUserToEvent(user.uid, event.id);
                }
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Meld på
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  image: {
    height: 300,
    width: "100%",
    borderRadius: 8,
    padding: 8,
  },
  textContainer: {
    alignItems: "center",
    padding: 4,
    borderWidth: 3,
    borderColor: Colors.mainColorLight,
    margin: 30,
    borderRadius: 16,
  },
});
