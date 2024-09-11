import { setupServer } from 'msw/node';
import { getHandler } from './getHandler';
 
export const server = setupServer(...getHandler);