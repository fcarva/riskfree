'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavLinkProps = {
  href: string;
  label: string;
};

export function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        'block rounded-xl px-4 py-2 font-medium transition hover:bg-brand/10 hover:text-brand-dark',
        isActive && 'bg-brand/10 text-brand-dark',
      )}
    >
      {label}
    </Link>
  );
}
