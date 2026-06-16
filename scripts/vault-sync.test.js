const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const test = require("node:test");

test("sync tolerates Obsidian wikilinks in frontmatter", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "vault-sync-"));
  const vault = path.join(root, "vault");
  const output = path.join(root, "data");

  fs.mkdirSync(path.join(vault, "04_Knowledge", "00_Cards"), { recursive: true });
  fs.mkdirSync(path.join(vault, "03_Projects", ".templates"), { recursive: true });
  fs.writeFileSync(
    path.join(vault, "04_Knowledge", "00_Cards", "book.md"),
    `---
type: card
card_type: book
title: Test Book
related: [[first-note]], [[second-note]]
---

# Test Book

Content.
`,
  );
  fs.writeFileSync(
    path.join(vault, "03_Projects", ".templates", "00_Overview.md"),
    `---
title: {{ProjectName}}
status: {{planning|active|paused|completed|archived}}
---

# Overview
`,
  );

  const result = spawnSync(process.execPath, ["scripts/vault-sync.js"], {
    cwd: path.resolve(__dirname, ".."),
    env: {
      ...process.env,
      VAULT_PATH: vault,
      OUTPUT_PATH: output,
    },
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr);
  const vaultData = JSON.parse(
    fs.readFileSync(path.join(output, "vault-data.json"), "utf8"),
  );
  assert.deepEqual(vaultData.projects, []);
});
