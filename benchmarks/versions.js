#!/usr/bin/env node

const { execSync } = require("child_process")

const textOutput = execSync(`npm ls picocolors-upstream ansi-colors cli-color chalk4 chalk5 colorette kleur nanocolors yoctocolors --json`).toString()
const { version, dependencies } = JSON.parse(textOutput)
const upstream = dependencies['picocolors-upstream']
delete dependencies['picocolors-upstream']
dependencies['picocolors-upstream'] = upstream
dependencies['picocolors-fork'] = { version }

for (const name in dependencies) {
	const { version } = dependencies[name]
	console.log(`  ${name.padEnd(20)} ${version}`)
}
