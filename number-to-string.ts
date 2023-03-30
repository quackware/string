/** Number to string typing that preserves constant types */
export type NumberToString<T extends number> = `${T}` extends `${infer $STR extends string}` ? $STR : never;

/**
 * Type safe number to string that preserves constant types
 *
 * @example
 *
 * numberToString(123); // Return type is "123"
 */
export function numberToString<T extends number>(num: T) {
  return num.toString() as NumberToString<T>;
}
