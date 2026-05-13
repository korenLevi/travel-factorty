import "reflect-metadata";
import { User } from "./entities/User";
import { VacationRequest } from "./entities/VacationRequest";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();  

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: Number(process.env.PORT),
  username: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, VacationRequest],
  migrations: ["migrations/**/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Connected to the database!");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });
