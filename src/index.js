import { setTimeout } from 'timers/promises'

export class TimeoutError extends Error {
  constructor(message) {
    super(message)
    this.name = 'TimeoutError'
  }
}

class Pcall {
  constructor(opt = {}) {
    ;[
      'onSuccess',
      'onFailure',
      'onFinally',
      'timeout',
      'transformOnSuccess',
      'transformOnFailure',
      'noTrace'
    ]
      .filter(x => x in opt && typeof opt[x] === typeof this[x])
      .forEach(x => (this[x] = opt[x]))
  }

  [Symbol.iterator] = function* () {
    yield true
    yield new TypeError('NO_AWAIT')
  }

  #ack = x => {
    if (x instanceof TimeoutError) throw x
    return x
  }
  #func
  #span
  #tick
  noTrace = true
  timeout = 30_000
  transformOnSuccess = res => res
  transformOnFailure = err => err
  onSuccess = res => console.info('@OK', res)
  onFailure = err => console.error('@NO', err)
  onFinally(args, func, span) {
    console.debug('@onFinally', args, func, span, 's')
    args.name = 'PCALL::TRACE'
    args.message ??= 'N/A'
    Error.captureStackTrace(args)
    this.noTrace || void console.trace(args.stack)
  }

  exec(fn, ...args) {
    this.#tick = performance.now()
    this.#func = fn.name

    this.args && args.unshift(this.args)

    const ac = new AbortController()
    const signal = ac.signal
    const timer = setTimeout(this.timeout, new TimeoutError(), { signal })

    return new Promise(resolve => {
      Promise.race([fn(...args), timer])
        .then(this.#ack)
        .then(this.transformOnSuccess)
        .then(res => {
          resolve([null, res])
          return res
        })
        .then(this.onSuccess)
        .catch(this.transformOnFailure)
        .then(err => {
          resolve([err, null])
          return err
        })
        .then(this.onFailure)
        .finally(() => {
          ac.abort()
          this.#span = +((performance.now() - this.#tick) / 1_000).toFixed(2)
          void this.onFinally(args, this.#func, this.#span)
        })
    })
  }
}

export default function (...opts) {
  if (new.target) {
    const pcall = new Pcall(...opts)
    return (fn, ...args) => pcall.exec(fn, ...args)
  }
  const [fn, ...args] = opts
  const pcall = new Pcall()
  return pcall.exec(fn, ...args)
}
