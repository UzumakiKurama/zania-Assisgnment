import { setupWorker } from 'msw/browser';
import { getHandler } from './getHandler';

export const browser = setupWorker(...getHandler);