export default [...Array(8).keys()].reduce(
  (acc, x) => ({
    ...acc,
    [`f${x}`]: (...a) => `\x1b[3${x}m${a}\x1b[0m`,
    [`b${x}`]: (...a) => `\x1b[4${x}m${a}\x1b[0m`
  }),
  {}
)
