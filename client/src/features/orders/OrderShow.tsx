import {
	Show,
	SimpleShowLayout,
	NumberField,
	DateField,
	ReferenceField,
	TextField,
} from "react-admin";

export const OrderShow: React.FC = (): JSX.Element => {
	return (
		<Show>
			<SimpleShowLayout>
				<NumberField label="ID заказа" source="id" />
				<ReferenceField label="Клиент" reference="clients" source="clientId">
					<TextField source="name" />
				</ReferenceField>
				<ReferenceField label="Продукт" reference="products" source="productId">
					<TextField source="name" />
				</ReferenceField>
				<NumberField label="Количество" source="quantity" />
				<DateField label="Дата заказа" source="date" />
			</SimpleShowLayout>
		</Show>
	);
};
