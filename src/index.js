import defaultConfig from './config.js'
import exec from './exec.js'

export default function Pcall(...opts) {
  if (new.target) return (f, ...args) => exec(opts.at(0), f, args)
  const [fn, ...args] = opts
  return exec(defaultConfig, fn, args)
}
