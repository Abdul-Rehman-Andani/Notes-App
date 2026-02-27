import { useLogout } from "@/hooks/useLogout";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileTab = () => {
  const { mutate: logout, isPending } = useLogout();

  return (
    <SafeAreaView className="flex-1 px-6">
      <TouchableOpacity
        onPress={() => logout()}
        className="bg-red-400 py-4 rounded-lg"
      >
        {isPending ? (
          <ActivityIndicator size={"small"} />
        ) : (
          <View className="flex-row justify-center items-center gap-3">
            <Text className="text-white text-center font-bold text-lg">
              Logout
            </Text>
            <Image
              source={require("@/assets/icons/logout.png")}
              tintColor={"white"}
              className="size-7"
            />
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileTab;
