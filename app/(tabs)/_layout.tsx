import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "black" }}
      edges={["top"]}   //important no bottom safe area
    >
      <Tabs
        
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#4A6CF7",
          tabBarInactiveTintColor: "#8e8e8e",
          tabBarStyle: {
            height: 100,
            paddingTop: 8,
            paddingBottom: 2,   //remove extra bottom padding
            backgroundColor: "#fff",
            borderTopWidth: 1,
              shadowColor: "#000",

            borderTopColor: "#ddd",
          },
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            let IconComponent: typeof Ionicons | typeof MaterialCommunityIcons = Ionicons;

            switch (route.name) {
              case "chats":
                iconName = "chatbubble";
                break;
              case "Updates":
                IconComponent = MaterialCommunityIcons;
                iconName = "update";
                break;
              case "Community":
                iconName = "people";
                break;
              case "Calls":
                iconName = "call";
                break;
              default:
                iconName = "home";
                break;
            }

            return (
              <View
                style={{
                  width: 48,
                  height: 48,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 16,
                }}
              >
                <IconComponent name={iconName as any} size={24} color={color} />
              </View>
            );
          },
        })}
      >
        <Tabs.Screen name="chats" options={{ title: "Chats" }} />
        <Tabs.Screen name="Updates" options={{ title: "Updates" }} />
        <Tabs.Screen name="Community" options={{ title: "Community" }} />
        <Tabs.Screen name="Calls" options={{ title: "Calls" }} />
      </Tabs>
    </SafeAreaView>
  );
}
