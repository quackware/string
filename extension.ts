import { ensurePrefix } from "./prefix.ts";
import { ensureSuffix } from "./suffix.ts";

export type Extension = `.${string}`;

/**
 * Ensures the given {@linkcode path} ends in {@linkcode extension}.
 */
export function ensureExtension<Path extends string, Ext extends Extension>(
  path: Path,
  extension: Ext,
) {
  return ensureSuffix(path, extension);
}

export function ensureLeadingPeriod<Path extends string>(path: Path) {
  return ensurePrefix(path, ".");
}
