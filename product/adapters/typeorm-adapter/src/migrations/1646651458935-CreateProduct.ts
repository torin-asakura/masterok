import { MigrationInterface }              from 'typeorm'

import { QueryRunner } from 'typeorm'

export class CreateProduct1646651458935 implements MigrationInterface {
  name = 'CreateProduct1646651458935'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_entity" ("id" uuid NOT NULL, "name" character varying NOT NULL, "category" character varying NOT NULL, "subcategory" character varying NOT NULL, "price" jsonb NOT NULL DEFAULT '{"buy":0,"sell":0}', "article" character varying NOT NULL, "supplierCode" character varying NOT NULL, "brand" character varying NOT NULL, "barcode" character varying NOT NULL, "images" text NOT NULL, CONSTRAINT "PK_6e8f75045ddcd1c389c765c896e" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product_entity"`)
  }
}
