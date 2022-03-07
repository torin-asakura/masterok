import * as Services     from '../services'

import { DynamicModule } from '@nestjs/common'
import { Module }        from '@nestjs/common'

@Module({})
export class SyncApplicationModule {
  static register(): DynamicModule {
    return {
      module: SyncApplicationModule,
      providers: [...Object.values(Services)],
    }
  }
}
