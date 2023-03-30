import { Includes } from "./deps.ts";
import { Split, SplitIncludingDelimiters } from "./split.ts";
import { UpperCaseCharacters, WordSeparators } from "./string-types.ts";

/**
 * Format a specific part of the split string literal that `StringArrayToDelimiterCase<>` fuses together, ensuring desired casing.
 */
type StringPartToDelimiterCase<
  StringPart extends string,
  Start extends boolean,
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = StringPart extends UsedWordSeparators ? Delimiter
  : Start extends true ? Lowercase<StringPart>
  : StringPart extends UsedUpperCaseCharacters ? `${Delimiter}${Lowercase<StringPart>}`
  : StringPart;

/**
 * Takes the result of a splitted string literal and recursively concatenates it together into the desired casing.
 *
 * It receives `UsedWordSeparators` and `UsedUpperCaseCharacters` as input to ensure it's fully encapsulated.
 */
type StringArrayToDelimiterCase<
  Parts extends readonly any[],
  Start extends boolean,
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts] ? `${StringPartToDelimiterCase<
    FirstPart,
    Start,
    UsedWordSeparators,
    UsedUpperCaseCharacters,
    Delimiter
  >}${StringArrayToDelimiterCase<
    RemainingParts,
    false,
    UsedWordSeparators,
    UsedUpperCaseCharacters,
    Delimiter
  >}`
  : Parts extends [string] ? string
  : "";

type InnerCamelCaseStringArray<Parts extends readonly any[], PreviousPart> = Parts extends [
  `${infer FirstPart}`,
  ...infer RemainingParts,
] ? FirstPart extends undefined ? ""
  : FirstPart extends "" ? InnerCamelCaseStringArray<RemainingParts, PreviousPart>
  : `${PreviousPart extends "" ? FirstPart
    : Capitalize<FirstPart>}${InnerCamelCaseStringArray<
    RemainingParts,
    FirstPart
  >}`
  : "";

type CamelCaseStringArray<Parts extends readonly string[]> = Parts extends [
  `${infer FirstPart}`,
  ...infer RemainingParts,
] ? Uncapitalize<
    `${FirstPart}${InnerCamelCaseStringArray<RemainingParts, FirstPart>}`
  >
  : never;

/**
 * Helper type for the various `*Case` types
 */
export type DelimiterCase<Value, Delimiter extends string> = Value extends string ? StringArrayToDelimiterCase<
    SplitIncludingDelimiters<Value, WordSeparators | UpperCaseCharacters>,
    true,
    WordSeparators,
    UpperCaseCharacters,
    Delimiter
  >
  : Value;

/** Converts the given string literal `Value` to `camelCase` */
export type CamelCase<Value> = Value extends string ? CamelCaseStringArray<
    Split<Value extends Uppercase<Value> ? Lowercase<Value> : Value, WordSeparators>
  >
  : Value;

/** Converts the given string literal `Value` to `snake_case` */
export type SnakeCase<Value> = DelimiterCase<Value, "_">;

/** Converts the given string literal `Value` to `PascalCase` */
export type PascalCase<Value> = CamelCase<Value> extends string ? Capitalize<CamelCase<Value>>
  : CamelCase<Value>;

/** Converts the given string literal `Value` to `kebab-case` */
export type KebabCase<Value> = DelimiterCase<Value, "-">;

export type PascalCaseProperties<Value> = Value extends Function ? Value
  : Value extends Array<infer U> ? Array<PascalCaseProperties<U>>
  : Value extends Set<infer U> ? Set<PascalCaseProperties<U>>
  : {
    [K in keyof Value as PascalCase<K>]: PascalCaseProperties<Value[K]>;
  };

export type CamelCasedPropertiesDeep<Value> = Value extends Function ? Value
  : Value extends Array<infer U> ? Array<CamelCasedPropertiesDeep<U>>
  : Value extends Set<infer U> ? Set<CamelCasedPropertiesDeep<U>>
  : {
    [K in keyof Value as CamelCase<K>]: CamelCasedPropertiesDeep<Value[K]>;
  };

export type CamelCasedProperties<Value> = Value extends Function ? Value
  : Value extends Array<infer U> ? Value
  : {
    [K in keyof Value as CamelCase<K>]: Value[K];
  };

export type IsScreamingSnakeCase<Value extends string> = Value extends Uppercase<Value>
  ? Includes<SplitIncludingDelimiters<Lowercase<Value>, "_">, "_"> extends true ? true
  : false
  : false;

export type ScreamingSnakeCase<Value> = Value extends string ? IsScreamingSnakeCase<Value> extends true ? Value
  : Uppercase<SnakeCase<Value>>
  : Value;

export type DelimiterCasedProperties<
  Value,
  Delimiter extends string,
> = Value extends Function ? Value
  : Value extends Array<infer U> ? Value
  : { [K in keyof Value as DelimiterCase<K, Delimiter>]: Value[K] };

export type DelimiterCasedPropertiesDeep<
  Value,
  Delimiter extends string,
> = Value extends Function | Date | RegExp ? Value
  : Value extends Array<infer U> ? Array<DelimiterCasedPropertiesDeep<U, Delimiter>>
  : Value extends Set<infer U> ? Set<DelimiterCasedPropertiesDeep<U, Delimiter>>
  : {
    [
      K in keyof Value as DelimiterCase<
        K,
        Delimiter
      >
    ]: DelimiterCasedPropertiesDeep<Value[K], Delimiter>;
  };
