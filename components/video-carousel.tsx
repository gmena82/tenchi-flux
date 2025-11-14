'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl?: string; // Optional - will use placeholder if not provided
  thumbnail?: string;
}

interface VideoCarouselProps {
  items: VideoItem[];
}

export function VideoCarousel({ items }: VideoCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) return;
    
    // Get the slides currently in view
    const slidesInView = emblaApi.slidesInView();
    if (slidesInView.length === 0) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      return;
    }
    
    // Get viewport center
    const viewportNode = emblaApi.rootNode();
    if (!viewportNode) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      return;
    }
    
    const viewportRect = viewportNode.getBoundingClientRect();
    const viewportCenter = viewportRect.left + viewportRect.width / 2;
    
    // Find the slide closest to the viewport center
    let closestIndex = slidesInView[0];
    let closestDistance = Infinity;
    
    slidesInView.forEach((slideIndex) => {
      const slideNode = emblaApi.slideNodes()[slideIndex];
      if (!slideNode) return;
      
      const slideRect = slideNode.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const distance = Math.abs(slideCenter - viewportCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = slideIndex;
      }
    });
    
    setSelectedIndex(closestIndex);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateSelectedIndex();
    emblaApi.on('select', updateSelectedIndex);
    emblaApi.on('reInit', updateSelectedIndex);
    emblaApi.on('scroll', updateSelectedIndex);
    return () => {
      emblaApi.off('select', updateSelectedIndex);
      emblaApi.off('reInit', updateSelectedIndex);
      emblaApi.off('scroll', updateSelectedIndex);
    };
  }, [emblaApi, updateSelectedIndex]);

  // Intersection Observer for autoplay control
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.5);
      },
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Video playback control
  useEffect(() => {
    videoRefs.current.forEach((video, id) => {
      const itemIndex = items.findIndex((item) => item.id === id);
      const isActive = itemIndex === selectedIndex;

      if (isActive && isInView && video) {
        video.play().catch(() => {
          // Autoplay might be blocked
        });
      } else if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [selectedIndex, isInView, items]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        scrollNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollPrev, scrollNext]);

  const handleVideoEnded = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section
      ref={sectionRef}
      className="video-carousel-section relative w-full py-16 md:py-24"
      data-carousel-section
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl mb-4">
            Recent Work
          </h2>
          <p className="text-tenchi-muted text-lg max-w-2xl mx-auto">
            AI-powered cinematic experiences that push the boundaries of visual storytelling
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            className="video-carousel-viewport overflow-hidden py-8"
            ref={emblaRef}
            data-carousel-viewport
          >
            <div className="video-carousel-container flex gap-6" data-carousel-container>
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    'video-carousel-item flex-[0_0_90%] sm:flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_28%]',
                    'transition-all duration-700 ease-out'
                  )}
                  data-index={index}
                  data-active={index === selectedIndex}
                  onClick={() => emblaApi?.scrollTo(index)}
                >
                  <div 
                    className={cn(
                      'video-carousel-item-box relative aspect-[9/16] w-full rounded-[30px] overflow-hidden bg-black group cursor-pointer transition-all duration-700',
                      index === selectedIndex 
                        ? 'scale-100 shadow-[0_0_40px_rgba(34,197,94,0.4)]' 
                        : 'scale-95 grayscale opacity-50'
                    )}
                  >
                    {/* Video or Placeholder */}
                    {item.videoUrl ? (
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current.set(item.id, el);
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                        src={item.videoUrl}
                        loop
                        muted
                        playsInline
                        onEnded={handleVideoEnded}
                        data-lazy-child
                      />
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-900/30 via-cyan-900/20 to-black">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center p-8">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-tenchi-brand to-tenchi-brand-2 flex items-center justify-center">
                              <span className="text-5xl">🎬</span>
                            </div>
                            <p className="text-tenchi-fg/60 text-sm font-medium tracking-wide">
                              Video Coming Soon
                            </p>
                          </div>
                        </div>
                        {/* Animated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-tenchi-brand/10 via-transparent to-tenchi-brand-2/10 animate-pulse" />
                      </div>
                    )}

                    {/* Active Overlay Gradient - Mirage style */}
                    <div 
                      className={cn(
                        'absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500',
                        index === selectedIndex ? 'opacity-100' : 'opacity-0'
                      )}
                    />

                    {/* AI Badge */}
                    <div 
                      className={cn(
                        'absolute top-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-medium tracking-wider uppercase border transition-all duration-500',
                        index === selectedIndex 
                          ? 'border-green-500/50 text-green-400 opacity-100' 
                          : 'border-tenchi-brand/30 text-tenchi-fg/60 opacity-0'
                      )}
                    >
                      AI-generated
                    </div>

                    {/* Active Border Glow */}
                    {index === selectedIndex && (
                      <div className="absolute inset-0 rounded-[30px] ring-[3px] ring-green-500/80 pointer-events-none" />
                    )}
                  </div>

                  {/* Description - Fades in only on active */}
                  <div
                    className={cn(
                      'mt-6 text-center transition-all duration-700',
                      index === selectedIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    )}
                  >
                    <h3 className="font-display text-xl md:text-2xl font-bold mb-2 text-tenchi-fg">
                      {item.title}
                    </h3>
                    <p className="text-tenchi-muted text-sm md:text-base max-w-xs mx-auto">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-tenchi-fg/10 backdrop-blur-sm border border-tenchi-fg/20 flex items-center justify-center hover:bg-tenchi-fg/20 transition-colors"
            aria-label="Previous video"
            data-carousel-prev
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-tenchi-fg/10 backdrop-blur-sm border border-tenchi-fg/20 flex items-center justify-center hover:bg-tenchi-fg/20 transition-colors"
            aria-label="Next video"
            data-carousel-next
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                index === selectedIndex
                  ? 'w-8 bg-tenchi-brand'
                  : 'w-1.5 bg-tenchi-fg/20 hover:bg-tenchi-fg/40'
              )}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
