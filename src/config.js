const box = (data, ok = true) =>
  console.log(
    `    ╭${'╌'.repeat(9)}╮
    ┊ ${ok ? 'SUCCESS' : 'FAILURE'} ┊
    ╰${'╌'.repeat(9)}╯\n`,
    JSON.stringify(data, null, 2)
  )

// -------------------------------------------------------

export const onSuccess = (args, res) => box({ args, res }, true)
export const onFailure = (args, err) => box({ args, err }, false)
export const transformOnSuccess = (args, res) => ({ args, res })
export const transformOnFailure = (args, err) => ({ args, err })
export const cleanup = args => console.log('done with', args)

export default {
  onSuccess,
  onFailure,
  transformOnSuccess,
  transformOnFailure,
  cleanup,
  trace: false,
}
