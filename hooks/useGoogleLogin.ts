import { loginWithGoogle } from "@/lib/appwrite";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginWithGoogle,

    onSuccess: async () => {
      // Refetch logged-in user after OAuth session is created
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    // onError removed — you can handle isError/error in component
  });

  return mutation; // mutate(), isLoading, isError, error, isSuccess all available
};