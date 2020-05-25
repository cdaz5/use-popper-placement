export const generateLeftRightTop = ({
  trigDims,
  popDims,
}: {
  trigDims: DOMRect;
  popDims: DOMRect;
}) => trigDims.top - Math.abs(popDims.height - trigDims.height) / 2;
