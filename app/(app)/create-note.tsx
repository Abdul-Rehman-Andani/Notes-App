import { useCreateNote } from "@/hooks/useCreateNote";
import { useUser } from "@/hooks/useUser";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: user } = useUser();
  const { mutate: addNote, isPending, error } = useCreateNote();

  const handleCreate = () => {
    if (!title.trim() || !content.trim() || !user) return;

    addNote(
      {
        title,
        content,
        userId: user.$id,
      },
      {
        onSuccess: () => router.replace("/notes"),
      },
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={30}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 justify-between">
          {/* TOP SECTION */}
          <View>
            <View className="flex-row justify-between items-center mt-2">
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-14 h-14 justify-center items-center rounded-full border-2 border-brand-yellow"
              >
                <Image
                  source={require("@/assets/icons/back-arrow.png")}
                  className="w-7 h-7"
                />
              </TouchableOpacity>
            </View>

            <Text className="mt-6 text-2xl font-bold">Add Note</Text>

            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              className="w-full border-b-2 border-brand-yellow text-xl font-bold mt-6 py-2"
            />

            <TextInput
              placeholder="Write your note..."
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              className="w-full mt-6 text-lg"
              style={{ minHeight: 200 }}
            />
          </View>

          {/* BOTTOM BUTTON */}
          <View className="pb-6">
            {error && (
              <Text className="text-red-500 text-center mb-3">
                {error.message}
              </Text>
            )}

            <TouchableOpacity
              onPress={handleCreate}
              disabled={isPending}
              className={`rounded-xl py-4 ${
                isPending ? "bg-gray-300" : "bg-brand-yellow"
              }`}
            >
              <Text className="text-center text-lg font-bold text-black">
                {isPending ? "Creating..." : "Add Note"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CreateNote;
