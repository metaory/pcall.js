import { test } from 'node:test'
import { strictEqual } from 'node:assert'

import Pcall from '../src/index.js'

const { log } = console

test('async preset fn option instance call', async t => {
  await t.test('custom onSuccess and onFailure options', async () => {
    const safeJson = new Pcall({
      fn: JSON.parse,
      transformOnSuccess: (args, res) => ({ ...res, x11: 'xorg' }),
      transformOnFailure: (args, err) => ({ err: err.toString() }),
    })

    const str = '{\n  "hogo": "fuga",\n  "xyzzy": "frob"\n}\n'

    const [, res] = await safeJson(str)

    log(':Pcall:[RES]:<<', res, '>>')
    log('\x1b[35m', t.name)

    strictEqual(res.hogo, 'fuga')
    strictEqual(res.x11, 'xorg')
  })
})
