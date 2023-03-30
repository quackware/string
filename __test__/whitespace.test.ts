import { eatWhitespace } from "../whitespace.ts";
import { assertEquals } from "./deps.ts";

Deno.test("whitespace", async (t) => {
  await t.step("eatWhitespace", () => {
    assertEquals(eatWhitespace(" Hello"), "Hello");
    assertEquals(eatWhitespace("World "), "World");
    assertEquals(eatWhitespace("Hello World"), "HelloWorld");
  });
});
