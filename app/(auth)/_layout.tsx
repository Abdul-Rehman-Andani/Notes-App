import { useUser } from "@/hooks/useUser";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const AuthLayout = () => {
  const { data: user, isPending } = useUser();

  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
