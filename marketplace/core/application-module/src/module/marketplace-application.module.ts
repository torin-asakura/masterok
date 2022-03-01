import * as Services     from '../services'

import { DynamicModule } from '@nestjs/common'
import { Module }        from '@nestjs/common'

@Module({})
export class MarketplaceApplicationeModule {
  static register(): DynamicModule {
    return {
      module: MarketplaceApplicationeModule,
      providers: [...Object.values(Services)],
    }
  }
}
