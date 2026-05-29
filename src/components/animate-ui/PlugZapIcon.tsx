'use client';

import * as React from 'react';
import { motion, useAnimation, type Variants, type SVGMotionProps } from 'motion/react';

type IconProps = { size?: number } & Omit<SVGMotionProps<SVGSVGElement>, 'animate'>;

type PlugZapProps = IconProps;

const animations = {
  default: {
    path1: {},
    path2: {},
    path3: {},
    path4: {},
    path5: {
      initial: {
        opacity: 1,
        scale: 1,
      },
      animate: {
        opacity: [1, 0.5, 1, 0.5, 1],
        scale: [1, 0.9, 1, 0.9, 1],
        transition: {
          duration: 1.8,
          ease: 'easeInOut',
          repeat: Infinity,
        },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size = 14, ...props }: PlugZapProps) {
  const controls = useAnimation();

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
      onHoverStart={() => controls.start('animate')}
      onHoverEnd={() => controls.start('initial')}
      {...props}
    >
      <motion.path
        d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"
        variants={animations.default.path1}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="m2 22 3-3"
        variants={animations.default.path2}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M7.5 13.5 10 11"
        variants={animations.default.path3}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="M10.5 16.5 13 14"
        variants={animations.default.path4}
        initial="initial"
        animate="animate"
      />
      <motion.path
        d="m18 3-4 4h6l-4 4"
        variants={animations.default.path5}
        initial="initial"
        animate="animate"
      />
    </motion.svg>
  );
}

function PlugZap(props: PlugZapProps) {
  return <IconComponent {...props} />;
}

export {
  animations,
  PlugZap,
  PlugZap as PlugZapIcon,
  type PlugZapProps,
  type PlugZapProps as PlugZapIconProps,
};
