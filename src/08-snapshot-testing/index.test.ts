import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const els = [77, 568, 1000];
    const resExpected = {
      value: 77,
      next: {
        value: 568,
        next: {
          value: 1000,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(generateLinkedList(els)).toStrictEqual(resExpected);
  });

  test('should generate linked list from values 2', () => {
    const els = [777, 422, 89, 99000];
    const res = generateLinkedList(els);

    expect(res).toMatchSnapshot();
  });
});
