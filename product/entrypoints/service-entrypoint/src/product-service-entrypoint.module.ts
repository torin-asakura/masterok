import { Module }                      from '@nestjs/common'

import { ProductApplicationModule }    from '@product/application-module'
import { CqrsAdapterModule }           from '@product/cqrs-adapter-module'
import { ProductGrpcAdapterModule }    from '@product/product-grpc-adapter-module'
import { ProductTypeOrmAdapterModule } from '@product/typeorm-adapter-module'

@Module({
  imports: [
    ProductGrpcAdapterModule.register(),
    CqrsAdapterModule.register(),
    ProductApplicationModule.register(),
    ProductTypeOrmAdapterModule.register(),
  ],
})
export class ProductServiceEntrypointModule {}
