import { Entity }                 from 'typeorm'
import { Column }                 from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  code: string

  @Column()
  name: string

  @Column()
  brand: string

  @Column()
  category: string

  @Column()
  price?: string

  @Column()
  residue?: string

  @Column()
  info?: string

  @Column()
  barcode?: string

  @Column()
  img?: string

  @Column()
  specs?: string
}
