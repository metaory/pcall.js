Pcall.js
========

<div align=center>
  <img alt="logo-of-pcall" src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/logo.png" width="50%">
  <h2>Errors as Values</h2>
  <h5>unwrap/expand to array-like safe tuple results</h5>
  ╶─╴╶╴╶╴╶╴╶╴╶╴╶╴╶╴╶╴╶╴╶─╴
</div>


- 🧬 Lifecycle Hooks
- 📦 Zero Dependency
- 📍 Concise Signature
- 🎌 Group Side Effects
- 🛑 try/catch ~~HELL~ 👹
- 🌟 Better Visibility and Control
- 🌐 Works in ESM & CJS
- 〽️ Minimal Obsessive Disorder

---

<br>
<br>

<div align=center>
  <h3>use basic</h3>
  <a href="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/use-basic.js">use-basic.js</a>
  <img alt="pcall_use-static" src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/use-basic.png">
  <br>
  <hr>
  <h3>use default</h3>
  <a href="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/use-default.js">use-default.js</a>
  <img alt="pcall_use-default" src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/use-default.png">
  <hr>
  <h3>use options</h3>
  <a href="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/use-options.js">use-options.js</a>
  <img alt="pcall_use-options" src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/use-options.png">
  <p>create new safe utilities with shared side-effect behavior</p>
  <br>
</div>
<br>

---

Inspiration
-----------
🔹 `pcall.js` is heavily inspired by Lua `pcall` `status, res`, Elixir Error Monad `{:error, reason} | {:ok, value}`, Go `[]error`, Rust `Result<T, E>` **with superpowers** 🦄!

In Lua Errors are detected and explained in terms of Lua. ^[Lua:5.4](https://www.lua.org/manual/5.4/manual.html#pdf-pcall) ^[Lua:8.4](https://www.lua.org/pil/8.4.html), ^[Lua:8.5](https://www.lua.org/pil/8.5.html)

You can contrast that with C, where the behavior of many wrong programs can only be explained
in terms of the underling hardware and error positions are given as a program counter

Activities start from a call by the application, usually asking to run a chunk.

If there is any error, this call returns an error code and the application can take appropriate actions

---

SYNOPSIS
--------
`pcall({f}, {arg1}, {...})`

`pcall()` Calls function `{f}` with the given arguments in **protected mode**.

This means that any error inside `{f}` is not propagated;

Instead, `pcall` catches the error and returns a tuple.

Its first element is the **error code** ~~status code~~ (a boolean),

Which is `false` if the call succeeds without errors.

And all results from the call, on second element; `[false, {res}]`

In case of any error,

Pcall returns `true`  plus the error message; `[true, {err}]`

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
const [err, res] = await Pcall(readFile, './package.json', { encoding: 'utf8' })

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
  onFinally: () => {},
  onSuccess: (args, res) => log({ res, args }, true),
  onFailure: (args, err) => log({ err, args }, false),
  transformOnSuccess: (args, res) => res,
  transformOnFailure: (args, err) => err,
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
