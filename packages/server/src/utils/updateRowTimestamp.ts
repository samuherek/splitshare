import { EntitySchema, getRepository } from 'typeorm';

export default async function updateRowTimestamp(
  Entity: string | Function | (new () => unknown) | EntitySchema<unknown>,
  rowId: string
) {
  return getRepository(Entity).update(rowId, {});
}
