import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1587222487551 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "notification_object" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "entity_type_id" integer NOT NULL, "action_type_id" integer NOT NULL, "entity_id" uuid NOT NULL, "actor_id" uuid NOT NULL, CONSTRAINT "PK_8c2bd843d69a8fc4122422628fa" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_read" boolean NOT NULL DEFAULT false, "is_seen" boolean NOT NULL DEFAULT false, "notification_object_id" uuid NOT NULL, "recipient_id" uuid NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "receipt" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "comment" character varying, "category" character varying, "title" character varying, "total" numeric NOT NULL, "currency" character varying NOT NULL DEFAULT 'EUR', "paid_at" date NOT NULL, "created_at" date NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_settlement" boolean NOT NULL DEFAULT false, "bill_id" uuid NOT NULL, "paid_by_id" uuid NOT NULL, "created_by_id" uuid NOT NULL, "splits" jsonb NOT NULL, CONSTRAINT "PK_b4b9ec7d164235fbba023da9832" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "first_name" character varying, "last_name" character varying, "avatar_url" character varying, "created_at" date NOT NULL DEFAULT now(), "state" "user_state_enum" NOT NULL DEFAULT 'ONBOARDING_VERIFY_EMAIL', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "bill_user" ("created_at" date NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "state" "bill_user_state_enum" NOT NULL DEFAULT 'PENDING', "user_id" uuid NOT NULL, "added_by_id" uuid, "bill_id" uuid NOT NULL, CONSTRAINT "PK_4af50be05f5e5b8178cf59659fb" PRIMARY KEY ("user_id", "bill_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "bill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "icon" character varying, "created_at" date NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "closed_at" TIMESTAMP WITH TIME ZONE DEFAULT null, "currency" character varying NOT NULL DEFAULT 'EUR', "created_by_id" uuid, CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "notification_object" ADD CONSTRAINT "FK_655697bcfe514ac5e130407127b" FOREIGN KEY ("actor_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_78067773ff66c200b130f992119" FOREIGN KEY ("notification_object_id") REFERENCES "notification_object"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_9830357f52360a126737d498e66" FOREIGN KEY ("recipient_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD CONSTRAINT "FK_e930bee138b83025f0fc1a3435c" FOREIGN KEY ("bill_id") REFERENCES "bill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD CONSTRAINT "FK_1d81875921be8a59aa8b678193e" FOREIGN KEY ("paid_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" ADD CONSTRAINT "FK_fe1d7a4147389f3e324ad27e972" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bill_user" ADD CONSTRAINT "FK_dfb47ee4f8e2c526d0ddda0fa3b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bill_user" ADD CONSTRAINT "FK_d1a5e3c0b149e644e048ab64034" FOREIGN KEY ("added_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bill_user" ADD CONSTRAINT "FK_3ae6155e279acc858228bc96e46" FOREIGN KEY ("bill_id") REFERENCES "bill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bill" ADD CONSTRAINT "FK_e9f71888234c854dfeac2742e14" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "bill" DROP CONSTRAINT "FK_e9f71888234c854dfeac2742e14"`
    );
    await queryRunner.query(
      `ALTER TABLE "bill_user" DROP CONSTRAINT "FK_3ae6155e279acc858228bc96e46"`
    );
    await queryRunner.query(
      `ALTER TABLE "bill_user" DROP CONSTRAINT "FK_d1a5e3c0b149e644e048ab64034"`
    );
    await queryRunner.query(
      `ALTER TABLE "bill_user" DROP CONSTRAINT "FK_dfb47ee4f8e2c526d0ddda0fa3b"`
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" DROP CONSTRAINT "FK_fe1d7a4147389f3e324ad27e972"`
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" DROP CONSTRAINT "FK_1d81875921be8a59aa8b678193e"`
    );
    await queryRunner.query(
      `ALTER TABLE "receipt" DROP CONSTRAINT "FK_e930bee138b83025f0fc1a3435c"`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_9830357f52360a126737d498e66"`
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_78067773ff66c200b130f992119"`
    );
    await queryRunner.query(
      `ALTER TABLE "notification_object" DROP CONSTRAINT "FK_655697bcfe514ac5e130407127b"`
    );
    await queryRunner.query(`DROP TABLE "bill"`);
    await queryRunner.query(`DROP TABLE "bill_user"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "receipt"`);
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TABLE "notification_object"`);
  }
}
