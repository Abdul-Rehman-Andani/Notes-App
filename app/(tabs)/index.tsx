import SearchBar from "@/components/SearchBar";
import { useUser } from "@/hooks/useUser";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeTab = () => {
  const { data: user, isPending } = useUser();

  // Get first letter safely
  const userInitial = user?.name?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <SafeAreaView className="flex-1 px-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex flex-row justify-between items-center mb-5">
          {/* Left Icon */}
          <View className="w-16 h-16 flex justify-center items-center p-1 rounded-full border-2 border-brand-yellow">
            <Image
              source={require("@/assets/icons/collage.png")}
              className="size-7"
              resizeMode="contain"
            />
          </View>

          {/* User Avatar + Name */}
          {isPending ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              onPress={() => router.push("/profile")}
              className="bg-brand-yellow h-16 px-4 rounded-full flex-row items-center gap-3"
            >
              {/* Avatar (Initials) */}
              <View className="w-12 h-12 rounded-full bg-note-purple justify-center items-center">
                <Text className="font-bold text-lg">{userInitial}</Text>
              </View>

              {/* Name */}
              <Text className="font-bold text-base">
                {user?.name ?? "User"}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Search Bar */}
        <SearchBar />

        {/* Hero Section */}
        <View className="mt-5">
          <Text className="text-[40px] leading-tight">
            Create and {"\n"}
            design {"\n"}
            your <Text className="font-bold">notes</Text> {"\n"}
            easily
          </Text>
        </View>

        {/* Create Note Card */}
        <View className="flex-row justify-center mt-20">
          <View className="w-[50%] h-[230px] bg-note-purple rounded-lg relative">
            {/* Background Layers */}
            <View className="w-full h-full bg-note-pink absolute -rotate-12 -z-10" />
            <View className="w-full h-full bg-note-mint absolute rotate-12 -z-10" />

            {/* Decorative Icons */}
            <Image
              source={require("@/assets/icons/spotify.png")}
              className="size-12 absolute top-9 left-8"
            />

            <Image
              source={require("@/assets/icons/barbell.png")}
              className="size-12 absolute bottom-16 left-16"
            />

            <Image
              source={require("@/assets/icons/bibimbap.png")}
              className="size-12 absolute top-16 right-10"
            />

            {/* Create Button */}
            <TouchableOpacity
              onPress={() => router.push("/creare-note")}
              className="w-20 h-20 flex justify-center items-center bg-white rounded-full absolute left-1/2 -translate-x-1/2 -bottom-10 shadow-lg"
            >
              <Image
                source={require("@/assets/icons/plus.png")}
                className="size-7"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTab;
