import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.8.181:5000/api";

export default function SetupScreen() {
  const [name, setName] = useState("");
  const { phoneNumber } = useLocalSearchParams();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/${phoneNumber}`);
      if (response.data) {
        setName(response.data.name || "");
        console.log("Fetched user data:", response.data);
        console.log("User name:", response.data.name);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchUser()
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-sky-50 px-6">
      <View className="flex-1 pt-12 pb-6">

        {/* Heading */}
        <Text className="text-3xl font-extrabold text-sky-600 text-center mb-2">
          Setup your Account
        </Text>

        <Text className="text-sm text-gray-500 text-center mb-8">
          Add your name and a profile photo so friends can recognize you.
        </Text>

        {/* Card */}
        <View className="bg-white rounded-2xl px-6 py-8 shadow-sm shadow-sky-100">

          {/* Profile Image Picker */}
          <View className="items-center mb-8">
            <TouchableOpacity
              className="w-28 h-28 rounded-full bg-sky-50 border border-sky-200 items-center justify-center overflow-hidden"
              activeOpacity={0.8}
              onPress={() => {
                // TODO: open image picker
              }}
            >
              <Image
                source={require("../assets/images/profile-placeholder.png")}
                className="w-28 h-28"
                resizeMode="cover"
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="mt-3"
              activeOpacity={0.7}
              onPress={() => {
                // TODO: open image picker
              }}
            >
              <Text className="text-sm font-medium text-sky-600">
                Upload Photo
              </Text>
            </TouchableOpacity>
          </View>

          {/* Name Input */}
          <View>
            <Text className="text-xs text-gray-500 mb-1">
              Full Name
            </Text>
            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor="#9ca3af"
              className="bg-sky-50 rounded-xl px-4 py-3 text-base text-gray-800 border border-sky-100"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          className="mt-8 w-full rounded-full bg-sky-500 py-3 items-center shadow-md shadow-sky-200"
          activeOpacity={0.85}
          onPress={() => {
            // TODO: handle complete setup
          }}
        >
          <Text className="text-white text-lg font-semibold">
            Complete Setup
          </Text>
        </TouchableOpacity>

        {/* Helper text */}
        <Text className="mt-4 text-xs text-gray-400 text-center">
          You can update your profile anytime from Settings.
        </Text>
      </View>
    </SafeAreaView>
  );
}
