import { Direction } from '.';

export const generateLeftRightTop = ({
  trigDims,
  popDims,
}: {
  trigDims: DOMRect;
  popDims: DOMRect;
}) => trigDims.top - Math.abs(popDims.height - trigDims.height) / 2;

type SetDir = {
  direction: Direction;
  trigDims: DOMRect;
  popDims: DOMRect;
  margin: number;
};
type Calc = Omit<SetDir, 'direction'>;

const topCheck = ({ trigDims, popDims, margin }: Calc) =>
  trigDims.top - (popDims.height + margin) < 0;

const bottomCheck = ({ popDims }: Calc) => popDims.bottom > window.innerHeight;

const leftCheck = ({ trigDims, popDims, margin }: Calc) =>
  trigDims.left - (popDims.width + margin) < 0;

const rightCheck = ({ trigDims, popDims, margin }: Calc) =>
  trigDims.right + (popDims.width + margin) > window.innerWidth;

const IS_OUTSIDE_CHECK = {
  top: topCheck,
  topLeft: topCheck,
  topRight: topCheck,
  bottom: bottomCheck,
  bottomLeft: bottomCheck,
  bottomRight: bottomCheck,
  left: leftCheck,
  right: rightCheck,
};
type MapKey = keyof typeof IS_OUTSIDE_CHECK;

const defaultTopCalc = ({ trigDims, popDims, margin }: Calc) =>
  trigDims.top -
  Math.abs(trigDims.height - popDims.height) -
  trigDims.height -
  margin;

const defaultBottomCalc = ({ trigDims, margin }: Calc) =>
  trigDims.bottom + margin;

const defaultLeftCalc = ({ trigDims, popDims, margin }: Calc) =>
  trigDims.left - (popDims.width + margin);

const defaultRightCalc = ({ trigDims, margin }: Calc) =>
  trigDims.right + margin;

const DEFAULT_DIR_CALC = {
  top: defaultTopCalc,
  topLeft: defaultTopCalc,
  topRight: defaultTopCalc,
  bottom: defaultBottomCalc,
  bottomLeft: defaultBottomCalc,
  bottomRight: defaultBottomCalc,
  left: defaultLeftCalc,
  right: defaultRightCalc,
};

const OUT_OF_VIEWPORT_DIR_CALC = {
  top: defaultBottomCalc,
  topLeft: defaultBottomCalc,
  topRight: defaultBottomCalc,
  bottom: defaultTopCalc,
  bottomLeft: defaultTopCalc,
  bottomRight: defaultTopCalc,
  left: defaultRightCalc,
  right: defaultLeftCalc,
};

export const isOutsideViewport = ({ direction, ...rest }: SetDir) =>
  IS_OUTSIDE_CHECK[direction as MapKey](rest);

export const setDir = (args: SetDir) =>
  isOutsideViewport(args)
    ? OUT_OF_VIEWPORT_DIR_CALC[args.direction as MapKey](args)
    : DEFAULT_DIR_CALC[args.direction as MapKey](args);

export const setLeft = (args: SetDir) =>
  isOutsideViewport(args)
    ? OUT_OF_VIEWPORT_DIR_CALC[args.direction as MapKey](args)
    : DEFAULT_DIR_CALC[args.direction as MapKey](args);
