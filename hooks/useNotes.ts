import { getUserNotes } from "@/lib/appwrite";
import { useQuery } from "@tanstack/react-query";

export const useNotes = (userId?: string) => {
  return useQuery({
    queryKey: ["notes", userId],
    queryFn: () => getUserNotes(userId!),
    enabled: !!userId,
  });
};