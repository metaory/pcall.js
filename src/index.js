// import { setTimeout } from 'timers/promises'

class Pcall {
  #tick
  #span
  #func
  timeout = 60_000
  noTrace = true
  noError = false
  transformOnSuccess(args, res) {
    return res
  }
  transformOnFailure(args, err) {
    return err
  }
  onSuccess(args, res) {
    console.debug('@OK', { args, res })
  }
  onFailure(args, err) {
    console.error('@NO', { args, err })
  }
  onFinally(args, func, span) {
    console.debug('[OK]: fulfilled', func, args, 'in', span, 's')
    args.name = 'PCALL::TRACE'
    args.message ??= 'N/A'
    Error.captureStackTrace(args)
    this.noTrace || void console.trace(args.stack)
  }

  constructor(opt = {}) {
    ;[
      'onSuccess',
      'onFailure',
      'onFinally',
      'transformOnSuccess',
      'transformOnFailure',
      'timeout',
      'noTrace',
      'noError',
    ].forEach(x => {
      if (x in opt && typeof opt[x] === typeof this[x]) this[x] = opt[x]
    })
  }
  [Symbol.iterator] = function* () {
    yield true
    yield new TypeError('NO AWAIT')
  }

  #timer
  exec(fn, ...args) {
    return new Promise(resolve => {
      // .catch(err => {
      //   console.error('WTF', err)
      // })
      // console.log(this.#timer)
      // this.#timer = setTimeout.call(
      //   this,
      //   () => {
      //     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      //     return Promise.resolve(new Error('TIMEOUT'))
      //   },
      //   this.timeout * 1_000
      // )
      console.log('??', this.#timer)
      // this.#timer.onTimeout
      // try {
      this.#tick = performance.now()
      this.#func = fn.name
      // const ac = new AbortController()
      // const signal = ac.signal

      // setTimeout(this.timeout * 1_000, 'foobar', { signal }).then(() => {
      //   'foobar', { signal }).then(() => {
      //   console.log('FINNNNN')
      //   ac.abort()
      //   throw 'TIMEOUT'
      // })
      const ac = new AbortController()
      // setTimeout(() => ac.abort(), 1000) // give it a 1s timeout

      if (this.timeout) {
        setTimeout.call(this, () => {
          console.log('FINNNNN', { t: this })
          ac.abort()
          return resolve('zzz')
        }, this.timeout * 1_000)
      }
      if (this.args) args.unshift(this.args)

      fn(...args)
        .then(res => {
          void this.onSuccess(args, res)

          const out = this.transformOnSuccess(args, res)

          return resolve(this.noError ? out : [false, out])
        })
        .catch(err => {
          console.log('???')
          void this.onFailure(args, err)

          const out = this.transformOnFailure(args, err)

          return resolve(this.noError ? out : [true, out])
        })
        .finally(() => {
          this.#span = +((performance.now() - this.#tick) / 1_000).toFixed(2)
          void this.onFinally(args, this.#func, this.#span)
        })

      // setTimeout.call(this, function(a,b) {
      //   console.log('FINNNNN',{a,b,t:this})
      //   fn.catch()
      // },this.timeout * 1_000)
      // } catch (err) {
      // } finally {
      // this.#span = +((performance.now() - this.#tick) / 1_000).toFixed(2)
      // void this.onFinally(args, this.#func, this.#span)
      // }
    })
  }
}

export default function (...o) {
  if (new.target) {
    const pcall = new Pcall(...o)
    return (fn, ...args) => pcall.exec(fn, ...args)
  }
  const [fn, ...args] = o
  const pcall = new Pcall()
  return pcall.exec(fn, ...args)
}
