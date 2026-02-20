import SearchBar from "@/components/SearchBar";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const HomeTab = () => {
  return (
    <SafeAreaView className="flex-1 px-6">
      <ScrollView>
        {/* Header */}

        <View className="flex flex-row justify-between items-center mb-5">
          <View className="w-16 h-16 flex justify-center items-center  p-1 rounded-full border-2 border-brand-yellow">
            <Image
              source={require("@/assets/icons/collage.png")}
              className="size-7"
            />
          </View>
          <View className="bg-brand-yellow h-16 w-[120px] rounded-full flex-row gap-3 items-center">
            <View className="w-16 h-full">
              <Image
                source={require("@/assets/icons/woman.png")}
                className="h-full w-full"
              />
            </View>
            <Text className="font-bold">John</Text>
          </View>
        </View>

        {/* Search Bar */}
        <SearchBar />

        {/* Hero */}
        <View className="mt-5">
          <Text className="text-[40px]">
            Create and {"\n"}
            design {"\n"}
            your <Text className="font-bold">notes</Text> {"\n"}
            easily
          </Text>
        </View>

        {/* create note */}
        <View className="flex-row justify-center mt-20">
          <View className="w-[50%] h-[230px] bg-note-purple rounded-lg relative">
            <View className="w-full h-full bg-note-pink absolute -rotate-12 -z-10 "></View>
            <View className="w-full h-full bg-note-mint absolute rotate-12 -z-10 "></View>

            {/* create button */}
            <TouchableOpacity
              onPress={() => Alert.alert("Note")}
              className="w-20 h-20 flex justify-center items-center bg-white rounded-full -translate-x-1/2 absolute left-1/2  -bottom-10 shadow-lg "
            >
              <Image
                source={require("@/assets/icons/plus.png")}
                className="size-7 "
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTab;
