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

  onSuccess(args, res) { console.info('@OK', { args, res }); }

  onFailure(args, err) { console.error('@NO', { args, err }); }

  onFinally(args) {
    args.name = 'PCALL::TRACE'
    args.message ??= 'N/A'
    Error.captureStackTrace(args)
    this.noTrace || void console.trace(args.stack)
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
    } finally { void this.onFinally(args); }
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
