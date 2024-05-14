const { log, debug } = console;
const box = (data, ok = true) => console.log(
  `    \u256D${"\u254C".repeat(11)}\u256E
    \u250A ${ok ? "onSuccess" : "onFailure"} \u250A
    \u2570${"\u254C".repeat(11)}\u256F
`,
  JSON.stringify(data, null, 2)
);
const onSuccess = (args, res) => box({ res, args }, true);
const onFailure = (args, err) => box({ err, args }, false);
const transformOnSuccess = (res, args) => ({ args, res });
const transformOnFailure = (err, args) => ({ err, args });
const cleanup = (err, res, args) => log({ err, res, args });
const onTrace = (opts) => {
  opts.name = "PCALL::TRACE";
  opts.message ?? (opts.message = "N/A");
  Error.captureStackTrace(opts);
  void debug(opts.stack);
};
const config = {
  onSuccess,
  onFailure,
  transformOnSuccess,
  transformOnFailure,
  cleanup,
  onTrace,
  trace: false
};

class P extends Promise {
  static get [Symbol.species]() {
    return Promise;
  }
}
const settle = async (fn, ...args) => {
  try {
    return [false, await fn(...args)];
  } catch (error) {
    return [true, error];
  }
};
async function exec(opt, fn, args) {
  const opts = { ...config, ...opt };
  try {
    const [err, raw] = await settle(fn, ...args);
    const res = opts.transformOnSuccess(args, raw);
    if (err)
      throw new Error(raw?.message, { cause: raw });
    void await settle(opts.onSuccess, args, res);
    return P.resolve([false, res]);
  } catch (error) {
    const res = opts.transformOnFailure(error, args);
    void await settle(opts.onFailure, args, res);
    return P.resolve([true, res]);
  } finally {
    opts.trace && opts.onTrace(opts);
    void opts.cleanup(opts, fn, args);
  }
}

function Pcall(...o) {
  if (new.target)
    return (f, ...a) => exec(o.at(0), f, a);
  return exec(config, o.at(0), o.slice(1));
}

export { Pcall as default };
