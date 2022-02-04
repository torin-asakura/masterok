import { Logger }       from 'pino'

import { PrismaClient } from './generated/client'

export class ProxyRepository {
  private readonly NAME = 'ProxyRepository'
  private prisma: PrismaClient

  constructor(private readonly logger: Logger) {
    this.prisma = new PrismaClient()
  }

  async writeAttribute(attribute: any) {
    this.prisma.attribute
      .create({
        data: attribute,
      })
      .catch((e) => {
        this.logger.error('Could not write attribute')
        throw e
      })
  }

  async getAttributes() {
    return this.prisma.attribute.findMany()
  }

  async writePosition(position: any) {
    this.prisma.position
      .create({
        data: position,
      })
      .catch((e) => {
        this.logger.error(`Could not write position`)
        throw e
      })
  }

  async findAllPositions() {
    return this.prisma.position.findMany()
  }

  async findPositionByCode(code: string) {
    return this.prisma.position.findFirst({
      where: {
        code,
      },
    })
  }

  async updatePosition(code: string, position: any) {
    const positionInDb = await this.findPositionByCode(code)

    if (positionInDb) {
      return this.prisma.position.update({
        where: {
          id: positionInDb?.id,
        },
        data: position,
      })
    }

    throw new Error(
      `${this.NAME}: Could not updatePosition, entry with code ${code} does not exist`
    )
  }

  async syncAttributesWithDb() {
    const dict = require('../../../.data/attr-dict.json')

    Object.entries(dict).forEach(([key, value]) => {
      this.prisma.attribute
        .create({
          data: {
            name: key,
            key: value as string,
          },
        })
        .catch((e) => {
          this.logger.error('Could not write attribute')
          throw e
        })
    })
  }

  async $disconnect() {
    await this.prisma.$disconnect()
  }
}
