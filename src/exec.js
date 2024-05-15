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
  if (typeof fn !== 'function') {
    if (typeof opt.fn === 'function') {
      args.unshift(fn)
      fn = opt.fn
    } else throw new Error('No function passed')
  }
  const opts = { ...config, ...opt }

  try {
    const [err, raw] = await settle(fn, ...args)
    const res = opts.transformOnSuccess(args, raw)
    if (err) throw new Error(raw?.message, { cause: raw })
    void (await settle(opts.onSuccess, args, res))
    return P.resolve(opts.happy ? res : [false, res])
  } catch (error) {
    const res = opts.transformOnFailure(args, error)
    void (await settle(opts.onFailure, args, res))
    return P.resolve(opts.happy ? res : [true, res])
  } finally {
    opts.trace && opts.onTrace(opts)
    void opts.cleanup(opts)
  }
}
