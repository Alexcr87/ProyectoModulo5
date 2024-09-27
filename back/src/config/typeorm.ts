import { DataSource, DataSourceOptions } from "typeorm";
import {config as dotenvConfig} from 'dotenv'
import { registerAs } from "@nestjs/config";

dotenvConfig({path: '.env.development'})

const config ={
  type:'postgres',
  database: process.env.POSTGRES_DB,
  host:process.env.DB_HOST,
  port:process.env.DB_PORT as unknown as number,
  username:process.env.DB_USERNAME,
  password:process.env.POSTGRES_PASSWORD,
  ssl: {
    rejectUnauthorized: true 
  },
  autoLoadEntities: true,
  dropSchema:false,     
  synchronize:true,
  logging:false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations:['dist/migrations/*{.ts,.js}']
}

export default registerAs('typeorm', ()=>config)

export const connectionSource = new DataSource(config as DataSourceOptions)
