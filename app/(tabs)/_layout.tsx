import { useUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator } from "react-native";

const TabLayout = () => {
  const { data: user, isPending } = useUser();

  if (!user) {
    return <Redirect href={"/(auth)"} />;
  }

  if (isPending) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          position: "absolute", // <--- Force it to sit on top of the content
          backgroundColor: "black",
          height: 100,
          paddingTop: 8,
          borderTopColor: "#FCE38A",
          borderTopWidth: 0, // Removes the physical border line
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "document-text" : "document-text-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
