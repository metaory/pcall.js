import pcall from "../src/index.js";

const { log: l } = console;

const myPromise = (x) =>
  new Promise((resolve, reject) =>
    Math.random() > 0.5 ? resolve(x) : reject(x),
  );

l("zHI!!");
l(pcall);
l("::", myPromise(123).then(console.log).catch(console.error));
