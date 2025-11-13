'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface VideoBackgroundProps {
  /**
   * Video source URLs for different formats
   */
  sources: {
    webm?: string;
    mp4: string;
    ogv?: string;
  };
  /**
   * Fallback image for mobile or when video fails
   */
  fallbackImage: string;
  /**
   * Alt text for fallback image
   */
  fallbackAlt?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Minimum width for desktop (default: 801px)
   */
  desktopBreakpoint?: number;
}

/**
 * VideoBackground - Looping video background with mobile fallback
 * Inspired by Mirage Studio's hero implementation
 * 
 * Features:
 * - Only loads video on desktop (saves bandwidth on mobile)
 * - Muted, looping, non-interactive
 * - Static image fallback for mobile
 * - Media query based loading
 */
export function VideoBackground({
  sources,
  fallbackImage,
  fallbackAlt = 'Background',
  className,
  desktopBreakpoint = 801,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Check if we're on the client and setup media query
    const mediaQuery = window.matchMedia(`(min-width: ${desktopBreakpoint}px)`);
    
    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
      setShowVideo(e.matches);
    };

    // Initial check
    handleMediaChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [desktopBreakpoint]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isDesktop) return;

    const handleCanPlay = () => {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          video.setAttribute('data-playing', 'true');
        })
        .catch((error) => {
          console.warn('Video autoplay failed:', error);
        });
    };

    video.addEventListener('canplay', handleCanPlay);

    // Load the video
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [isDesktop]);

  return (
    <div className={cn('hero-background', className)}>
      {/* Mobile fallback image - always rendered for SEO/initial paint */}
      <Image
        src={fallbackImage}
        alt={fallbackAlt}
        fill
        priority
        className={cn(
          'mobile-fallback-image object-cover',
          showVideo && isPlaying && 'opacity-0'
        )}
        sizes="100vw"
      />

      {/* Desktop video - only rendered when desktop media query matches */}
      {showVideo && (
        <video
          ref={videoRef}
          className={cn(
            'desktop-background-video absolute inset-0 w-full h-full object-cover',
            !isPlaying && 'opacity-0'
          )}
          data-bg-video
          data-playing={isPlaying ? 'true' : 'false'}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{ pointerEvents: 'none' }}
        >
          {sources.webm && (
            <source src={sources.webm} type="video/webm" />
          )}
          <source src={sources.mp4} type="video/mp4" />
          {sources.ogv && (
            <source src={sources.ogv} type="video/ogg" />
          )}
        </video>
      )}
    </div>
  );
}

