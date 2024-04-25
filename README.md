PCALL.js
========

🔥 Protected calls for JS with Superpowers
------------------------------------------

<div align=center>
  <b> 🚧 UNDER ACTIVE DEVELOPMENT -- DO NOT USE ⛔</b>
</div>

<div align=center>
  <img alt="logo-of-pcall" src="./.github/assets/pcall.png" width="70%"><br><br>
  <h3>Centralized your Error handling, Logs, Notifications and more</h3>
  <h3>    </h3>
  <b>🔻 no more nested try...catch!</b><br>
  <b>🔻 no more miss a try...catch!</b><br>

  <p><b>Pcall.js</b> is an <b>extendable</b> utility that you <b>encapsulate</b> your functions</p>
</div>


---

<div align=center>
  <p>🚧 <b>EARLY DEVELOPMENT</b></p>
  <p>🚫 <b>DO NOT USE PRE-Release</b></p>
</div>

---

#### Exposing **Simple** API and an **Advance** API for a **Safer** and more **Transparent** `asynchronous` / `synchronous` programming.

##### With _optional_ advance features like `Hook injections`, `processors plugins`

---

Features
--------
- [ ] 🔹*Graceful* Error handling
- [ ] 🔹*Promise* and *Non-Promises* Support
- [ ] 🔹*Uniform and deterministic* result for all your critical function
- [ ] 🔸*Plugin System* -- provide handlers to overwrite some default behaviours
  - [ ] 🔸`Serializer`  - custom handler
  - [ ] 🔸`Deserialize` - custom handler
  - [ ] 🔸`Reducer`     - custom handler to reduce the outcome
- [ ] 🔸*Hook System* -- provide hook functions to run at each stage of lifecycle.
  - [ ] 🔸_TODO_DEFINE_LIFECYCLE_EVENTS_

---

Problem
-------
How the Industry trying to workaround this problem.
Is fragmented and requires different hacks and workaround to get some consistency
We dont have clear control or visibility on what is happening,
Unless we spend time to write custom code for each potential failure that we suspect
This is prune to human err and demands a lot of boilerplate, getting good visibility is another challenge & an industry!

Prelude
-------
I have been writing a lot of [Lua](https://en.wikipedia.org/wiki/Lua_(programming_language)) for over 7-8 years now
Authoring new modules for my window manage [AWM](https://awesomewm.org)
Authoring new Plugins or Extending some for my editor [nVim](https://neovim.io/)
My Terminal [Alacritty](https://alacritty.org) / [Wezterm](https://wezfurlong.org/wezterm)
My work on [xmake](https://github.com/xmake-io/xmake)
Embedding Lua to some non-standard projects
And some personal side projects and scripts

Lua Approach
------------
Lua approach to error handling is very simple yet powerful. ^[Lua:8.4](https://www.lua.org/pil/8.4.html), ^[Lua:8.5](https://www.lua.org/pil/8.5.html)
We dont have any similar solution in the JavaScript ecosystem

_We have some that try to ease this pain all are either efficient or have lost the direction and now are bloated with external reasoning's_

🔸 None are satisfying all my requirement
🔹 `Pcall.js` is Lua `pcall` inspired with superpowers

It calls the function f with the given arguments in protected mode

> `pcall({f}, {arg1}, {...})` `pcall()` Calls function `{f}` with the given arguments in protected mode.
This means that any error inside {f} is not propagated; instead, pcall catches the error and returns a status code.
Its first result is the status code (a boolean), which is true if the call succeeds without errors.
In such case, pcall also returns all results from the call, after this first result.
In case of any error, pcall returns false plus the error message.

> This means that any error inside f is not propagated; instead, pcall catches the error and returns a status code.

Installation
------------
```bash
# install
npm install pcall.js
```

Usage
-----
```javascript
// some promise
function clearBit(num, i) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      Math.random() > 0.5
        ? resolve(num & ~(1 << i))
        : reject('noop');
    }, 3_000),
  );
}
```

ESM
---
```javascript
import pcall from 'pcall.js'

const [ok, xo] = await pcall(clearBit, 99, 6);

  console.log({ ok, xo })
  // { ok: true,  xo: 35 }
  // { ok: false, xo: false }
```

CJS
---
```javascript
const pcall = require('pcall.js')

async function main() {
  const [ok, xo] = await pcall(clearBit, 99, 6);

  console.log({ ok, xo })
  // { ok: true,  xo: 35 }
  // { ok: false, xo: 'Error' }

  return ok && xo
}

main()
  .then(console.log)
  .catch(console.error)
```

Development
-----------
```bash
# install
npm run dev

# build
npm run build
```

ROADMAP
-------
- [ ] add custom options `Processors` functions for success & failure
- [ ] add custom `Serializer` & `Deserialize` functions for request & response
- [ ] add support for `hooks`, to run at each stage of lifecycle. <!-- Use case can be `logging` and `monitoring`, _or anything else..-->
- [ ] handle all internal errors with good message
- [ ] import public API
- [ ] write documentation
- [ ] write tests
- [ ] add examples

License
-------
[MIT](LICENSE)

