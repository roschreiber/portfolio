'use client';

import * as React from 'react';
import { motion, useAnimation, type Variants, type SVGMotionProps } from 'motion/react';

type IconProps = { size?: number } & Omit<SVGMotionProps<SVGSVGElement>, 'animate'>;

type ArrowLeftProps = IconProps;

const animations = {
  default: {
    group: {
      initial: {
        x: 0,
        transition: { ease: 'easeInOut', duration: 0.3 },
      },
      animate: {
        x: '-25%',
        transition: { ease: 'easeInOut', duration: 0.3 },
      },
    },
    path1: {},
    path2: {},
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size = 14, ...props }: ArrowLeftProps) {
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
      <motion.g variants={animations.default.group} initial="initial" animate={controls}>
        <motion.path
          d="M19 12H5"
          variants={animations.default.path1}
          initial="initial"
          animate={controls}
        />
        <motion.path
          d="m12 19-7-7 7-7"
          variants={animations.default.path2}
          initial="initial"
          animate={controls}
        />
      </motion.g>
    </motion.svg>
  );
}

function ArrowLeft(props: ArrowLeftProps) {
  return <IconComponent {...props} />;
}

export {
  animations,
  ArrowLeft,
  ArrowLeft as ArrowLeftIcon,
  type ArrowLeftProps,
  type ArrowLeftProps as ArrowLeftIconProps,
};
