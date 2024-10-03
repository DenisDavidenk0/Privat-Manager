import {
	Create,
	SimpleForm,
	NumberInput,
	DateInput,
	ReferenceInput,
	SelectInput,
} from "react-admin";

export const OrdersCreate: React.FC = (): JSX.Element => {
	return (
		<Create redirect="list">
			<SimpleForm>
				<ReferenceInput label="Клиент" reference="clients" source="clientId">
					<SelectInput optionText="name" />
				</ReferenceInput>
				<ReferenceInput label="Продукт" reference="products" source="productId">
					<SelectInput label="Продукт" optionText="name" />
				</ReferenceInput>
				<NumberInput label="Количество" source="quantity" />
				<DateInput label="Дата заказа" source="date" />
			</SimpleForm>
		</Create>
	);
};
