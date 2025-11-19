import * as eventApi from "@/api/eventApi";
import { useAuthSession } from "@/providers/authctx";
import { Colors } from "@/styles/colors";
import * as Style from "@/styles/componentStyle";
import * as userApi from "@/api/userApi"
import { EventData } from "@/types/event";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

  async function getEventFromApi(id: string) {
    const event = await eventApi.getEventById(id);
    setEvent(event);
  }

  useEffect(() => {
    getEventFromApi(id);
  }, [id]);

  function manageParticipantsButton() {
    const isParticipating = event?.participants.includes(user?.uid || "");
    if (isParticipating) {
      return (
        <Pressable
          style={[Style.Styles.button, { backgroundColor: Colors.gray }]}
          onPress={() => {
            if (user?.uid === event?.authorId || "") {
              Alert.alert(
                "Kan ikke meldes av!",
                "Du kan ikke melde deg av en event du har laget.",
                [{ text: "OK" }]
              );
              return;
            }
            if (user?.uid && event?.id) {
              eventApi.removeUseFromEvent(user.uid, event.id);
              getEventFromApi(id);
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
            Meld av
          </Text>
        </Pressable>
      );
    } else {
      if (event?.participants.length === event?.maxParticipants) {
        return (
          <Pressable
            style={[Style.Styles.button, { backgroundColor: Colors.gray }]}
            onPress={() => {
              if (user?.uid === event?.authorId || "") {
                Alert.alert(
                  "Kan ikke meldes av!",
                  "Du kan ikke melde deg av en event du har laget.",
                  [{ text: "OK" }]
                );
                return;
              }
              if (user?.uid && event?.id) {
                eventApi.removeUseFromEvent(user.uid, event.id);
                getEventFromApi(id);
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
              Meld av
            </Text>
          </Pressable>
        );
      }
      return (
        <Pressable
          style={[Style.Styles.button, { backgroundColor: Colors.mainColor }]}
          onPress={() => {
            if (user?.uid) {
              eventApi.addUserToEvent(user.uid, event?.id || "");
              getEventFromApi(id);
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
      );
    }
  }

  // Add og remove events from favourites
  function addOrRemoveFavouritesButton() {
    return (
      <Pressable
        style={[Style.Styles.button, { backgroundColor: "yellow" }]}
        onPress={() => {
         
          if (user?.uid && event?.id) {
            userApi.addEventToFavourites(user.uid, event.id, user.displayName || "Something wrong happend") 
            getEventFromApi(id);
          }
        }}
      >
        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
         Legg til i favoritter
        </Text>
      </Pressable>
    );
  }
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
          {addOrRemoveFavouritesButton()}
          {manageParticipantsButton()}
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
