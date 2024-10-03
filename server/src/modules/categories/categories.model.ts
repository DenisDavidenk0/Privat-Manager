import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { Product } from "../products/products.model";


@Table
export class Category extends Model {
	@Column
	name!: string;

	@HasMany(() => Product)
	products!: Product[];
}
