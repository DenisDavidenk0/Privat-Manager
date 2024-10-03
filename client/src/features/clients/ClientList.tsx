import { List, Datagrid, TextField, EmailField } from "react-admin";

export const ClientList: React.FC = (): JSX.Element => (
	<List>
		<Datagrid rowClick="show">
			<TextField source="id" />
			<TextField source="name" />
			<EmailField source="email" />
		</Datagrid>
	</List>
);
