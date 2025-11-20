//
//
// Profile page

// Imports ----------------------------------
import * as userApi from "@/api/userApi";
import Event from "@/components/Event";
import { useAuthSession } from "@/providers/authctx";
import { Colors } from "@/styles/colors";
import { EventData } from "@/types/event";
import { useIsFocused } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";

// ----------------------------------
export default function ProfileTab() {
  // Variables
  const { user, signOut } = useAuthSession();
  const [events, setEvents] = useState<EventData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isTabFocused = useIsFocused();

  // Fuctions
  async function getFavouriteEventsFromApi() {
    setIsRefreshing(true);
    const events = await userApi.getAllUserFavourites(user?.uid ?? "");
    setEvents(events ?? []);
    setIsRefreshing(false);
  }

  function checkIfFavoritesExistList() {
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
              onRefresh={getFavouriteEventsFromApi}
            />
          }
          renderItem={(event) => <Event eventData={event.item}></Event>}
        ></FlatList>
      );
    }
  }

  // UseEffects
  useEffect(() => {
    getFavouriteEventsFromApi();
  }, []);

  useEffect(() => {
    // Source: https://reactnavigation.org/docs/use-is-focused/
    /* Got some problems when I tried to use props as confirmEventAdded or similar,
     but I ran into many problems so I found another solution. It checks if the tab
      is focused and will do call to api */
    if (isTabFocused) {
      getFavouriteEventsFromApi();
    }
  }, [isTabFocused]);

  // Return ----------------------------------
  return (
    <View>
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
      <View
        style={{
          margin: 10,
          borderWidth: 1,
          borderColor: Colors.mainColor,
          padding: 16,
          borderRadius: 16,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 30 }}>
          Brukernavn: {user?.displayName}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 18 }}>
          Epost: {user?.email}
        </Text>
      </View>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          marginTop: 20,
          color: Colors.mainColor,
        }}
      >
        Mine favoritt dugnader
      </Text>
      {checkIfFavoritesExistList()}
    </View>
  );
}
