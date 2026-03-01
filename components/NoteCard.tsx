import { Note } from "@/types";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface Props {
  note: Note;
  onPress: () => void;
}

const colors = [
  "bg-note-mint",
  "bg-note-purple",
  "bg-note-blue",
  "bg-note-peach",
  "bg-note-pink",
];

const rotations = ["-rotate-6", "-rotate-3", "rotate-3", "rotate-6"];
const icons = [
  require("@/assets/icons/push-pin.png"),
  require("@/assets/icons/paper-clip.png"),
];

const NoteCard = ({ note, onPress }: Props) => {
  // pick random color + rotation
  const color = colors[Math.floor(Math.random() * colors.length)];
  const rotate = rotations[Math.floor(Math.random() * rotations.length)];
  const icon = icons[Math.floor(Math.random() * icons.length)];

  return (
    <Pressable onPress={onPress} className="items-center">
      <View
        className={`w-[90%] px-5 py-7 rounded-sm mt-9 relative shadow-md ${color} ${rotate}`}
      >
        {/* Pin/clip Icon */}
        <Image
          source={icon}
          className="size-10 absolute right-2 -top-5"
          resizeMode="contain"
        />

        {/* Title */}
        <Text className="text-xl font-bold mb-4">{note.title}</Text>

        {/* Content */}
        <Text className="mb-4">{note.content}</Text>

        {/* Date */}
        <Text className="text-right font-bold italic">
          {note.$createdAt
            ? new Date(note.$createdAt).toLocaleDateString()
            : ""}
        </Text>
      </View>
    </Pressable>
  );
};

export default NoteCard;
