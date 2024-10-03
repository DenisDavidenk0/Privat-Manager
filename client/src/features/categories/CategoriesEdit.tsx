import {
	ArrayField,
	Edit,
	NumberField,
	SimpleForm,
	SingleFieldList,
	TextField,
	TextInput,
} from "react-admin";

export const CategoriesEdit: React.FC = (): JSX.Element => {
	return (
		<Edit redirect="list">
			<SimpleForm>
				<TextInput source="name" />
				<NumberField source="price" />
				<NumberField source="categoryId" />
				<ArrayField label="Магазины" source="shops">
					<SingleFieldList linkType={false}>
						<TextField source="name" />
					</SingleFieldList>
				</ArrayField>
			</SimpleForm>
		</Edit>
	);
};
