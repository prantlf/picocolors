#!/usr/bin/env node

// Benchmark results are unstable. To have more stable results:
// 1. Restart OS. Do not run any applications. Put power cable to laptop.
// 2. Run tests 5 times.
// 3. Took the best result for each candidate.

let benchmark = require("benchmark")
let colorette = require("colorette")
let kleur = require("kleur")
let kleurColors = require("kleur/colors")
let chalk5 = require("chalk5").default
let chalk4 = require("chalk4")
let ansi = require("ansi-colors")
let cliColor = require("cli-color")
let picocolorsFork = require("../picocolors.js")
let picocolorsUpstream = require("picocolors-upstream")
let nanocolors = require("nanocolors")
let yoctocolors = require("./yoctocolors")

function formatNumber(number) {
	return String(number)
		.replace(/\d{3}$/, ",$&")
		.replace(/^(\d|\d\d)(\d{3},)/, "$1,$2")
}

let suite = new benchmark.Suite()
let out

let index = 1e8

suite
	.add("chalk5", () => {
		out =
			chalk5.red(".") +
			chalk5.yellow(".") +
			chalk5.green(".") +
			chalk5.bgRed(chalk5.black(" ERROR ")) +
			chalk5.red(
				" Add plugin " + chalk5.yellow("name") + " to use time limit with " + chalk5.yellow(++index)
			)
	})
	.add("chalk4", () => {
		out =
			chalk4.red(".") +
			chalk4.yellow(".") +
			chalk4.green(".") +
			chalk4.bgRed(chalk4.black(" ERROR ")) +
			chalk4.red(
				" Add plugin " + chalk4.yellow("name") + " to use time limit with " + chalk4.yellow(++index)
			)
	})
	.add("cli-color", () => {
		out =
			cliColor.red(".") +
			cliColor.yellow(".") +
			cliColor.green(".") +
			cliColor.bgRed(cliColor.black(" ERROR ")) +
			cliColor.red(
				" Add plugin " +
					cliColor.yellow("name") +
					" to use time limit with " +
					cliColor.yellow(++index)
			)
	})
	.add("ansi-colors", () => {
		out =
			ansi.red(".") +
			ansi.yellow(".") +
			ansi.green(".") +
			ansi.bgRed(ansi.black(" ERROR ")) +
			ansi.red(
				" Add plugin " + ansi.yellow("name") + " to use time limit with " + ansi.yellow(++index)
			)
	})
	.add("kleur", () => {
		out =
			kleur.red(".") +
			kleur.yellow(".") +
			kleur.green(".") +
			kleur.bgRed(kleur.black(" ERROR ")) +
			kleur.red(
				" Add plugin " + kleur.yellow("name") + " to use time limit with " + kleur.yellow(++index)
			)
	})
	.add("kleur/colors", () => {
		out =
			kleurColors.red(".") +
			kleurColors.yellow(".") +
			kleurColors.green(".") +
			kleurColors.bgRed(kleurColors.black(" ERROR ")) +
			kleurColors.red(
				" Add plugin " +
					kleurColors.yellow("name") +
					" to use time limit with " +
					kleurColors.yellow(++index)
			)
	})
	.add("colorette", () => {
		out =
			colorette.red(".") +
			colorette.yellow(".") +
			colorette.green(".") +
			colorette.bgRed(colorette.black(" ERROR ")) +
			colorette.red(
				" Add plugin " +
					colorette.yellow("name") +
					" to use time limit with " +
					colorette.yellow(++index)
			)
	})
	.add("nanocolors", () => {
		out =
			nanocolors.red(".") +
			nanocolors.yellow(".") +
			nanocolors.green(".") +
			nanocolors.bgRed(nanocolors.black(" ERROR ")) +
			nanocolors.red(
				" Add plugin " +
					nanocolors.yellow("name") +
					" to use time limit with " +
					nanocolors.yellow(++index)
			)
	})
	.add("yoctocolors", () => {
		out =
			yoctocolors.red(".") +
			yoctocolors.yellow(".") +
			yoctocolors.green(".") +
			yoctocolors.bgRed(yoctocolors.black(" ERROR ")) +
			yoctocolors.red(
				" Add plugin " +
					yoctocolors.yellow("name") +
					" to use time limit with " +
					yoctocolors.yellow(++index)
			)
	})
	.add("picocolors-upstream", () => {
		out =
			picocolorsUpstream.red(".") +
			picocolorsUpstream.yellow(".") +
			picocolorsUpstream.green(".") +
			picocolorsUpstream.bgRed(picocolorsUpstream.black(" ERROR ")) +
			picocolorsUpstream.red(
				" Add plugin " +
					picocolorsUpstream.yellow("name") +
					" to use time limit with " +
					picocolorsUpstream.yellow(`${++index}`)
			)
	})
	.add("picocolors-fork", () => {
		out =
			picocolorsFork.red(".") +
			picocolorsFork.yellow(".") +
			picocolorsFork.green(".") +
			picocolorsFork.bgRed(picocolorsFork.black(" ERROR ")) +
			picocolorsFork.red(
				" Add plugin " +
					picocolorsFork.yellow("name") +
					" to use time limit with " +
					picocolorsFork.yellow(`${++index}`)
			)
	})
	.on("cycle", event => {
		let prefix = event.target.name === "picocolors-fork" ? "+ " : "  "
		let name = event.target.name.padEnd("kleur/colors  ".length)
		let hz = formatNumber(event.target.hz.toFixed(0)).padStart(20)
		process.stdout.write(`${prefix}${name}${picocolorsFork.bold(hz)} ops/sec\n`)
	})
	.on("error", event => {
		process.stderr.write(picocolorsFork.red(event.target.error.toString()) + "\n")
		process.exit(1)
	})
	.run()
