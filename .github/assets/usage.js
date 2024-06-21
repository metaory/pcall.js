import Pcall from 'pcall.js'

{
  const [err, res] = await Pcall(asyncFn, a, b, c /* ··· */)
}

{
  const pcall = new Pcall({
    onSuccess: console.log,
    onFailure: console.error,
    onFinally: console.info,
    timeout: 30_000,
    transformOnSuccess: res => res,
    transformOnFailure: err => err,
    noTrace: false,
  })
  const [err, res] = await pcall(asyncFn, a, b, c /* ··· */)
}

// :Fulfill [null, res]
// :Reject  [err, null]
