import { interpolate } from "../interpolate.ts";
import { assertEquals } from "./deps.ts";

Deno.test("interpolate", async (t) => {
  await t.step("interpolate", () => {
    const res = interpolate(
      `My Name Is {{name}}, I'm {{age}} years old`,
      {
        name: "curtis",
        age: "31",
      },
    );

    assertEquals(res, "My Name Is curtis, I'm 31 years old");
  });
});
