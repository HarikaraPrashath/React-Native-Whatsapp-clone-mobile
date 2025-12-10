import { useChatStore } from "@/store/chatStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const unreadCount = useChatStore(state => state.getUnreadChatCount())
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "black" }}
      edges={["top"]} // no bottom safe area
    >
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#4A6CF7",
          tabBarInactiveTintColor: "#8e8e8e",
          tabBarStyle: {
            height: 100,
            paddingTop: 8,
            paddingBottom: 2,
            backgroundColor: "#fff",
            borderTopWidth: 1,
          },
          tabBarIcon: ({ color }) => {
            let iconName: string;
            let IconComponent: typeof Ionicons | typeof MaterialCommunityIcons =
              Ionicons;

            // use the EXACT names from <Tabs.Screen name="...">
            switch (route.name) {
              case "Chats":
                iconName = "chatbubbles";
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
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 16,
                  }}
                >
                  <View style={{ position: "relative" }}>
                    {/* Icon */}
                    <IconComponent
                      name={iconName as any}
                      size={24}
                      color={color}
                    />

                    {/* Chats badge */}
                    {route.name === "Chats" && (
                      <View
                        style={{
                          position: "absolute",
                          top: -4,
                          right: -10,
                          backgroundColor: "#2563eb",
                          minWidth: 18,
                          height: 18,
                          borderRadius: 9,
                          paddingHorizontal: 4,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 10,
                            fontWeight: "700",
                          }}
                        >
                          {unreadCount}
                        </Text>
                      </View>
                    )}

                    {/* Updates badge */}
                    {route.name === "Updates" && (
                      <View
                        style={{
                          position: "absolute",
                          top: -4,
                          right: -10,
                          backgroundColor: "#2563eb",
                          minWidth: 18,
                          height: 18,
                          borderRadius: 9,
                          paddingHorizontal: 4,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 10,
                            fontWeight: "700",
                          }}
                        >
                          2
                        </Text>
                      </View>
                    )}

                    {/* Calls badge */}
                    {route.name === "Calls" && (
                      <View
                        style={{
                          position: "absolute",
                          top: -4,
                          right: -10,
                          backgroundColor: "#2563eb",
                          minWidth: 18,
                          height: 18,
                          borderRadius: 9,
                          paddingHorizontal: 4,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 10,
                            fontWeight: "700",
                          }}
                        >
                          2
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          },
        })}
      >
        {/* 👇 route.name values used above must match these exactly */}
        <Tabs.Screen name="chats" options={{ title: "Chats" }} />
        <Tabs.Screen name="Updates" options={{ title: "Updates" }} />
        <Tabs.Screen name="Community" options={{ title: "Community" }} />
        <Tabs.Screen name="Calls" options={{ title: "Calls" }} />
      </Tabs>
    </SafeAreaView>
  );
}
