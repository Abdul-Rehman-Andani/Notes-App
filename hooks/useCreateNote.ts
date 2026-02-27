import { createNote } from "@/lib/appwrite";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};