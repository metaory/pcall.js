import { setTimeout } from 'timers/promises'

class TimeoutError extends Error {
  constructor(message) {
    super(message)
    this.name = 'TimeoutError'
  }
}

const swallow = fn => Promise.resolve().then(fn).catch(() => {})

class Pcall {
  constructor(opt = {}) {
    ;[
      'onSuccess',
      'onFailure',
      'onFinally',
      'timeout',
      'transformOnSuccess',
      'transformOnFailure',
      'noTrace',
    ]
      .filter(x => x in opt && typeof opt[x] === typeof this[x])
      .forEach(x => (this[x] = opt[x]))
  }

  [Symbol.iterator] = function* () {
    yield true
    yield new TypeError('NO_AWAIT')
  }

  noTrace = true
  timeout = 30_000
  transformOnSuccess = res => res
  transformOnFailure = err => err
  onSuccess = res => console.info('@OK', res)
  onFailure = err => console.error('@NO', err)
  onFinally(args, func, span) {
    console.debug('@onFinally', args, func, span, 's')
    if (this.noTrace) return
    const traced = new Error('PCALL::TRACE')
    Error.captureStackTrace(traced)
    void console.trace(traced.stack)
  }

  exec(fn, ...args) {
    const started = performance.now()
    this.args && args.unshift(this.args)
    const call = { name: fn?.name ?? '', args, ms: 0, error: null }
    const ac = new AbortController()
    const timer =
      this.timeout > 0
        ? setTimeout(this.timeout, new TimeoutError(), { signal: ac.signal })
        : null
    const work = Promise.resolve().then(() => fn(...args))

    const finish = outcome => {
      ac.abort()
      call.ms = performance.now() - started
      const span = +(call.ms / 1_000).toFixed(2)
      return swallow(() => this.onFinally(args, call.name, span, call)).then(() => outcome)
    }

    const fail = error =>
      Promise.resolve()
        .then(() => this.transformOnFailure(error))
        .catch(failure => failure)
        .then(err => {
          call.error = err
          return swallow(() => this.onFailure(err, call)).then(() => finish([err, null]))
        })

    const done = value =>
      Promise.resolve()
        .then(() => this.transformOnSuccess(value))
        .then(res => swallow(() => this.onSuccess(res, call)).then(() => finish([null, res])))
        .catch(fail)

    const raced = timer ? Promise.race([work, timer]) : work
    return raced.then(
      value => (value instanceof TimeoutError ? fail(value) : done(value)),
      fail,
    )
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
