import config from './config.js'
import exec from './exec.js'

export default function Pcall(...o) {
  if (new.target) return (f, ...a) => exec(o.at(0), f, a)
  return exec(config, o.at(0), o.slice(1))
}
