import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertRootInUser1692875943690 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `
                INSERT INTO public."user"(
                    name, email, cpf, type_user, phone, password)
                    VALUES ('root', 'root@root.com', '12345678901', 2, '31925325252', '$2b$10$GhygY.XigKkI4J29bTY9deAGEa4y3Ng.dimvWpC79343mjS0CeDpG');
            `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `
                DELETE FROM public."user"
                WHERE email like 'root@root.com';
            `,
        );
    }
}
