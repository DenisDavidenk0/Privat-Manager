import {
	Edit,
	SimpleForm,
	NumberInput,
	DateInput,
	ReferenceInput,
	SelectInput,
	useNotify,
} from "react-admin";

export const OrderEdit: React.FC = (): JSX.Element => {
	const notify = useNotify();
	return (
		<Edit
			mutationMode="pessimistic"
			onFailure={(error: any) => {
				notify(error.message || "Ошибка сохранения данных", {
					type: "error",
				});
			}}
			redirect="list"
		>
			<SimpleForm>
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
};
