import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getUser } from "@/util/storage";

export default function Index() {
  const router = useRouter();
  const [loading,setLoading]= useState(false)
  const  redirectUser= async ()=>{
    try {
      setLoading(true)
      const user = await getUser();
      if(user !== null && user !== undefined){
        router.push("/(tabs)/Chats");
      }
      
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    redirectUser();
  }, []);

  if (loading) return loading && <ActivityIndicator size="large" color="#00ff00" animating={loading} className="flex-1 justify-center" />;
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 items-center justify-center px-8 bg-sky-50">
        {/* Logo */}
        <View className="mb-8 rounded-3xl bg-white p-6 shadow-lg shadow-sky-100">
          <Image
            className="w-24 h-24"
            source={require("../assets/images/logo.png")}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text className="text-3xl font-extrabold text-sky-500 text-center">
          Welcome to PingMe
        </Text>

        {/* Subtitle */}
        <Text className="text-base text-gray-600 mt-4 text-center leading-relaxed">
          Read our{" "}
          <Text className="font-semibold text-sky-500">Privacy Policy</Text> and{" "}
          <Text className="font-semibold text-sky-500">
            Terms &amp; Conditions
          </Text>
          . Tap <Text className="font-semibold">“Agree &amp; Continue”</Text> to
          accept and start using the app.
        </Text>

        {/* Primary Button */}
        <TouchableOpacity
          className="bg-sky-500 rounded-full px-10 py-3 mt-8 w-full max-w-xs items-center shadow-md shadow-sky-200"
          activeOpacity={0.8}
          onPress={() => router.push("/login")}
        >
          <Text className="text-white text-lg font-semibold">
            Agree &amp; Continue
          </Text>
        </TouchableOpacity>

        {/* Secondary helper text */}
        <Text className="text-xs text-gray-400 mt-4 text-center px-6">
          You can change these preferences anytime from Settings.
        </Text>

      </View>


    </SafeAreaView>
  );
}
