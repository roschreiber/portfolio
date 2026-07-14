'use client';

import * as React from 'react';
import { motion, type Variants, type SVGMotionProps } from 'motion/react';

type IconProps = { size?: number } & Omit<SVGMotionProps<SVGSVGElement>, 'animate'>;

type MessageSquareMoreProps = IconProps;

const animations = {
  pulse: {
    line1: {
      initial: { scale: 1 },
      animate: {
        scale: [1, 1.5, 1],
        transition: { duration: 1, delay: 0.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 },
      },
    },
    line2: {
      initial: { scale: 1 },
      animate: {
        scale: [1, 1.5, 1],
        transition: { duration: 1, delay: 0.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 },
      },
    },
    line3: {
      initial: { scale: 1 },
      animate: {
        scale: [1, 1.5, 1],
        transition: { duration: 1, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size = 14, ...props }: MessageSquareMoreProps) {
  const variants = animations.pulse;

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <motion.line x1="16" y1="10" x2="16" y2="10" variants={variants.line1} initial="initial" animate="animate" />
      <motion.line x1="12" y1="10" x2="12" y2="10" variants={variants.line2} initial="initial" animate="animate" />
      <motion.line x1="8" y1="10" x2="8" y2="10" variants={variants.line3} initial="initial" animate="animate" />
    </motion.svg>
  );
}

function MessageSquareMore(props: MessageSquareMoreProps) {
  return <IconComponent {...props} />;
}

export {
  animations,
  MessageSquareMore,
  MessageSquareMore as MessageSquareMoreIcon,
  type MessageSquareMoreProps,
  type MessageSquareMoreProps as MessageSquareMoreIconProps,
};
