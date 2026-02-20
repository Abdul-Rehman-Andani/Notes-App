import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotesTab = () => {
  return (
    <SafeAreaView className="flex-1 px-6">
      {/* Header */}
      <View className="flex flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-16 h-16 flex justify-center items-center rounded-full border-2 border-brand-yellow overflow-hidden"
        >
          <Image
            source={require("@/assets/icons/back-arrow.png")}
            className="size-8"
          />
        </TouchableOpacity>
        <View className="w-16 h-16 flex justify-center items-center rounded-full border-2 border-brand-yellow overflow-hidden">
          <Image
            source={require("@/assets/icons/search.png")}
            className="size-8"
          />
        </View>
      </View>
      {/* Title */}
      <Text className="text-2xl mt-5 font-bold">Today's Notes</Text>

      {/* Notes */}
      <View className="flex-col justify-center">
        <View className="w-[90%] bg-note-mint px-5 py-8 rounded-sm mt-10 rotate-6 relative">
          <Image
            source={require("@/assets/icons/push-pin.png")}
            className="size-10 absolute right-2 -top-4"
          />
          <Text className="text-xl font-bold mb-4">Do Home work</Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
            tenetur totam et iusto possimus, impedit reiciendis quaerat minus,
            quos nihil laborum architecto eos. Rerum repudiandae eaque quos
            aperiam, quod delectus!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NotesTab;
