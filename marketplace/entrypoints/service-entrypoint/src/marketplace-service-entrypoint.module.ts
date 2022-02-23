import { Module }                       from '@nestjs/common'

import { MarketplaceGrpcAdapterModule } from '@marketplace/grpc-adapter-module'

@Module({
  imports: [MarketplaceGrpcAdapterModule.register()],
})
export class MarketplaceServiceEntrypointModule {}
