//
//
// Index page - home

// Imports ----------------------------------
import * as eventApi from "@/api/eventApi";
import Event from "@/components/Event";
import EventFormModal from "@/components/EventFormModal";
import { Colors } from "@/styles/colors";
import { Styles } from "@/styles/componentStyle";
import { EventData } from "@/types/event";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// ----------------------------------
export default function HomeTab() {
  // Variables
  const [events, setEvents] = useState<EventData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchtext, setSearchText] = useState("");

  // Functions
  async function getEventsFromApi() {
    setIsRefreshing(true);
    const events = await eventApi.getAllEvents();
    setEvents(events);
    setIsRefreshing(false);
  }

  async function getSearchResults() {
    setIsRefreshing(true);
    const events = await eventApi.getSearchedEvents(searchtext);
    setEvents(events);
    setIsRefreshing(false);
  }

  //UseEffect
  useEffect(() => {
    const delay = setTimeout(() => {
      getSearchResults();
    }, 800);
    return () => clearTimeout(delay);
  }, [searchtext]);

  useEffect(() => {
    getEventsFromApi();
  }, []);

  // Return ----------------------------------
  return (
    <View style={styles.mainContainer}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              style={{ paddingRight: 16 }}
              onPress={() => setIsModalVisible(true)}
            >
              <Text
                style={{
                  color: Colors.mainColor,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
              >
                Lag event
              </Text>
            </Pressable>
          ),
        }}
      />
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
        Alle dugnader
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View
          style={{ alignItems: "center", justifyContent: "center", margin: 8 }}
        >
          <FontAwesome name="search" size={24} color={Colors.gray} />
        </View>

        <TextInput
          placeholder="Søk etter tittel"
          style={[Styles.textField, { width: "60%" }]}
          value={searchtext}
          onChangeText={setSearchText}
        ></TextInput>
      </View>
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
