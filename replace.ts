/**
 * String replacement
 *
 * @example
 *
 * type Test = Replace<`{foo: "\${GITHUB_ENV}"}`, `\${GITHUB_ENV}`, `production`>;
 * const foo: Test = "{foo: \"production\"}"
 */
export type Replace<
  Input extends string,
  Search extends string,
  Replacement extends string,
  Options extends { all?: boolean } = {},
> = Input extends `${infer Head}${Search}${infer Tail}`
  ? Options["all"] extends true ? Replace<`${Head}${Replacement}${Tail}`, Search, Replacement, Options>
  : `${Head}${Replacement}${Tail}`
  : Input;

/**
 * A type safe string replace function
 *
 * @example
 * const target = "aaabbcccbbdd";
 * const searchVal = "bb";
 * const replaceVal = "curtis";
 * // "aaacurtisccccurtisdd"
 * const ret = replace(target, searchVal, replaceVal, true);
 */
export function replace<
  TargetInput extends string,
  SearchValue extends string,
  ReplaceValue extends string,
  All extends true | false,
>(target: TargetInput, searchValue: SearchValue, replaceValue: ReplaceValue, all: All) {
  if (all === true) {
    return target.replaceAll(searchValue, replaceValue) as Replace<
      TargetInput,
      SearchValue,
      ReplaceValue,
      { all: All }
    >;
  } else {
    return target.replace(searchValue, replaceValue) as Replace<TargetInput, SearchValue, ReplaceValue, { all: All }>;
  }
}
