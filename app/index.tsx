import { View, Text, Image, TouchableOpacity } from "react-native";
import "../global.css";
import { useRouter } from "expo-router";

export default function Index() {

const router = useRouter();

  return (
    <View className="flex-1 bg-sky-50">
      <View className="flex-1 items-center justify-center px-8">
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
          Welcome to ChapApp
        </Text>

        {/* Subtitle */}
        <Text className="text-base text-gray-600 mt-4 text-center leading-relaxed">
          Read our{" "}
          <Text className="font-semibold text-sky-500">
            Privacy Policy
          </Text>{" "}
          and{" "}
          <Text className="font-semibold text-sky-500">
            Terms &amp; Conditions
          </Text>
          . Tap{" "}
          <Text className="font-semibold">
            “Agree &amp; Continue”
          </Text>{" "}
          to accept and start using the app.
        </Text>

        {/* Primary Button */}
        <TouchableOpacity
          className="bg-sky-500 rounded-full px-10 py-3 mt-8 w-full max-w-xs items-center shadow-md shadow-sky-200"
          activeOpacity={0.8}
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

      {/* Footer */}
      <View className="items-center pb-6">
        <Text className="text-[11px] text-gray-400">
          © {new Date().getFullYear()} ChapApp. All rights reserved.
        </Text>
      </View>
    </View>
  );
}
