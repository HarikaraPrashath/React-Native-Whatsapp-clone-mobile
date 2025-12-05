import { router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
    const [phoneNumber, setPhoneNumber] = useState("+94");

    //validation can be added here
    const isValidNumber = /^\+\d{1,3}\s?\d{9}$/.test(phoneNumber);

    const handleNext = () => {
        if (!isValidNumber) {
            Alert.alert("Invalid Phone Number", "Please enter a valid phone number including country code.");
            return;
        }

        router.push({ pathname: "/otp", params: { phoneNumber } });
    }

    return (
        <SafeAreaView className="flex-1 bg-black">

            <View className="flex-1 px-6 justify-center bg-sky-50">

                {/* Heading */}
                <Text className="text-3xl font-extrabold text-sky-600 text-center mb-2">
                    Enter Your Phone Number
                </Text>

                {/* Description */}
                <Text className="text-gray-600 text-center mb-8 leading-relaxed">
                    PingMe will send an SMS to verify your number.
                </Text>

                {/* Phone Input Box */}
                <View className="bg-white p-4 rounded-2xl shadow-sm shadow-sky-100">
                    <TextInput
                        placeholder="+94 7xx xxx xxx"
                        keyboardType="phone-pad"
                        className="text-lg text-gray-800"
                        placeholderTextColor="#94a3b8"
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                    />
                </View>

                {/* Next Button */}
                <TouchableOpacity
                    className={`p-4 w-full ${isValidNumber ? 'bg-sky-500' : 'bg-gray-400'} rounded-full mt-8 items-center shadow-md shadow-sky-200`}
                    activeOpacity={0.8}
                    onPress={handleNext}
                    disabled={!isValidNumber}
                >
                    <Text className="text-white text-lg font-semibold">Next</Text>
                </TouchableOpacity>

                {/* Footer Tip */}
                <Text className="text-xs text-gray-400 text-center mt-4">
                    Standard SMS charges may apply.
                </Text>

            </View>
        </SafeAreaView>
    );
}
