#!/usr/bin/env node

// Benchmark results are unstable. To have more stable results:
// 1. Restart OS. Do not run any applications. Put power cable to laptop.
// 2. Run tests 5 times.
// 3. Took the best result for each candidate.

import benchmark from "benchmark";
import * as colorette from "colorette";
import kleur from "kleur";
import * as kleurColors from "kleur/colors";
import chalk from "chalk";
import ansi from "ansi-colors";
import cliColor from "cli-color";
import * as picocolors from "../picocolors.js";
import * as nanocolors from "nanocolors";

function formatNumber(number) {
  return String(number)
    .replace(/\d{3}$/, ",$&")
    .replace(/^(\d|\d\d)(\d{3},)/, "$1,$2");
}

const suite = new benchmark.Suite();
let out;

let index = 1e8;

suite
  .add("chalk", () => {
    out =
      chalk.bgRed.black(" ERROR ") +
      chalk.red(
        " Add plugin " + chalk.yellow("name") + " to use time limit with " + chalk.yellow(++index)
      );
  })
  .add("cli-color", () => {
    out =
      cliColor.bgRed.black(" ERROR ") +
      cliColor.red(
        " Add plugin " +
          cliColor.yellow("name") +
          " to use time limit with " +
          cliColor.yellow(++index)
      );
  })
  .add("ansi-colors", () => {
    out =
      ansi.bgRed.black(" ERROR ") +
      ansi.red(
        " Add plugin " + ansi.yellow("name") + " to use time limit with " + ansi.yellow(++index)
      );
  })
  .add("kleur", () => {
    out =
      kleur.bgRed().black(" ERROR ") +
      kleur.red(
        " Add plugin " + kleur.yellow("name") + " to use time limit with " + kleur.yellow(++index)
      );
  })
  .add("kleur/colors", () => {
    out =
      kleurColors.bgRed(kleurColors.black(" ERROR ")) +
      kleurColors.red(
        " Add plugin " +
          kleurColors.yellow("name") +
          " to use time limit with " +
          kleurColors.yellow(++index)
      );
  })
  .add("colorette", () => {
    out =
      colorette.bgRed(colorette.black(" ERROR ")) +
      colorette.red(
        " Add plugin " +
          colorette.yellow("name") +
          " to use time limit with " +
          colorette.yellow(++index)
      );
  })
  .add("nanocolors", () => {
    out =
      nanocolors.bgRed(nanocolors.black(" ERROR ")) +
      nanocolors.red(
        " Add plugin " +
          nanocolors.yellow("name") +
          " to use time limit with " +
          nanocolors.yellow(++index)
      );
  })
  .add("picocolors", () => {
    out =
      picocolors.bgRed(picocolors.black(" ERROR ")) +
      picocolors.red(
        " Add plugin " +
          picocolors.yellow("name") +
          " to use time limit with " +
          picocolors.yellow(`${++index}`)
      );
  })
  .on("cycle", (event) => {
    const prefix = event.target.name === "picocolors" ? "+ " : "  ";
    const name = event.target.name.padEnd("kleur/colors  ".length);
    const hz = formatNumber(event.target.hz.toFixed(0)).padStart(10);
    process.stdout.write(`${prefix}${name}${picocolors.bold(hz)} ops/sec\n`);
  })
  .on("error", (event) => {
    process.stderr.write(picocolors.red(event.target.error.toString()) + "\n");
    process.exit(1);
  })
  .run();
