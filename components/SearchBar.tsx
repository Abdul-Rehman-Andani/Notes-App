import React from "react";
import { Image, TextInput, View } from "react-native";

const SearchBar = () => {
  return (
    <View className="border-2 border-brand-yellow rounded-full flex-row items-center justify-between gap-4 px-5 py-2">
      <TextInput placeholder="Search..." />
      <Image source={require("@/assets/icons/search.png")} className="size-6" />
    </View>
  );
};

export default SearchBar;
