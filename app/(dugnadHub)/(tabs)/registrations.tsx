import * as eventApi from "@/api/eventApi";
import Event from "@/components/Event";
import { useAuthSession } from "@/providers/authctx";
import { EventData } from "@/types/event";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

// ----------------------------------
export default function RegistrationsTab() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isShowingMadeByUser, setIsShowingMadeByUser] = useState(true)
  const { user } = useAuthSession();

  async function getEventsFromApi() {
    setIsRefreshing(true);

    const events = await eventApi.getEventsByUserId(user?.uid ?? "");

    setEvents(events ?? []);
    setIsRefreshing(false);
  }

  useEffect(() => {
    getEventsFromApi();
  }, []);

  //  Return ----------------------------------
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={events}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={getEventsFromApi}
          />
        }
        renderItem={(event) => <Event eventData={event.item}></Event>}
      ></FlatList>
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
