import { generateLeftRightTop } from '../src/helpers';

const MockTrigDomRect = {
  bottom: 189,
  height: 50,
  left: 264.546875,
  right: 273.453125,
  top: 139,
  width: 8.90625,
  x: 264.546875,
  y: 139,
} as DOMRect;

const MockPopDomRect = {
  bottom: 173,
  height: 34,
  left: 281.453125,
  right: 398.84375,
  top: 139,
  width: 117.390625,
  x: 281.453125,
  y: 139,
} as DOMRect;

describe('generateLeftRightTop', () => {
  describe('trig height > popper height', () => {
    it('should return expected value', () => {
      const expectedValue = 131;

      expect(
        generateLeftRightTop({
          trigDims: MockTrigDomRect,
          popDims: MockPopDomRect,
        })
      ).toBe(expectedValue);
    });
  });
  describe('popper height > trig height', () => {
    it('should return expected value', () => {
      const expectedValue = 147;

      expect(
        generateLeftRightTop({
          trigDims: {
            ...MockTrigDomRect,
            top: 155,
            height: 18,
          },
          popDims: {
            ...MockPopDomRect,
            height: 34,
          },
        })
      ).toBe(expectedValue);
    });
  });
});
