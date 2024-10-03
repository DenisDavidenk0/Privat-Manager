import {
	Datagrid,
	List,
	NumberField,
	ReferenceField,
	TextField,
} from "react-admin";

export const ProductsList: React.FC = (): JSX.Element => {
	return (
		<List>
			<Datagrid rowClick="show">
				<TextField source="id" />
				<TextField source="name" />
				<NumberField source="price" />
				<ReferenceField
					reference="categories"
					source="categoryId"
					link="show"
					emptyText="Нет категории"
				>
					<TextField source="name" />
				</ReferenceField>
			</Datagrid>
		</List>
	);
};
