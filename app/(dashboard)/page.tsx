import { CardsGrid } from '@/components/layout/cards-grid';
import { PendingActions } from '@/components/layout/pending-actions';
import { ProjectsList } from '@/components/layout/projects-list';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <CardsGrid />
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <ProjectsList />
        <PendingActions />
      </div>
    </div>
  );
}
