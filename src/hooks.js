const box = (ok, data) =>
  console.log(
    `    ╭╌╌╌╌╌╌╌╌╌╮
    ┊ ${ok ? 'SUCCESS' : 'FAILURE'} ┊
    ╰╌╌╌╌╌╌╌╌╌╯\n`,
    JSON.stringify(data, null, 2),
  )

// Default Success Hook
export const onSuccess = (args, res) => box(true, { args, res })

// Default Failure Hook
export const onFailure = (args, err) => box(false, { args, err })
