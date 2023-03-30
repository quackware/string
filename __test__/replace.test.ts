import { replace } from "../replace.ts";
import { assertEquals } from "./deps.ts";

Deno.test("interpolate", async (t) => {
  await t.step("replace", () => {
    const toReplaceVal = "The variable is ${ENV_VAR} with extra ${ENV_VAR}" as const;
    const replaced = replace(
      toReplaceVal,
      "${ENV_VAR}",
      "Coolbeans",
      true,
    );
    assertEquals(replaced, "The variable is Coolbeans with extra Coolbeans");
  });
});
