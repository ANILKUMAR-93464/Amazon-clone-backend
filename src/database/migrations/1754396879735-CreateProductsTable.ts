
import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateProductsTable1754396879735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
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
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'discounted_price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'category_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'brand',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'stock_quantity',
            type: 'int',
            default: 0,
          },
          {
            name: 'seller_id',
            type: 'int',
            isNullable: false,
            unsigned:true,
          

          },
          {
            name: 'images',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'average_rating',
            type: 'decimal',
            precision: 2,
            scale: 1,
            default: 0.0,
          },
          {
            name: 'review_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'specifications',
            type: 'json',
            isNullable: true,
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

    // Indexes
    await queryRunner.createIndex(
      'products',
      new TableIndex({ name: 'IDX_PRODUCT_NAME', columnNames: ['name'] })
    );

    await queryRunner.createIndex(
      'products',
      new TableIndex({ name: 'IDX_PRODUCT_CATEGORY', columnNames: ['category_id'] })
    );

    // Foreign Key
    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'FK_PRODUCT_SELLER',
        columnNames: ['seller_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
          onUpdate:'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', 'FK_PRODUCT_SELLER');
    await queryRunner.dropTable('products');
  }

}
