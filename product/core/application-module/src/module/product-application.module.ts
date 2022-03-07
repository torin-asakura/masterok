import * as CommandHandlers from '../command-handlers'

import { DynamicModule }    from '@nestjs/common'
import { Module }           from '@nestjs/common'

@Module({})
export class ProductApplicationModule {
  static register(): DynamicModule {
    return {
      module: ProductApplicationModule,
      providers: [...Object.values(CommandHandlers)],
    }
  }
}
