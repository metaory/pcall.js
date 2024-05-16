import { test } from 'node:test'
import { strictEqual } from 'node:assert'

import Pcall from '../src/index.js'

const { log } = console

test('new util instance to PARSE [GOOD] json strings safely', async () => {
  const parseJson = new Pcall({
    fn: JSON.parse,
    noError: true,
    transformOnFailure: (args, { name, message }) => ({ name, message }),
  })

  const str = '{\n  "hogo": "fuga",\n  "xyzzy": "frob"\n}\n'

  const res = await parseJson(str)

  log(':Pcall:[GOOD]:<<', res, '>>')

  strictEqual(res.hogo, 'fuga')
})

test('new util instance to PARSE [BAD] json strings safely', async () => {
  const parseJson = new Pcall({
    fn: JSON.parse,
    noError: true,
    transformOnFailure: (args, { name, message }) => ({ name, message }),
  })

  const str = '{\n  "hogo": "fuga @@BAD xyzzy": "frob"\n}\n'

  const res = await parseJson(str)

  log(':Pcall:[BAD]:<<', res, '>>')

  strictEqual(res.name, 'Error')
})
