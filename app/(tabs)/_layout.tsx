import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabBar() {

  return (
    <Tabs screenOptions={{ title: "hjem" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Hjem",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="registrations"
        options={{
          title: "Mine Dugnader",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list-ul" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
