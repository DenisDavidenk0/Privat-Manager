import {
	Datagrid,
	List,
	NumberField,
	DateField,
	ReferenceField,
	TextField,
} from "react-admin";

export const OrdersList: React.FC = (): JSX.Element => {
	return (
		<List>
			<Datagrid>
				<NumberField label="ID заказа" source="id" />
				<ReferenceField
					label="Товар"
					link={false}
					reference="products"
					source="productId"
				>
					<TextField source="name" />
				</ReferenceField>
				<NumberField label="Количество" source="quantity" />
				<DateField label="Дата заказа" source="date" />
				<ReferenceField
					label="Имя клиента"
					// link={false}
					reference="clients"
					source="clientId"
				>
					<TextField source="name" />
				</ReferenceField>
			</Datagrid>
		</List>
	);
};
