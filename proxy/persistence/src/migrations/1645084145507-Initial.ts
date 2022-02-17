import { MigrationInterface } from 'typeorm'
import { QueryRunner }        from 'typeorm'

export class Initial1645084145507 implements MigrationInterface {
  name = 'Initial1645084145507'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "attribute" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "key" character varying NOT NULL, "description" character varying NOT NULL, "meta" character varying NOT NULL, CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "position" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "brand" character varying NOT NULL, "category" character varying NOT NULL, "price" character varying NOT NULL, "residue" character varying NOT NULL, "info" character varying NOT NULL, "barcode" character varying NOT NULL, "img" character varying NOT NULL, "specs" character varying NOT NULL, CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "position"`)
    await queryRunner.query(`DROP TABLE "attribute"`)
  }
}
