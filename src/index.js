
export default async function pcall(fn, ...args) {
  try {
    // if (typeof fn !== 'function') {
    //   return []
    // }
    const res = await fn(...args);
    return [true, res];
  } catch (err) {
    console.error('>>', err.message)
    return [false, 'XXXXXXXXXX'];
  }
}
