import { NestLogger }                  from '@atls/nestjs-logger'
import { NestFactory }                 from '@nestjs/core'

import { serverOptions }               from '@sync/sync-proto'

import { SyncServiceEntrypointModule } from './sync-service-entrypoint.module'

declare const module: any

const bootstrap = async () => {
  const app = await NestFactory.create(SyncServiceEntrypointModule, {
    logger: new NestLogger(),
  })

  app.enableShutdownHooks()

  app.connectMicroservice(serverOptions)

  await app.startAllMicroservices()
  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
