//
//
// Profile page

// Imports ----------------------------------
import * as userApi from "@/api/userApi";
import Event from "@/components/Event";
import { useAuthSession } from "@/providers/authctx";
import { Colors } from "@/styles/colors";
import { EventData } from "@/types/event";
import { Stack } from "expo-router";
import { useState, useEffect } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ----------------------------------
export default function ProfileTab() {
  // Variables
  const { user, signOut } = useAuthSession();
  const [events, setEvents] = useState<EventData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function getFavouriteEventsFromApi() {
    setIsRefreshing(true);

    const events = await userApi.getAllUserFavourites(user?.uid ?? "")

    setEvents(events ?? []);
    setIsRefreshing(false);
  }

  // UseEffect
  useEffect(() => {
    getFavouriteEventsFromApi();
  }, []);

  // Return ----------------------------------
  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            // Sign out button
            <Pressable
              style={{ paddingRight: 16 }}
              onPress={() => {
                signOut();
              }}
            >
              <Text
                style={{
                  color: Colors.mainColor,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                Logg ut
              </Text>
            </Pressable>
          ),
        }}
      />
      <Text>{user?.displayName}</Text>
      <Text>{user?.email}</Text>
      <Text>Mine favoritt dugnader</Text>
      <FlatList
        data={events}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={getFavouriteEventsFromApi}
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
  },
});
