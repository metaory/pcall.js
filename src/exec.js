import { onSuccess, onFailure, cleanup } from './config.js'

const sureFn = fn => (fn instanceof Function ? fn : () => {})

export default async function exec(opts = {}, fn, args) {
  try {
    const res = await sureFn(fn)(...args)
    void (await sureFn(opts.onSuccess ?? onSuccess)(args, res))
    return [true, res]
  } catch (err) {
    void (await sureFn(opts.onFailure ?? onFailure)(args, err))
    return [false, err.message]
  } finally {
    if (opts.trace) {
      opts.name = 'DEBUG::TRACE'
      opts.message ??= 'N/A'
      Error.captureStackTrace(opts)
      void console.debug(opts.stack)
    }
    const cleanupFn = opts.cleanup ?? cleanup
    cleanupFn[Symbol.toStringTag] === 'AsyncFunction' && console.warn('is async')
    void sureFn(cleanupFn)(args)
  }
}
