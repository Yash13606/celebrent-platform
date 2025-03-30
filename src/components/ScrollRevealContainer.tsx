
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollRevealContainerProps {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const ScrollRevealContainer: React.FC<ScrollRevealContainerProps> = ({
  children,
  delay = 0.2,
  distance = 50,
  duration = 0.6,
  once = true,
  direction = 'up',
  className = '',
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  // Remove the threshold property as it's not accepted in the UseInViewOptions type
  const inView = useInView(ref, { once });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  // Determine initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  // Determine animation based on direction
  const getAnimation = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1, transition: { duration, delay } };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1, transition: { duration, delay } };
      default:
        return { y: 0, opacity: 1, transition: { duration, delay } };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: getInitialPosition(),
        visible: getAnimation(),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealContainer;
