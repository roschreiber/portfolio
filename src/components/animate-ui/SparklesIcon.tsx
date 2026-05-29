'use client';

import { motion, type Variants, type SVGMotionProps } from 'motion/react';

const animations = {
  default: {
    group: {
      initial: {
        scale: 1,
      },
      animate: {
        scale: [1, 0.9, 1.1, 1],
        transition: { duration: 0.9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 },
      },
    },
    path: {},
    plus: {
      initial: { opacity: 1, scale: 1 },
      animate: {
        opacity: 0,
        scale: 0,
        transition: {
          opacity: {
            duration: 0.3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.35,
            delay: 0.2,
          },
          scale: {
            duration: 0.3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.35,
            delay: 0.2,
          },
        },
      },
    },
    circle: {
      initial: { opacity: 1, scale: 1 },
      animate: {
        opacity: 0,
        scale: 0,
        transition: {
          opacity: {
            duration: 0.3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.35,
          },
          scale: {
            duration: 0.3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.35,
          },
        },
      },
    },
  } satisfies Record<string, Variants>,
  fill: {
    group: {
      initial: {
        scale: 1,
      },
      animate: {
        scale: [1, 0.9, 1.1, 1],
        transition: { duration: 0.9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.6 },
      },
    },
    path: {
      initial: {
        fill: 'currentColor',
        fillOpacity: 0,
      },
      animate: {
        fillOpacity: 1,
        transition: {
          duration: 0.3,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.6,
          delay: 0.25,
        },
      },
    },
    plus: {
      initial: { opacity: 1, scale: 1 },
      animate: {
        opacity: 0,
        scale: 0,
        transition: {
          opacity: {
            duration: 0.3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.35,
            delay: 0.2,
          },
          scale: {
            duration: 0.3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.35,
            delay: 0.2,
          },
        },
      },
    },
    circle: {
      initial: {
        fill: 'currentColor',
        fillOpacity: 0,
        opacity: 1,
        scale: 1,
      },
      animate: {
        fillOpacity: 1,
        opacity: 0,
        scale: 0,
        transition: {
          fillOpacity: { delay: 0.25 },
          opacity: {
            duration: 0.3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.35,
          },
          scale: {
            duration: 0.3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.35,
          },
        },
      },
    },
  } satisfies Record<string, Variants>,
} as const;

type SparklesVariant = keyof typeof animations;

type IconProps = {
  size?: number;
  variant?: SparklesVariant;
} & Omit<SVGMotionProps<SVGSVGElement>, 'animate'>;

type SparklesProps = IconProps;

function IconComponent({ size = 14, variant = 'default', ...props }: SparklesProps) {
  const variants = animations[variant];

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
      <motion.g variants={variants.group} initial="initial" animate="animate">
        <motion.path
          d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
          variants={variants.path}
          initial="initial"
          animate="animate"
        />
      </motion.g>
      <motion.path
        d="M20 2v4 M22 4h-4"
        variants={variants.plus}
        initial="initial"
        animate="animate"
      />
      <motion.circle
        cx="4"
        cy="20"
        r="2"
        variants={variants.circle}
        initial="initial"
        animate="animate"
      />
    </motion.svg>
  );
}

function Sparkles(props: SparklesProps) {
  return <IconComponent {...props} />;
}

export {
  animations,
  Sparkles,
  Sparkles as SparklesIcon,
  type SparklesProps,
  type SparklesProps as SparklesIconProps,
};