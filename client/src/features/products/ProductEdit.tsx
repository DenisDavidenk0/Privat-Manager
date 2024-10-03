import {
	Edit,
	SimpleForm,
	TextInput,
	ArrayInput,
	SimpleFormIterator,
	NumberInput,
} from "react-admin";

export const ProductEdit: React.FC = (): JSX.Element => {
	return (
		<Edit redirect="list">
			<SimpleForm>
				<TextInput label="Название продукта" source="name" />
				<NumberInput label="Цена" source="price" />
				<NumberInput label="ID категории" source="categoryId" />

				<ArrayInput label="Магазины" source="shops">
					<SimpleFormIterator>
						<TextInput label="Название магазина" source="name" />
					</SimpleFormIterator>
				</ArrayInput>
			</SimpleForm>
		</Edit>
	);
};
