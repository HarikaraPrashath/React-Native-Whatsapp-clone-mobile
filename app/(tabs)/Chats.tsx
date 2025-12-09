import { getUser } from "@/util/storage";
import { Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatListScreen() {
    const router = useRouter();
      const [activeCategory, setActiveCategory] = useState("All");


    const logout = async () => {
        await AsyncStorage.removeItem("user");
        router.push("/");
    };

    const getUserData = async () => {
        const userdata = await getUser();
        console.log("userdata", userdata);
    };

    useEffect(() => {
        getUserData();
    }, []);

    const categories = ["All", "Unread", "Favorites", "Groups"]
    return (
        <SafeAreaView className="flex-1 ">
            {/* HEADER */}
            <Header />
            <SearchBar />
            {/* Category Tabs */}
            <View className="mt-2 mb-3 mx-5 flex-row">
                {categories.map((c) => {
                    const isActive = activeCategory === c;
                    return (
                        <TouchableOpacity
                            key={c}
                            className={`mr-2 rounded-full px-4 py-2 ${isActive ? "bg-sky-600" : "bg-gray-100"
                                }`}
                            onPress={() => setActiveCategory(c)}
                        >
                            <Text
                                className={`text-sm font-semibold ${isActive ? "text-white" : "text-gray-700"
                                    }`}
                            >
                                {c}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>


            {/* BODY */}
            <View className="flex-1 px-4">
                {/* Search bar */}


                {/* AI quick action / info pill */}
                <View className="mb-4 flex-row items-center justify-between rounded-2xl bg-sky-50 px-4 py-3">
                    <View className="flex-row items-center">
                        <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-sky-100">
                            <Ionicons name="sparkles-outline" size={20} color="#0369a1" />
                        </View>
                        <View>
                            <Text className="text-sm font-semibold text-sky-900">
                                Chat with Ping AI
                            </Text>
                            <Text className="text-xs text-sky-800">
                                Summarize chats, draft replies & more
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity className="rounded-full bg-sky-600 px-3 py-1">
                        <Text className="text-xs font-semibold text-white">Try now</Text>
                    </TouchableOpacity>
                </View>

                {/* Placeholder for chat list */}
                <View className="flex-1 items-center justify-center">
                    <Ionicons name="chatbubbles-outline" size={40} color="#d1d5db" />
                    <Text className="mt-3 text-base font-semibold text-gray-700">
                        No chats yet
                    </Text>
                    <Text className="mt-1 text-sm text-gray-500 text-center">
                        Start a new conversation or ask something from AI.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );

    function Header() {
        return (
            <View className="px-4 pb-3 pt-2">
                <View className="mb-2 flex-row items-center justify-between">
                    {/* Left side: avatar + title */}
                    <View className="flex-row items-center">
                        {/* Avatar placeholder – replace with real user image later */}
                        <View className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-sky-100 items-center justify-center">
                            <Text className="text-base font-bold text-sky-700">P</Text>
                        </View>
                        <View>
                            <Text className="text-xs text-gray-500">Welcome back</Text>
                            <Text className="text-xl font-bold text-sky-700">Ping me</Text>
                        </View>
                    </View>

                    {/* Right side: icons */}
                    <View className="flex-row items-center">
                        <TouchableOpacity className="mr-4">
                            <Ionicons size={22} name="qr-code-outline" />
                        </TouchableOpacity>

                        <TouchableOpacity className="mr-4">
                            <Ionicons size={22} name="sparkles-outline" />
                        </TouchableOpacity>

                        <TouchableOpacity >
                            <Feather size={22} name="more-vertical" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

function SearchBar() {
    return (
        <View className="mb-3 mt-1 flex-row items-center rounded-2xl bg-gray-100 px-4 py-2 shadow-sm">
            <Ionicons name="search" size={20} color="gray" />
            <TextInput
                placeholder="Ask with AI or search chats"
                placeholderTextColor="#9ca3af"
                className="ml-2 flex-1 text-base text-gray-800"
            />
            <TouchableOpacity>
                <Ionicons name="mic-outline" size={20} color="#4A6CF7" />
            </TouchableOpacity>
        </View>
    )
}
