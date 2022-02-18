import express                      from 'express'
import { Logger } from '@atls/logger'

import { ProxyService }             from '@proxy/service'

import { createRouteLogMiddleware } from './middlewares'

const bootstrap = async () => {
  const app = express()

  const logger = new Logger('gateway')

  const proxyService = new ProxyService()

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

  app.get('/find-positions', async (req, res) => {
    try {
      const positions = await proxyService.getPositions()
      res.statusCode = 200
      res.send({
        message: 'OK',
        positions,
      })
    } catch (e) {
      res.send({
        message: `Error: ${e}`,
      })
    }
  })

  app.get('/gen-icml', async (req, res) => {
    try {
      const icml = await proxyService.genICML()
      const fs = require('fs')
      fs.writeFileSync(`${__dirname}/icml.xml`, icml)
      res.statusCode = 200
      res.send({
        message: 'OK'
      })
    } catch (e) {
      res.send({
        message: `Error: ${e}`,
      })
    }
  })

  app.get('/fbc', async (req, res) => {
    try {
      const position = await proxyService.getPositionByCode(1445190)
      res.statusCode = 200
      res.send({
        message: 'OK',
        position
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
