import config from './config.js'

class P extends Promise {
  static get [Symbol.species]() {
    return Promise
  }
}

const settle = async (fn, ...args) => {
  try {
    return [false, await fn(...args)]
  } catch (error) {
    return [true, error]
  }
}

export default async function exec(opt, fn, args) {
  const opts = { ...config, ...opt }
  try {
    const [err, raw] = await settle(fn, ...args)
    const res = opts.transformOnSuccess(args, raw)
    if (err) throw new Error(raw?.message, { cause: raw })
    void (await settle(opts.onSuccess, args, res))
    return P.resolve([false, res])
  } catch (error) {
    const res = opts.transformOnFailure(error, args)
    void (await settle(opts.onFailure, args, res))
    return P.resolve([true, res])
  } finally {
    opts.trace && opts.onTrace(opts)
    void opts.cleanup(opts, fn, args)
  }
}
