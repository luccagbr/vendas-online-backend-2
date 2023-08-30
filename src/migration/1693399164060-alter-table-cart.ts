import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableCart1693399164060 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE cart ADD is_active boolean NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE cart DROP is_active;
        `);
    }
}
