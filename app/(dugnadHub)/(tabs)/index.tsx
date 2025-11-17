// Index page - home

import * as eventApi from "@/api/eventApi";
import Event from "@/components/Event";
import EventFormModal from "@/components/EventFormModal";
import { EventData } from "@/types/event";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ----------------------------------
export default function HomeTab() {

  const [events, setEvents] = useState<EventData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function getEventsFromApi() {
    setIsRefreshing(true);
    const events = await eventApi.getAllEvents();
    setEvents(events);
    setIsRefreshing(false);
  }

  useEffect(() => {
    getEventsFromApi();
  }, []);

  // Return ----------------------------------
  return (
    <View style={styles.mainContainer}>
      <Text>Hjem</Text>
      <Pressable onPress={() => setIsModalVisible(true)}>
        <Text> Lag en event</Text>
      </Pressable>
      <FlatList
        data={events}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={getEventsFromApi}
          />
        }
        ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
        renderItem={(event) => <Event eventData={event.item}></Event>}
      ></FlatList>

      {/* Modal */}
      <EventFormModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        confirmEventAdded={async () => {
          await getEventsFromApi();
        }}
      />
    </View>
  );
}

// Style ----------------------------------
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
});
