import { Admin, Resource } from "react-admin";
import { ClientList } from "./features/clients/ClientList";
import { ClientCreate } from "./features/clients/ClientCreate";
import { ClientEdit } from "./features/clients/ClientEdit";
import { ClientShow } from "./features/clients/ClientShow";
import { CategoriesList } from "./features/categories/CategoriesList";
import { CategoriesCreate } from "./features/categories/CategoriesCreate";
import { CategoriesEdit } from "./features/categories/CategoriesEdit";
import { ProductsList } from "./features/products/ProductsList";
import { CategoryShow } from "./features/categories/CategoryShow";
import { ProductsShow } from "./features/products/ProductsShow";
import { ProductEdit } from "./features/products/ProductEdit";
import { ProductCreate } from "./features/products/ProductCreate";
import { OrdersList } from "./features/orders/OrdersList";
import { OrdersCreate } from "./features/orders/OrderCreate";
import { OrderShow } from "./features/orders/OrderShow";
import { OrderEdit } from "./features/orders/OrderEdit";
import dataProvider from "./dataProvider/dataProvider";
import Dashboard from "./components/layout/Dashboard";
import type { Router } from "@tanstack/react-router";

interface AppProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: Router<any, any, any, any>; 
}


const App: React.FC<AppProps> = () => {
	return (
		<Admin dashboard={Dashboard} dataProvider={dataProvider}>
			<Resource
				create={ClientCreate}
				edit={ClientEdit}
				list={ClientList}
				name="clients"
				options={{ label: "Клиенты" }}
				show={ClientShow}
			/>
			<Resource
				create={CategoriesCreate}
				edit={CategoriesEdit}
				list={CategoriesList}
				name="categories"
				options={{ label: "Категории" }}
				show={CategoryShow}
			/>
			<Resource
				create={ProductCreate}
				edit={ProductEdit}
				list={ProductsList}
				name="products"
				options={{ label: "Товары" }}
				show={ProductsShow}
			/>
			<Resource
				create={OrdersCreate}
				edit={OrderEdit}
				list={OrdersList}
				name="orders"
				options={{ label: "Заказы" }}
				show={OrderShow}
			/>
		</Admin>
	);
};

export default App;
