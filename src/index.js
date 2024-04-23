export default async function pcall(fn, ...args) {
  try {
    const res = await fn(...args);
    return [true, res];
  } catch (err) {
    return [false, err];
  }
}
