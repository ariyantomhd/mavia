// src/validations/auth.schema.ts
import { z } from 'zod';

export const updateUserProfileInputSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50, 'Username cannot exceed 50 characters'),
  avatar_url: z.string().url('Invalid avatar URL').nullable(),
});

// Type Inference for profile updates
export type UpdateProfileInput = z.infer<typeof updateUserProfileInputSchema>;