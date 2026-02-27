import { logout } from "@/lib/appwrite";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Optional: clear any user-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};