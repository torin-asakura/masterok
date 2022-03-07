import { Module }                        from '@nestjs/common'

import { MarketplaceApplicationeModule } from '@marketplace/application-module'
import { MarketplaceGrpcAdapterModule }  from '@marketplace/grpc-adapter-module'

@Module({
  imports: [MarketplaceGrpcAdapterModule.register(), MarketplaceApplicationeModule.register()],
})
export class MarketplaceServiceEntrypointModule {}
