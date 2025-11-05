import {
  ActionStatus,
  MachineStatus,
  Priority,
  ProjectStatus,
  RiskLevel,
  Role,
} from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/server/password';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hashPassword('demo123');

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@ijs.eng.br' },
    update: {
      name: 'Usuário Demo',
      passwordHash,
      role: Role.ENGINEER,
    },
    create: {
      email: 'demo@ijs.eng.br',
      name: 'Usuário Demo',
      passwordHash,
      role: Role.ENGINEER,
    },
  });

  await prisma.checklistResponse.deleteMany({ where: { project: { userId: demoUser.id } } });
  await prisma.action.deleteMany({ where: { project: { userId: demoUser.id } } });
  await prisma.fMEA.deleteMany({ where: { machine: { project: { userId: demoUser.id } } } });
  await prisma.hazard.deleteMany({ where: { machine: { project: { userId: demoUser.id } } } });
  await prisma.machine.deleteMany({ where: { project: { userId: demoUser.id } } });
  await prisma.project.deleteMany({ where: { userId: demoUser.id } });

  const automotiveProject = await prisma.project.create({
    data: {
      name: 'Linha de Prensas Automotivas',
      clientName: 'ACME Auto Parts',
      clientCNPJ: '12.345.678/0001-99',
      site: 'Fábrica Betim',
      responsible: 'Carlos Lima',
      crea: 'MG123456/D',
      startDate: new Date('2024-05-02'),
      endDate: new Date('2024-09-30'),
      status: ProjectStatus.IN_ANALYSIS,
      type: ['NR-12', 'FMEA'],
      observations: 'Projeto piloto com foco em automação segura e plano de ação integrado.',
      userId: demoUser.id,
    },
  });

  const prensa = await prisma.machine.create({
    data: {
      tag: 'MC-PR-001',
      name: 'Prensa Hidráulica 120T',
      manufacturer: 'Schuler',
      model: 'SH-120',
      serialNumber: 'SH120-2021-09',
      yearManufacture: 2021,
      location: 'Linha de conformação',
      status: MachineStatus.ACTIVE,
      lastMaintenance: new Date('2024-04-18'),
      responsible: 'Marcos Paulo',
      images: [],
      manualUrl: 'https://example.com/manuals/prensa-hidraulica.pdf',
      projectId: automotiveProject.id,
      hazards: {
        create: [
          {
            description: 'Ponto de esmagamento na zona de prensagem durante setup.',
            operationPhase: 'Setup',
            hazardType: 'Mecânico',
            zone: 'Área frontal da prensa',
            likelihoodValue: 4,
            frequencyValue: 4,
            severityValue: 4,
            hrnScore: 64,
            riskLevel: RiskLevel.HIGH,
            controlMeasures: ['Cortina de luz categoria 4', 'Procedimento de bloqueio e etiquetagem'],
            controlDetails: 'Integração com CLP e validação mensal do sistema óptico.',
            residualLikelihood: 1.5,
            residualFrequency: 2.5,
            residualSeverity: 2,
            residualHRN: 7.5,
            residualRiskLevel: RiskLevel.MEDIUM,
          },
          {
            description: 'Projeção de cavacos quentes durante operação.',
            operationPhase: 'Operação contínua',
            hazardType: 'Térmico',
            zone: 'Zona de saída de peça',
            likelihoodValue: 2.5,
            frequencyValue: 4,
            severityValue: 2,
            hrnScore: 20,
            riskLevel: RiskLevel.HIGH,
            controlMeasures: ['Instalação de anteparo com policarbonato', 'Uso de viseira facial'],
            controlDetails: 'Monitorar integridade do anteparo em checklist diário.',
            residualLikelihood: 1.5,
            residualFrequency: 2.5,
            residualSeverity: 2,
            residualHRN: 7.5,
            residualRiskLevel: RiskLevel.MEDIUM,
          },
        ],
      },
      fmeas: {
        create: [
          {
            component: 'Sistema hidráulico',
            function: 'Aplicar força de conformação',
            failureMode: 'Vazamento de óleo no circuito',
            effects: 'Perda de força e risco de incêndio',
            severity: 8,
            causes: 'Mangueira danificada por abrasão',
            occurrence: 4,
            currentControls: 'Inspeção mensal e troca preventiva anual',
            detection: 4,
            rpn: 128,
            recommendedActions: 'Instalar sensores de pressão e revisar layout das mangueiras',
            responsible: 'Equipe de manutenção',
            deadline: new Date('2024-08-15'),
            actionsTaken: 'Sensores aprovados e aguardando instalação',
            newSeverity: 6,
            newOccurrence: 2,
            newDetection: 3,
            newRPN: 36,
          },
        ],
      },
    },
  });

  await prisma.machine.create({
    data: {
      tag: 'MC-RB-004',
      name: 'Robô de Solda ABB IRB 4600',
      manufacturer: 'ABB',
      model: 'IRB 4600',
      serialNumber: 'ABB-4600-2020',
      yearManufacture: 2020,
      location: 'Célula de solda',
      status: MachineStatus.MAINTENANCE,
      lastMaintenance: new Date('2024-06-01'),
      responsible: 'Juliana Rocha',
      images: [],
      projectId: automotiveProject.id,
      hazards: {
        create: [
          {
            description: 'Risco de aprisionamento na área de alcance do robô.',
            operationPhase: 'Setup e ajustes',
            hazardType: 'Mecânico',
            zone: 'Envelope de trabalho',
            likelihoodValue: 2.5,
            frequencyValue: 4,
            severityValue: 4,
            hrnScore: 40,
            riskLevel: RiskLevel.HIGH,
            controlMeasures: ['Scanner a laser de segurança', 'Treinamento específico NR-12'],
            controlDetails: 'Scanner integrado ao controlador IRC5 com testes trimestrais.',
            residualLikelihood: 1.5,
            residualFrequency: 2.5,
            residualSeverity: 2,
            residualHRN: 7.5,
            residualRiskLevel: RiskLevel.MEDIUM,
          },
        ],
      },
    },
  });

  await prisma.action.createMany([
    {
      description: 'Instalar cortina de luz e intertravamento na prensa hidráulica',
      machineTag: prensa.tag,
      type: 'EPC',
      priority: Priority.CRITICAL,
      responsible: 'Carlos Lima',
      deadline: new Date('2024-07-30'),
      status: ActionStatus.IN_PROGRESS,
      estimatedCost: 18000,
      projectId: automotiveProject.id,
    },
    {
      description: 'Executar treinamento de bloqueio e etiquetagem NR-12',
      machineTag: prensa.tag,
      type: 'Treinamento',
      priority: Priority.HIGH,
      responsible: 'Juliana Rocha',
      deadline: new Date('2024-08-05'),
      status: ActionStatus.PENDING,
      projectId: automotiveProject.id,
    },
    {
      description: 'Revisar layout das mangueiras do circuito hidráulico',
      machineTag: prensa.tag,
      type: 'Procedimento',
      priority: Priority.MEDIUM,
      responsible: 'Equipe de Manutenção',
      deadline: new Date('2024-07-20'),
      status: ActionStatus.COMPLETED,
      projectId: automotiveProject.id,
    },
  ]);

  await prisma.project.create({
    data: {
      name: 'Subestação NR-10 e Inventário NR-12',
      clientName: 'Foo Chemicals',
      clientCNPJ: '98.765.432/0001-55',
      site: 'Complexo Industrial Paulínia',
      responsible: 'Ana Beatriz',
      crea: 'SP987654/D',
      startDate: new Date('2024-06-10'),
      status: ProjectStatus.DRAFT,
      type: ['NR-10', 'NR-12'],
      observations: 'Foco em diagnóstico inicial e plano de adequação elétrica.',
      userId: demoUser.id,
      machines: {
        create: [
          {
            tag: 'MC-MX-210',
            name: 'Misturador de reagentes',
            location: 'Planta de síntese',
            status: MachineStatus.ACTIVE,
            hazards: {
              create: [
                {
                  description: 'Exposição a partes rotativas sem proteção fixa.',
                  operationPhase: 'Operação contínua',
                  hazardType: 'Mecânico',
                  zone: 'Cabeçote do misturador',
                  likelihoodValue: 2.5,
                  frequencyValue: 4,
                  severityValue: 4,
                  hrnScore: 40,
                  riskLevel: RiskLevel.HIGH,
                  controlMeasures: ['Projetar carenagem fixa', 'Sensor de abertura com intertravamento'],
                  controlDetails: 'Integrar intertravamento à lógica de parada de emergência.',
                  residualLikelihood: 1.5,
                  residualFrequency: 2,
                  residualSeverity: 2,
                  residualHRN: 6,
                  residualRiskLevel: RiskLevel.MEDIUM,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Seed executado com sucesso. Usuário demo: demo@ijs.eng.br / demo123');
}

main()
  .catch((error) => {
    console.error('Erro ao executar seed', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
