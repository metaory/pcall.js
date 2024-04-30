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

{
  l('▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁')
  l('━ OPT INSTANCE  ━━━━━')
  const onSuccess = (args, res) => l('onSuccess::', { args, res })
  const onFailure = (args, err) => l('onFailure::', { args, err })
  const pcall = new Pcall({ onSuccess, onFailure, trace: false })
  const res = await pcall(prom, 'zed', 'hoge')
  l(res)
  l('▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔')
}

{
  l('▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁')
  l('━ NOPT INSTANCE  ━━━━')
  const pcall = new Pcall()
  const res = await pcall(prom, 'zed', 'hoge')
  l(res)
  l('▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔')
}
