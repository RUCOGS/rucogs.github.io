export function compare(a: number | string | undefined | null, b: number | string | undefined | null, isAsc: boolean) {
  if (!a || !b)
    return 0;
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export function deepClone<T>(object: T) {
  return JSON.parse(JSON.stringify(object)) as T;
}

export function arrayWithoutDuplicates<T>(arr: T[], equalityFn: ((one: T, two: T) => boolean) | undefined = undefined) {
  if (equalityFn == undefined)
    return [...new Set(arr)]
  else {
    let noDuplicates: T[] = [];
    for (let i = 0; i < arr.length; i++) {
      let foundDuplicate = false;
      for (let j = 0; j < noDuplicates.length; j++)
        if (equalityFn(arr[i], noDuplicates[j])) {
          foundDuplicate = true;
          break;
        }
      if (!foundDuplicate)
        noDuplicates.push(arr[i]);
    }
    return noDuplicates;
  }
}

export function mergeArraysWithoutDuplicates<T>(arrays: T[][], equalityFn: ((one: T, two: T) => boolean) | undefined = undefined) {
  let merged: T[] = [];
  for (let i = 0; i < arrays.length; i++) {
    merged = merged.concat(arrays[i]);
  }

  return arrayWithoutDuplicates(merged);
}