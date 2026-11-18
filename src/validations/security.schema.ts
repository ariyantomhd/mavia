// src/validations/security.schema.ts
import { z } from 'zod';

export const securityEventLogSchema = z.object({
  id: z.string(),
  user_id: z.string().nullable(),
  event_type: z.string(),
  ip_address: z.string(),
  created_at: z.string(),
});

export const systemModuleConfigSchema = z.object({
  id: z.string(),
  module_key: z.string(),
  status: z.enum(['ONLINE', 'MAINTENANCE', 'DISABLED']),
  updated_at: z.string(),
});

export type SecurityEventLogInput = z.infer<typeof securityEventLogSchema>;
export type SystemModuleConfigInput = z.infer<typeof systemModuleConfigSchema>;