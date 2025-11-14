/**
 * Video carousel data
 * 
 * This file contains the data for the video carousel on the home page.
 * Replace the placeholder items with your actual video content.
 */

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl?: string; // Add your video URLs here when ready
  thumbnail?: string;
}

export const videoCarouselItems: VideoItem[] = [
  {
    id: 'neon-noir',
    title: 'Neon Noir',
    description: 'A cyberpunk odyssey through a rain-soaked metropolis where shadows tell stories',
    // videoUrl: '/videos/neon-noir.mp4', // Uncomment when video is ready
  },
  {
    id: 'quantum-flux',
    title: 'Quantum Flux',
    description: 'Reality bends and fractures in this experimental narrative exploration',
    // videoUrl: '/videos/quantum-flux.mp4',
  },
  {
    id: 'synth-dreams',
    title: 'Synth Dreams',
    description: 'Retro-futuristic aesthetics collide with cutting-edge generative AI',
    // videoUrl: '/videos/synth-dreams.mp4',
  },
  {
    id: 'void-walker',
    title: 'Void Walker',
    description: 'A journey through liminal spaces between consciousness and digital realms',
    // videoUrl: '/videos/void-walker.mp4',
  },
  {
    id: 'chrome-hearts',
    title: 'Chrome Hearts',
    description: 'Love story set in a world where emotion meets machine precision',
    // videoUrl: '/videos/chrome-hearts.mp4',
  },
  {
    id: 'prism-break',
    title: 'Prism Break',
    description: 'Light, color, and sound converge in this abstract visual symphony',
    // videoUrl: '/videos/prism-break.mp4',
  },
  {
    id: 'ghost-protocol',
    title: 'Ghost Protocol',
    description: 'Espionage thriller reimagined through an AI-powered cinematic lens',
    // videoUrl: '/videos/ghost-protocol.mp4',
  },
  {
    id: 'metamorphosis',
    title: 'Metamorphosis',
    description: 'Transformation as art: witness reality reshape itself frame by frame',
    // videoUrl: '/videos/metamorphosis.mp4',
  },
  {
    id: 'digital-requiem',
    title: 'Digital Requiem',
    description: 'A hauntingly beautiful meditation on the intersection of humanity and technology',
    // videoUrl: '/videos/digital-requiem.mp4',
  },
  {
    id: 'echo-chambers',
    title: 'Echo Chambers',
    description: 'Sound visualized: exploring the resonance between audio waves and visual form',
    // videoUrl: '/videos/echo-chambers.mp4',
  },
];

