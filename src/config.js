const columns = process.stdout.columns
export const line = (c = '-') => Array.from({ length: columns }).fill(c).splice(1).join('')
export const pline = (c, n = 1) => console.log(`\x1b[3${n}m\n`, line(c), '\x1b[0m')

const box = (data, ok = true) =>
  console.log(
    `    ╭${'╌'.repeat(11)}╮
    ┊ ${ok ? 'onSuccess' : 'onFailure'} ┊
    ╰${'╌'.repeat(11)}╯\n`,
    JSON.stringify(data, null, 2)
  )

// -------------------------------------------------------

export const onSuccess = (args, res) => box({ res, args }, true)
export const onFailure = (args, err) => box({ err, args }, false)
export const transformOnSuccess = (res, args) => ({ args, res })
export const transformOnFailure = (err, args) => ({ err, args })
export const cleanup = (...args) => console.log('fin', { args })
export const onTrace = opts => {
  opts.name = 'PCALL::TRACE'
  opts.message ??= 'N/A'
  Error.captureStackTrace(opts)
  void console.debug(opts.stack)
}

// -------------------------------------------------------

export default {
  onSuccess,
  onFailure,
  transformOnSuccess,
  transformOnFailure,
  cleanup,
  onTrace,
  trace: false,
}
