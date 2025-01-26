import { readFile, writeFile } from "node:fs/promises"

let base = await readFile("node_modules/yoctocolors/base.js", "utf8")

base = base.replace("import tty from 'node:tty'", "const tty = require('node:tty')")

// let lines = script.split(/\r?\n/)
// lines.splice(0, 4)

// lines.unshift(
// `const argv = process.argv || [], env = process.env, hasColors =
// !("NO_COLOR" in env || argv.includes("--no-color")) &&
// ("FORCE_COLOR" in env ||
//   argv.includes("--color") ||
//   process.platform === "win32" ||
//   (require != null && require("tty").isatty(1) && env.TERM !== "dumb") ||
//   "CI" in env);`)
// base = lines.join("\n")

await writeFile("base.js", base);

let index = await readFile("node_modules/yoctocolors/index.js", "utf8")

process.stdout.write(index);
