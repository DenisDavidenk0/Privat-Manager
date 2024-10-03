import {
	Edit,
	SimpleForm,
	NumberInput,
	DateInput,
	ReferenceInput,
	SelectInput,
} from "react-admin";

export const OrderEdit: React.FC = (): JSX.Element => (
	<Edit redirect="list">
		<SimpleForm>
			<NumberInput disabled label="ID заказа" source="id" />

			<ReferenceInput label="Клиент" reference="clients" source="clientId">
				<SelectInput optionText="name" />
			</ReferenceInput>

			<ReferenceInput label="Продукт" reference="products" source="productId">
				<SelectInput optionText="name" />
			</ReferenceInput>

			<NumberInput label="Количество" source="quantity" />

			<DateInput label="Дата заказа" source="date" />
		</SimpleForm>
	</Edit>
);
