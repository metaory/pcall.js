const box = (ok, data) =>
  console.log(
    `    ╭╌╌╌╌╌╌╌╌╌╮
    ┊ ${ok ? 'SUCCESS' : 'FAILURE'} ┊
    ╰╌╌╌╌╌╌╌╌╌╯\n`,
    JSON.stringify(data, null, 2),
  )

export const onSuccess = (args, res) => box(true, { args, res })

export const onFailure = (args, err) => box(false, { args, err })

export const cleanup = args => console.log(':CLEANUP_PLACEHOLDER:', { args })

export default { onSuccess, onFailure, cleanup, trace: false }