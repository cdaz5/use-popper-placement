import * as React from 'react';

interface PropsType {
  trigger: React.RefObject<HTMLElement>;
  popper: React.RefObject<HTMLElement>;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  margin?: number;
}

function usePopperPlacement({
  trigger,
  popper,
  direction = 'right',
  margin = 8,
}: PropsType) {
  React.useEffect(() => {
    if (!trigger.current || !popper.current) return;

    const { current: trigEl } = trigger;
    const { current: popEl } = popper;

    if (popEl.style.position !== 'fixed') {
      popEl.style.position = 'fixed';
    }

    const trigDims = trigEl.getBoundingClientRect();
    const popDims = popEl.getBoundingClientRect();

    const medianWTrigger = trigDims.width / 2;
    const medianWPopper = popDims.width / 2;
    const wDif = Math.abs(medianWTrigger - medianWPopper);

    let dir, left;

    switch (direction) {
      case 'top':
        dir = trigDims.top - trigDims.height - margin;

        if (medianWTrigger > medianWPopper) {
          left = trigDims.left + wDif;
        } else {
          left = trigDims.left - wDif;
        }

        break;
      case 'bottom':
        dir = trigDims.bottom + margin;

        if (medianWTrigger > medianWPopper) {
          left = trigDims.left + wDif;
        } else {
          left = trigDims.left - wDif;
        }

        break;
      case 'left':
        dir = trigDims.top;
        left = trigDims.left - popDims.width - margin;

        break;
      case 'right':
        dir = trigDims.top;
        left = trigDims.right + margin;

        break;
      default:
        throw new Error(
          `unrecognized direction: ${direction}.  Must be either "top" | "bottom" | "left" | "right"`
        );
    }

    popEl.style.left = `${left}px`;
    popEl.style.top = `${dir}px`;
  }, [trigger, popper, direction, margin]);
}

export default usePopperPlacement;
