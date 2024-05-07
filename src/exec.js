import { onSuccess, onFailure, cleanup } from './config.js'

class P extends Promise {
  static get [Symbol.species]() {
    return Promise
  }
}

const sureFn = fn => (fn instanceof Function ? fn : () => {})

export default async function exec(opts = {}, fn, args) {
  try {
    const res = await sureFn(fn)(...args)
    void (await sureFn(opts.onSuccess ?? onSuccess)(args, res))
    return P.resolve([false, res])
  } catch (err) {
    void (await sureFn(opts.onFailure ?? onFailure)(args, err))
    return P.resolve([true, err.message])
  } finally {
    if (opts.trace) {
      opts.name = 'PCALL::TRACE'
      opts.message ??= 'N/A'
      Error.captureStackTrace(opts)
      void console.debug(opts.stack)
    }
    const cleanupFn = opts.cleanup ?? cleanup
    const cleanupTag = cleanupFn[Symbol.toStringTag]
    cleanupTag === 'AsyncFunction' && console.warn(cleanupTag)
    void sureFn(cleanupFn)(args)
  }
}
