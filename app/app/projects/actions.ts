'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/server/db';
import { requireUser } from '@/lib/server/session';
import { projectSchema, type ProjectInput } from '@/lib/validators/project';

export type ProjectFormState = {
  errors?: string[];
};

function extractProjectInput(formData: FormData): ProjectInput | null {
  const rawTypes = formData.getAll('type');
  const types = rawTypes.map((value) => value.toString()).filter(Boolean);

  const raw = {
    name: formData.get('name'),
    clientName: formData.get('clientName'),
    clientCNPJ: formData.get('clientCNPJ') || undefined,
    site: formData.get('site') || undefined,
    responsible: formData.get('responsible'),
    crea: formData.get('crea'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate') || undefined,
    status: formData.get('status') ?? 'DRAFT',
    type: types,
    observations: formData.get('observations') || undefined,
  };

  const parsed = projectSchema.safeParse(raw);

  if (!parsed.success) {
    return null;
  }

  return parsed.data;
}

export async function createProjectAction(prevState: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
  const user = await requireUser().catch(() => null);

  if (!user) {
    return { errors: ['Sessão expirada. Faça login novamente.'] };
  }

  const projectInput = extractProjectInput(formData);

  if (!projectInput) {
    return { errors: ['Revise os dados informados. Alguns campos obrigatórios não foram preenchidos corretamente.'] };
  }

  try {
    await prisma.project.create({
      data: {
        ...projectInput,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error('Erro ao criar projeto', error);
    return { errors: ['Não foi possível criar o projeto. Tente novamente em instantes.'] };
  }

  revalidatePath('/app');
  revalidatePath('/app/projects');
  redirect('/app/projects');
}
