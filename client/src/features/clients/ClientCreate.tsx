import { Create, SimpleForm, TextInput } from "react-admin";
import { validateEmail, validateText } from "../validate/validate";

export const ClientCreate: React.FC = (): JSX.Element => (
	<Create redirect="list">
		<SimpleForm>
			<TextInput source="name" validate={validateText} />
			<TextInput source="email" validate={validateEmail} />
		</SimpleForm>
	</Create>
);
