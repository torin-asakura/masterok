import { Request }      from 'express'
import { Response }     from 'express'
import { NextFunction } from 'express'
import { Logger }       from '@atls/logger'

const createRouteLogMiddleware = (logger: Logger) =>
  (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Handling route: ${req.path}`)
    next()
  }

export { createRouteLogMiddleware }
