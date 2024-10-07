import { Edit, SimpleForm, TextInput, useNotify } from "react-admin";

export const ClientEdit: React.FC = (): JSX.Element => {
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
				<TextInput source="name" />
				<TextInput source="email" />
			</SimpleForm>
		</Edit>
	);
};
