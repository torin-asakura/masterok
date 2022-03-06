import { Logger }                                      from '@atls/logger'
import { GrpcExceptionsFilter }                        from '@atls/nestjs-grpc-errors'
import { GrpcValidationPipe }                          from '@atls/nestjs-grpc-errors'
import { Controller }                                  from '@nestjs/common'
import { UseFilters }                                  from '@nestjs/common'
import { UsePipes }                                    from '@nestjs/common'
import { Inject }                                      from '@nestjs/common'
import { ClientGrpc }                                  from '@nestjs/microservices'

import { v4 as uuid }                                  from 'uuid'

import { TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME } from '@marketplace/product-proto'
import { MarketplaceProductServiceClient }             from '@marketplace/product-proto'
import { TransferPositionToOzonResponse }              from '@sync/sync-proto'
import { SyncServiceControllerMethods }                from '@sync/sync-proto'
import { SyncServiceController }                       from '@sync/sync-proto'

@Controller()
@SyncServiceControllerMethods()
@UseFilters(new GrpcExceptionsFilter())
export class ProductController implements SyncServiceController {
  private readonly NAME = 'SyncGrpcAdapter'

  private logger: Logger

  private marketplaceProductService: MarketplaceProductServiceClient

  constructor(@Inject(TEAM_MASTEROK_PRODUCT_V1ALPHA1_PACKAGE_NAME) private client: ClientGrpc) {
    this.logger = new Logger(this.NAME)
    this.marketplaceProductService = client.getService<MarketplaceProductServiceClient>(
      'MarketplaceProductService'
    )
  }

  @UsePipes(new GrpcValidationPipe())
  async transferPositionToOzon(request): Promise<TransferPositionToOzonResponse> {
    this.marketplaceProductService.createOzonProduct(request)

    return { id: uuid() }
  }
}
