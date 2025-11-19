// Events in index(home)

// Imports ----------------------------------
import { Colors } from "@/styles/colors";
import { EventData } from "@/types/event";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

// Props ----------------------------------
export type EventProps = {
  eventData: EventData;
};

// ----------------------------------
export default function Event({ eventData }: EventProps) {
  // Return ----------------------------------
  return (
    <Pressable
      style={style.container}
      onPress={() => {
        router.push({
          pathname: "/event-details/[id]",
          params: { id: eventData.id },
        });
      }}
    >
      <View>
        <Image
          accessible={true}
          accessibilityLabel="Chosen image by event creator."
          accessibilityRole="link"
          source={{ uri: eventData.imageUri }}
          resizeMode="cover"
          style={style.image}
        />
        <View style={[style.textContainer]}>
          <Text
            style={{
              textDecorationLine: "underline",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 15,
              color: Colors.mainColor,
            }}
          >
            {eventData.title}
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text>Opprettet av: {eventData.authorName}</Text>
            <Text>Kategori: {eventData.category}</Text>
            <Text>
              {eventData.participants.length} / {eventData.maxParticipants}{" "}
              påmeldte
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

// Styles ----------------------------------
const style = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.mainColor,
  },
  image: {
    height: 250,
    width: "100%",
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  textContainer: {
    backgroundColor: "white",
    width: "100%",
    height: 100,
    padding: 16,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
});
