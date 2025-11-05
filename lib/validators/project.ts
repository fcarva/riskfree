import { z } from 'zod';

export const projectSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(3),
  clientName: z.string().min(3),
  clientCNPJ: z.string().optional(),
  site: z.string().optional(),
  responsible: z.string().min(3),
  crea: z.string().min(5),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  status: z.enum(['DRAFT', 'IN_ANALYSIS', 'IN_REVIEW', 'APPROVED', 'IMPLEMENTATION', 'COMPLETED']).default('DRAFT'),
  type: z.array(z.string()).min(1),
  observations: z.string().optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;
