import defaultConfig from './config.js'
import exec from './exec.js'

export default function Pcall(...opts) {
  if (new.target) return (f, ...a) => exec(opts.at(0), f, a)
  return exec(defaultConfig, opts.at(0), opts.slice(1))
}
