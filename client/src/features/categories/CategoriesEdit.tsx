import { Edit, SimpleForm, TextInput, useNotify } from "react-admin";
import { validateText } from "../validate/validate";

export const CategoriesEdit: React.FC = (): JSX.Element => {
	const notify = useNotify();
	return (
		<Edit
			redirect="list"
			mutationMode="pessimistic"
			onFailure={(error: any) => {
				notify(error.message || "Ошибка сохранения данных", {
					type: "error",
				});
			}}
		>
			<SimpleForm>
				<TextInput source="name" validate={validateText} />
			</SimpleForm>
		</Edit>
	);
};
