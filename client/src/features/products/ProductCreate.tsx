import {
	ArrayInput,
	Create,
	NumberInput,
	ReferenceInput,
	SelectInput,
	SimpleForm,
	SimpleFormIterator,
	TextInput,
} from "react-admin";
import {
	validateNumber,
	validateSelect,
	validateText,
} from "../validate/validate";

export const ProductCreate: React.FC = (): JSX.Element => {
	return (
		<Create redirect="list">
			<SimpleForm>
				<TextInput source="name" validate={validateText} />
				<NumberInput source="price" validate={validateNumber} />

				<ReferenceInput reference="categories" source="categoryId">
					<SelectInput
						label="Категория"
						optionText="name"
						validate={validateSelect}
					/>
				</ReferenceInput>

				<ArrayInput source="shops">
					<SimpleFormIterator inline>
						<TextInput
							label="Название магазина"
							source="name"
							validate={validateText}
						/>
					</SimpleFormIterator>
				</ArrayInput>
			</SimpleForm>
		</Create>
	);
};
