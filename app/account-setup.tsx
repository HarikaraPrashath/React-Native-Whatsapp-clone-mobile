import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator, BackHandler } from "react-native";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { createUser, fetchUser, updateUser } from "@/util/app";
import { saveUser } from "@/util/storage";

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://192.168.8.181:5000/api";

export default function SetupScreen() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const { phoneNumber } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loadUser = async () => {
    try {
      const data = await fetchUser(phoneNumber)
      if (data) {
        setName(data.name || "");
        setId(data._id || "");
        setProfileImage(data.profileImage || "");

        console.log("Fetched user data:", data);
        console.log("User name:", data.name);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const picImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    })

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  }

  //Save or Update user Profile
  const saveProfile = async () => {
    if (!name.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("phone", phoneNumber as string);
      formData.append("name", name);

      setLoading(true);
      if (profileImage && profileImage.startsWith("file://")) {
        formData.append("profileImage", {
          uri: profileImage,
          name: "profile.jpg",
          type: "image/jpeg"
        } as any);
      }
      setLoading(true)
      let response

      if (id) {
       response = await updateUser(id,formData)
      }
      else {
       response = await createUser(formData)

      }

      if (response) {
        //Success
        await saveUser(response)
        router.push("/Chats");
        console.log("Profile saved:", response.data);

      }

      else {
        Alert.alert("Error", "Failed to save User information. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser()
    const handleBackPress = () => {
      router.replace('/');
      return true; // Prevent default behavior (exit app)
    }
    //Listen back button press to exit app
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  }, []);

  if (loading) return loading && <ActivityIndicator size="large" color="#00ff00" animating={loading} className="flex-1 justify-center" />;

  return (
    <SafeAreaView className="flex-1   bg-black">
      <View className="flex-1 pt-12 pb-6 px-6 bg-sky-50">

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
              onPress={picImage}
            >
              {profileImage ? <Image
                source={{ uri: profileImage }}
                className="w-28 h-28"
                resizeMode="cover"
              /> :
                <View className="w--32 h-32 rounded-full justify-center items-center  border-gray-500 ">
                  <Text className="text-xl text-sky-300">Add image</Text>
                </View>
              }
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
          onPress={saveProfile}
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
