import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetCascadeOnBillDelete1588498926156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_78067773ff66c200b130f992119"`
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" DROP CONSTRAINT "FK_e930bee138b83025f0fc1a3435c"`
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ALTER COLUMN "total" TYPE numeric`
    );
    await queryRunner.query(
      `ALTER TABLE "bill" ALTER COLUMN "closed_at" SET DEFAULT null`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_78067773ff66c200b130f992119" FOREIGN KEY ("notification_object_id") REFERENCES "notification_object"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD CONSTRAINT "FK_e930bee138b83025f0fc1a3435c" FOREIGN KEY ("bill_id") REFERENCES "bill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "receipt" DROP CONSTRAINT "FK_e930bee138b83025f0fc1a3435c"`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_78067773ff66c200b130f992119"`
    );
    await queryRunner.query(
      `ALTER TABLE "bill" ALTER COLUMN "closed_at" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ALTER COLUMN "total" TYPE numeric`
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD CONSTRAINT "FK_e930bee138b83025f0fc1a3435c" FOREIGN KEY ("bill_id") REFERENCES "bill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_78067773ff66c200b130f992119" FOREIGN KEY ("notification_object_id") REFERENCES "notification_object"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
