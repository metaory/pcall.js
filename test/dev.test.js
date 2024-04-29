import Pcall from '../src/index.js'

const { log: l } = console

const prom = (name, family) => new Promise(resolve => resolve(`Hi ${name} :: ${family} !`))

{
  l('▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁')
  l('━━  DIRECT INVOKE  ━━')
  const res = await Pcall(prom, 'zed', 'hoge')
  l(res)
  l('▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔')
}

l('░░░░░░░░░░░░░░░░░░░░░')

{
  l('▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁')
  l('━━━━  INSTANCE  ━━━━━')
  const pcall = new Pcall({ opt_1: true, opt_2: 123 })
  const res = await pcall(prom, 'zed', 'hoge')
  l(res)
  l('▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔')
}
