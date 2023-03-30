import { split, splitLines } from "../split.ts";
import { assertArrayIncludes } from "./deps.ts";

Deno.test("split", async (t) => {
  await t.step("split", () => {
    assertArrayIncludes(split("foo_bar", "_"), ["foo", "bar"]);
  });

  await t.step("splitLines", () => {
    const line = "foo\nbar\nbaz";
    assertArrayIncludes(splitLines(line), ["foo", "bar", "baz"]);
  });
});
