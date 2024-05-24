import config from './config.js'

// const memo = new WeakMap()

class P extends Promise {
  static get [Symbol.species]() {
    return Promise
  }
}

const unwrap = async (fn, ...args) => {
  try {
    return [false, await P.resolve(fn(...args))]
  } catch (err) {
    return [true, err]
  }
}

export default async function exec(opt, fn, args) {
  if (Array.isArray(opt.args)) args.unshift(...opt.args)

  if (typeof opt.fn === 'function') {
    fn = opt.fn
    args.unshift(fn)
  }

  if (typeof fn !== 'function') throw new Error('bad function')

  const opts = { ...config, ...opt }

  try {
    const [err, raw] = await unwrap(fn, ...args)
    if (err) throw new Error(raw?.message, { cause: raw })

    const res = opts.transformOnSuccess(args, raw)

    void (await unwrap(opts.onSuccess, args, res))

    return P.resolve(opts.noError ? res : [false, res])
  } catch (error) {
    const res = opts.transformOnFailure(args, error)

    void (await unwrap(opts.onFailure, args, res))

    return P.resolve(opts.noError ? res : [true, res])
  } finally {
    void opts?.cleanup(opts)
  }
}
