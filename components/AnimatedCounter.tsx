import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';
import { useLocale } from '../context/LocaleContext';

interface AnimatedCounterProps {
  to: number;
  precision?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ to, precision = 1, className }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const { localizeNumber } = useLocale();
  const from = useRef(0);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from.current, to, {
      duration: 0.7,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = localizeNumber(value.toFixed(precision));
      }
    });

    // Set the 'from' value for the next animation
    from.current = to;

    return () => controls.stop();
  }, [to, precision, localizeNumber]);

  return <span ref={nodeRef} className={className} />;
};

export default AnimatedCounter;