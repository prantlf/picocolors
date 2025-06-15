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

Versions of the benchmarked libraries:

```diff
$ node ./benchmarks/versions.js
  ansi-colors          4.1.3
  chalk4               4.1.2
  chalk5               5.4.1
  cli-color            2.0.4
  colorette            2.0.20
  kleur                4.1.5
  nanocolors           0.2.13
  yoctocolors          2.1.1
  picocolors-upstream  1.1.1
  picocolors-fork      1.1.1
```

The space in node_modules including sub-dependencies (packagephobia):

```diff
chalk5        43.2  kB
chalk4       101    kB
cli-color    754    kB
ansi-colors   26.5  kB
kleur         19.8  kB
colorette     16.6  kB
nanocolors    14.6  kB
yoctocolors    9.97 kB
picocolors     6.22 kB
```

The space in node_modules including sub-dependencies (bundling the default export):

```diff
$ node ./benchmarks/size.mjs
┌─────────────────────┬───────────┐
│ (index)             │ size (KB) │
├─────────────────────┼───────────┤
│ picocolors-fork     │ 4.88      │
│ picocolors-upstream │ 4.96      │
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
Results for CJS:
  chalk5                6.015 ms
  chalk4                5.805 ms
  cli-color            35.608 ms
  ansi-colors           2.050 ms
  kleur                 2.248 ms
  kleur/colors          1.139 ms
  colorette             1.045 ms
  nanocolors            0.788 ms
  yoctocolors           1.097 ms
  picocolors-upstream   0.636 ms
+ picocolors-fork       0.452 ms
```

Library loading time (ESM):

```diff
$ node ./benchmarks/loading.js --esm
Results for ESM:
  chalk5               11.498 ms
  chalk4                7.638 ms
  cli-color            36.701 ms
  ansi-colors           3.130 ms
  kleur                 2.342 ms
  kleur/colors          1.649 ms
  colorette             1.863 ms
  nanocolors            1.505 ms
  yoctocolors           3.176 ms
  picocolors-upstream   2.216 ms
+ picocolors-fork       1.905 ms
```

Benchmark for simple use case (CJS):

```diff
$ node ./benchmarks/simple.js
  chalk5                  18,988,584 ops/sec
  chalk4                  18,656,938 ops/sec
  cli-color                1,188,258 ops/sec
  ansi-colors              5,876,623 ops/sec
  kleur                   19,098,109 ops/sec
  kleur/colors            30,684,290 ops/sec
  colorette               31,200,269 ops/sec
  nanocolors              32,155,545 ops/sec
  yoctocolors             32,527,908 ops/sec
  picocolors-upstream     32,761,293 ops/sec
+ picocolors-fork         32,623,263 ops/sec
```

Benchmark for simple use case (ESM):

```diff
$ node ./benchmarks/simple.mjs --expose-gc
benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
chalk v4                      26.26 ns/iter  25.25 ns █
                     (23.90 ns … 108.38 ns)  52.59 ns █▅
                    (  5.04  b … 170.63  b)  32.67  b ██▃▂▁▁▁▁▂▁▁▁▁▁▁▁▁▁▁▁▁

chalk v5                      16.88 ns/iter  16.76 ns █▆
                     (14.92 ns … 104.22 ns)  43.37 ns ██
                    ( 16.11  b … 171.38  b)  16.63  b ██▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

cli-color                    780.55 ns/iter 799.99 ns   ▄   █ ▃
                    (721.61 ns … 897.92 ns) 878.02 ns ▅▅█▂▄▇█▇█▆▄
                    (498.47  b … 719.38  b) 566.54  b █████████████▃█▃▆▇▄▆▃

ansi-colors                  149.70 ns/iter 151.07 ns █
                    (138.09 ns … 247.25 ns) 215.97 ns █
                    ( 19.43  b … 400.15  b) 256.12  b ██▇▆▃▂▃▂▁▂▂▂▂▂▂▂▁▁▁▁▁

kleur                         29.94 ns/iter  28.66 ns █
                     (27.07 ns … 119.37 ns)  70.09 ns █▇
                    ( 22.00  b … 173.11  b)  54.36  b ██▃▁▁▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁

kleur/colors                  16.37 ns/iter  16.20 ns █▂
                      (14.95 ns … 43.16 ns)  30.55 ns ██
                    (  0.02  b …  88.20  b)   0.08  b ███▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

colorette                      4.42 ns/iter   4.39 ns  █
                       (3.84 ns … 35.39 ns)  11.35 ns ▄█▂
                    (  0.11  b … 100.99  b)   0.12  b ███▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

nanocolors                     4.57 ns/iter   4.49 ns  █
                       (3.88 ns … 41.16 ns)  12.01 ns  █
                    (  0.02  b …  88.20  b)   0.04  b ▅██▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

yoctocolors                    4.31 ns/iter   4.26 ns ▂█
                       (3.84 ns … 38.37 ns)  11.29 ns ██
                    (  0.10  b …  77.49  b)   0.11  b ██▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

picocolors-upstream            4.79 ns/iter   4.85 ns   █
                       (4.07 ns … 37.39 ns)  10.01 ns  ▇█▃
                    (  0.02  b …  89.52  b)   0.04  b ▆███▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

picocolors-fork                4.72 ns/iter   4.80 ns  █
                       (4.17 ns … 33.35 ns)  10.99 ns ▆█▇
                    (  0.02  b …  88.20  b)   0.03  b ███▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

                             ┌                                            ┐
                              ┬ ╷
                    chalk v4  │─┤
                              ┴ ╵
                              ┬╷
                    chalk v5  │┤
                              ┴╵
                                                                  ╷┌─┬┐   ╷
                   cli-color                                      ├┤ │├───┤
                                                                  ╵└─┴┘   ╵
                                    ┌┬  ╷
                 ansi-colors        ││──┤
                                    └┴  ╵
                              ┬ ╷
                       kleur  │─┤
                              ┴ ╵
                              ┬
                kleur/colors  │
                              ┴
                             ┬
                   colorette │
                             ┴
                             ┬
                  nanocolors │
                             ┴
                             ┬
                 yoctocolors │
                             ┴
                             ┬
         picocolors-upstream │
                             ┴
                             ┬
             picocolors-fork │
                             ┴
                             └                                            ┘
                             3.84 ns          440.93 ns           878.02 ns
```

Benchmark for complex use cases (CJS):

```diff
$ node ./benchmarks/complex.js
  chalk5                     879,617 ops/sec
  chalk4                     931,989 ops/sec
  cli-color                  104,383 ops/sec
  ansi-colors                478,049 ops/sec
  kleur                    1,124,774 ops/sec
  kleur/colors             1,352,289 ops/sec
  colorette                1,702,615 ops/sec
  nanocolors               1,566,980 ops/sec
  yoctocolors              1,167,530 ops/sec
  picocolors-upstream      2,703,219 ops/sec
+ picocolors-fork          2,696,878 ops/sec
```

Benchmark for complex use cases (ESM):

```diff
$ node ./benchmarks/complex.mjs --expose-gc
benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
chalk v4                     835.16 ns/iter 952.52 ns  █▆
                      (685.54 ns … 1.45 µs)   1.44 µs ███    ▃▂
                    (  1.00 kb …   1.16 kb)   1.16 kb ████▅▃▂██▇▄▃▂▂▁▁▁▁▂▁▂

chalk v5                     822.73 ns/iter 969.47 ns  ▂ █
                      (684.30 ns … 1.09 µs)   1.05 µs  █ ██           ▂▂
                    (  1.00 kb …   1.17 kb)   1.16 kb ▇████▅▃▇▃▂▂▁▁▂▄▃███▃▃

yoctocolors                  533.96 ns/iter 663.93 ns  █
                    (426.14 ns … 853.19 ns) 797.52 ns ▂█▂ ▂
                    (911.37  b …   1.19 kb)   1.01 kb ███▆█▇▄▁▂▁▁▁▁▇▆▅▄▃▂▂▂

cli-color                      7.78 µs/iter   7.28 µs  █
                      (6.73 µs … 887.65 µs)  22.30 µs ▇█
                    (128.00  b … 340.25 kb)   5.44 kb ██▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

ansi-colors                    2.12 µs/iter   2.21 µs           ▃      █
                        (1.70 µs … 2.92 µs)   2.50 µs     ▇█▇  ▂███▇   █
                    (  2.54 kb …   2.54 kb)   2.54 kb ▃▁▆▃███▆▆█████▃▃▁█▆▆▃

kleur                        766.70 ns/iter 908.48 ns   █▇
                      (632.74 ns … 1.07 µs)   1.04 µs  ▄██▂          ▅
                    (878.86  b …   1.48 kb)   1.18 kb █████▄▆▃▂▁▁▁▃▇██▃▂▄▂▂

kleur/colors                 677.34 ns/iter 808.15 ns  █ ▆
                      (549.95 ns … 1.03 µs) 961.03 ns  █▄█▅           ▂
                    (  1.04 kb …   1.33 kb)   1.04 kb ▃████▄▆▁▁▁▁▁▃▄▃▇█▄▂▃▁

colorette                    579.77 ns/iter 698.98 ns █▆
                    (458.08 ns … 917.82 ns) 907.11 ns ███▂▅
                    (  1.04 kb …   1.25 kb)   1.04 kb █████▅▃█▁▁▁▆██▃▇▄▁▂▂▂

nanocolors                   587.19 ns/iter 723.75 ns █
                    (486.68 ns … 906.54 ns) 862.12 ns █▇▅
                    (911.09  b …   1.22 kb)   1.01 kb ███▆▇▆▂▂▁▁▁▁▂▆▆▅▄▂▃▃▂

picocolors-upstream          351.08 ns/iter 333.01 ns █
                    (273.63 ns … 718.30 ns) 707.22 ns █▅▆▄
                    (443.09  b … 837.21  b) 695.82  b ████▂▁▁▁▁▁▁▅▃▃▂▁▂▁▁▂▂

picocolors-fork              342.98 ns/iter 332.60 ns █▂
                    (271.43 ns … 697.20 ns) 684.01 ns ██▃
                    (561.47  b … 900.37  b) 696.04  b ███▇▂▁▁▁▁▁▁▂▅▄▂▂▁▁▁▁▁

summary
  picocolors-fork
   1.02x faster than picocolors-upstream
   1.56x faster than yoctocolors
   1.69x faster than colorette
   1.71x faster than nanocolors
   1.97x faster than kleur/colors
   2.24x faster than kleur
   2.4x faster than chalk v5
   2.44x faster than chalk v4
   6.18x faster than ansi-colors
   22.69x faster than cli-color
```

## Usage

Picocolors provides an object which includes a variety of text coloring and formatting functions:

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

All functions from the exported object are available as named exports too:

```javascript
import { red, green, bold, reset } from "picocolors"
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
