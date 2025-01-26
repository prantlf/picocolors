# picocolors

The tiniest and the fastest library for terminal output formatting with ANSI colors.

```javascript
import pc from "picocolors"

console.log(
  pc.green(`How are ${pc.italic(`you`)} doing?`)
)
```

- **No dependencies.**
- **14 times** smaller and **2 times** faster than chalk.
- Used by popular tools like PostCSS, SVGO, Stylelint, and Browserslist.
- Node.js v6+ & browsers support. Support for both CJS and ESM projects.
- TypeScript type declarations included.
- [`NO_COLOR`](https://no-color.org/) friendly.

This is a fork of the original project with the following changes:

* Include native ESM output, which allows named imports [#60](https://github.com/alexeyraspopov/picocolors/pull/60).
* Add benchmarks for `chalk` 5 and `yoctocolors` [#61](https://github.com/alexeyraspopov/picocolors/pull/61).

## Motivation

With `picocolors` we are trying to draw attention to the `node_modules` size
problem and promote performance-first culture.

## Prior Art

Credits go to the following projects:

- [Nanocolors](https://github.com/ai/nanocolors) by [@ai](https://github.com/ai)
- [Colorette](https://github.com/jorgebucaran/colorette) by [@jorgebucaran](https://github.com/jorgebucaran)
- [Kleur](https://github.com/lukeed/kleur) by [@lukeed](https://github.com/lukeed)
- [Colors.js](https://github.com/Marak/colors.js) by [@Marak](https://github.com/Marak)
- [Chalk](https://github.com/chalk/chalk) by [@sindresorhus](https://github.com/sindresorhus)

## Benchmarks

The space in node_modules including sub-dependencies:

```diff
$ node ./benchmarks/size.js
  chalk@5.3.0  43 kB
  chalk@4.1.2 101 kB
  cli-color   796 kB
  ansi-colors  27 kB
  kleur        20 kB
  colorette    17 kB
  nanocolors   15 kB
  yoctocolors   7 kB
+ picocolors    7 kB
```

Library loading time:

```diff
$ node ./benchmarks/loading.js
  chalk5         5.196 ms
  chalk4         5.327 ms
  cli-color     32.755 ms
  ansi-colors    1.467 ms
  kleur          2.042 ms
  kleur/colors   1.017 ms
  colorette      0.943 ms
  nanocolors     0.737 ms
  yoctocolors    0.951 ms
+ picocolors     0.458 ms
```

Benchmark for simple use case:

```diff
$ node ./benchmarks/simple.js
  chalk5         19,221,813 ops/sec
  chalk4         19,637,847 ops/sec
  cli-color       1,242,196 ops/sec
  ansi-colors     6,002,738 ops/sec
  kleur          20,288,805 ops/sec
  kleur/colors   32,498,780 ops/sec
  colorette      32,402,910 ops/sec
  nanocolors     33,080,935 ops/sec
  yoctocolors    33,910,355 ops/sec
+ picocolors     34,393,391 ops/sec
```

Benchmark for complex use cases:

```diff
$ node ./benchmarks/complex.js
  chalk5         1,183,783 ops/sec
  chalk4         1,188,633 ops/sec
  cli-color        137,948 ops/sec
  ansi-colors      566,511 ops/sec
  kleur          1,279,185 ops/sec
  kleur/colors   1,470,000 ops/sec
  colorette      1,750,069 ops/sec
  nanocolors     1,568,092 ops/sec
  yoctocolors    1,261,661 ops/sec
+ picocolors     2,771,518 ops/sec
```

## Usage

Picocolors provides an object which includes a variety of text coloring and formatting functions

```javascript
import pc from "picocolors"
```

The object includes following coloring functions: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`.

```javascript
console.log(`I see a ${pc.red("red door")} and I want it painted ${pc.black("black")}`)
```

The object also includes following background color modifier functions: `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite` and bright variants `bgBlackBright`, `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright`.

```javascript
console.log(
  pc.bgBlack(
    pc.white(`Tom appeared on the sidewalk with a bucket of whitewash and a long-handled brush.`)
  )
)
```

Besides colors, the object includes following formatting functions: `dim`, `bold`, `hidden`, `italic`, `underline`, `strikethrough`, `reset`, `inverse` and bright variants `blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`.

```javascript
for (let task of tasks) {
  console.log(`${pc.bold(task.name)} ${pc.dim(task.durationMs + "ms")}`)
}
```

The library provides additional utilities to ensure the best results for the task:

- `isColorSupported` — boolean, explicitly tells whether or not the colors or formatting appear on the screen

  ```javascript
  import pc from "picocolors"

  if (pc.isColorSupported) {
    console.log("Yay! This script can use colors and formatters")
  }
  ```

- `createColors(enabled)` — a function that returns a new API object with manually defined color support configuration

  ```javascript
  import pc from "picocolors"

  let { red, bgWhite } = pc.createColors(options.enableColors)
  ```

## Replacing `chalk`

1. Replace package name in import:

   ```diff
   - import chalk from 'chalk'
   + import pico from 'picocolors'
   ```

2. Replace variable:

   ```diff
   - chalk.red(text)
   + pico.red(text)
   ```

3. Replace chains to nested calls:

   ```diff
   - chalk.red.bold(text)
   + pico.red(pico.bold(text))
   ```

4. You can use [`colorize-template`](https://github.com/usmanyunusov/colorize-template)
   to replace chalk’s tagged template literal.

   ```diff
   + import { createColorize } from 'colorize-template'

   + let colorize = createColorize(pico)
   - chalk.red.bold`full {yellow ${"text"}}`
   + colorize`{red.bold full {yellow ${"text"}}}`
   ```
