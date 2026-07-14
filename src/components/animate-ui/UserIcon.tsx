'use client';

import * as React from 'react';
import { motion, useAnimation, type Variants, type SVGMotionProps } from 'motion/react';

type IconProps = { size?: number } & Omit<SVGMotionProps<SVGSVGElement>, 'animate'>;

type UserProps = IconProps;

const animations = {
  default: {
    path: {
      initial: {
        y: 0,
      },
      animate: {
        y: [0, 2, -2, 0],
        transition: { ease: 'easeInOut', duration: 0.6 },
      },
    },
    circle: {
      initial: {
        y: 0,
      },
      animate: {
        y: [0, 4, -2, 0],
        transition: { ease: 'easeInOut', duration: 0.6 },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size = 14, ...props }: UserProps) {
  const controls = useAnimation();

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={(2 * 20) / size}
      strokeLinecap="round"
      strokeLinejoin="round"
      onHoverStart={() => controls.start('animate')}
      onHoverEnd={() => controls.start('initial')}
      {...props}
    >
      <motion.path
        d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
        variants={animations.default.path}
        initial="initial"
        animate={controls}
      />
      <motion.circle
        cx={12}
        cy={7}
        r={4}
        variants={animations.default.circle}
        initial="initial"
        animate={controls}
      />
    </motion.svg>
  );
}

function User(props: UserProps) {
  return <IconComponent {...props} />;
}

export {
  animations,
  User,
  User as UserIcon,
  type UserProps,
  type UserProps as UserIconProps,
};
