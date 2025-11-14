import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

/**
 * Skeleton - Loading placeholder component
 */
function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };

