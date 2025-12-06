import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatListScreen() {
    const router = useRouter();

    const logout = async ()=>{
        await AsyncStorage.removeItem("user");
        //redirect to welcome screen
        router.push("/");
    }

    const getUser = async()=>{
     return await AsyncStorage.getItem("user")
    }
    
    return (
        <SafeAreaView className="flex-1 bg-black ">
            <View className="bg-sky-50 flex-1 items-center justify-center px-8">
                <TouchableOpacity onPress={logout}>
                    <Text className="text-3xl font-extrabold text-sky-600 text-center ">
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}