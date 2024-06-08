/* eslint no-unused-vars: "off" */
/* eslint no-undef: "off" */
import { readFile } from "node:fs/promises"
import Pcall from "pcall.js"

const path = "package.json"
const opts = { encoding: "utf8" }
// · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
{
  const [err, res] = await Pcall(readFile, path, opts)
}
// · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
{
  const pcall = new Pcall({
    onFailure: (args, err) => dispatch("no", { args, err }),
    cleanup: () => { /* 💣 💣 💥 */ }
  })

  const [err, res] = await pcall(readFile, path, opts)
}
// · · · · · · · · · · · · · · · · · · · · · · · · · · · ·
{
  const readJson = new Pcall({
    fn: readFile,
    noError: true,
    args: [{ encoding: "utf8" }],
    onSuccess: console.info,
    transformOnSuccess: (_, res) => JSON.parse(res),
  })

  const res = await readJson(path)
}
