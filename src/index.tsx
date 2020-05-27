import * as React from 'react';

import { debounce } from './debounce';
import { generateLeftRightTop } from './helpers';

export type ResizeOptions = {
  handleResize: boolean;
  debounce?: number;
};
export interface PropsType {
  trigger: React.RefObject<HTMLElement>;
  popper: React.RefObject<HTMLElement>;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  margin?: number;
  resizeOptions?: ResizeOptions;
}

function usePopperPlacement({
  trigger,
  popper,
  direction = 'top',
  margin = 8,
  resizeOptions = {
    handleResize: false,
    debounce: 500,
  },
}: PropsType) {
  const placePopper = React.useCallback(() => {
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
        dir =
          trigDims.top -
          Math.abs(trigDims.height - popDims.height) -
          trigDims.height -
          margin;

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
        dir = generateLeftRightTop({ trigDims, popDims });
        left = trigDims.left - popDims.width - margin;

        break;
      case 'right':
        dir = generateLeftRightTop({ trigDims, popDims });
        left = trigDims.right + margin;

        break;
      default:
        throw new Error(
          `unrecognized direction: ${direction}.  Must be either "top" | "bottom" | "left" | "right".`
        );
    }

    popEl.style.left = `${left}px`;
    popEl.style.top = `${dir}px`;
  }, [trigger, popper, direction, margin]);

  React.useEffect(() => {
    placePopper();
  }, [placePopper]);

  React.useEffect(() => {
    if (!resizeOptions.handleResize) return;

    window.addEventListener(
      'resize',
      debounce(placePopper, resizeOptions.debounce!)
    );

    return () => {
      window.removeEventListener('resize', placePopper);
    };
  }, [placePopper, resizeOptions]);

  return { placePopper };
}

export default usePopperPlacement;
