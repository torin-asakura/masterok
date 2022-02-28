import { Entity }                 from 'typeorm'
import { Column }                 from 'typeorm'
import { PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  key: string

  @Column()
  description?: string

  @Column()
  meta?: string
}
