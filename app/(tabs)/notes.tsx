import NoteCard from "@/components/NoteCard";
import { useNotes } from "@/hooks/useNotes";
import { useToggleNoteStatus } from "@/hooks/useToggleNoteStatus";
import { useUser } from "@/hooks/useUser";
import { Note } from "@/types";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotesTab = () => {
  const { data: user } = useUser();
  const { data, isPending, isError } = useNotes(user?.$id);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const { mutate: toggleStatus, isPending: isUpdating } = useToggleNoteStatus();

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Failed to load notes</Text>
      </SafeAreaView>
    );
  }

  const notes: Note[] = (data?.documents ?? []).map((doc) => ({
    ...doc,
    title: doc.title,
    content: doc.content,
    userId: doc.userId,
    status: doc.status,
  }));

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

      <Text className="text-2xl mt-5 font-bold">Today's Notes</Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={notes}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <NoteCard note={item} onPress={() => setSelectedNote(item)} />
        )}
      />

      {/* 🔥 Bottom Modal */}
      <Modal visible={!!selectedNote} animationType="slide" transparent>
        <Pressable
          className="flex-1 bg-black/40 justify-end"
          onPress={() => setSelectedNote(null)}
        >
          <Pressable className="bg-white rounded-t-3xl p-6 min-h-[40%] flex justify-between">
            {selectedNote && (
              <>
                <View className="mt-6">
                  <Text className="text-2xl font-bold mb-3">
                    {selectedNote.title}
                  </Text>

                  <Text className="mb-4">{selectedNote.content}</Text>

                  <Text className="text-right italic">
                    {new Date(selectedNote.$createdAt).toLocaleString()}
                  </Text>
                </View>

                <TouchableOpacity
                  disabled={isUpdating}
                  onPress={() => {
                    if (!selectedNote) return;

                    toggleStatus({
                      noteId: selectedNote.$id,
                      currentStatus: selectedNote.status,
                    });

                    setSelectedNote(null); // close modal after update
                  }}
                  className="bg-brand-yellow py-3 rounded-lg"
                >
                  <Text className="text-center font-bold text-lg">
                    Mark as Done
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default NotesTab;
