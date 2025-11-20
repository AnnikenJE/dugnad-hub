//
//
// Registrations page - Shows events connected to user

// Imports ----------------------------------
import * as eventApi from "@/api/eventApi";
import Event from "@/components/Event";
import { useAuthSession } from "@/providers/authctx";
import { Colors } from "@/styles/colors";
import { Styles } from "@/styles/componentStyle";
import { EventData } from "@/types/event";
import { useIsFocused } from "@react-navigation/native";
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
  // Variables
  const [events, setEvents] = useState<EventData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isShowingMadeByUser, setIsShowingMadeByUser] = useState(true);
  const { user } = useAuthSession();
  const isTabFocused = useIsFocused();

  // Functions
  async function getUserMadeEventsFromApi() {
    setIsRefreshing(true);
    const events = await eventApi.getEventsByUserId(user?.uid ?? "");
    setEvents(events ?? []);
    setIsRefreshing(false);
  }

  async function getUserParticipatedEventsFromApi() {
    setIsRefreshing(true);
    const events = await eventApi.getEventsByParticipation(user?.uid ?? "");
    console.log("fefe");
    setEvents(events ?? []);
    setIsRefreshing(false);
  }

  function checkIfEventsExistList() {
    if (events.length === 0) {
      return (
        <View>
          <Text style={{ textAlign: "center" }}>Ingen dugnader.</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={events}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={
                isShowingMadeByUser
                  ? getUserMadeEventsFromApi
                  : getUserParticipatedEventsFromApi
              }
            />
          }
          renderItem={(event) => <Event eventData={event.item}></Event>}
        ></FlatList>
      );
    }
  }

  function showUserMadeEvents() {
    return (
      <Pressable
        style={[Styles.button, { backgroundColor: Colors.gray }]}
        onPress={() => {
          getUserMadeEventsFromApi();
          setIsShowingMadeByUser(true);
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Se mine opprettede dugnader
        </Text>
      </Pressable>
    );
  }

  function showUserEventParticipation() {
    return (
      <Pressable
        style={[Styles.button, { backgroundColor: Colors.mainColor }]}
        onPress={() => {
          setIsShowingMadeByUser(false);
          getUserParticipatedEventsFromApi();
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Se påmeldte dugnader
        </Text>
      </Pressable>
    );
  }

  // UseEffect

  useEffect(() => {
    if (isTabFocused) {
      // Sourcce: https://reactnavigation.org/docs/use-is-focused/
      /* Got some problems when I tried to use props as confirmEventAdded or similar,
     but I ran into many problems so I found another solution. It checks if the tab
      is focused and will do call if it */
      getUserMadeEventsFromApi();
      setIsShowingMadeByUser(true);
    }
  }, [isTabFocused]);

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
        {isShowingMadeByUser
          ? showUserEventParticipation()
          : showUserMadeEvents()}
        {checkIfEventsExistList()}
      </View>
    </View>
  );
}

// Style ----------------------------------
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 40,
  },
});
