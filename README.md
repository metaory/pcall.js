PCALL.js
========

<div align=center>
  <h1>🛟 Protected Asynchronous Operations</h1>
  <br>
  <img alt="logo-of-pcall" src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/logo.png" width="50%"><br><br>
  <h3>Centralize Error handling, Monitoring, Notification and more</h3>
  ✴️<s>nested try...catch</s>✴️
  <p>▁▁▁▁▁▁▁▁</p>
  <p><b>📦 zero-dependency</b>╶╴<b>〽️ minimal and elegant</b>╶╴<b>⚙️ extendable</b></p>
</div>

---

Features
--------
- 〽️ **Minimal**: Obsessive Minimal Disorder
- 📦 **Zero-dependency:** Works in Node.js (**ESM** & **CJS**) and all modern browsers
- 🚀 **Zero-configuration:** Provides opt-in configuration for advance usage
- ⚙️  **Extendable**: Lifecycle Hooks, Processors, Serializer, Parser
- 🛡️ **Fault-tolerant:** Uniform and deterministic asynchronous operations
- 👻 **Humanized API:** Simple to get started with a reasonable API

---

<div align=center>
  <img alt="logo-of-pcall" src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/dist.png">
</div>

---

Prelude
-------
You might have an entire function wrapped in a `try..catch`;
In which you have to figure out which call throw the error,
Lack of control and visibility.

You might wrap each async call in it's own `try...catch`;
Which is ugly and too verbose.

You might write a utility to wrap an capture each call.

It's fragmented, hacky and not consistent.

---

Inspiration
-----------
Lua approach to error handling is simple yet powerful. ^[Lua:5.4](https://www.lua.org/manual/5.4/manual.html#pdf-pcall) ^[Lua:8.4](https://www.lua.org/pil/8.4.html), ^[Lua:8.5](https://www.lua.org/pil/8.5.html)

🔹 `pcall.js` is heavily inspired by Lua `pcall` **with superpowers**🦄!

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

Installation
------------
```sh
# install
npm install pcall.js
```

---

Usage
-----
```js
// ESM
import Pcall from 'pcall.js'

// CJS
const Pcall = require('pcall.js')
```

---

<!-- // const prom = (...x) => new Promise((resolve, reject) => Math.random() > 0.5 ? resolve(x) : reject(x)); -->

Basic Usage
-----------
```javascript
// some promise
const prom = (name, family) => new Promise(resolve => resolve(`Hi ${name} :: ${family} !`))
```

---

```javascript
import Pcall from 'pcall.js'

const [ok, res] = await Pcall(prom, 'zed', 'hoge')

console.log(ok, res)
// <true|false>,  <...>
```

---

Advance Usage*
-------------

```javascript
import Pcall from 'pcall.js'

// Create a custom pcall instance for advance usage
const pcall = new Pcall({
  // runs on success, passing context and result
  onSuccess: (args, res) => { /* do stuff */ },

  // runs on failure, passing context and error
  onFailure: (args, err) => { /* do stuff */ },

  // runs when promise is settled
  cleanup: (args) => { /* do stuff */ },

  // 🚧 runs before success hook, transform the success result
  successSerializer: (res) => ({ hoge: 'fuga', ...res }),

  // 🚧 runs before failure hook, transform the failure error
  failureSerializer: (err) => ({ frob: 'xyzzy', err.message })

  // NOTE: the transformers only modify the success/failure message
  // NOT the structure
})

const [ok, res] = await pcall(prom, 'zed', 'hoge')

console.log(ok, res)
// <true|false>,  Hi zed :: hoge
```

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

# publish
npm run publish
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
