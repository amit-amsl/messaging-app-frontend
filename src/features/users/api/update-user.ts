import { api } from "@/lib/api-client";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const updateUserInputSchema = z.object({
  bio: z
    .string()
    .max(140, "User bio can not be more than 140 characters")
    .optional(),
  image: z
    .instanceof(File)
    .refine(
      (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
      "Invalid image file type"
    )
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Image size should not exceed 5MB"
    )
    .optional(),
});

export type updateUserInput = z.infer<typeof updateUserInputSchema>;

async function updateUser({
  data,
  userId,
}: {
  data: updateUserInput;
  userId: string;
}): Promise<any> {
  // TODO: Fix Promise type
  return api.patch(`/users/${userId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: async (_, variables) => {
      return await queryClient.invalidateQueries({
        queryKey: ["user-profile", variables.userId],
      });
    },
  });
};
