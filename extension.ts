import { ensurePrefix } from "./prefix.ts";

export type Extension = `.${string}`;

/**
 * Ensures the given {@linkcode path} ends in {@linkcode extension}.
 */
export function ensureExtension<Path extends string, Ext extends Extension>(
  path: Path,
  extension: Ext,
): `${string}${Ext}` {
  return ensurePrefix(path, extension) as `${string}${Ext}`;
}

export function ensureLeadingPeriod<Path extends string>(path: Path) {
  return ensurePrefix(path, ".");
}
