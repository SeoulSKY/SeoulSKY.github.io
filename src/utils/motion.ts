import { MotionProps, Variant } from "framer-motion";

type VerticalDirection = "up" | "down";

type HorizontalDirection = "left" | "right";

type Direction = VerticalDirection | HorizontalDirection;

type TransitionType = "spring" | "tween" | "inertia";

function getMotion(
  initial: Variant,
  animate: Variant,
  isChildren: boolean,
  direction?: Direction,
): MotionProps {
  return {
    variants: {
      hidden: initial,
      visible: animate,
    },
    viewport: {
      amount: direction && ["up", "down"].includes(direction) ? 0.25 : 0,
    },
    initial: isChildren ? undefined : "hidden",
    whileInView: isChildren ? undefined : "visible",
  };
}

export function pressableMotion(delta = 0.1): MotionProps {
  return {
    whileHover: { scale: 1 + delta },
    whileTap: { scale: 1 - delta },
  };
}

export function fadeIn(
  duration: number,
  direction?: Direction,
  type?: TransitionType,
  amount = 100,
  isChildren = false,
): MotionProps {
  return getMotion(
    {
      x: direction === "left" ? amount : direction === "right" ? -amount : 0,
      y: direction === "up" ? amount : direction === "down" ? -amount : 0,
      opacity: 0,
    },
    {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        duration: duration,
        ease: "easeOut",
      },
    },
    isChildren,
    direction,
  );
}

export function zoomIn(
  duration: number,
  type: TransitionType,
  isChildren = false,
): MotionProps {
  return getMotion(
    {
      scale: 0,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      transition: {
        type: type,
        duration: duration,
      },
    },
    isChildren,
  );
}

export function slideIn(
  direction: Direction,
  type: TransitionType,
  duration: number,
  amount = 100,
  isChildren = false,
): MotionProps {
  return getMotion(
    {
      x:
        direction === "left"
          ? `${-amount}%`
          : direction === "right"
            ? `${amount}%`
            : 0,
      y:
        direction === "up"
          ? `${amount}%`
          : direction === "down"
            ? `${amount}%`
            : 0,
    },
    {
      x: 0,
      y: 0,
      transition: {
        type: type,
        duration: duration,
        ease: "easeOut",
      },
    },
    isChildren,
    direction,
  );
}

export function staggerContainer(delay?: number): MotionProps {
  return getMotion(
    {},
    {
      transition: {
        staggerChildren: delay,
      },
    },
    false,
  );
}
