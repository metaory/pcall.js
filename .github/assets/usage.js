/* eslint no-unused-vars: "off" */
/* eslint no-undef: "off" */
import { readFile } from 'node:fs/promises'
import Pcall from 'pcall.js'

const path = 'package.json'
const opts = { encoding: 'utf8' }
// · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
{
  const [err, res] = await Pcall(readFile, path, opts)
}
// · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
{
  const pcall = new Pcall({
    onFinally: (args, func, span) => { /* 💣 💣 💥 */ },
    onFailure: (args, err) => dispatch('slack', args, err),
    transformOnFailure: (args, err) => ({ mod: 'xorg', err }),
  })

  const [err, res] = await pcall(readFile, path, opts)
}
// · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
{
  const readJson = new Pcall({
    fn: readFile,
    noError: true,
    onSuccess: console.info,
    args: [{ encoding: 'utf8' }],
    transformOnSuccess: (_, res) => JSON.parse(res),
  })

  const res = await readJson(path)
}
