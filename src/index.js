import defaultConfig from './config.js'
import exec from './exec.js'

export default function Pcall(...opts) {
  if (new.target) return (f, ...a) => exec(opts.at(0), f, a)
  const [fn, ...args] = opts
  return exec(defaultConfig, fn, args)
}
