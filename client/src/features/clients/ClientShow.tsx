import {
	Show,
	SimpleShowLayout,
	TextField,
	ReferenceManyField,
	Datagrid,
	DateField,
	ReferenceField,
} from "react-admin";

export const ClientShow: React.FC = (): JSX.Element => (
	<Show>
		<SimpleShowLayout>
			<TextField source="name" />
			<TextField source="email" />

			<ReferenceManyField
				label="Заказы клиента"
				reference="orders"
				target="clientId"
			>
				<Datagrid>
					<TextField source="id" />
					<DateField label="Дата" source="date" />
					<TextField label="Количество" source="quantity" />
					<ReferenceField
						label="Товар"
						reference="products"
						source="productId"
					/>
				</Datagrid>
			</ReferenceManyField>
		</SimpleShowLayout>
	</Show>
);
