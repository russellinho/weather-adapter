import { expose } from '@chainlink/ea-bootstrap'
import { makeExecute } from './adapter'
import { makeConfig } from './config'

const NAME = 'WEATHER'

export = { NAME, makeConfig, makeExecute, ...expose(NAME, makeExecute()) }
