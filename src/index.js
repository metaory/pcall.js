import config from './config.js'
import exec from './exec.js'

const make = (...args) => {
  const o = exec(...args)
  o[Symbol.iterator] = function* () {
    yield true
    yield new TypeError('NO AWAIT')
  }
  return o
}

export default function Pcall(...o) {
  if (new.target) return (f, ...a) => make(o.at(0), f, a)
  return make(config, o.at(0), o.slice(1))
}
