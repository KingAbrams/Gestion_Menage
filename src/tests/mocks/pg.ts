const mockPgClient = {
  query: jest.fn(),
};

export const mockPool = jest.fn(() => mockPgClient);
