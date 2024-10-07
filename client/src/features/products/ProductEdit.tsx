import {
	Edit,
	SimpleForm,
	TextInput,
	ArrayInput,
	SimpleFormIterator,
	NumberInput,
	useNotify,
	ReferenceInput,
	SelectInput,
} from "react-admin";

export const ProductEdit: React.FC = (): JSX.Element => {
	const notify = useNotify();

	return (
		<Edit
			redirect="list"
			mutationMode="pessimistic"
			onFailure={(error: any) => {
				notify(error.message || "Ошибка сохранения данных", {
					type: "error",
				});
			}}
		>
			<SimpleForm>
				<TextInput label="Название продукта" source="name" />
				<NumberInput label="Цена" source="price" />
				<ReferenceInput reference="categories" source="categoryId">
					<SelectInput label="Категория" optionText="name" />
				</ReferenceInput>

				<ArrayInput label="Магазины" source="shops">
					<SimpleFormIterator>
						<TextInput label="Название магазина" source="name" />
					</SimpleFormIterator>
				</ArrayInput>
			</SimpleForm>
		</Edit>
	);
};
