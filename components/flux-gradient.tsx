'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FluxGradientProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Enable animation
   */
  animate?: boolean;
}

/**
 * FluxGradient - Animated gradient background component
 * CSS-based aurora effect with Tenchi brand colors
 */
export function FluxGradient({ className, animate = true }: FluxGradientProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !canvasRef.current) return;

    // Optional: Add more complex animation logic here if needed
    // For now, CSS handles the animation via the flux-gradient-animated class
  }, [animate]);

  return (
    <div
      ref={canvasRef}
      className={cn(
        'absolute inset-0 -z-10',
        animate ? 'flux-gradient-animated' : 'flux-gradient',
        className
      )}
      aria-hidden="true"
    >
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      
      {/* Radial gradient overlay for vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
}

