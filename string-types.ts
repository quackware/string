import { Split } from "./split.ts";

export type UpperCaseCharacters =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export type LowercaseCharacters = Lowercase<UpperCaseCharacters>;

export type WordSeparators = "-" | "_" | " ";

export type UrlSeparator = "/";

export type IdentifierSeparator = ":" | UrlSeparator;

export type WhitespaceCharacters = " " | "\t" | "\n" | "\r";

export type NonCharacters = Split<
  "\u2000-\u206F\u2E00-\u2E7F'!\"#$%&()*+,-./:;<=>?@[]^_`{|}~",
  ""
>;

export type StringDigit =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

export type AlphaNumeric =
  | `${UpperCaseCharacters}`
  | `${LowercaseCharacters}`
  | `${StringDigit}`;
