import { expose } from '@chainlink/ea-bootstrap'
import { makeExecute } from './adapter'
import { makeConfig } from './config'

const NAME = 'BINANCE_DEX'

export = { NAME, makeExecute, makeConfig, ...expose(NAME, makeExecute()) }
