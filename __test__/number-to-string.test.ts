import { numberToString } from "../number-to-string.ts";
import { assertEquals } from "./deps.ts";

Deno.test("number-to-string", async (t) => {
  await t.step("numberToString", () => {
    assertEquals(numberToString(1), "1");
    assertEquals(numberToString(1234), "1234");
    assertEquals(numberToString(-1), "-1");
  });
});
