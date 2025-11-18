import * as eventApi from "@/api/eventApi";
import { Colors } from "@/styles/colors";
import * as Style from "@/styles/componentStyle";
import { EventData } from "@/types/event";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [event, setEvent] = useState<EventData | null>(null);

  async function getEventFromApi(id: string) {
    const event = await eventApi.getEventById(id);
    setEvent(event);
  }

  useEffect(() => {
    getEventFromApi(id);
  }, [id]);


  
  if (event === null) {
    return (
      <View style={Style.Styles.centerContainer}>
        <Text style={{ color: Colors.mainColor }}>Henter dugnad...</Text>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (

    <View style={Style.Styles.centerContainer}>
          <Stack.Screen 
          options={{
            title: event.title,
            headerBackTitle: "Tilbake"
          }}/>
      <View>
        <Text>{event.title}</Text>
      </View>
      <Pressable onPress={() => router.back()}>
        <Text>Gå tilbake</Text>
      </Pressable>
    </View>
  );
}
