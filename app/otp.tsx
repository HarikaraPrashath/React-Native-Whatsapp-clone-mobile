import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OTPScreen() {
  const { phoneNumber } = useLocalSearchParams();
  const router = useRouter();

  const [generatedOTP, setGeneratedOTP] = useState("");
  const [OTP, setOTP] = useState("");
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");

  const isOTPComplete = OTP.length === 6;
  const canResend = timer === 0;
  const generateRandomOTP = () => {
    const randomOTP = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(randomOTP);
    console.log("Generated OTP", randomOTP); //Debug
  }

  const resendOtp = () => {
    generateRandomOTP();
    setTimer(30);
  }

  // Verify OTP
  const handleVerify = () => {
    setError("");
    if (OTP.length !== 6) {
      // Set Error
      setError("OTP must be 6 digits.")
      return;
    }

    if (OTP !== generatedOTP) {
      setError("Incorrect OTP. Please try again.");
      return;
    }

    // Success
    router.push({ pathname: "/account-setup", params: { phoneNumber } })
  }

  // Generate OTP & Start Timer on Screen Load
  useEffect(() => {
    generateRandomOTP();
    const intervel = setInterval(() => setTimer((prev) => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(intervel)
  }, [])
  return (
    <SafeAreaView className="flex-1 bg-sky-50">
      <View className="flex-1 px-6 pt-10 pb-6 justify-center">
        {/* Heading */}
        <Text className="text-3xl font-extrabold text-sky-600 text-center mb-2">
          Enter OTP
        </Text>

        {/* Description */}
        <Text className="text-gray-600 text-center mb-4 leading-relaxed">
          We&apos;ve sent a 6-digit verification code to{" "}
          <Text className="font-semibold text-sky-600">{phoneNumber}</Text>.
        </Text>

        {/* Debug OTP (for development / testing) */}
        <Text className="text-[11px] text-center text-gray-400 mb-4">
          Debug OTP: <Text className="font-mono">{generatedOTP}</Text>
        </Text>

        {/* OTP Input Card */}
        <View className="bg-white p-5 rounded-2xl shadow-sm shadow-sky-100 mb-4">
          <Text className="text-xs text-gray-400 mb-2 text-center">
            Enter the 6-digit code
          </Text>
          <TextInput
            keyboardType="number-pad"
            value={OTP}
            onChangeText={text => {
              setOTP(text);
              if (error) setError("");
            }}
            maxLength={6}
            className="text-2xl tracking-[10px] text-center text-gray-900"
            placeholder="••••••"
            placeholderTextColor="#cbd5f5"
          />
          {error ? (
            <Text className="text-xs text-red-500 mt-2 text-center">
              {error}
            </Text>
          ) : null}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          className={`rounded-full py-3 items-center shadow-md shadow-sky-200 ${isOTPComplete ? "bg-sky-500" : "bg-gray-400"
            }`}
          activeOpacity={0.8}
          disabled={!isOTPComplete}
          onPress={handleVerify}
        >
          <Text className="text-white text-lg font-semibold">Verify OTP</Text>
        </TouchableOpacity>

        {/* Links Row */}
        <View className="mt-6 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => {
              router.push("/login");
            }}
          >
            <Text className="text-sm font-medium text-sky-600">
              Change Number
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={resendOtp} disabled={!canResend}>
            <Text
              className={`text-sm font-medium ${canResend ? "text-sky-600" : "text-gray-400"
                }`}
            >
              {canResend ? "Resend OTP" : `Resend in ${timer}s`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer tip */}
        <Text className="text-xs text-gray-400 text-center mt-6">
          Make sure your phone has network coverage and SMS is enabled.
        </Text>
      </View>
    </SafeAreaView>
  );
}
