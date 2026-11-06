export type Call = {
  name: string
  args: unknown[]
  ms: number
  error: unknown
}

export type Options = {
  onSuccess?: (res: unknown, call: Call) => void
  onFailure?: (err: unknown, call: Call) => void
  onFinally?: (args: unknown[], name: string, span: number, call: Call) => void
  timeout?: number
  transformOnSuccess?: (res: unknown) => unknown
  transformOnFailure?: (err: unknown) => unknown
  noTrace?: boolean
}

type Guard = <T>(
  fn: (...args: any[]) => T | Promise<T>,
  ...args: any[]
) => Promise<[unknown, Awaited<T> | null]>

interface Pcall {
  new (options?: Options): Guard
  <T>(
    fn: (...args: any[]) => T | Promise<T>,
    ...args: any[]
  ): Promise<[unknown, Awaited<T> | null]>
}

declare const Pcall: Pcall
export default Pcall
