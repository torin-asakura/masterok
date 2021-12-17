import express                      from 'express'
import pino                         from 'pino'
import pretty                       from 'pino-pretty'
import { Logger }                   from 'pino'

import { ProxyService }             from '@proxy/application'

import { createRouteLogMiddleware } from './middlewares'

const bootstrap = async () => {
  const app = express()

  const proxyService = new ProxyService()

  const logger: Logger = pino(
    pretty({
      colorize: true,
    })
  )

  app.use(createRouteLogMiddleware(logger))

  app.get('/sync-with-db', async (req, res) => {
    try {
      await proxyService.syncDbWithRussvet()
      res.statusCode = 200
      res.send({
        message: 'OK',
      })
    } catch (e) {
      res.send({
        message: `Error: ${e}`,
      })
    }
  })
  app.get('/lamps', async (req,res) => {
    try {
      const lamps = await proxyService.getLamps()
      res.statusCode = 200
      res.send(lamps.reduce((acc, { name }) => `${acc}<br />${name}`,''))
    } catch (e) {
      res.send({
        message: `Error: ${e}`
      })
    }
  })

  app.listen(process.env.PORT || 4000, () => {
    logger.info(`Application started on port ${process.env.PORT || 4000}`)
  })
}

bootstrap()
