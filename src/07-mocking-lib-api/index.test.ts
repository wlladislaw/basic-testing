import axios from 'axios';
// import { throttledGetDataFromApi } from './index';

jest.mock('axios', () => {
  const originalModule = jest.requireActual('axios');

  return {
    __esModule: true,
    ...originalModule,
    get: jest.fn(),
    create: jest.fn(() => ({
      get: jest.fn().mockResolvedValue({ data: [{ name: 'Bob' }] }),
    })),
  };
});
describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
  test('should create instance with provided base url', async () => {
    const axiosClient = axios.create({
      baseURL: 'https://jsonplaceholder',
    });

    expect(axiosClient.defaults.baseURL).toEqual('https://jsonplaceholder');
  });

  test('should perform request to correct provided url', async () => {
    //
  });

  test('should return response data', async () => {
    //
  });
});
