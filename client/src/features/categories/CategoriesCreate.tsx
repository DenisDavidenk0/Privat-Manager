import { Create, SimpleForm, TextInput } from "react-admin";
import { validateText } from "../validate/validate";

export const CategoriesCreate: React.FC = (): JSX.Element => {
	return (
		<Create redirect="list">
			<SimpleForm>
				<TextInput source="name" validate={validateText} />
			</SimpleForm>
		</Create>
	);
};
