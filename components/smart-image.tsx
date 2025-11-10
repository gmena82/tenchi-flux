import Image, { ImageProps } from 'next/image';
import { generateBlurDataURL } from '@/lib/utils';

interface SmartImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  /**
   * Enable blur placeholder (default: true)
   */
  enableBlur?: boolean;
}

/**
 * SmartImage - Image wrapper with automatic blur placeholder
 * Prevents CLS by enforcing width/height or fill with aspect ratio
 */
export function SmartImage({ enableBlur = true, alt, ...props }: SmartImageProps) {
  const blurProps = enableBlur
    ? {
        placeholder: 'blur' as const,
        blurDataURL: generateBlurDataURL(),
      }
    : {};

  return <Image alt={alt} {...props} {...blurProps} />;
}

