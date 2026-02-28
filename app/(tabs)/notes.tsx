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
        <ActivityIndicator size="large" />
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
      <FlatList
        data={notes}
        keyExtractor={(item) => item.$id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View className="flex flex-row justify-between items-center mt-2">
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-16 h-16 flex justify-center items-center rounded-full border-2 border-brand-yellow overflow-hidden"
              >
                <Image
                  source={require("@/assets/icons/back-arrow.png")}
                  className="size-8"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/create-note")}
                className="w-16 h-16 flex justify-center items-center rounded-full border-2 border-brand-yellow overflow-hidden"
              >
                <Image
                  source={require("@/assets/icons/plus.png")}
                  className="size-6"
                />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl mt-6 font-bold mb-4">Today's Notes</Text>
          </>
        }
        renderItem={({ item }) => (
          <NoteCard note={item} onPress={() => setSelectedNote(item)} />
        )}
        ListEmptyComponent={
          <View className="mt-10 items-center">
            <Text className="text-gray-500">No notes found</Text>
          </View>
        }
      />

      {/*  Bottom Modal */}
      <Modal visible={!!selectedNote} animationType="slide" transparent>
        <Pressable
          className="flex-1 bg-black/40 justify-end"
          onPress={() => setSelectedNote(null)}
        >
          <Pressable className="bg-white rounded-t-3xl p-6 min-h-[40%] justify-between">
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
                    toggleStatus({
                      noteId: selectedNote.$id,
                      currentStatus: selectedNote.status,
                    });

                    setSelectedNote(null);
                  }}
                  className="bg-brand-yellow py-3 rounded-lg"
                >
                  <Text className="text-center font-bold text-lg">
                    {selectedNote.status === "done"
                      ? "Mark as Pending"
                      : "Mark as Done"}
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
