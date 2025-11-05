import {
  ActionStatus,
  MachineStatus,
  Priority,
  ProjectStatus,
  RiskLevel,
  Role,
} from '@prisma/client';

export const projectStatusLabels: Record<ProjectStatus, string> = {
  DRAFT: 'Rascunho',
  IN_ANALYSIS: 'Em análise',
  IN_REVIEW: 'Em revisão',
  APPROVED: 'Aprovado',
  IMPLEMENTATION: 'Implementação',
  COMPLETED: 'Concluído',
};

export const machineStatusLabels: Record<MachineStatus, string> = {
  ACTIVE: 'Ativa',
  INACTIVE: 'Inativa',
  MAINTENANCE: 'Em manutenção',
};

export const riskLevelLabels: Record<RiskLevel, string> = {
  VERY_LOW: 'Muito baixo',
  LOW: 'Baixo',
  MEDIUM: 'Médio',
  HIGH: 'Alto',
  VERY_HIGH: 'Muito alto',
};

export const riskLevelBadgeVariants: Record<RiskLevel, 'default' | 'outline' | 'danger'> = {
  VERY_LOW: 'outline',
  LOW: 'outline',
  MEDIUM: 'default',
  HIGH: 'danger',
  VERY_HIGH: 'danger',
};

export const actionStatusLabels: Record<ActionStatus, string> = {
  PENDING: 'Pendente',
  IN_PROGRESS: 'Em andamento',
  COMPLETED: 'Concluída',
  VERIFIED: 'Verificada',
};

export const roleLabels: Record<Role, string> = {
  ADMIN: 'Administrador',
  ENGINEER: 'Engenheiro de Segurança',
  TECHNICIAN: 'Técnico em SST',
  CLIENT: 'Cliente',
};

export const priorityLabels: Record<Priority, string> = {
  CRITICAL: 'Crítica',
  HIGH: 'Alta',
  MEDIUM: 'Média',
  LOW: 'Baixa',
};
