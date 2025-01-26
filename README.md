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

The space in node_modules including sub-dependencies (packagephobia):

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

The space in node_modules including sub-dependencies (bundling the default export):

```diff
$ node ./benchmarks/size.mjs
┌─────────────────────┬───────────┐
│ (index)             │ size (KB) │
├─────────────────────┼───────────┤
│ picocolors-fork     │ 4.88      │
│ picocolors-upstream │ 4.95      │
│ colorette           │ 6.04      │
│ chalk v4            │ 49.22     │
│ chalk v5            │ 16.71     │
│ kleur               │ 3.81      │
│ kleur/colors        │ 3.06      │
│ ansi-colors         │ 10.17     │
│ cli-color           │ 138.21    │
│ nanocolors          │ 5.75      │
│ yoctocolors         │ 6.08      │
└─────────────────────┴───────────┘
```

Library loading time (CJS):

```diff
$ node ./benchmarks/loading.js
  chalk5                5.492 ms
  chalk4                5.331 ms
  cli-color            33.309 ms
  ansi-colors           1.503 ms
  kleur                 2.062 ms
  kleur/colors          1.039 ms
  colorette             0.959 ms
  nanocolors            0.741 ms
  yoctocolors           0.988 ms
  picocolors-upstream   0.586 ms
+ picocolors-fork       0.416 ms
```

Library loading time (ESM):

```diff
$ node ./benchmarks/loading.js --esm
  chalk5               10.358 ms
  chalk4                7.172 ms
  cli-color            34.826 ms
  ansi-colors           3.038 ms
  kleur                 2.145 ms
  kleur/colors          1.538 ms
  colorette             1.761 ms
  nanocolors            1.436 ms
  yoctocolors           3.170 ms
  picocolors-upstream   2.465 ms
+ picocolors-fork       1.623 ms
```

Benchmark for simple use case (CJS):

```diff
$ node ./benchmarks/simple.js
  chalk5               18,187,932 ops/sec
  chalk4               18,228,807 ops/sec
  cli-color             1,142,998 ops/sec
  ansi-colors           5,732,734 ops/sec
  kleur                 18,585,115 ops/sec
  kleur/colors          30,352,315 ops/sec
  colorette             29,811,941 ops/sec
  nanocolors            30,676,556 ops/sec
  yoctocolors           31,766,652 ops/sec
  picocolors-upstream   29,399,306 ops/sec
+ picocolors-fork       30,316,402 ops/sec
```

Benchmark for simple use case (ESM):

```diff
$ node ./benchmarks/simple.mjs --expose-gc
benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
chalk v4                      29.00 ns/iter  28.98 ns  █
                     (25.23 ns … 288.35 ns)  71.23 ns ███
                    (  7.81 kb … 170.61 kb)  32.69 kb ███▂▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
chalk v5                      17.28 ns/iter  17.39 ns   █
                      (15.06 ns … 69.08 ns)  37.75 ns  ▃█
                    ( 14.12 kb … 171.35 kb)  16.64 kb ███▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
cli-color                    751.87 ns/iter 771.09 ns   ▇     ▄█▂█
                    (696.25 ns … 866.38 ns) 835.88 ns  ██▆█ ▂▇████
                    (413.05 kb … 747.26 kb) 566.68 kb ▄████▇████████▇▂▅▆▅▂▃
ansi-colors                  151.85 ns/iter 155.22 ns  ▃  █▃
                    (134.69 ns … 329.41 ns) 208.72 ns ▆█▄███
                    ( 19.42 kb … 355.40 kb) 255.98 kb ███████▆█▃▂▂▂▂▂▂▂▂▁▂▁
kleur                         32.16 ns/iter  32.35 ns  ▆█
                     (28.22 ns … 183.91 ns)  68.63 ns  ██
                    ( 14.12 kb … 116.25 kb)  54.36 kb ███▅▂▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁▁
kleur/colors                  19.22 ns/iter  19.87 ns     ▃█▃
                      (16.36 ns … 76.38 ns)  28.68 ns  ▂▅▄███
                    ( 19.53  b …  88.20 kb)  87.72  b ▁██████▆▂▁▁▂▁▁▁▁▁▁▁▁▁
colorette                      5.02 ns/iter   5.09 ns      █▆
                       (4.18 ns … 31.51 ns)   7.10 ns     ▆██▃
                    ( 99.61  b … 100.98 kb) 117.87  b ▁▃▅▇████▄▂▁▁▁▁▁▁▁▁▁▁▁
nanocolors                     4.99 ns/iter   5.07 ns    ▇█
                       (4.32 ns … 41.32 ns)   8.12 ns  ████▂
                    ( 19.53  b …  88.20 kb)  37.00  b ▁█████▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁
yoctocolors                    4.84 ns/iter   4.97 ns  ▆  █▇
                       (4.22 ns … 25.10 ns)   7.28 ns  █▇███▅
                    (107.42  b …  77.49 kb) 118.51  b ▄██████▃▁▁▁▁▁▁▁▁▁▁▁▁▁
picocolors-upstream            5.25 ns/iter   5.28 ns    █▄
                       (4.54 ns … 47.79 ns)   8.30 ns    ██
                    ( 99.61  b …  89.13 kb) 115.50  b ▃▅▇███▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
picocolors-fork                5.21 ns/iter   5.31 ns    █
                       (4.45 ns … 40.64 ns)   9.28 ns  ▇▅██
                    (103.52  b …  88.20 kb) 122.59  b ▇████▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
```

Benchmark for complex use cases (CJS):

```diff
$ node ./benchmarks/complex.js
  chalk5               1,076,425 ops/sec
  chalk4               1,097,229 ops/sec
  cli-color              129,382 ops/sec
  ansi-colors            536,387 ops/sec
  kleur                1,183,135 ops/sec
  kleur/colors         1,416,477 ops/sec
  colorette            1,680,012 ops/sec
  nanocolors           1,602,355 ops/sec
  yoctocolors          1,239,943 ops/sec
  picocolors-upstream  2,632,381 ops/sec
+ picocolors-fork      2,667,458 ops/sec
```

Benchmark for complex use cases (ESM):

```diff
$ node ./benchmarks/complex.mjs --expose-gc
benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
chalk v4                     953.57 ns/iter   1.11 µs   █▄▃
                      (746.17 ns … 1.48 µs)   1.41 µs  ▄███▆     ▃▄
                    (  1.00 mb …   1.32 mb)   1.16 mb ▃█████▄▁▁▂▆███▆▂▂▂▂▁▃
chalk v5                     900.44 ns/iter   1.07 µs    ██
                      (743.27 ns … 1.18 µs)   1.17 µs  ▄███▆▃         █▄
                    (  1.16 mb …   1.33 mb)   1.17 mb ▇██████▅▁▁▁▁▂▄▃▃███▃▃
yoctocolors                  578.35 ns/iter 738.60 ns    █▃
                    (450.84 ns … 827.03 ns) 817.42 ns   ▄██
                    (836.27 kb …   1.19 mb)   1.01 mb ▃▆███▆▁▁▁▁▁▁▁▁▁▁▃▄█▆▅
cli-color                      8.20 µs/iter   8.20 µs     █▇
                      (6.58 µs … 697.57 µs)  13.01 µs   ▂███
                    (128.00 kb … 152.63 mb)   5.47 mb ▁▇█████▃▂▁▁▁▁▁▁▁▁▁▁▁▁
ansi-colors                    2.10 µs/iter   2.29 µs         █
                        (1.61 µs … 2.52 µs)   2.51 µs         █  ▅ ▂▂▇
                    (  2.54 mb …   2.54 mb)   2.54 mb ▃▅▆▃▃█▅▆█▅▅█▆████▅█▆▃
kleur                        832.37 ns/iter 982.67 ns      █
                      (648.86 ns … 1.11 µs)   1.10 µs    ▅▅█▂▄
                    (878.88 kb …   1.18 mb)   1.18 mb ▄▇██████▅▁▁▂▂▄▂▆██▅▇▃
kleur/colors                 701.23 ns/iter 836.12 ns    ▂██▇
                    (542.03 ns … 986.05 ns) 961.82 ns  ▅█████▃           ▂
                    (787.79 kb …   1.32 mb)   1.04 mb ▃███████▁▁▁▁▁▂▅█▇███▃
colorette                    739.51 ns/iter 654.00 ns   ▄██
                      (538.00 ns … 1.20 ms)   1.06 µs  ▆███▇
                    (  1.13 mb … 129.13 mb)   1.44 mb ▂█████▆▃▂▂▂▁▁▁▁▁▁▁▁▁▁
nanocolors                   596.61 ns/iter 727.93 ns    █▂
                    (474.47 ns … 869.11 ns) 850.22 ns    ██
                    (  1.01 mb …   1.22 mb)   1.01 mb ▆████▇▃▁▁▁▁▁▁▂▄▄▅█▄▂▁
picocolors-upstream          348.88 ns/iter 322.55 ns   █▇
                    (268.82 ns … 659.01 ns) 613.70 ns  ▆██
                    (651.99 kb … 849.73 kb) 696.71 kb ████▅▁▁▁▁▁▁▁▁▁▂▂▄▆▄▁▁
picocolors-fork              349.62 ns/iter 329.41 ns  ▃▆█
                    (269.29 ns … 652.98 ns) 612.54 ns ▄███
                    (659.99 kb … 900.36 kb) 696.71 kb ████▆▂▂▁▁▁▁▁▁▁▂▄▄▅▅▂▁
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
