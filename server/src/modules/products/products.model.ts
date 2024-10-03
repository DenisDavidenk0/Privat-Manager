import {
	Table,
	Column,
	Model,
	ForeignKey,
	BelongsTo,
	DataType,
	HasMany,
} from "sequelize-typescript";
import { Category } from "../categories/categories.model";
import { Order } from "../orders/orders.model";

@Table
export class Product extends Model {
	@Column
	name!: string;

	@Column
	price!: number;

	@ForeignKey(() => Category)
	@Column
	categoryId!: number;

	@Column(DataType.JSONB)
	shops!: { name: string }[];

	@BelongsTo(() => Category)
	category!: Category;

	@HasMany(() => Order, {
		onDelete: "CASCADE",
	})
	orders!: Order[];
}
