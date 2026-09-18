import path from "node:path";
import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { applyBootstrapPlan, createBootstrapPlan } from "./init.js";

const PACKAGE_ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const execFileAsync = promisify(execFile);

async function packageVersion() {
  const content = await readFile(path.join(PACKAGE_ROOT, "package.json"), "utf8");
  return JSON.parse(content).version;
}

async function sourceRevision() {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["-C", PACKAGE_ROOT, "rev-parse", "HEAD"],
      { encoding: "utf8" },
    );
    const revision = stdout.trim();
    return /^[0-9a-f]{40}$/i.test(revision) ? revision : null;
  } catch {
    return null;
  }
}

function usage() {
  return `todokiso

Usage:
  todokiso init [target] [--dry-run]
  todokiso --version
  todokiso --help

Commands:
  init        Bootstrap todokiso into an existing repository.

Options:
  --dry-run   Show create / skip / conflict without writing files.
  --help      Show this help.
  --version   Show the package version.
`;
}

function parseInitArgs(args) {
  let target = ".";
  let dryRun = false;
  let targetSeen = false;

  for (const arg of args) {
    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }

    if (arg.startsWith("-")) {
      throw new Error(`unknown option: ${arg}`);
    }

    if (targetSeen) {
      throw new Error("init accepts at most one target path");
    }

    target = arg;
    targetSeen = true;
  }

  return { target, dryRun };
}

function printPlan(plan) {
  console.log(`Target: ${plan.targetDir}`);
  for (const entry of plan.entries) {
    console.log(`${entry.status.toUpperCase().padEnd(8)} ${entry.relativePath}`);
  }
}

export async function main(args) {
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    console.log(usage());
    return 0;
  }

  if (args[0] === "--version" || args[0] === "-v") {
    console.log(await packageVersion());
    return 0;
  }

  if (args[0] !== "init") {
    throw new Error(`unknown command: ${args[0]}`);
  }

  const { target, dryRun } = parseInitArgs(args.slice(1));
  const version = await packageVersion();
  const revision = await sourceRevision();
  const plan = await createBootstrapPlan(path.resolve(process.cwd(), target), {
    version,
    sourceRevision: revision,
  });

  printPlan(plan);

  const conflicts = plan.entries.filter((entry) => entry.status === "conflict");
  if (conflicts.length > 0) {
    console.error(
      "Conflicts found. todokiso never overwrites existing files during init.",
    );
    return 2;
  }

  if (dryRun) {
    console.log("Dry run only. No files were written.");
    return 0;
  }

  await applyBootstrapPlan(plan);
  const created = plan.entries.filter((entry) => entry.status === "create").length;
  console.log(`Bootstrapped todokiso: ${created} file(s) created.`);
  console.log(
    "Next: review docs/REPOSITORY_PROFILE.md and resolve every TODO / Unknown.",
  );
  return 0;
}
