Pcall.js
========

<div align=center>
  <img alt="logo-of-pcall" src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/logo.png"><br><br>
  <h2>🦺 Minimal Async Protected SafeCalls</h2>
  <p>───────</p>
  <h3>🎌 Delegate Promise Resolutions</h3>
  <h3>🧬 Lifecycle Callback Options</h3>
  <h3>📍Concise & Convenient Signature</h3>
  <p>───────</p>
  <h4>🛑 Avoid try/catch <s>HELL</s> 👹</h4>
  <h4>🌟 Better Visibility and Control</h4>
  <p>━━━━━━━</p>
  <h3>📦 zero-dependency</<h3>
  <h5>🌐 Works in Node.js (ESM/CJS) and all modern browsers</h5>
  <h5>〽️ Minimal Obsessive Disorder</h5>
</div>

---

<div align=center>
  <h2>🔥 This is the entire library 🔥</h2>
  <img alt="logo-of-pcall" src="https://raw.githubusercontent.com/metaory/pcall.js/master/.github/assets/dist.png">
</div>

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
// 🔴 BEFORE
const user = await prisma.users.findFirst({ where: { id: User.id }}, { ctx })

// ✅AFTER
import Pcall from 'pcall.js'
const [err, user] = await Pcall(prisma.users.findFirst, { where: { id: User.id }}, { ctx })

// ✅THROW
err && throw new Error("XYZZY", { cause: err });
```

Options
-------
```js
// ✅Options
import Pcall from 'pcall.js'

const pcall = new Pcall({
  onSuccess: (args, res) => { /*···*/ },
  onFailure: (args, err) => { /*···*/ },
  cleanup: (args) => { /*···*/ },
  trace: true,
  /* 🚧 serializer/parsers */
})

const [err, user] = await pcall(prisma.users.findFirst, { where: { id: User.id }}, { ctx })
```

### 💡 Check [test/dev.test.js](https://github.com/metaory/pcall.js/blob/master/test/dev.test.js) for more examples

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
