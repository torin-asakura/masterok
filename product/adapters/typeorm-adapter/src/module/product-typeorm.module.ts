import * as entities                              from '../entities'
import * as queries                               from '../query-handlers'

import { DynamicModule }                          from '@nestjs/common'
import { Module }                                 from '@nestjs/common'
import { TypeOrmModule }                          from '@nestjs/typeorm'

import { ProductRepository }                      from '@product/domain-module'

import { ProductRepositoryImpl }                  from '../repositories'
import { PRODUCT_TYPEORM_ADAPTER_MODULE_OPTIONS } from './product-typeorm-module.constants'
import { ProductTypeOrmOptions }                  from './product-typeorm-module.interfaces'
import { TypeOrmConfig }                          from './typeorm.config'

@Module({})
export class ProductTypeOrmAdapterModule {
  static register(options: ProductTypeOrmOptions = {}): DynamicModule {
    return {
      global: true,
      module: ProductTypeOrmAdapterModule,
      imports: [
        TypeOrmModule.forFeature(Object.values(entities)),
        TypeOrmModule.forRootAsync({
          useExisting: TypeOrmConfig,
        }),
      ],
      providers: [
        ...Object.values(queries),
        TypeOrmConfig,
        {
          provide: PRODUCT_TYPEORM_ADAPTER_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: ProductRepository,
          useClass: ProductRepositoryImpl,
        },
      ],
      exports: [
        TypeOrmModule,
        TypeOrmConfig,
        {
          provide: ProductRepository,
          useClass: ProductRepositoryImpl,
        },
      ],
    }
  }
}
