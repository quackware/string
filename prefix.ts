import { Replace, replace } from "./replace.ts";

/**
 * Strip the given {@linkcode prefix} from {@linkcode target}.
 */
export function stripPrefix<Prefix extends string, Target extends `${Prefix}${string}`>(
  target: Target,
  prefix: Prefix,
) {
  return replace(target, prefix, "", true);
}

/**
 * Strip the given {@linkcode prefix} from the properties of the given {@linkcode obj}.
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

/**
 * Ensures the given type {@linkcode Str} begins with the type {@linkcode Prefix}.
 */
export type EnsurePrefix<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? Str
  : `${Prefix}${Str}`;

/**
 * Ensures the given {@linkcode str} begins with {@linkcode prefix}.
 */
export function ensurePrefix<CheckString extends string, Prefix extends string>(str: CheckString, prefix: Prefix) {
  return (str.startsWith(prefix) ? str : `${prefix}${str}`) as EnsurePrefix<CheckString, Prefix>;
}
