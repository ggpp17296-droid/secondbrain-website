import assert from "node:assert/strict";
import { join } from "node:path";
import test from "node:test";

import { getDataFilePath } from "./vault-data.ts";

test("resolves vault data files inside the Next project root", () => {
  const nextProjectRoot = "/vercel/path0/src";

  assert.equal(
    getDataFilePath("vault-data.json", nextProjectRoot),
    join(nextProjectRoot, "data", "vault-data.json"),
  );
});
