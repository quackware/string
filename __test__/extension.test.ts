import { ensureExtension, ensureLeadingPeriod } from "../extension.ts";
import { assertEquals } from "./deps.ts";

Deno.test("extension", async (t) => {
  await t.step("ensureExtension", () => {
    assertEquals(ensureExtension("foo", ".ts"), "foo.ts");
  });

  await t.step("ensureLeadingPeriod", () => {
    assertEquals(ensureLeadingPeriod("ts"), ".ts");
    assertEquals(ensureLeadingPeriod(".ts"), ".ts");
  });
});
