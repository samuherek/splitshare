export function remap<T>(entity: T, key: string) {
  const next = entity as T;
  return {
    // FIXME: figure out the typing
    // @ts-ignore
    ...next[key],
    ...next,
  };
}

// TODO: look if we care that this way we can overwrite files!!!!!!!
export function remapJoin<T>(key: string) {
  return (entity: T) => {
    return remap<T>(entity, key);
  };
}
