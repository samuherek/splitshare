import {
  fromEntriesToObjMap,
  getBaseSplits,
  getNextSplits,
  SplitObj,
} from '../useReceiptSplitsController';

const users = [
  { id: '1', email: 'email1@email.com' },
  { id: '2', email: 'email2@email.com' },
];

describe('useReceiptSplitsController', () => {
  describe('fn: getBaseSplits', () => {
    it('should reduce user array into split map object', () => {
      expect(getBaseSplits(1, users)).toEqual({
        '1': {
          isCustom: expect.any(Boolean),
          value: expect.any(Number),
        },
        '2': {
          isCustom: expect.any(Boolean),
          value: expect.any(Number),
        },
      });
    });

    it('should divide the total value among all the users', () => {
      expect(getBaseSplits(1, users)).toEqual({
        '1': {
          isCustom: expect.any(Boolean),
          value: 0.5,
        },
        '2': {
          isCustom: expect.any(Boolean),
          value: 0.5,
        },
      });
    });

    it('should mark each user with "isCustom" as "false" by default when using this function', () => {
      expect(getBaseSplits(1, users)).toEqual({
        '1': {
          isCustom: false,
          value: expect.any(Number),
        },
        '2': {
          isCustom: false,
          value: expect.any(Number),
        },
      });
    });
  });

  describe('fn: fromEntriesToObjMap', () => {
    // This is JS entries getting as Object.entries(Object)....
    const entries: Array<[string, SplitObj]> = [
      ['1', { isCustom: false, value: 0.5 }],
      ['2', { isCustom: false, value: 0.5 }],
    ];
    it('should convert from object entries into an object. With [0] as key and [1] as values', () => {
      expect(fromEntriesToObjMap(entries)).toEqual({
        '1': expect.any(Object),
        '2': expect.any(Object),
      });
    });

    it('should not modify any values while converting it into an object', () => {
      expect(fromEntriesToObjMap(entries)).toEqual({
        '1': {
          isCustom: false,
          value: 0.5,
        },
        '2': {
          isCustom: false,
          value: 0.5,
        },
      });
    });
  });

  describe('fn: getNextSplits', () => {
    const defaultUserId = '1';

    const defaultSplitObjMap = {
      '1': {
        isCustom: false,
        value: 0.5,
      },
      '2': {
        isCustom: false,
        value: 0.5,
      },
    };

    it('should return a SplitObjMap from as the default behavior', () => {
      expect(getNextSplits(defaultSplitObjMap, 1, defaultUserId, 0.75)).toEqual(
        {
          '1': {
            isCustom: expect.any(Boolean),
            value: expect.any(Number),
          },
          '2': {
            isCustom: expect.any(Boolean),
            value: expect.any(Number),
          },
        }
      );
    });

    it('should adjust split map values if a new value is provided', () => {
      expect(getNextSplits(defaultSplitObjMap, 1, '1', 0.75)).toEqual({
        '1': {
          isCustom: expect.any(Boolean),
          value: 0.75,
        },
        '2': {
          isCustom: expect.any(Boolean),
          value: 0.25,
        },
      });
    });

    it('should change the appropriate split value "isCustom" to "TRUE" for the id we are changing', () => {
      expect(getNextSplits(defaultSplitObjMap, 1, '1', 0.75)).toEqual({
        '1': {
          isCustom: true,
          value: expect.any(Number),
        },
        '2': {
          isCustom: expect.any(Boolean),
          value: expect.any(Number),
        },
      });
    });

    it('should not allow higher value per split than the totalNum', () => {
      expect(getNextSplits(defaultSplitObjMap, 1, '1', 2)).toEqual({
        '1': {
          isCustom: true,
          value: 1,
        },
        '2': {
          isCustom: expect.any(Boolean),
          value: expect.any(Number),
        },
      });
    });

    it('should zero out other splits and remove "isCustom = true" if split value is higher or equal of total', () => {
      expect(getNextSplits(defaultSplitObjMap, 1, '1', 2)).toEqual({
        '1': {
          isCustom: true,
          value: 1,
        },
        '2': {
          isCustom: false,
          value: 0,
        },
      });

      const oneSplitIsCustom = {
        ...defaultSplitObjMap,
        // Overwriting the default item
        '2': {
          value: 1,
          isCustom: true,
        },
      };
      expect(getNextSplits(oneSplitIsCustom, 1, '1', 2)).toEqual({
        '1': {
          isCustom: true,
          value: 1,
        },
        '2': {
          isCustom: false,
          value: 0,
        },
      });
    });

    it('should keep each split "isCustom = true" if they were previously edited.', () => {
      const initialCustomSplits = {
        ...defaultSplitObjMap,
        '3': {
          isCustom: true,
          value: 0.5,
        },
      };

      expect(getNextSplits(initialCustomSplits, 1.5, '1', 0.25)).toEqual({
        '1': {
          isCustom: true,
          value: 0.25,
        },
        '2': {
          isCustom: false,
          value: 0.63,
        },
        '3': {
          isCustom: true,
          value: 0.63,
        },
      });

      // TODO: this is not working as expected actually. Needs a review
      //   const multipleCustomized = {
      //     '1': {
      //       isCustom: true,
      //       value: 0.25,
      //     },
      //     '2': {
      //       isCustom: false,
      //       value: 0.63,
      //     },
      //     '3': {
      //       isCustom: true,
      //       value: 0.63,
      //     },
      //   };

      //   expect(getNextSplits(multipleCustomized, 1.5, '3', 0.5)).toEqual({
      //     '1': {
      //       isCustom: true,
      //       value: 0.5,
      //     },
      //     '2': {
      //       isCustom: false,
      //       value: 0.5,
      //     },
      //     '3': {
      //       isCustom: true,
      //       value: 0.5,
      //     },
      //   });
    });
  });
});
