#!/usr/bin/env node

import { main } from "../src/cli.js";

try {
  process.exitCode = await main(process.argv.slice(2));
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`todokiso: ${message}`);
  process.exitCode = 1;
}
