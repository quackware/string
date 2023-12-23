import type { Replace } from "https://git.quack.id/types/replace.ts";

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
