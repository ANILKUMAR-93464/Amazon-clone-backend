import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUsersTable1753945059248 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',

         columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          
          {
            name: 'phone_number',
            type: 'varchar',
            length: '20',
            isNullable: true, // Phone optional
            comment: 'Stored as raw string without verification',
          },
         {
            name: 'is_active',
            type: 'boolean',
            default: false,
            comment: 'Whether the user account is active',
          },
          {
            name: 'is_email_verified',
            type: 'boolean',
            default: false,
          },
          {
            name: 'email_verification_token',
            type: 'varchar',
            length: '255',
            isNullable: true,
        },
        {
            name: 'email_verification_expires',
            type: 'timestamp',
            isNullable: true
        },

          {
            name: 'role',
            type: 'enum',
            enum: ['customer', 'seller', 'admin'],
            default: "'customer'",
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true, 
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_PHONE',
        columnNames: ['phone_number'],
        where: 'phone_number IS NOT NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
  }

}
