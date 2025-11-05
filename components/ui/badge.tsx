import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition',
  {
    variants: {
      variant: {
        default: 'border-brand bg-brand/10 text-brand-dark',
        outline: 'border-slate-200 bg-white text-slate-600',
        danger: 'border-brand-danger bg-brand-danger/10 text-brand-danger',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BadgeProps = VariantProps<typeof badgeVariants> & {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, variant, className }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>;
}
