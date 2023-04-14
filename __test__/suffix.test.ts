import { ensureSuffix } from "../suffix.ts";
import { assertEquals } from "./deps.ts";

Deno.test("suffix", async (t) => {
  await t.step("ensureSuffix", () => {
    assertEquals(ensureSuffix("foo", "bar"), "foobar");
    assertEquals(ensureSuffix("foo", ".ts"), "foo.ts");
    assertEquals(ensureSuffix("foo.ts", ".ts"), "foo.ts");
  });
});
