import { onSuccess, onFailure } from './hooks.js'

async function exec(opts, fn, args) {
  try {
    const res = await fn(...args)
    onSuccess(args, res)
    return [true, res]
  } catch (err) {
    onFailure(args, err)
    return [false, err.message]
  }
}

function Pcall(...opts) {
  if (new.target) return (fn, ...args) => exec(opts, fn, args)
  const [fn, ...args] = opts
  return exec({ def: 'yes' }, fn, args)
}

export default Pcall
