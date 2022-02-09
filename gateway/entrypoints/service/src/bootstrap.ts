import express                      from 'express'
import pino                         from 'pino'
import pretty                       from 'pino-pretty'
import { Logger }                   from 'pino'

import { ProxyService }             from '@proxy/service'

import { createRouteLogMiddleware } from './middlewares'

const bootstrap = async () => {
  const app = express()

  const logger: Logger = pino(
    pretty({
      colorize: true,
    })
  )

  const proxyService = new ProxyService(logger)

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

  app.get('/write-attrs', async (req, res) => {
    try {
      await proxyService.writeAttributes()
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

  app.get('/unique-attrs', async (req, res) => {
    try {
      await proxyService.uniqueAttributes()
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

  app.get('/order-lamp', async (req, res) => {
    try {
      await proxyService.orderLamp()
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

  app.listen(process.env.PORT || 4000, () => {
    logger.info(`Application started on port ${process.env.PORT || 4000}`)
  })
}

bootstrap()
