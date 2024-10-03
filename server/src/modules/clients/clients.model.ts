import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Order } from '../orders/orders.model';

@Table
export class Client extends Model {
    @Column
    name!: string;

    @Column
    email!: string;

    // Ассоциация с каскадным удалением заказов при удалении клиента
    @HasMany(() => Order, { onDelete: 'CASCADE' })
    orders!: Order[];
}
