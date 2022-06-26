export function positiveMod(n: number, mod: number) {
  return ((n % mod) + mod) % mod;
}

export function spliceWrap(array: any[], index: number, count: number) {
  const result: any[] = [];
  for (let i = 0; i < count; i++) {
    const wrappedIndex = positiveMod(index + i, array.length);
    result.push(array[wrappedIndex]);
  }
  return result;
}

export function arraysEqual(a: any[], b: any[]) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function compare(a: number | string | undefined | null, b: number | string | undefined | null, isAsc: boolean) {
  if (!a || !b) return 0;
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function deepClone<T>(object: T) {
  return JSON.parse(JSON.stringify(object)) as T;
}

export function arrayWithoutDuplicates<T>(arr: T[], equalityFn: ((one: T, two: T) => boolean) | undefined = undefined) {
  if (equalityFn == undefined) return [...new Set(arr)];
  else {
    let noDuplicates: T[] = [];
    for (let i = 0; i < arr.length; i++) {
      let foundDuplicate = false;
      for (let j = 0; j < noDuplicates.length; j++)
        if (equalityFn(arr[i], noDuplicates[j])) {
          foundDuplicate = true;
          break;
        }
      if (!foundDuplicate) noDuplicates.push(arr[i]);
    }
    return noDuplicates;
  }
}

export function mergeArraysWithoutDuplicates<T>(
  arrays: T[][],
  equalityFn: ((one: T, two: T) => boolean) | undefined = undefined,
) {
  let merged: T[] = [];
  for (let i = 0; i < arrays.length; i++) {
    merged = merged.concat(arrays[i]);
  }

  return arrayWithoutDuplicates(merged);
}
