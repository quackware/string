import { stripPrefix, stripPrefixProperties } from "../prefix.ts";
import { assertEquals, assertObjectMatch } from "./deps.ts";

Deno.test("prefix", async (t) => {
  await t.step("stripPrefix", () => {
    assertEquals(stripPrefix("QUACKWARE_TOKEN", "QUACKWARE_"), "TOKEN");
  });

  await t.step("stripPrefixProperties", () => {
    const env = {
      QUACKWARE_TOKEN: "foo",
      QAUCKWARE_MISPELL: "bar",
    };

    assertObjectMatch(stripPrefixProperties(env, "QUACKWARE_"), { TOKEN: "foo", "QAUCKWARE_MISPELL": "bar" });
  });
});
