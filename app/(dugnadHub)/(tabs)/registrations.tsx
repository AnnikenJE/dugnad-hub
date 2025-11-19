import * as eventApi from "@/api/eventApi";
import Event from "@/components/Event";
import { useAuthSession } from "@/providers/authctx";
import { Colors } from "@/styles/colors";
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
export default function RegistrationsTab() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isShowingMadeByUser, setIsShowingMadeByUser] = useState(true);
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

  function checkIfEventsExist() {
    if (events.length === 0) {
      return (
        <View>
          <Text>Ingen eventer.</Text>
        </View>
      );
    } else {
      return (
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
      );
    }
  }

  //  Return ----------------------------------
  return (
    <View style={styles.mainContainer}>
      <Text
        style={{
          textAlign: "center",
          padding: 8,
          margin: 8,
          color: Colors.mainColor,
          fontWeight: "bold",
          fontSize: 20,
          borderRadius: 8,
          backgroundColor: Colors.mainColorLight,
        }}
      >
        Dugnader opprettet av {user?.displayName}
      </Text>
      <View>
        <Pressable onPress={() => {}}>
          <Text
            style={{
              color: Colors.mainColor,
              fontWeight: "bold",
            }}
          >
            Se påmeldte dugnader
          </Text>
        </Pressable>
        {checkIfEventsExist()}
      </View>
    </View>
  );
}

// Style ----------------------------------
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    paddingTop: 40
  },
});
