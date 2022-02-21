import { Module }                  from '@nestjs/common'

import { GrpcAdapterModule } from '@russvet/grpc-adapter-module'

@Module({
  imports: [GrpcAdapterModule.register()],
})
export class ProductServiceEntrypointModule {}
