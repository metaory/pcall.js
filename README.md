Pcall.js
========

<div align=center>
  <img alt="logo-of-pcall" src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/logo.png" width="50%">
  <h2>Errors as Values</h2>
  <h5>zero-dependency</h5>
</div>

### ╶─ ╴╶ ╴╶ ╴╶ ╴╶ ╴╶ ─╴

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
  <h3>basic</h3>
  <img alt="logo-of-pcall"  src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/usage/pcall-basic.png" width="70%">
  <br>
  <hr>
  <h3>options</h3>
  <img alt="logo-of-pcall"  src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/usage/pcall-options.png" width="70%">
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
```

Options
-------
```js
import { readFile } from 'node:fs/promises'
import Pcall from 'pcall.js'

const path = './package.json'
const opts = { encoding: 'utf8' }

const pcall = new Pcall({
  onSuccess: (args, res) => { /*·🔹·*/ },
  onFailure: (args, err) => { /*·🔹·*/ },
  transformOnSuccess: (args, res) => { /*·🚧·*/ },
  transformOnFailure: (args, err) => { /*·🚧·*/ },
  cleanup: args => { /*·🔹·*/ },
  trace: true,
})

const [err, res] = await pcall(readFile, path, opts)

console.log('err', '::', err)
console.log('res', '::', res)
```

### 💡 Check [test/dev.test.js]

[examples/](examples/) [test/](test/) for more examples

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
