import {
	Show,
	SimpleShowLayout,
	TextField,
	ReferenceManyField,
	Datagrid,
	NumberField,
} from "react-admin";

export const CategoryShow: React.FC = (): JSX.Element => (
	<Show>
		<SimpleShowLayout>
			<TextField source="name" />

			<ReferenceManyField
				label="Продукты в этой категории"
				reference="products"
				target="categoryId"
			>
				<Datagrid>
					<TextField source="name" />
					<NumberField source="price" />
				</Datagrid>
			</ReferenceManyField>
		</SimpleShowLayout>
	</Show>
);
