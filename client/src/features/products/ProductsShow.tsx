import {
	ArrayField,
	ReferenceField,
	Show,
	SimpleShowLayout,
	SingleFieldList,
	TextField,
} from "react-admin";

export const ProductsShow: React.FC = (): JSX.Element => {
	return (
		<Show>
			<SimpleShowLayout>
				<TextField label="Название продукта" source="name" />

				<ReferenceField
					source="categoryId"
					reference="categories"
					emptyText="Missing user"
				/>
				<ArrayField label="Магазины" source="shops">
					<SingleFieldList linkType={false}>
						<TextField source="name" />
					</SingleFieldList>
				</ArrayField>
			</SimpleShowLayout>
		</Show>
	);
};
