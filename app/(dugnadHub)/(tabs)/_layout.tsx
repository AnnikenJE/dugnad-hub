//
//
// Tab bar layout

// Imports ----------------------------------
import { Colors } from "@/styles/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

// ----------------------------------
export default function TabBar() {
  // Return ----------------------------------
  return (
    <Tabs
      screenOptions={{
        title: "hjem",
        tabBarActiveTintColor: Colors.mainColor,
        tabBarInactiveTintColor: Colors.gray,
        headerTitleStyle: {
          fontWeight: "bold",
          color: Colors.mainColor,
          fontSize: 25,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hjem",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="registrations"
        options={{
          title: "Mine Dugnader",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list-ul" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
