import * as React from 'react';

import { debounce } from './debounce';
import { generateLeftRightTop, setDir, setLeft } from './helpers';

export type ResizeOptions = {
  handleResize: boolean;
  debounce?: number;
};

export type Direction =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'right';

export interface PropsType {
  trigger: React.RefObject<HTMLElement>;
  popper: React.RefObject<HTMLElement>;
  direction?: Direction;
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
        dir = setDir({
          direction,
          trigDims,
          popDims,
          margin,
        });

        if (medianWTrigger > medianWPopper) {
          left = trigDims.left + wDif;
        } else {
          left = trigDims.left - wDif;
        }

        break;
      case 'topLeft':
        dir = setDir({
          direction,
          trigDims,
          popDims,
          margin,
        });

        left = trigDims.left;
        break;
      case 'topRight':
        dir = setDir({
          direction,
          trigDims,
          popDims,
          margin,
        });

        left = trigDims.right - popDims.width;
        break;
      case 'bottom':
        dir = setDir({
          direction,
          trigDims,
          popDims,
          margin,
        });

        if (medianWTrigger > medianWPopper) {
          left = trigDims.left + wDif;
        } else {
          left = trigDims.left - wDif;
        }

        break;
      case 'bottomLeft':
        dir = setDir({
          direction,
          trigDims,
          popDims,
          margin,
        });

        left = trigDims.left;
        break;
      case 'bottomRight':
        dir = setDir({
          direction,
          trigDims,
          popDims,
          margin,
        });

        left = trigDims.right - popDims.width;
        break;
      case 'left':
        dir = generateLeftRightTop({ trigDims, popDims });

        left = setLeft({ direction, trigDims, popDims, margin });

        break;
      case 'right':
        dir = generateLeftRightTop({ trigDims, popDims });

        left = setLeft({ direction, trigDims, popDims, margin });

        break;
      default:
        throw new Error(
          `unrecognized direction: ${direction}.  Must be either "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight" | "left" | "right" | "bottomLeft".`
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
