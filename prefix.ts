import { Replace, replace } from "./replace.ts";

/**
 * Strip the prefix value from `target` while preserving the constant string type.
 */
export function stripPrefix<Prefix extends string, Target extends `${Prefix}${string}`>(
  target: Target,
  prefix: Prefix,
) {
  return replace(target, prefix, "", true);
}

/**
 * Strip the given prefix from the properties of the given object.
 */
export function stripPrefixProperties<
  Obj extends Record<string, string>,
  Prefix extends string,
  Key extends keyof Obj & `${Prefix}${string}`,
>(obj: Obj, prefix: Prefix) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => {
      return [stripPrefix(k as Key, prefix), v] as const;
    }),
  ) as Record<Replace<Key, Prefix, "", { all: true }>, string>;
}
