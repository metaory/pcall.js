/* eslint no-undef: "off" */

;[...Array(50).keys()].forEach((x, i) => (globalThis[`C${i}`] = `\x1b[${x > 0 ? x + 30 : x}m`))

const { log } = console

export const mkPromise = (s = 3, pass = true) =>
  new Promise(
    (res, rej) =>
      log('Job will', pass ? C2 + 'RESOLVE' : C1 + 'REJECT', C0, `in ${s}s`) &&
      setTimeout(
        () =>
          ({ true: res, false: rej })[pass]({
            feeling: 'YOK',
            after: `${s}s`,
            pass_expected: pass,
          }),
        s * 1_000
      )
  )

export const sep = (c = '═') =>
  log(Array.from({ length: process.stdout.columns }, () => c).join(''))
