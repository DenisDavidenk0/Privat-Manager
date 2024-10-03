import { Edit, SimpleForm, TextInput } from "react-admin";

export const ClientEdit: React.FC = (): JSX.Element => (
	<Edit redirect="list">
		<SimpleForm>
			<TextInput source="name" />
			<TextInput source="email" />
		</SimpleForm>
	</Edit>
);
