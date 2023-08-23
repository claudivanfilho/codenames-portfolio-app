import { useEffect, useRef, useState } from "react";
import { AnimationControls, TargetAndTransition, VariantLabels } from "framer-motion";

export default function useNotInitialAnimate(
  animateObject: AnimationControls | VariantLabels | TargetAndTransition,
  variable: boolean
) {
  const [animate, setAnimate] = useState<AnimationControls | VariantLabels | TargetAndTransition>();
  const notInitialRender = useRef(false);

  useEffect(() => {
    if (notInitialRender.current && variable) {
      setAnimate(animateObject);
    }
    notInitialRender.current = true;
  }, [variable]);

  return { animate };
}
