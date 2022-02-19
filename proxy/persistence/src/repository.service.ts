import { Logger }           from '@atls/logger'

import { Connection }       from 'typeorm'
import { createConnection } from 'typeorm'

import { Attribute }        from './entities'
import { Position }         from './entities'

export class ProxyRepository {
  private readonly NAME = 'ProxyRepository'

  private connection: Promise<Connection>

  private readonly logger: Logger

  constructor() {
    this.connection = createConnection({
      name: 'main',
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'db',
      entities: [Attribute, Position],
    })
    this.logger = new Logger('Repository-Service')
  }

  private writeJSON(object: object, prop: string) {
    return object[prop] ? JSON.stringify(object[prop]) : ''
  }

  async writeAttribute(newAttribute: any) {
    const connection = await this.connection
    const attributeRepository = connection.getRepository(Attribute)

    const attribute = new Attribute()
    attribute.name = newAttribute.name
    attribute.key = newAttribute.key
    attribute.meta = this.writeJSON(newAttribute, 'meta')

    await attributeRepository.save(attribute)
  }

  async getAttributes() {
    const connection = await this.connection

    const attributeRepository = await connection.getRepository(Attribute)

    return attributeRepository.find()
  }

  async writePosition(newPosition: any) {
    const connection = await this.connection
    const positionRepository = await connection.getRepository(Position)

    const position = new Position()
    position.name = newPosition.name
    position.code = newPosition.code
    position.brand = newPosition.brand
    position.category = newPosition.category
    position.price = this.writeJSON(newPosition, 'price')
    position.residue = this.writeJSON(newPosition, 'residue')
    position.info = this.writeJSON(newPosition, 'info')
    position.barcode = this.writeJSON(newPosition, 'barcode')
    position.img = this.writeJSON(newPosition, 'img')
    position.specs = this.writeJSON(newPosition, 'specs')

    await positionRepository.save(position)
  }

  async findAllPositions() {
    const connection = await this.connection

    const positionRepository = connection.getRepository(Position)

    return positionRepository.find()
  }

  async findPositionByCode(code) {
    const connection = await this.connection

    const positionRepository = connection.getRepository(Position)

    return positionRepository.find({
      where: {
        code,
      },
    })
  }
}
