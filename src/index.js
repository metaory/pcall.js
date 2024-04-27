const warn = () =>
  console.warn(`
🚧 UNDER ACTIVE DEVELOPMEN
🔴 NOT PRODUCTION READY`);

warn()

async function pcall(fn, ...args) {
  warn()
  try {
    const res = await fn(...args);
    return [true, res];
  } catch (err) {
    console.error(err);
    return [false, err.message];
  }
}

pcall.setup = (opt) => {
  // TODO: set opt settings
  warn()
  console.log({ opt });
  return pcall;
};

export default pcall;
