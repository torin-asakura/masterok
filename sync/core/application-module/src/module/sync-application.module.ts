import * as Services     from '../services'

import { DynamicModule } from '@nestjs/common'
import { Module }        from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'

@Module({})
export class SyncApplicationModule {
  static register(): DynamicModule {
    return {
      module: SyncApplicationModule,
      providers: [...Object.values(Services)],
    }
  }
}
