// src/validations/customDev.schema.ts
import { z } from 'zod';

export const projectCategoryTypeSchema = z.enum([
  'dapps-web3',
  'blog-cms',
  'android-apps',
  'web-applications',
  'custom-development',
]);

export const requestStatusSchema = z.enum([
  'PENDING',
  'REVIEWING',
  'IN_PROGRESS',
  'COMPLETED',
  'REJECTED',
]);

export const customDevRequestSchema = z.object({
  id: z.number().int().positive().optional(),
  client_name: z.string().min(2, 'Client name is required').max(80),
  client_email: z.string().email('Invalid client email format'),
  company_name: z.string().max(100).optional(),
  project_title: z.string().min(3, 'Project title must be at least 3 characters').max(150),
  project_type: projectCategoryTypeSchema,
  budget_range: z.string().min(1, 'Budget range is required'),
  timeline: z.string().min(1, 'Timeline estimation is required'),
  description: z.string().min(10, 'Project description must be at least 10 characters').max(2000),
  status: requestStatusSchema.optional(),
  created_at: z.string().optional(),
});

export type CustomDevRequestInput = z.infer<typeof customDevRequestSchema>;