import { Datagrid, List, TextField } from "react-admin";

export const CategoriesList: React.FC = (): JSX.Element => {
	return (
		<List>
			<Datagrid rowClick="show">
				<TextField source="id" />
				<TextField source="name" />
			</Datagrid>
		</List>
	);
};
