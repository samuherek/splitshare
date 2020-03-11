import { sanitizeName } from './utils/url';

export const PATHS = {
  AUTH0_CALLBACK: '/callback',
};

export function getBillPath(billName: string, billId: string): string {
  return `/${sanitizeName(billName)}-${billId}`;
}
