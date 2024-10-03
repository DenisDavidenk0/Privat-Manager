import {
	Table,
	Column,
	Model,
	ForeignKey,
	BelongsTo,
} from "sequelize-typescript";
import { Client } from "../clients/clients.model";
import { Product } from "../products/products.model";


@Table
export class Order extends Model {
	@Column
	quantity!: number;

	@Column
	date!: string;

	@ForeignKey(() => Client)
	@Column
	clientId!: number;

	@ForeignKey(() => Product)
	@Column
	productId!: number;

	@BelongsTo(() => Client)
	client!: Client;

	@BelongsTo(() => Product)
	product!: Product;
}
