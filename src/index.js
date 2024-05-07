import defaultConfig from './config.js'
import exec from './exec.js'

const wrap = o => ({
  ...o,
  *[Symbol.iterator]() {
    yield false
    yield 'miss await'
  },
})

export default function Pcall(...opts) {
  if (new.target) return (f, ...a) => wrap(exec(opts.at(0), f, a))
  return wrap(exec(defaultConfig, opts.at(0), opts.slice(1)))
}
