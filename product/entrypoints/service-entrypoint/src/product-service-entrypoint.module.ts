import { Module }                   from '@nestjs/common'

import { ProductGrpcAdapterModule } from '@product/product-grpc-adapter-module'

@Module({
  imports: [ProductGrpcAdapterModule.register()],
})
export class ProductServiceEntrypointModule {}
