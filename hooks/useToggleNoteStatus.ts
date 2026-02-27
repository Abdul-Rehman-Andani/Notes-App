import { toggleNoteStatus } from "@/lib/appwrite";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleNoteStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      noteId,
      currentStatus,
    }: {
      noteId: string;
      currentStatus: "todo" | "done";
    }) => toggleNoteStatus(noteId, currentStatus),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};