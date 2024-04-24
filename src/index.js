const ERRORS = [
  "BAD_ARG",
  "FIRST_ARG_IS_NOT_A_FUNCTION",
  "PLACE_HOLDER_A",
  "PLACE_HOLDER_B",
];

const ERR = ERRORS.reduce((acc, cur) => ({ [cur]: cur, ...acc }), {});

// 🚫 TODO: HOOKS & PLUGINS ARE NOT_IMPLEMENTED
const PCALL = { hooks: {}, plugins: {} };

const validate = (val = 0, expected = 1) => val === expected;

export default async function pcall(fn, ...args) {
  try {
    if (typeof fn !== "function")
      return [false, ERR.FIRST_ARG_IS_NOT_A_FUNCTION];

    if (validate(PCALL.hooks?.serializer, "function")) {
      args = PCALL.hooks.serializer(...args);
    }

    const res = await fn(...args);

    if (validate(PCALL.deserializer, "function")) {
      args = PCALL.deserializer(...args);
    }

    return [true, res];
  } catch (err) {
    console.error(err);

    if (validate(PCALL.hooks?.error, "function")) {
      args = PCALL.hooks?.error(err, args);
    }

    return [false, err.message];
  }
}
