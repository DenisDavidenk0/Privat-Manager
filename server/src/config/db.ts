import { Sequelize } from "sequelize-typescript";
import { Category } from "../modules/categories/categories.model";
import { Product } from "../modules/products/products.model";
import { Order } from "../modules/orders/orders.model";
import { Client } from "../modules/clients/clients.model";
import dotenv from 'dotenv';

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Необходимо установить переменную окружения ${key}`);
  }
  return value;
}
dotenv.config();
const dbName = getEnvVariable("DB_NAME");
const dbUser = getEnvVariable("DB_USER");
const dbPassword = getEnvVariable("DB_PASSWORD");
const dbHost = getEnvVariable("DB_HOST");
const dbPort = parseInt(getEnvVariable("DB_PORT"), 10);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
  port: dbPort,
  logging: false,
  models: [Category, Product, Order, Client],
});

export default sequelize;
