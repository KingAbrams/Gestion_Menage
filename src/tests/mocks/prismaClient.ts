export const mockPrismaClient = {
  $queryRaw: jest.fn(),
  person: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
