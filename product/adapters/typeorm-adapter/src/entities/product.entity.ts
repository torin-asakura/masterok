import { Entity }        from 'typeorm'
import { Column }        from 'typeorm'
import { PrimaryColumn } from 'typeorm'

@Entity()
export class ProductEntity {
  @PrimaryColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  category!: string

  @Column()
  subcategory!: string

  @Column('jsonb', { default: { buy: 0, sell: 0 } })
  price!: { buy: number; sell: number }

  @Column()
  article!: string

  @Column()
  supplierCode!: string

  @Column()
  brand!: string
}
