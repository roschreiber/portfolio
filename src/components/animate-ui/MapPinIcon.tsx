'use client';

import * as React from 'react';
import { motion, useAnimation, type Variants, type SVGMotionProps } from 'motion/react';

type IconProps = { size?: number } & Omit<SVGMotionProps<SVGSVGElement>, 'animate'>;

type MapPinProps = IconProps;

const animations = {
  default: {
    group: {
      initial: {
        scale: 1,
        rotate: 0,
        x: 0,
        y: 0,
        transformOrigin: 'bottom center',
      },
      animate: {
        scale: [1, 0.75, 1, 1],
        rotate: [0, 30, -15, 0],
        x: [0, 0, 0, 0],
        y: [0, -6, 0, 0],
        transformOrigin: 'bottom center',
        transition: { ease: 'easeInOut', duration: 1 },
      },
    },
    circle: {},
    path: {},
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size = 14, ...props }: MapPinProps) {
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
        <motion.circle
          cx={12}
          cy={10}
          r={3}
          variants={animations.default.circle}
          initial="initial"
          animate={controls}
        />
        <motion.path
          d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
          variants={animations.default.path}
          initial="initial"
          animate={controls}
        />
      </motion.g>
    </motion.svg>
  );
}

function MapPin(props: MapPinProps) {
  return <IconComponent {...props} />;
}

export {
  animations,
  MapPin,
  MapPin as MapPinIcon,
  type MapPinProps,
  type MapPinProps as MapPinIconProps,
};
