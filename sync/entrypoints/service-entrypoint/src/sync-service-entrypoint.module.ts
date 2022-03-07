import { Module }                from '@nestjs/common'

import { SyncApplicationModule } from '@sync/application-module'
import { SyncGrpcAdapterModule } from '@sync/grpc-adapter-module'

@Module({
  imports: [SyncApplicationModule.register(), SyncGrpcAdapterModule.register()],
})
export class SyncServiceEntrypointModule {}
