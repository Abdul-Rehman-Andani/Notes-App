import { useUser } from "@/hooks/useUser";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

const AuthLayout = () => {
  const { data: user, isPending } = useUser();

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
