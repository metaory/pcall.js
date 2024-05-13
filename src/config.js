const box = (data, ok = true) =>
  console.log(
    `    ╭${'╌'.repeat(9)}╮
    ┊ ${ok ? 'SUCCESS' : 'FAILURE'} ┊
    ╰${'╌'.repeat(9)}╯\n`,
    JSON.stringify(data, null, 2)
  )

// -------------------------------------------------------

export default {
  onSuccess: (args, res) => box({ args, res }, true),
  onFailure: (args, err) => box({ args, err }, false),
  transformOnSuccess: (args, res) => ({ args, res }),
  transformOnFailure: (args, err) => ({ args, err }),
  cleanup: args => console.log('done with', args),
  trace: false,
}
