// Events in index(home)

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
                    params:{id: eventData.id}
        })


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
        <View>
          <Text>{eventData.title}</Text>
        </View>
      </View>
    </Pressable>
  );
}

// Styles ----------------------------------
const style = StyleSheet.create({
  container: {
    backgroundColor: "pink",
  },
  image: {
    height: 250,
    width: "100%",
    borderRadius: 8,
  },
});
