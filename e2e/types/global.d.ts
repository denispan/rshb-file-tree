import { ItemResponse } from '../fixtures/mocks/normalData';

declare global {
  interface Window {
    getFilesOverride?: () => Promise<ItemResponse[] | { error: boolean; message: string }>;
  }
}

export {};
