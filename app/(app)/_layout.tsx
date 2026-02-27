import { useUser } from "@/hooks/useUser";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";

const AppLayout = () => {
  const { data: user, isPending } = useUser();

  if (!user) {
    return <Redirect href={"/(auth)"} />;
  }

  if (isPending) {
    return <ActivityIndicator size={"large"} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AppLayout;
