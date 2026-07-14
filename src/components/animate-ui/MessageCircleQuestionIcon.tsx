'use client';

import * as React from 'react';
import { motion, useAnimation, type Variants, type SVGMotionProps } from 'motion/react';

type IconProps = { size?: number } & Omit<SVGMotionProps<SVGSVGElement>, 'animate'>;

type MessageCircleQuestionProps = IconProps;

const animations = {
  default: {
    group: {
      initial: {
        rotate: 0,
      },
      animate: {
        transformOrigin: 'bottom left',
        rotate: [0, 8, -8, 2, 0],
        transition: {
          ease: 'easeInOut',
          duration: 0.8,
          times: [0, 0.4, 0.6, 0.8, 1],
        },
      },
    },
    path1: {},
    path2: {
      initial: {
        y: 0,
      },
      animate: {
        y: [0, 1, -0.25, 0],
        transition: {
          ease: 'easeInOut',
          duration: 0.8,
          times: [0, 0.4, 0.7, 1],
        },
      },
    },
    path3: {},
  } satisfies Record<string, Variants>,
} as const;

function IconComponent({ size = 14, ...props }: MessageCircleQuestionProps) {
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
          d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"
          variants={animations.default.path1}
          initial="initial"
          animate={controls}
        />
        <motion.path
          d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
          variants={animations.default.path2}
          initial="initial"
          animate={controls}
        />
        <motion.path
          d="M12 17h.01"
          variants={animations.default.path3}
          initial="initial"
          animate={controls}
        />
      </motion.g>
    </motion.svg>
  );
}

function MessageCircleQuestion(props: MessageCircleQuestionProps) {
  return <IconComponent {...props} />;
}

export {
  animations,
  MessageCircleQuestion,
  MessageCircleQuestion as MessageCircleQuestionIcon,
  type MessageCircleQuestionProps,
  type MessageCircleQuestionProps as MessageCircleQuestionIconProps,
};
