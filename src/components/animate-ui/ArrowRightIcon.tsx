'use client';

import * as React from 'react';
import { motion, useAnimation, type Variants, type SVGMotionProps } from 'motion/react';

type IconProps = { size?: number } & Omit<SVGMotionProps<SVGSVGElement>, 'animate'>;

type ArrowRightProps = IconProps;

const animations = {
  default: {
    group: {
      initial: {
        x: 0,
        transition: { ease: 'easeInOut', duration: 0.3 },
      },
      animate: {
        x: '25%',
        transition: { ease: 'easeInOut', duration: 0.3 },
      },
    },
    path1: {},
    path2: {},
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size = 14, ...props }: ArrowRightProps) {
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
          d="M5 12h14"
          variants={animations.default.path1}
          initial="initial"
          animate={controls}
        />
        <motion.path
          d="m12 5 7 7-7 7"
          variants={animations.default.path2}
          initial="initial"
          animate={controls}
        />
      </motion.g>
    </motion.svg>
  );
}

function ArrowRight(props: ArrowRightProps) {
  return <IconComponent {...props} />;
}

export {
  animations,
  ArrowRight,
  ArrowRight as ArrowRightIcon,
  type ArrowRightProps,
  type ArrowRightProps as ArrowRightIconProps,
};
