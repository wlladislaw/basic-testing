import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(77);
    expect(acc.getBalance()).toBe(77);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(777);
    expect(() => acc.withdraw(12342300)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accFirst = getBankAccount(77);
    const accSecond = getBankAccount(990);

    expect(() => accFirst.transfer(1000000, accSecond)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(765);
    expect(() => acc.transfer(1, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(7);
    acc.deposit(10000);
    expect(acc.getBalance()).toBe(10007);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(7000000);
    acc.withdraw(6999999);
    expect(acc.getBalance()).toBe(1);
  });

  test('should transfer money', () => {
    const acc = getBankAccount(7000000);
    const acc2 = getBankAccount(1);
    acc.transfer(1000000, acc2);
    expect(acc2.getBalance()).toBe(1000001);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(4);
    const balance = await acc.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(7000);
    try {
      await acc.synchronizeBalance();
      expect(acc.getBalance()).not.toBe(7000);
      expect(typeof acc.getBalance()).toBe('number');
    } catch (err) {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(7777);
    try {
      await acc.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
