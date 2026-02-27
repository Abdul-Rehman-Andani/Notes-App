import { account } from "@/lib/appwrite";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        return await account.get();
      } catch {
        return null; // not logged in
      }
    },
  });
};