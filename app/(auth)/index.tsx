import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("@/assets/images/bg.png")}
        resizeMode="cover"
        className="w-full h-full"
      >
        <View className="flex-1 flex-col justify-end z-10 px-6 mb-5">
          <TouchableOpacity className="bg-black px-6 rounded-full py-5 flex flex-row items-center justify-between">
            <View></View>
            <Text className="text-center text-white text-lg">Get Started</Text>
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
