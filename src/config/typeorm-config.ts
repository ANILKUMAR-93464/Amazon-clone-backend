import { DataSourceOptions, DataSource } from 'typeorm';
import * as config from 'config';
import { join } from 'path';


const dbConfig = config.get<{ [key: string]: string }>('database');
// console.log(dbConfig)

const dataSourceOptions: DataSourceOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [join(__dirname, "../", "database", "entities", '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, "../", "database", 'migrations/*{.ts,.js}')],
  migrationsTableName: "migrations",
   
  logging: false, 
  synchronize: false
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource; 
