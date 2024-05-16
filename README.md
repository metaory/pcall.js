Pcall.js
========

<div align=center>
  <img alt="logo-of-pcall" src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/logo.png" width="50%">
  <h2>Errors as Values</h2>
  <h5>zero-dependency</h5>
  ╶─╴╶╴╶╴╶╴╶╴╶╴╶╴╶╴╶╴╶╴╶─╴
</div>


- 🎌 Delegate Promise Resolutions
- 🧬 Lifecycle Callback Options
- 📍 Concise and Convenient Signature
- 📦 Zero-Dependency
- 🛑 Avoid try/catch ~~HELL~ 👹
- 🌟 Better Visibility and Control
- 🌐 Works in Node.js (ESM/CJS) and all modern browsers
- 〽️ Minimal Obsessive Disorder

---
<br>
<br>

<div align=center>
  <h3>simple</h3>
  <img alt="pcall-simple-usage" src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/simple-usage.png" width="95%">
  <br>
  <hr>
  <h3>options</h3>
  <img alt="pcall-option-usage" src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/option-usage.png" width="95%">
  <br>
  <hr>
  <h3>custom</h3>
  <img alt="pcall-custom-usage" src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/custom-usage.png" width="95%">
  <p>create new safe utilities with shared side-effect behavior</p>
</div>
<br>

---

Inspiration
-----------
Lua approach to error handling is simple yet powerful. ^[Lua:5.4](https://www.lua.org/manual/5.4/manual.html#pdf-pcall) ^[Lua:8.4](https://www.lua.org/pil/8.4.html), ^[Lua:8.5](https://www.lua.org/pil/8.5.html)

🔹 `pcall.js` is heavily inspired by Lua `pcall` **with superpowers** 🦄!

---

SYNOPSIS
--------
`pcall({f}, {arg1}, {...})`

`pcall()` Calls function `{f}` with the given arguments in **protected mode**.
This means that any error inside `{f}` is not propagated;

Instead, `pcall` catches the error and returns a tuple.

Its first element is the status code (a boolean),
which is true if the call succeeds without errors.
And all results from the call, on second element; `[true, {res}]`

In case of any error, pcall returns false plus the error message; `[false, {err}]`

---

Usage
-----
```sh
# install
npm install pcall.js
```
```js
// ESM
import Pcall from 'pcall.js'

// CJS
const Pcall = require('pcall.js')
```

Convert
-------
```js
import { readFile } from 'node:fs/promises'

// 🔻 BEFORE
try {
  const res = await readFile('./package.json', { encoding: 'utf8' })
} catch(error) {
  console.error(error, '🔥')
}

// ─────────────────
// 🔹AFTER
import Pcall from 'pcall.js'
const [err, user] = await Pcall(readFile, './package.json', { encoding: 'utf8' })

// 🔸THROW
err && throw new Error("XYZZY", { cause: err });

// ─────────────────
// 🔸 NO @ITERATOR
import Pcall from 'pcall.js'
const pcall = new Pcall({ noError: true })
const res = await pcall(readFile, './package.json', { encoding: 'utf8' })

// ─────────────────
// 🔸 MOCK
const readJson = new Pcall({
  fn: readFile,
  noError: true,
  args: [{ encoding: 'utf8' }],
  transformOnSuccess: (args, res) => JSON.parse(res),
  transformOnFailure: (args, { name, message }) => ({ name, message }),
})
const path = 'test/sample-good.json'

const res = await readJson(path)
log(res.hogo) // fuga
```


Options
-------
```js
import { readFile } from 'node:fs/promises'
import Pcall from 'pcall.js'

const pcall = new Pcall({
  onSuccess: (args, res) => log({ res, args }, true),
  onFailure: (args, err) => log({ err, args }, false),
  transformOnSuccess: (args, res) => res,
  transformOnFailure: (args, res) => res,
  cleanup: () => {},
  noError: false,
  noTrace: false,
})

const path = './package.json'
const opts = { encoding: 'utf8' }

const [err, res] = await pcall(readFile, path, opts)
```

#### 💡 Check [test/](test/) files for more examples

---

Development
-----------
```bash
# run test playground in watch mode
npm run dev

# build production
npm run build

# build stub
npm run build:stub
```

---

TODO
----
- [x] 🌀 Lifecycle Hooks
- [.] 🔌 Serializer
- [.] 🧬 Parser
- [.] 📜 JSDoc
- [.] 🔧 ESLint
- [o] 📖 Docs
- [o] ⚠️  Tests
- [.] 💡 Examples

---

License
-------
[MIT](LICENSE)
