import { fetchChats } from "@/util/app";
import { getUser } from "@/util/storage";
import {
    Ionicons,
    Feather,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatStore } from "@/store/chatStore";

export default function ChatListScreen() {
    const setChats = useChatStore(state =>state.setChats)
    const chats = useChatStore(state =>state.chats)
    const [user, setUser] = useState<any | null>(null);
    const router = useRouter();

    const logout = async () => {
        await AsyncStorage.removeItem("user");
        router.push("/");
    };

    const getUserData = async () => {
        const userdata = await getUser();
        console.log("userdata", userdata);

        // if your storage returns { message, user }, take userdata.user,
        // otherwise fallback to userdata itself
        setUser(userdata?.user ?? userdata);
    };

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        // wait until user is loaded and has _id
        if (!user?._id) return;

        const loadChat = async () => {
            try {
                const response_data = await fetchChats(user._id);
                setChats(response_data);
            } catch (err) {
                console.log("Error fetching chats:", err);
            }
        };

        loadChat();
    }, [user]);

    return (
        <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
            <Header />
            <View className="flex-1 bg-sky-100">
                <ChatList data={chats} user={user} />
            </View>
        </SafeAreaView>
    );

    function Header() {
        return (
            <View className="px-4 pb-3 pt-2">
                <View className="mb-2 flex-row items-center justify-between">
                    {/* Left side: avatar + title */}
                    <View className="flex-row items-center">
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

                        <TouchableOpacity>
                            <Feather size={22} name="more-vertical" onPress={logout}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

function Categories() {
    const categories = ["All", "Unread", "Favorites", "Groups"];
    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <View className="mt-2 mb-3 mx-5 flex-row">
            {categories.map((c) => {
                const isActive = activeCategory === c;
                return (
                    <TouchableOpacity
                        key={c}
                        className={`mr-2 rounded-full px-4 py-2 ${isActive ? "bg-sky-600" : "bg-white"
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
    );
}

function SearchBar() {
    return (
        <View className="mb-3 mt-1 flex-row items-center rounded-2xl bg-white px-4 py-2 shadow-sm">
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
    );
}

function ChatList({ data, user }: { data: any[]; user: any }) {
    // If no data or empty → show empty placeholder
    if (!data || data.length === 0) {
        return <EmptyChats />;
    }

    const formatChat = (conv: any) => {
        const otherUser = conv?.participants?.find(
            (u: any) => u._id !== user._id
        );
        

        return {
            ...conv,
            name: otherUser?.phone,
            avatar: otherUser?.profileImageUrl ?? null,
            lastMessage: conv?.lastMessage?.text,
            unread: conv?.unreadCounts?.[user._id] ?? 0, 
            createdAt: new Date(conv?.lastMessage?.createdAt).toLocaleTimeString([],{
                hour:"2-digit",minute:"2-digit"
            }),
        };
    };
console.log("raw conversations:", JSON.stringify(data[0], null, 2));
console.log("userId:", user?._id);
    const formattedData = data.map((chat) => formatChat(chat));

    return (
        <View className="flex-1">
            <FlatList
                ListHeaderComponent={() => (
                    <>
                        <SearchBar />
                        <Categories />
                    </>
                )}
                ListFooterComponent={() => (
                    <View className="py-3 items-center justify-center">
                        <MaterialCommunityIcons name="lock-outline" size={16} color="gray" />
                        <Text className="text-gray-500 mt-2 text-xs">
                            Your personal messages are not end-to-end encrypted
                        </Text>
                    </View>
                )}
                data={formattedData}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="mx-1 mt-2 flex-row items-center rounded-2xl bg-white px-4 py-3"
                        activeOpacity={0.7}
                        style={{
                            shadowColor: "#000",
                            shadowOpacity: 0.06,
                            shadowRadius: 6,
                            shadowOffset: { width: 0, height: 3 },
                            elevation: 2,
                        }}
                    >
                        {/* Avatar */}
                        <View className="relative">
                            <Image
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 26,
                                }}
                                source={{ uri: item.avatar }}
                            />
                        </View>

                        {/* Text content */}
                        <View className="ml-4 flex-1">
                            {/* Top row: name + time */}
                            <View className="mb-1 flex-row items-center justify-between">
                                <Text
                                    className="text-[16px] font-semibold text-gray-900 ml-2"
                                    numberOfLines={1}
                                >
                                    {item.name}
                                </Text>

                                <Text className="ml-2 text-[11px] font-semibold text-gray-400">
                                    {item.createdAt}
                                </Text>
                            </View>

                            {/* Bottom row: last message + unread badge */}
                            <View className="flex-row items-center justify-between">
                                <Text
                                    numberOfLines={1}
                                    className="flex-1 text-[13px] text-gray-600 ml-2"
                                >
                                    {item.lastMessage}
                                </Text>

                                {item.unread > 0 && (
                                    <View className="ml-3 h-7 min-w-[24px] items-center justify-center rounded-full bg-sky-600 px-2 py-1">
                                        <Text className="text-[11px] font-bold text-white">
                                            {item.unread}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={{
                    paddingBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

function EmptyChats() {
    return (
        <View className="flex-1 px-4 pt-2 bg-sky-100">
            {/* AI quick action / info pill */}
            <View className="mb-4 flex-row items-center justify-between rounded-2xl bg-sky-50 px-4 py-3">
                <View className="flex-row items-center">
                    <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-sky-100">
                        <Ionicons name="sparkles-outline" size={20} color="#0369a1" />
                    </View>
                    <View>
                        <Text className="text-sm font-semibold text-sky-900">
                            Chat with Ping AI
                        </Text>
                        <Text className="text-xs text-sky-800">
                            Summarize chats, draft replies &amp; more
                        </Text>
                    </View>
                </View>

                <TouchableOpacity className="rounded-full bg-sky-600 px-3 py-1">
                    <Text className="text-xs font-semibold text-white">Try now</Text>
                </TouchableOpacity>
            </View>

            {/* Empty state / placeholder */}
            <View className="flex-1 items-center justify-center">
                <Ionicons name="chatbubbles-outline" size={40} color="#d1d5db" />
                <Text className="mt-3 text-base font-semibold text-gray-700">
                    No chats yet
                </Text>
                <Text className="mt-1 text-sm text-gray-500 text-center">
                    Start a new conversation or ask something from AI.
                </Text>
            </View>

            {/* Bottom CTA button */}
            <TouchableOpacity
                className="self-center mb-6 flex-row items-center bg-sky-600 rounded-full px-6 py-3"
                style={{
                    elevation: 6,
                    shadowColor: "#000",
                    shadowOpacity: 0.25,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 2 },
                }}
            >
                <View className="flex-row items-center justify-between">
                    {/* Left Icon */}
                    <View className="h-9 w-9 rounded-full items-center justify-center">
                        <Ionicons name="chatbubbles-outline" size={20} color="white" />
                    </View>

                    {/* Center Text */}
                    <Text className="mx-3 flex-1 text-center text-white text-[15px] font-semibold tracking-wide">
                        Begin Your First Chat
                    </Text>

                    {/* Right Arrow */}
                    <View className="h-9 w-9 rounded-full items-center justify-center">
                        <Ionicons name="arrow-forward-outline" size={20} color="white" />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
