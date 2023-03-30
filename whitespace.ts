import type { ParserError } from "./parser-error.ts";

const SPACE_REGEX = / /g;

/** Removes all whitespace from the given `State` type */
export type EatWhitespace<State extends string> = string extends State
  ? ParserError<"EatWhitespace received a generic string type, cannot parse!">
  : State extends ` ${infer State}` | `${infer State} ` ? EatWhitespace<State>
  : State extends `${infer StartState} ${infer EndState}` ? EatWhitespace<`${StartState}${EndState}`>
  : State;

/**
 * Removes whitespace from `str` while maintaining string constant type
 *
 * @example
 *
 * eatWhitespace("Hello World"); // type is "HelloWord"
 */
export function eatWhitespace<T extends string>(str: T) {
  return str.replace(SPACE_REGEX, "") as EatWhitespace<T>;
}
