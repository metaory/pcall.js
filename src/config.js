const { log, debug } = console

const box = (data, ok = true) =>
  log(
    `  ╭${'╌'.repeat(11)}╮
  ┊ ${ok ? 'onSuccess' : 'onFailure'} ┊
  ╰${'╌'.repeat(11)}╯\n`,
    JSON.stringify(data, null, 2)
  )

// -------------------------------------------------------

export const onSuccess = (args, res) => box({ res, args }, true)
export const onFailure = (args, err) => box({ err, args }, false)
export const transformOnSuccess = (args, res) => res
export const transformOnFailure = (args, res) => res
export const cleanup = opts => {
  opts.name = 'PCALL::TRACE'
  opts.message ??= 'N/A'
  Error.captureStackTrace(opts)
  opts.noTrace || void debug(opts.stack)
}
// -------------------------------------------------------

export default {
  onSuccess,
  onFailure,
  transformOnSuccess,
  transformOnFailure,
  cleanup,
  noTrace: true,
  noError: false,
}
