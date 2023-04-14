/**
 * Ensures the given type {@linkcode Str} ends with the type {@linkcode Suffix}.
 */
export type EnsureSuffix<Str extends string, Suffix extends string> = Str extends `${string}${Suffix}` ? Str
  : `${Str}${Suffix}`;

/**
 * Ensures the given {@linkcode str} ends with {@linkcode suffix}.
 */
export function ensureSuffix<CheckString extends string, Suffix extends string>(str: CheckString, suffix: Suffix) {
  return (str.endsWith(suffix)
    ? str
    : `${str}${suffix}`) as EnsureSuffix<CheckString, Suffix>;
}
