import {
  camelCase,
  camelCaseProperties,
  kebabCase,
  kebabCasePropertes,
  lowerFirst,
  pascalCase,
  pascalCaseProperties,
  snakeCase,
  snakeCaseProperties,
  upperFirst,
} from "../case.ts";
import { assertEquals, assertObjectMatch } from "./deps.ts";

Deno.test("case", async (t) => {
  await t.step("upperFirst", () => {
    assertEquals(upperFirst(""), "");
    assertEquals(upperFirst("curtis"), "Curtis");
    assertEquals(upperFirst("Curtis"), "Curtis");
  });

  await t.step("lowerFirst", () => {
    assertEquals(lowerFirst(""), "");
    assertEquals(lowerFirst("curtis"), "curtis");
    assertEquals(lowerFirst("Curtis"), "curtis");
    assertEquals(lowerFirst("CURTIS"), "cURTIS");
  });

  await t.step("pascalCase", () => {
    assertEquals(pascalCase("foobar"), "Foobar");
    assertEquals(pascalCase("foo-bar"), "FooBar");
    assertEquals(pascalCase("BIG_WORDS"), "BigWords");
  });

  await t.step("camelCase", () => {
    assertEquals(camelCase("fooBar"), "fooBar");
    assertEquals(camelCase("FooBar"), "fooBar");
  });

  await t.step("kebabCase", () => {
    assertEquals(kebabCase("foo-bar"), "foo-bar");
    assertEquals(kebabCase("fooBarBaz"), "foo-bar-baz");
    assertEquals(kebabCase("foofoofoo"), "foofoofoo");
    assertEquals(kebabCase("BarBarBaz"), "bar-bar-baz");
    assertEquals(kebabCase("lo_dashBarBaz"), "lo-dash-bar-baz");
  });

  await t.step("snakeCase", () => {
    assertEquals(snakeCase("foo-bar"), "foo_bar");
    assertEquals(snakeCase("fooBarBaz"), "foo_bar_baz");
    assertEquals(snakeCase("foofoofoo"), "foofoofoo");
    assertEquals(snakeCase("BarBarBaz"), "bar_bar_baz");
    assertEquals(snakeCase("lo_dashBarBaz"), "lo_dash_bar_baz");
  });

  await t.step("pascalCaseProperties", () => {
    const props = {
      BIG_WORDS: "are cool",
    };

    const pascaled = pascalCaseProperties(props);
    assertObjectMatch(pascaled, { BigWords: "are cool" });
  });

  await t.step("camelCaseProperties", () => {
    const props = {
      BIG_WORDS: "are cool",
    };

    const cameled = camelCaseProperties(props);
    assertObjectMatch(cameled, { bigWords: "are cool" });
  });

  await t.step("kebabCaseProperties", () => {
    const props = {
      bigWords: "are cool",
    };

    const kebabed = kebabCasePropertes(props);
    assertObjectMatch(kebabed, { "big-words": "are cool" });
  });

  await t.step("snakeCaseProperties", () => {
    const props = {
      bigWords: "are cool",
    };

    const snaked = snakeCaseProperties(props);
    assertObjectMatch(snaked, { "big_words": "are cool" });
  });
});
