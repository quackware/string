import { extname } from "https://deno.land/std@0.181.0/path/mod.ts";

/**
 * Ensure the given path ends in the given extension
 */
export function ensureExtension<Path extends string, Extension extends `.${string}`>(
  path: Path,
  extension: Extension,
): `${string}${Extension}` {
  const ext = extname(path);
  if (ext === extension) {
    return path as `${string}${Extension}`;
  } else {
    return `${path}${extension}` as const;
  }
}
