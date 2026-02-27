import { useGoogleLogin } from "@/hooks/useGoogleLogin"; // adjust path if needed
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const { mutate: login, isPending, isError, error } = useGoogleLogin();

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("@/assets/images/bg.png")}
        resizeMode="cover"
        className="w-full h-full"
      >
        <View className="flex-1 flex-col justify-end z-10 px-6 mb-5">
          {/* Show error inside app */}
          {isError && (
            <Text className="text-red-500 text-center mb-3">
              {error?.message || "Login failed"}
            </Text>
          )}

          <TouchableOpacity
            onPress={() => login()} // 🔥 trigger mutation
            disabled={isPending} // disable while loading
            className="bg-black px-6 rounded-full py-5 flex flex-row items-center justify-between"
          >
            <View />

            <Text className="text-center text-white text-lg">
              {isError ? <ActivityIndicator size={"small"} /> : "Get Started"}
            </Text>

            <Image
              source={require("@/assets/images/next.png")}
              className="size-8"
              tintColor={"white"}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;
