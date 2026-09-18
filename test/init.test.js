import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  applyBootstrapPlan,
  createBootstrapPlan,
  renderSource,
} from "../src/init.js";

const assetRoot = path.resolve(".");

async function tempRepo() {
  return mkdtemp(path.join(os.tmpdir(), "todokiso-test-"));
}

test("init plans and creates a bootstrap for an existing Node repository", async () => {
  const target = await tempRepo();

  try {
    await writeFile(
      path.join(target, "package.json"),
      JSON.stringify(
        {
          name: "example",
          description: "Example project.",
          engines: { node: ">=24" },
          scripts: {
            dev: "tsx src/index.ts",
            lint: "eslint .",
            typecheck: "tsc --noEmit",
            test: "vitest run",
          },
          dependencies: { playwright: "^1.0.0" },
        },
        null,
        2,
      ),
    );
    await writeFile(path.join(target, "pnpm-lock.yaml"), "lockfileVersion: '9.0'\n");
    await mkdir(path.join(target, ".github", "workflows"), { recursive: true });
    await writeFile(
      path.join(target, ".github", "workflows", "ci.yml"),
      "name: CI\n",
    );

    const plan = await createBootstrapPlan(target, {
      assetRoot,
      version: "0.1.0-test",
      date: "2026-09-18",
    });

    assert.equal(
      plan.entries.find(
        (entry) => entry.relativePath === "docs/todokiso/WORKFLOW.md",
      )?.status,
      "create",
    );

    const profile = plan.entries.find(
      (entry) => entry.relativePath === "docs/REPOSITORY_PROFILE.md",
    )?.content;

    assert.match(profile, /Example project\./);
    assert.match(profile, /Package manager: pnpm/);
    assert.match(profile, /pnpm typecheck/);
    assert.match(profile, /playwright/);
    assert.match(profile, /.github\/workflows\/ci.yml/);

    await applyBootstrapPlan(plan);

    const source = await readFile(
      path.join(target, "docs", "todokiso", "SOURCE.md"),
      "utf8",
    );
    assert.match(source, /todokiso@0\.1\.0-test/);

    const workflow = await readFile(
      path.join(target, "docs", "todokiso", "WORKFLOW.md"),
      "utf8",
    );
    assert.match(workflow, /# Core Workflow/);
  } finally {
    await rm(target, { recursive: true, force: true });
  }
});

test("init refuses to overwrite an existing conflicting file", async () => {
  const target = await tempRepo();

  try {
    const existingPath = path.join(target, "docs", "todokiso", "WORKFLOW.md");
    await mkdir(path.dirname(existingPath), { recursive: true });
    await writeFile(existingPath, "local workflow\n");

    const plan = await createBootstrapPlan(target, {
      assetRoot,
      version: "0.1.0-test",
      date: "2026-09-18",
    });

    assert.equal(
      plan.entries.find(
        (entry) => entry.relativePath === "docs/todokiso/WORKFLOW.md",
      )?.status,
      "conflict",
    );

    await assert.rejects(
      () => applyBootstrapPlan(plan),
      /refusing to overwrite existing files/,
    );

    assert.equal(await readFile(existingPath, "utf8"), "local workflow\n");
  } finally {
    await rm(target, { recursive: true, force: true });
  }
});


test("package.json packageManager is detected without a lockfile", async () => {
  const target = await tempRepo();

  try {
    await writeFile(
      path.join(target, "package.json"),
      JSON.stringify(
        {
          name: "itteko-like",
          packageManager: "pnpm@10.17.1",
          scripts: {
            typecheck: "tsc --noEmit",
            test: "vitest run",
          },
        },
        null,
        2,
      ),
    );

    const plan = await createBootstrapPlan(target, {
      assetRoot,
      version: "0.1.0-test",
      date: "2026-09-18",
    });

    assert.equal(plan.facts.packageManager, "pnpm");

    const profile = plan.entries.find(
      (entry) => entry.relativePath === "docs/REPOSITORY_PROFILE.md",
    )?.content;

    assert.match(profile, /Package manager: pnpm/);
    assert.match(profile, /pnpm typecheck/);
  } finally {
    await rm(target, { recursive: true, force: true });
  }
});


test("SOURCE records an exact source revision when available", () => {
  const source = renderSource(
    "0.1.0-test",
    "2026-09-18",
    "a2eb8de35e9e0d598532dc9796f071d6a43aba38",
  );

  assert.match(source, /Package revision: todokiso@0\.1\.0-test/);
  assert.match(
    source,
    /Source revision: `a2eb8de35e9e0d598532dc9796f071d6a43aba38`/,
  );
});
