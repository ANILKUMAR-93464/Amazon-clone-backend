
// //
// import { join } from "path";
// import * as config from 'config';
// import { DataSource } from "typeorm";
// import * as bcrypt from 'bcrypt';
// import { hash } from 'crypto';

// const dbConfig = config.get<{ [key: string]: string }>('typeorm'); 

// export const typeormConfig = {
//   type: dbConfig.connection as any,
//   host: dbConfig.host,
//   username: dbConfig.username,
//   password: dbConfig.password,
//   database: dbConfig.database,
//   port: dbConfig.port, 
//   synchronize: dbConfig.synchronize === "true",
//   logging: dbConfig.logging === "true",
//   entities: [join(__dirname, "../", "database", "entities", '**', '*.entity.{ts,js}')],
//   migrations: [join(__dirname, "../", "database", 'migrations/*.ts')],
//   migrationsTableName: 'migrations',
//   autoLoadEntities: true,
//   cli: {
//     migrationsDir: "src/database/migrations"
//   },
//   cache: {
//     type: "redis" as "redis",
//     options: {
//       host: dbConfig.redisHost || "localhost",
//       port: dbConfig.redisPort || 6379,
//     },
//     duration: 3600000, // Duration in milliseconds
//   },
// }

// export default new DataSource(typeormConfig);


// //typeorm-config.ts


// bcrypt hash password creation example

// import * as bcrypt from 'bcrypt'

// const name = "Anil";
// console.log(name)

//  const hashPassword = async () =>{  
//     const password = await bcrypt.hash(name, 10); 
//     console.log(password) 
//     const validation = await bcrypt.compare("Anil", password)
//     console.log(validation)
//   } 
//   hashPassword();