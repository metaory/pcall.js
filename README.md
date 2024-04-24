PCALL.js
========

<div align=center>
    <img alt="logo-of-pcall" src="./github/pcall.png" width="30%"><br><br>
    calls the function f with the given arguments in protected mode
</div>


> 🚧 EARLY DEVELOPMENT -- DO NOT USE THIS


🚧 Lua pcall inspired - calls the function f with the given arguments in protected mode

`pcall({f}, {arg1}, {...})` `pcall()` Calls function `{f}` with the given arguments in protected mode.
This means that any error inside {f} is not propagated; instead, pcall catches the error and returns a status code.
Its first result is the status code (a boolean), which is true if the call succeeds without errors.
In such case, pcall also returns all results from the call, after this first result.
In case of any error, pcall returns false plus the error message.

This means that any error inside f is not propagated; instead, pcall catches the error and returns a status code.


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

npm run dev

# build
npm run build

ROADMAP
-------
- [ ] add custom options `Processors` functions for success & failure
- [ ] add custom `Serializer` & `Deserialize` functions for request & response
- [ ] add support for `hook`, to run at each stage of lifecycle _one_ use case can be `logging` and `monitoring`, ...
- [ ] handle all internal errors with good message
- [ ] import public API
- [ ] write documentation
- [ ] write tests
- [ ] add examples


License
-------

[MIT](LICENSE)

