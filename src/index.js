class Pcall {
  constructor(opt = {}) {
    ;[
      'onSuccess',
      'onFailure',
      'onFinally',
      'transformOnSuccess',
      'transformOnFailure',
      'noTrace',
      'noError',
    ].forEach(x => {
      if (x in opt && typeof opt[x] === typeof this[x]) this[x] = opt[x]
    })
  }
  [Symbol.iterator] = function* () {
    yield true
    yield new TypeError('NO AWAIT')
  }
  noTrace = true

  noError = false

  transformOnSuccess(args, res) { return res; }

  transformOnFailure(args, err) { return err; }

  onSuccess(args, res) { console.info('[DEF]:onSuccess', { args, res }); }

  onFailure(args, err) { console.error('[DEF]:onFailure', { args, err }); }

  onFinally(opts) {
    opts.name = 'PCALL::TRACE'
    opts.message ??= 'N/A'
    Error.captureStackTrace(opts)
    opts.noTrace || void console.trace(opts.stack)
  }

  async exec(fn, ...args) {
    try {
      if (this.args) args.unshift(this.args)

      const res = await fn(...args)

      void this.onSuccess(args, res)

      const out = this.transformOnSuccess(args, res)

      return this.noError ? out : [false, out]
    } catch (err) {
      void this.onFailure(args, err)

      const out = this.transformOnFailure(args, err)

      return this.noError ? out : [true, out]
    } finally { void this.onFinally(); }
  }
}

export default function (...o) {
  if (new.target) {
    const pcall = new Pcall(...o)
    return (fn, ...args) => pcall.exec(fn, ...args)
  }
  const [fn, ...args] = o
  const pcall = new Pcall()
  return pcall.exec(fn, ...args)
}
