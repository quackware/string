import {
  CamelCase,
  CamelCasedProperties,
  DelimiterCasedProperties,
  KebabCase,
  PascalCase,
  PascalCaseProperties,
  SnakeCase,
} from "./case-types.ts";

const WORD_SEPARATORS_RE = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;
const UPPERCASE_PLUS_LOWER_RE = /[A-ZÀ-Ý\u00C0-\u00D6\u00D9-\u00DD][a-zà-ÿ]/g;
const UPPERCASE_RE = /[A-ZÀ-Ý\u00C0-\u00D6\u00D9-\u00DD]+/g;
const FOUR_OR_MORE_CONSECUTIVE_UPPERCASE_RE = /([A-Z\u00C0-\u00DC]{4,})/g;
const ALL_CAPS_RE = /^[A-Z\u00C0-\u00DC]+$/;

function deCap(match: string, endOfWord: boolean) {
  const arr = match.split("");
  const first = arr.shift()!.toUpperCase();
  const last = endOfWord ? arr.pop()!.toLowerCase() : arr.pop();
  return first + arr.join("").toLowerCase() + last;
}

export function isUppercase(char = "") {
  return char.toUpperCase() === char;
}

/**
 * Uppercase the first letter of the given `str` and return the new value.
 */
export function upperFirst<T extends string>(str: T) {
  if (!str) {
    return "";
  }
  return str[0].toUpperCase() + str.slice(1);
}

/**
 * Lowercase the first letter of the given `str` and return the new value.
 */
export function lowerFirst<T extends string>(str: T) {
  if (!str) {
    return "";
  }
  return str[0].toLocaleLowerCase() + str.slice(1);
}

/**
 * Convert the given string `str` to `PascalCase`
 *
 * @example
 *
 * pascalCase("foo_bar"); // "FooBar"
 */
export function pascalCase<T extends string>(str: T) {
  const words = str.split(WORD_SEPARATORS_RE);
  const mappedWords = new Array(words.length);
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word === "") {
      continue;
    }
    mappedWords[i] = word[0].toUpperCase() + word.slice(1).toLowerCase();
  }
  return mappedWords.join("") as PascalCase<T>;
}

const CAMEL_RE = /^[a-z\u00E0-\u00FCA-Z\u00C0-\u00DC][\d|a-z\u00E0-\u00FCA-Z\u00C0-\u00DC]*$/;
/**
 * Convert the given string `str` to `camelCase`
 *
 * @example
 *
 * camelCase("FooBar"); // "fooBar"
 */
export function camelCase<Str extends string>(str: Str) {
  const words = str.split(WORD_SEPARATORS_RE);
  const len = words.length;
  const mappedWords = new Array(len);
  for (let i = 0; i < len; i++) {
    let word = words[i];
    if (word === "") {
      continue;
    }
    const isCamelCase = CAMEL_RE.test(word) && !ALL_CAPS_RE.test(word);
    if (isCamelCase) {
      word = word.replace(FOUR_OR_MORE_CONSECUTIVE_UPPERCASE_RE, function(match, _, offset) {
        return deCap(match, word.length - offset - match.length == 0);
      });
    }
    let firstLetter = word[0];
    firstLetter = i > 0 ? firstLetter.toUpperCase() : firstLetter.toLowerCase();
    mappedWords[i] = firstLetter + (!isCamelCase ? word.slice(1).toLowerCase() : word.slice(1));
  }
  return mappedWords.join("") as CamelCase<Str>;
}

/**
 * Convert the given string `str` to `kebab-case`.
 *
 * @example
 *
 * kebabCase("FooBar"); // "foo-bar"
 */
export function kebabCase<T extends string>(str: T) {
  let strBuilder = str.replace(UPPERCASE_PLUS_LOWER_RE, function(match) {
    return " " + (match[0].toLowerCase() || match[0]) + match[1];
  });
  strBuilder = strBuilder.replace(UPPERCASE_RE, function(match) {
    return " " + match.toLowerCase();
  });
  return strBuilder.trim().split(WORD_SEPARATORS_RE).join("-").replace(/^-/, "").replace(/-\s*$/, "") as KebabCase<T>;
}

/**
 * Convert the given string `str` to `snake_case`.
 *
 * @example
 *
 * snakeCase("FooBar"); // "foo_bar"
 */
export function snakeCase<T extends string>(str: T) {
  const strBuilder = str.replace(UPPERCASE_RE, function(match) {
    return " " + (match.toLowerCase() || match);
  });
  return strBuilder.trim().split(WORD_SEPARATORS_RE).join("_") as SnakeCase<T>;
}

/**
 * Convert each property name of the given record `obj` to `PascalCase`
 */
export function pascalCaseProperties<S extends string, T extends Record<S, unknown>>(obj: T) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [pascalCase(k), v])) as PascalCaseProperties<T>;
}

/**
 * Convert each property name of the given record `obj` to `camelCase`
 */
export function camelCaseProperties<S extends string, T extends Record<S, unknown>>(obj: T) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [camelCase(k), v])) as CamelCasedProperties<T>;
}

/**
 * Convert each property name of the given record `obj` to `snake_case`
 */
export function snakeCaseProperties<S extends string, T extends Record<S, unknown>>(obj: T) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [snakeCase(k), v])) as DelimiterCasedProperties<T, "_">;
}

/**
 * Convert each property name of the given record `obj` to `kebab-case`
 */
export function kebabCasePropertes<S extends string, T extends Record<S, unknown>>(obj: T) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [kebabCase(k), v])) as DelimiterCasedProperties<T, "-">;
}
