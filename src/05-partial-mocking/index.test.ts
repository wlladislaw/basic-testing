import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    _esModule: true,
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(console, 'log');
    mockOne();
    expect(logSpy).not.toHaveBeenCalledWith('foo');
    mockTwo();
    expect(logSpy).not.toHaveBeenCalledWith('bar');
    mockThree();
    expect(logSpy).not.toHaveBeenCalledWith('baz');
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(logSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
