import { ParserError } from "./parser-error.ts";

export type ExtractInterpolateVars<T extends string> = T extends `${string}{{${infer Prop}}}${infer Rest}`
  ? Prop | ExtractInterpolateVars<Rest>
  : never;

export type InterpolateVars<Str extends string> = Readonly<
  {
    [K in ExtractInterpolateVars<Str>]: string | number;
  }
>;

export type DiscoverMissingVars<
  Str extends string,
  Obj extends Record<string, string | number>,
> = ExtractInterpolateVars<Str> extends infer Vars ? Vars extends string ? {
      [K in Vars]: unknown extends Obj[K] ? ParserError<`Missing var '${K}'`> : never;
    }[Vars]
  : never
  : never;

export type Interpolate<Str extends string, Obj extends InterpolateVars<Str>> = DiscoverMissingVars<
  Str,
  Obj
> extends infer MissingVars
  ? [MissingVars] extends [never]
    ? Str extends `${infer Prev}{{${infer Prop}}}${infer Rest}` ? `${Prev}${Obj[Prop & keyof Obj]}${Interpolate<
        Rest,
        Obj & InterpolateVars<Rest>
      >}`
    : Str
  : ParserError<Extract<MissingVars, string>>
  : never;

/**
 * Type safe interpolation function.
 *
 * @example
 *
 * const res = interpolate(`My Name Is {{name}}, I'm {{age}} years old`, {
 *   name: "curtis",
 *   age: "31",
 * });
 *
 * assertEquals(res, "My name is curtis, I'm 31 years old")
 */
export function interpolate<T extends string, Obj extends InterpolateVars<T>>(str: T, vars: Obj) {
  return Object.entries(vars).reduce((acc, [key, val]) => {
    acc = acc.replace("{{" + key + "}}", val + "");
    return acc;
  }, str as string) as Interpolate<T, Obj>;
}
