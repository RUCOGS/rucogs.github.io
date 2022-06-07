export function deepClone<T>(object: T) {
  return JSON.parse(JSON.stringify(object)) as T;
}