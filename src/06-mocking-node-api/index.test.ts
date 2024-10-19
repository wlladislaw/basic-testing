import { doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    const timer = 600;

    const setTimeoutMock = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, timer);

    expect(setTimeoutMock).toHaveBeenCalledWith(cb, timer);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    const timer = 600;

    doStuffByTimeout(cb, timer);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(timer);

    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    const timer = 600;

    const setIntervalMock = jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, timer);

    expect(setIntervalMock).toHaveBeenCalledWith(cb, timer);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();

    doStuffByInterval(cb, 600);
    doStuffByInterval(cb, 600);
    jest.advanceTimersByTime(600);

    expect(cb).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // await readFileAsynchronously('');
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
